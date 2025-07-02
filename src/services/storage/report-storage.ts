import { openDB, DBSchema, IDBPDatabase } from 'idb'
import { GRIResponse } from '@/types/gri'

interface ESGPlatformDB extends DBSchema {
  reports: {
    key: string
    value: {
      id: string
      data: GRIResponse | any
      framework: 'gri' | 'sasb' | 'tcfd' | 'integrated'
      lastModified: string
      syncStatus: 'synced' | 'pending' | 'failed'
      version: number
    }
  }
  'sync-queue': {
    key: string
    value: {
      id: string
      reportId: string
      action: 'create' | 'update' | 'delete'
      data: any
      timestamp: number
      retryCount: number
    }
  }
  'user-preferences': {
    key: string
    value: {
      key: string
      value: any
      lastModified: string
    }
  }
}

export class ReportStorageService {
  private static instance: ReportStorageService
  private db: IDBPDatabase<ESGPlatformDB> | null = null
  
  static getInstance(): ReportStorageService {
    if (!this.instance) {
      this.instance = new ReportStorageService()
    }
    return this.instance
  }

  async initDB(): Promise<IDBPDatabase<ESGPlatformDB>> {
    if (this.db) return this.db

    this.db = await openDB<ESGPlatformDB>('esg-platform', 1, {
      upgrade(db) {
        // 보고서 저장소
        if (!db.objectStoreNames.contains('reports')) {
          const reportStore = db.createObjectStore('reports', { keyPath: 'id' })
          reportStore.createIndex('framework', 'framework')
          reportStore.createIndex('lastModified', 'lastModified')
          reportStore.createIndex('syncStatus', 'syncStatus')
        }

        // 동기화 큐
        if (!db.objectStoreNames.contains('sync-queue')) {
          const syncStore = db.createObjectStore('sync-queue', { keyPath: 'id' })
          syncStore.createIndex('reportId', 'reportId')
          syncStore.createIndex('timestamp', 'timestamp')
        }

        // 사용자 설정
        if (!db.objectStoreNames.contains('user-preferences')) {
          db.createObjectStore('user-preferences', { keyPath: 'key' })
        }
      }
    })

    return this.db
  }

  async saveReport(
    reportId: string, 
    data: GRIResponse | any, 
    framework: 'gri' | 'sasb' | 'tcfd' | 'integrated' = 'gri'
  ): Promise<void> {
    try {
      const db = await this.initDB()
      
      const existingReport = await db.get('reports', reportId)
      const version = existingReport ? existingReport.version + 1 : 1

      const reportData = {
        id: reportId,
        data,
        framework,
        lastModified: new Date().toISOString(),
        syncStatus: 'pending' as const,
        version
      }

      // 로컬 저장
      await db.put('reports', reportData)

      // 동기화 큐에 추가
      await this.addToSyncQueue(reportId, 'update', data)

      // 백그라운드 동기화 시도
      this.scheduleSyncInBackground(reportId)

    } catch (error) {
      console.error('Failed to save report locally:', error)
      throw new Error('보고서 저장에 실패했습니다.')
    }
  }

  async getReport(reportId: string): Promise<any | null> {
    try {
      const db = await this.initDB()
      const report = await db.get('reports', reportId)
      return report?.data || null
    } catch (error) {
      console.error('Failed to get report:', error)
      return null
    }
  }

  async getAllReports(framework?: string): Promise<any[]> {
    try {
      const db = await this.initDB()
      let reports
      
      if (framework) {
        reports = await db.getAllFromIndex('reports', 'framework', framework)
      } else {
        reports = await db.getAll('reports')
      }
      
      return reports.sort((a, b) => 
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      )
    } catch (error) {
      console.error('Failed to get reports:', error)
      return []
    }
  }

  async deleteReport(reportId: string): Promise<void> {
    try {
      const db = await this.initDB()
      await db.delete('reports', reportId)
      await this.addToSyncQueue(reportId, 'delete', null)
    } catch (error) {
      console.error('Failed to delete report:', error)
      throw new Error('보고서 삭제에 실패했습니다.')
    }
  }

  private async addToSyncQueue(
    reportId: string, 
    action: 'create' | 'update' | 'delete', 
    data: any
  ): Promise<void> {
    const db = await this.initDB()
    const syncItem = {
      id: `${reportId}_${action}_${Date.now()}`,
      reportId,
      action,
      data,
      timestamp: Date.now(),
      retryCount: 0
    }

    await db.put('sync-queue', syncItem)
  }

  private scheduleSyncInBackground(reportId: string): void {
    // Service Worker 지원 확인
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        // Background Sync API 지원 확인
        if ('sync' in registration) {
          return (registration as any).sync.register(`sync-report-${reportId}`)
        } else {
          // Background Sync 미지원 시 즉시 동기화 시도
          this.attemptSync(reportId)
        }
      }).catch(error => {
        console.warn('Background sync not supported:', error)
        // Fallback: 일반 fetch 시도
        this.attemptSync(reportId)
      })
    } else {
      // Fallback: setTimeout을 사용한 지연 동기화
      setTimeout(() => this.attemptSync(reportId), 2000)
    }
  }

  private async attemptSync(reportId: string): Promise<void> {
    try {
      // TODO: 실제 API 연동 시 구현
      console.log(`Syncing report ${reportId} to server...`)
      
      // Mock API 호출
      // const response = await fetch(`/api/reports/${reportId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })
      
      // 성공 시 syncStatus 업데이트
      const db = await this.initDB()
      const report = await db.get('reports', reportId)
      if (report) {
        report.syncStatus = 'synced'
        await db.put('reports', report)
      }
      
    } catch (error) {
      console.error('Sync failed:', error)
      
      // 실패 시 재시도 카운트 증가
      const db = await this.initDB()
      const report = await db.get('reports', reportId)
      if (report) {
        report.syncStatus = 'failed'
        await db.put('reports', report)
      }
    }
  }

  // 사용자 설정 저장/불러오기
  async saveUserPreference(key: string, value: any): Promise<void> {
    const db = await this.initDB()
    await db.put('user-preferences', {
      key,
      value,
      lastModified: new Date().toISOString()
    })
  }

  async getUserPreference(key: string): Promise<any> {
    const db = await this.initDB()
    const pref = await db.get('user-preferences', key)
    return pref?.value
  }
} 