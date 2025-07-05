import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { Button } from './Button';

export interface DateRange {
  from?: Date | undefined;
  to?: Date | undefined;
}

interface DatePickerWithRangeProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  className?: string;
}

export function DatePickerWithRange({ 
  value, 
  onChange, 
  placeholder = "날짜 범위를 선택하세요",
  className 
}: DatePickerWithRangeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('ko-KR');
  };

  const displayText = value?.from 
    ? value.to 
      ? `${formatDate(value.from)} - ${formatDate(value.to)}`
      : formatDate(value.from)
    : placeholder;

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="justify-start text-left font-normal"
      >
        <CalendarDays className="mr-2 h-4 w-4" />
        {displayText}
      </Button>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 p-4 bg-white border rounded-md shadow-md">
          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium">시작 날짜</label>
              <input
                type="date"
                value={value?.from ? value.from.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const newFrom = e.target.value ? new Date(e.target.value) : undefined;
                  onChange?.({ from: newFrom, to: value?.to });
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="text-sm font-medium">종료 날짜</label>
              <input
                type="date"
                value={value?.to ? value.to.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const newTo = e.target.value ? new Date(e.target.value) : undefined;
                  onChange?.({ from: value?.from, to: newTo });
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <Button
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              적용
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 