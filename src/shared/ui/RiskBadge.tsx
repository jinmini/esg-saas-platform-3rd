// 재사용 가능한 리스크 뱃지 컴포넌트

import React from 'react';
import { Badge } from './Badge';
import { RiskLevel, getRiskLabel, getRiskColor } from '@/entities/risk';
import { cn } from '@/shared/lib';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
  variant?: 'default' | 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function RiskBadge({ 
  level, 
  className, 
  variant = 'default',
  size = 'md',
  showIcon = false 
}: RiskBadgeProps) {
  const label = getRiskLabel(level);
  const color = getRiskColor(level);
  
  const getBadgeVariant = () => {
    if (variant === 'outline') return 'outline';
    if (variant === 'solid') return 'default';
    
    // 기본 variant는 레벨에 따라 결정
    switch (level) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-0.5';
      case 'lg':
        return 'text-sm px-3 py-1';
      default:
        return 'text-xs px-2.5 py-0.5';
    }
  };

  const getCustomStyles = () => {
    if (variant === 'solid') {
      return {
        backgroundColor: color,
        color: 'white',
        border: 'none',
      };
    }
    
    if (variant === 'outline') {
      return {
        borderColor: color,
        color: color,
        backgroundColor: 'transparent',
      };
    }
    
    return {};
  };

  return (
    <Badge
      variant={getBadgeVariant() as "default" | "secondary" | "destructive" | "outline"}
      className={cn(
        getSizeClasses(),
        className
      )}
      style={getCustomStyles()}
    >
      {showIcon && (
        <span className="mr-1">
          {level === 'critical' && '🔴'}
          {level === 'high' && '🟠'}
          {level === 'medium' && '🟡'}
          {level === 'low' && '🟢'}
        </span>
      )}
      {label}
    </Badge>
  );
} 