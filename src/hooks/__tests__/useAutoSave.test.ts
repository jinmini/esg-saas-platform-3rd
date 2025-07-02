import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useAutoSave } from '../useAutoSave'
import { ReportStorageService } from '@/services/storage/report-storage'

// ReportStorageService 모킹
vi.mock('@/services/storage/report-storage', () => ({
  ReportStorageService: {
    getInstance: vi.fn(() => ({
      saveReport: vi.fn(),
      getReport: vi.fn(),
    }))
  }
}))

describe('useAutoSave 훅', () => {
  let mockSaveReport: any
  let mockGetReport: any

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    
    mockSaveReport = vi.fn().mockResolvedValue(undefined)
    mockGetReport = vi.fn().mockResolvedValue(null)
    
    const mockStorageService = {
      saveReport: mockSaveReport,
      getReport: mockGetReport,
    }
    
    vi.mocked(ReportStorageService.getInstance).mockReturnValue(mockStorageService as any)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('데이터 변경 시 debounce된 자동 저장을 수행해야 한다', async () => {
    const testData = { test: 'data' }
    const { result } = renderHook(() => 
      useAutoSave('test-key', testData, { debounceMs: 1000 })
    )

    expect(result.current.isSaving).toBe(false)

    // 데이터 변경 (첫 번째)
    const newData = { test: 'updated' }
    renderHook(() => useAutoSave('test-key', newData, { debounceMs: 1000 }))

    // debounce 시간 이전에는 저장되지 않아야 함
    expect(mockSaveReport).not.toHaveBeenCalled()

    // debounce 시간 경과
    act(() => {
      vi.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(mockSaveReport).toHaveBeenCalledWith('test-key', newData, 'gri')
    })
  })

  it('연속된 데이터 변경 시 마지막 변경만 저장해야 한다', async () => {
    const { rerender } = renderHook(
      ({ data }) => useAutoSave('test-key', data, { debounceMs: 1000 }),
      { initialProps: { data: { test: 'initial' } } }
    )

    // 빠른 연속 변경
    rerender({ data: { test: 'change1' } })
    rerender({ data: { test: 'change2' } })
    rerender({ data: { test: 'final' } })

    // debounce 시간 경과
    act(() => {
      vi.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(mockSaveReport).toHaveBeenCalledTimes(1)
      expect(mockSaveReport).toHaveBeenCalledWith('test-key', { test: 'final' }, 'gri')
    })
  })

  it('저장 중 상태를 올바르게 표시해야 한다', async () => {
    // 저장이 지연되도록 설정
    mockSaveReport.mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 500))
    )

    const { result, rerender } = renderHook(
      ({ data }) => useAutoSave('test-key', data, { debounceMs: 100 }),
      { initialProps: { data: { test: 'initial' } } }
    )

    expect(result.current.isSaving).toBe(false)

    // 데이터 변경
    rerender({ data: { test: 'updated' } })

    // debounce 시간 경과
    act(() => {
      vi.advanceTimersByTime(100)
    })

    // 저장 시작되면 isSaving이 true가 되어야 함
    await waitFor(() => {
      expect(result.current.isSaving).toBe(true)
    })

    // 저장 완료 후 isSaving이 false가 되어야 함
    act(() => {
      vi.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(result.current.isSaving).toBe(false)
    })
  })

  it('수동 저장 기능이 즉시 실행되어야 한다', async () => {
    const testData = { test: 'manual' }
    const { result } = renderHook(() => 
      useAutoSave('test-key', testData, { debounceMs: 1000 })
    )

    // 수동 저장 실행
    act(() => {
      result.current.saveNow()
    })

    await waitFor(() => {
      expect(mockSaveReport).toHaveBeenCalledWith('test-key', testData, 'gri')
    })
  })

  it('저장 성공 시 콜백이 호출되어야 한다', async () => {
    const onSaveSuccess = vi.fn()
    const testData = { test: 'success' }
    
    const { rerender } = renderHook(
      ({ data }) => useAutoSave('test-key', data, { 
        debounceMs: 100,
        onSaveSuccess 
      }),
      { initialProps: { data: testData } }
    )

    rerender({ data: { test: 'updated' } })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    await waitFor(() => {
      expect(onSaveSuccess).toHaveBeenCalledWith({ test: 'updated' })
    })
  })

  it('저장 실패 시 에러 콜백이 호출되어야 한다', async () => {
    const onSaveError = vi.fn()
    const error = new Error('Save failed')
    mockSaveReport.mockRejectedValue(error)
    
    const { rerender } = renderHook(
      ({ data }) => useAutoSave('test-key', data, { 
        debounceMs: 100,
        onSaveError 
      }),
      { initialProps: { data: { test: 'initial' } } }
    )

    rerender({ data: { test: 'error' } })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    await waitFor(() => {
      expect(onSaveError).toHaveBeenCalledWith(error)
    })
  })

  it('비활성화 상태에서는 저장하지 않아야 한다', async () => {
    const { rerender } = renderHook(
      ({ data }) => useAutoSave('test-key', data, { 
        debounceMs: 100,
        enabled: false 
      }),
      { initialProps: { data: { test: 'initial' } } }
    )

    rerender({ data: { test: 'updated' } })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    // 충분한 시간 대기
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(mockSaveReport).not.toHaveBeenCalled()
  })

  it('다른 프레임워크로 저장할 수 있어야 한다', async () => {
    const testData = { test: 'sasb' }
    const { rerender } = renderHook(
      ({ data }) => useAutoSave('test-key', data, { 
        debounceMs: 100,
        framework: 'sasb' 
      }),
      { initialProps: { data: testData } }
    )

    rerender({ data: { test: 'updated' } })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    await waitFor(() => {
      expect(mockSaveReport).toHaveBeenCalledWith('test-key', { test: 'updated' }, 'sasb')
    })
  })

  it('lastSaved 시간이 올바르게 업데이트되어야 한다', async () => {
    const testData = { test: 'timestamp' }
    const { result, rerender } = renderHook(
      ({ data }) => useAutoSave('test-key', data, { debounceMs: 100 }),
      { initialProps: { data: testData } }
    )

    expect(result.current.lastSaved).toBeNull()

    rerender({ data: { test: 'updated' } })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    await waitFor(() => {
      expect(result.current.lastSaved).toBeInstanceOf(Date)
    })
  })

  it('동기화 상태를 올바르게 반환해야 한다', () => {
    const { result } = renderHook(() => 
      useAutoSave('test-key', { test: 'sync' }, { debounceMs: 100 })
    )

    // 초기 상태는 unknown
    expect(result.current.getSyncStatus()).toBe('unknown')
  })
}) 