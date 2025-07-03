import { describe, it, expect } from 'vitest'
import { cn } from '../cn'

describe('cn 유틸리티 함수', () => {
  it('단일 클래스명을 올바르게 처리해야 한다', () => {
    expect(cn('test-class')).toBe('test-class')
  })

  it('여러 클래스명을 병합해야 한다', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('조건부 클래스명을 처리해야 한다', () => {
    const isVisible = true
    const isHidden = false
    expect(cn('base', isVisible && 'conditional', isHidden && 'hidden')).toBe('base conditional')
  })

  it('undefined와 null을 무시해야 한다', () => {
    expect(cn('base', undefined, null, 'valid')).toBe('base valid')
  })

  it('Tailwind 클래스 충돌을 해결해야 한다', () => {
    // twMerge가 같은 속성의 클래스들을 병합
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('복잡한 조건부 클래스 조합을 처리해야 한다', () => {
    const isActive = true
    const isDisabled = false
    const variant = 'primary'
    
    const result = cn(
      'base-class',
      isActive && 'active',
      isDisabled && 'disabled',
      variant === 'primary' && 'bg-blue-500',
      'text-white'
    )
    
    expect(result).toBe('base-class active bg-blue-500 text-white')
  })

  it('빈 입력에 대해 빈 문자열을 반환해야 한다', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
    expect(cn(false, null, undefined)).toBe('')
  })
}) 