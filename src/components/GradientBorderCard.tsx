import { cn } from '@nextui-org/react';
import React, { useMemo } from 'react';

// 预设渐变类型定义保持不变...
export enum GradientType {
  LIGHT = 'light',
  DARK = 'dark',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  CUSTOM = 'custom'
}

// 渐变方向定义保持不变...
export enum GradientDirection {
  LEFT_TO_RIGHT = '90deg',
  RIGHT_TO_LEFT = '270deg',
  TOP_TO_BOTTOM = '180deg',
  BOTTOM_TO_TOP = '0deg',
  DIAGONAL = '45deg'
}

// 组件属性接口保持不变...
interface GradientBorderCardProps {
  children: React.ReactNode;
  gradientType?: GradientType;
  direction?: GradientDirection;
  startColor?: string;
  endColor?: string;
  className?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  innerClassName?: string; 
}

const GradientBorderCard: React.FC<GradientBorderCardProps> = ({
  children,
  gradientType = GradientType.LIGHT,
  direction = GradientDirection.LEFT_TO_RIGHT,
  startColor,
  endColor,
  className = '',
  innerClassName = '',
  borderWidth = 1,
  borderRadius = 16,
}) => {
  // 预设渐变颜色映射保持不变...
  const gradientPresets = useMemo(() => ({
    [GradientType.LIGHT]: ['#FFFFFF', 'rgba(255, 255, 255, 0.2)'],
    [GradientType.DARK]: ['#333333', 'rgba(51, 51, 51, 0.2)'],
    [GradientType.PRIMARY]: ['#3B82F6', 'rgba(59, 130, 246, 0.2)'],
    [GradientType.SUCCESS]: ['#10B981', 'rgba(16, 185, 129, 0.2)'],
    [GradientType.WARNING]: ['#F59E0B', 'rgba(245, 158, 11, 0.2)'],
    [GradientType.ERROR]: ['#EF4444', 'rgba(239, 68, 68, 0.2)']
  }), []);

  // 计算渐变样式保持不变...
  const gradientStyle = useMemo(() => {
    if (gradientType === GradientType.CUSTOM && startColor && endColor) {
      return `linear-gradient(${direction}, ${startColor} 0%, ${endColor} 100%)`;
    }
    
    const [start, end] = gradientPresets[gradientType as keyof typeof gradientPresets] || gradientPresets[GradientType.LIGHT];
    return `linear-gradient(${direction}, ${start} 0%, ${end} 100%)`;
  }, [gradientType, direction, startColor, endColor, gradientPresets]);

  return (
    <div 
      className={className}
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        padding: '1px',
        // 内容区域背景
        backgroundColor: '#000',  // 根据您的设计调整背景色
        // 重要：设置overflow以使内容不超出圆角
        overflow: 'hidden',
        // 使用伪元素前需要设置
        isolation: 'isolate',
      }}
    >
      {/* 渐变边框效果 - 使用伪元素 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: `${borderRadius}px`,
          padding: `${borderWidth}px`,
          background: gradientStyle,
          // 优先级低于内容
          zIndex: -1,
          content: '""',
          pointerEvents: 'none',
        }}
      />
      
      {/* 内容容器 - 创建内边框效果 */}
      <div
        className={cn(innerClassName, 'flex items-center')}
        style={{
          position: 'relative',
          backgroundColor: '#000',  // 与外层背景相同
          height: '100%',
          width: '100%',
          borderRadius: `${borderRadius - borderWidth}px`,
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GradientBorderCard;