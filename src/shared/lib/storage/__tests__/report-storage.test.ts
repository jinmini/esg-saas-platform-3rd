import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ReportStorageService } from '../report-storage'

// IndexedDB Mock
const mockDB = {
  put: vi.fn(),
  get: vi.fn(),
  delete: vi.fn(),
  clear: vi.fn(),
  getAll: vi.fn(),
  add: vi.fn(),
}

const mockTransaction = {
  objectStore: vi.fn(() => mockDB),
  oncomplete: null,
  onerror: null,
}

const mockDatabase = {
  createObjectStore: vi.fn(),
  transaction: vi.fn(() => mockTransaction),
  close: vi.fn(),
}



// IDB Mock 설정
vi.mock('idb', () => ({
  openDB: vi.fn(() => Promise.resolve(mockDatabase))
}))

describe('ReportStorageService', () => {
  let service: ReportStorageService
  let mockGRIData: any

  beforeEach(() => {
    // 모든 모킹 함수 초기화
    vi.clearAllMocks()
    
    // 테스트 데이터 준비
    mockGRIData = {
      '2-1': {
        status: 'complete',
        response: 'Test response data'
      }
    }

    // Service 인스턴스 생성
    service = ReportStorageService.getInstance()
  })

  describe('getInstance', () => {
    it('싱글톤 패턴으로 동일한 인스턴스를 반환해야 한다', () => {
      const instance1 = ReportStorageService.getInstance()
      const instance2 = ReportStorageService.getInstance()
      expect(instance1).toBe(instance2)
    })
  })

  describe('saveReport', () => {
    it('보고서를 성공적으로 저장해야 한다', async () => {
      mockDB.put.mockResolvedValue(undefined)

      await expect(service.saveReport('test-report-1', mockGRIData, 'gri')).resolves.not.toThrow()
      
      expect(mockDB.put).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'test-report-1',
          data: mockGRIData,
          framework: 'gri',
          syncStatus: 'pending',
          version: expect.any(Number)
        })
      )
    })

    it('저장 실패 시 에러를 발생시켜야 한다', async () => {
      const error = new Error('Storage failed')
      mockDB.put.mockRejectedValue(error)

      await expect(service.saveReport('test-report-1', mockGRIData, 'gri'))
        .rejects.toThrow('보고서 저장에 실패했습니다: Storage failed')
    })
  })

  describe('getReport', () => {
    it('저장된 보고서를 성공적으로 불러와야 한다', async () => {
      const savedReport = {
        id: 'test-report-1',
        data: mockGRIData,
        framework: 'gri',
        lastModified: new Date().toISOString(),
        syncStatus: 'synced',
        version: 1
      }

      mockDB.get.mockResolvedValue(savedReport)

      const result = await service.getReport('test-report-1')
      
      expect(result).toEqual(mockGRIData)
      expect(mockDB.get).toHaveBeenCalledWith('test-report-1')
    })

    it('존재하지 않는 보고서에 대해 null을 반환해야 한다', async () => {
      mockDB.get.mockResolvedValue(undefined)

      const result = await service.getReport('non-existent-report')
      
      expect(result).toBeNull()
    })

    it('오류 발생 시 null을 반환해야 한다', async () => {
      const error = new Error('Load failed')
      mockDB.get.mockRejectedValue(error)

      const result = await service.getReport('test-report-1')
      expect(result).toBeNull()
    })
  })

  describe('deleteReport', () => {
    it('보고서를 성공적으로 삭제해야 한다', async () => {
      mockDB.delete.mockResolvedValue(undefined)

      await expect(service.deleteReport('test-report-1')).resolves.not.toThrow()
      
      expect(mockDB.delete).toHaveBeenCalledWith('test-report-1')
    })

    it('삭제 실패 시 에러를 발생시켜야 한다', async () => {
      const error = new Error('Delete failed')
      mockDB.delete.mockRejectedValue(error)

      await expect(service.deleteReport('test-report-1'))
        .rejects.toThrow('보고서 삭제에 실패했습니다: Delete failed')
    })
  })

  describe('getAllReports', () => {
    it('모든 보고서 목록을 반환해야 한다', async () => {
      const reports = [
        {
          id: 'report-1',
          data: mockGRIData,
          framework: 'gri',
          lastModified: new Date().toISOString(),
          syncStatus: 'synced',
          version: 1
        },
        {
          id: 'report-2',
          data: {},
          framework: 'sasb',
          lastModified: new Date().toISOString(),
          syncStatus: 'pending',
          version: 1
        }
      ]

      mockDB.getAll.mockResolvedValue(reports)

      const result = await service.getAllReports()
      
      expect(result).toEqual(reports)
      expect(mockDB.getAll).toHaveBeenCalled()
    })

    it('프레임워크별로 필터링해야 한다', async () => {
      const griReports = [
        {
          id: 'gri-report-1',
          framework: 'gri',
          data: mockGRIData,
          lastModified: new Date().toISOString(),
          syncStatus: 'synced',
          version: 1
        }
      ]

      mockDB.getAll.mockResolvedValue(griReports)

      const result = await service.getAllReports('gri')
      
      expect(result).toEqual(griReports)
    })
  })

  describe('saveUserPreference', () => {
    it('사용자 설정을 성공적으로 저장해야 한다', async () => {
      mockDB.put.mockResolvedValue(undefined)

      await expect(service.saveUserPreference('theme', 'dark')).resolves.not.toThrow()
      
      expect(mockDB.put).toHaveBeenCalledWith(
        expect.objectContaining({
          key: 'theme',
          value: 'dark',
          lastModified: expect.any(String)
        })
      )
    })
  })

  describe('getUserPreference', () => {
    it('저장된 사용자 설정을 불러와야 한다', async () => {
      const preference = {
        key: 'theme',
        value: 'dark',
        lastModified: new Date().toISOString()
      }

      mockDB.get.mockResolvedValue(preference)

      const result = await service.getUserPreference('theme')
      
      expect(result).toBe('dark')
      expect(mockDB.get).toHaveBeenCalledWith('theme')
    })

    it('존재하지 않는 설정에 대해 undefined를 반환해야 한다', async () => {
      mockDB.get.mockResolvedValue(undefined)

      const result = await service.getUserPreference('non-existent')
      
      expect(result).toBeUndefined()
    })
  })
}) 