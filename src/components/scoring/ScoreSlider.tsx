'use client';

import React, { useState, useCallback } from 'react';
import { Label } from '@/shared/ui/Label';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';

interface ScoreSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  disabled?: boolean;
  showInput?: boolean;
  min?: number;
  max?: number;
}

// 점수별 색상 매핑 (1-5점 스케일)
const getScoreColor = (score: number): string => {
  if (score >= 5) return 'bg-green-500';
  if (score >= 4) return 'bg-yellow-500';
  if (score >= 3) return 'bg-orange-500';
  if (score >= 2) return 'bg-red-400';
  return 'bg-gray-400';
};

// 점수별 텍스트 색상
const getScoreTextColor = (score: number): string => {
  if (score >= 5) return 'text-green-700';
  if (score >= 4) return 'text-yellow-700';
  if (score >= 3) return 'text-orange-700';
  if (score >= 2) return 'text-red-600';
  return 'text-gray-600';
};

// 점수별 설명 (1-5점 스케일)
const getScoreDescription = (score: number): string => {
  if (score >= 5) return '매우 높음';
  if (score >= 4) return '높음';
  if (score >= 3) return '보통';
  if (score >= 2) return '낮음';
  if (score >= 1) return '매우 낮음';
  return '미평가';
};

export function ScoreSlider({
  label,
  value,
  onChange,
  description,
  disabled = false,
  showInput = true,
  min = 1,
  max = 5
}: ScoreSliderProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onChange(newValue);
  }, [onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(min, Math.min(max, parseInt(e.target.value) || min));
    onChange(newValue);
  }, [onChange, min, max]);

  return (
    <Card className={`p-4 transition-all duration-200 ${
      isFocused ? 'ring-2 ring-blue-200 border-blue-300' : 'border-gray-200'
    } ${disabled ? 'opacity-50' : ''}`}>
      <div className="space-y-3">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium text-gray-700">{label}</Label>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-lg font-bold ${getScoreTextColor(value)}`}>
              {value}
            </span>
            <span className="text-xs text-gray-500">/ {max}</span>
          </div>
        </div>

        {/* 슬라이더 */}
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={1}
            value={value}
            onChange={handleSliderChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={`
              w-full h-3 rounded-lg appearance-none cursor-pointer
              bg-gray-200 slider-thumb
              ${disabled ? 'cursor-not-allowed' : 'hover:bg-gray-300'}
            `}
            style={{
              background: `linear-gradient(to right, 
                ${getScoreColor(value)} 0%, 
                ${getScoreColor(value)} ${((value - min) / (max - min)) * 100}%, 
                #e5e7eb ${((value - min) / (max - min)) * 100}%, 
                #e5e7eb 100%)`
            }}
          />
          
          {/* 점수 구간 표시 */}
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{min}</span>
            <span>3</span>
            <span>{max}</span>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${getScoreTextColor(value)}`}>
            {getScoreDescription(value)}
          </span>
          
          {showInput && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">정확한 값:</span>
              <Input
                type="number"
                min={min}
                max={max}
                step={1}
                value={value}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                className="w-16 h-8 text-xs text-center"
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${getScoreColor(value)};
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${getScoreColor(value)};
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
      `}</style>
    </Card>
  );
} 