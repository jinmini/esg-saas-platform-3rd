import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { ReportStorageService } from '@/shared/lib/storage/report-storage'

// Debounce 유틸리티 함수
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

interface AutoSaveOptions {
  debounceMs?: number
  enabled?: boolean
  framework?: 'gri' | 'sasb' | 'tcfd' | 'integrated'
  onSaveSuccess?: (data: any) => void
  onSaveError?: (error: Error) => void
}

interface AutoSaveReturn {
  isSaving: boolean
  lastSaved: Date | null
  saveNow: () => Promise<void>
  getSyncStatus: () => 'synced' | 'pending' | 'failed' | 'unknown'
}

export function useAutoSave<T>(
  key: string,
  data: T,
  options: AutoSaveOptions = {}
): AutoSaveReturn {
  const {
    debounceMs = 2000,
    enabled = true,
    framework = 'gri',
    onSaveSuccess,
    onSaveError
  } = options

  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [syncStatus, setSyncStatus] = useState<'synced' | 'pending' | 'failed' | 'unknown'>('unknown')
  const storageService = useRef(ReportStorageService.getInstance())

  const save = useCallback(async (dataToSave: T) => {
    if (!enabled || !dataToSave) return

    setIsSaving(true)
    setSyncStatus('pending')

    try {
      await storageService.current.saveReport(key, dataToSave, framework)
      setLastSaved(new Date())
      setSyncStatus('synced')
      onSaveSuccess?.(dataToSave)
    } catch (error) {
      console.error('Auto-save failed:', error)
      setSyncStatus('failed')
      onSaveError?.(error as Error)
    } finally {
      setIsSaving(false)
    }
  }, [key, enabled, framework, onSaveSuccess, onSaveError])

  const debouncedSave = useMemo(
    () => debounce(save, debounceMs),
    [save, debounceMs]
  )

  const saveNow = useCallback(async () => {
    if (data) {
      await save(data)
    }
  }, [data, save])

  const getSyncStatus = useCallback(() => syncStatus, [syncStatus])

  // 데이터 변경 시 자동 저장
  useEffect(() => {
    if (data && enabled) {
      debouncedSave(data)
    }
  }, [data, debouncedSave, enabled])

  // 컴포넌트 언마운트 시 즉시 저장
  useEffect(() => {
    return () => {
      if (data && enabled) {
        save(data)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 의존성 배열을 비워서 언마운트 시에만 실행

  return {
    isSaving,
    lastSaved,
    saveNow,
    getSyncStatus
  }
}

// 여러 데이터 소스를 위한 배치 자동 저장 훅
export function useBatchAutoSave(
  items: Array<{
    key: string
    data: any
    framework?: 'gri' | 'sasb' | 'tcfd' | 'integrated'
  }>,
  options: Omit<AutoSaveOptions, 'framework'> = {}
) {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const storageService = useRef(ReportStorageService.getInstance())

  const saveBatch = useCallback(async () => {
    if (items.length === 0) return

    setIsSaving(true)
    try {
      await Promise.all(
        items.map(item =>
          storageService.current.saveReport(
            item.key,
            item.data,
            item.framework || 'gri'
          )
        )
      )
      setLastSaved(new Date())
      options.onSaveSuccess?.(items)
    } catch (error) {
      console.error('Batch auto-save failed:', error)
      options.onSaveError?.(error as Error)
    } finally {
      setIsSaving(false)
    }
  }, [items, options])

  const debouncedBatchSave = useMemo(
    () => debounce(saveBatch, options.debounceMs || 2000),
    [saveBatch, options.debounceMs]
  )

  useEffect(() => {
    if (options.enabled !== false && items.length > 0) {
      debouncedBatchSave()
    }
  }, [items, debouncedBatchSave, options.enabled])

  return {
    isSaving,
    lastSaved,
    saveNow: saveBatch
  }
} 