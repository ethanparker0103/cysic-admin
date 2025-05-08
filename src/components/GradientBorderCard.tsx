import { cn } from '@nextui-org/react';
import React from 'react';



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
  direction?: GradientDirection;
  className?: string;
  borderWidth?: number;
  borderRadius?: number;
  style?: React.CSSProperties;
}

const GradientBorderCard: React.FC<GradientBorderCardProps> = ({
  children,
  direction = GradientDirection.LEFT_TO_RIGHT,
  className = '',
  borderWidth = 1,
  borderRadius = 16,
  style = {}
}) => {
  const cssVariables = {
    '--gradient-direction': direction,
    '--border-width': `${borderWidth}px`,
  } as React.CSSProperties;

  return (
    <>

      {/* content */}
      <div className={
        cn('gradient-border-card w-full overflow-hidden z-[2] relative backdrop-blur', className)
      }
        style={{
          ...cssVariables,
          borderRadius: `${borderRadius}px`,
          ...style
        }}
      >
        <>
          {children}
        </>
      </div>




    </>
  );
};

export default GradientBorderCard;