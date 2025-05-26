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

interface GradientBorderCardProps {
  onClick?: () => void;
  children: React.ReactNode;
  direction?: GradientDirection | string;
  className?: string;
  borderWidth?: number;
  borderRadius?: number;
  style?: React.CSSProperties;
  gradientFrom?: string;
  gradientTo?: string;
}

const GradientBorderCard: React.FC<GradientBorderCardProps> = ({
  onClick,
  children,
  direction = GradientDirection.LEFT_TO_RIGHT,
  className = '',
  borderWidth = 1,
  borderRadius = 16,
  style = {},
  gradientFrom = '#fff',
  gradientTo = 'rgba(255, 255, 255, 0.2)'
}) => {
  const cssVariables = {
    '--gradient-direction': direction,
    '--border-width': `${borderWidth}px`,
    '--gradient-from': gradientFrom,
    '--gradient-to': gradientTo
  } as React.CSSProperties;

  return (
    <>

      {/* content */}
      <div
        onClick={onClick}
        className={
          cn('gradient-border-card w-full overflow-hidden z-[2] relative backdrop-blur bg-[#090A09CC] pb-[1px]', className)
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