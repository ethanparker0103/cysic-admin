import React from 'react';
import { cn } from "@nextui-org/react";

interface ScrollingTextProps {
  /** 需要滚动的文本或者React节点 */
  children: React.ReactNode;
  /** 滚动速度，数值越大速度越慢，单位为秒 */
  duration?: number;
  /** 滚动方向：'left'为从右向左，'right'为从左向右 */
  direction?: 'left' | 'right';
  /** 容器类名 */
  className?: string;
  /** 文本类名 */
  textClassName?: string;
  /** 是否是背景图 */
  isBackground?: boolean;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({
  children,
  duration = 20,
  direction = 'left',
  className = '',
  textClassName = '',
  isBackground = false,
}) => {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap w-full h-full", className)}>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(${direction === 'left' ? '0' : '-50%'}); }
          100% { transform: translateX(${direction === 'left' ? '-50%' : '0'}); }
        }
        
        .scrolling-wrapper {
          display: inline-flex;
          animation: scroll ${duration}s linear infinite;
          will-change: transform;
          height: 100%;
          width: ${isBackground ? '200%' : 'auto'};
        }
        
        .scrolling-item {
          ${isBackground ? 'width: 50%;' : 'padding-right: 2rem;'}
          height: 100%;
        }
      `}</style>

      <div className="scrolling-wrapper">
        {/* 固定使用2个副本，足够实现连续滚动效果 */}
        <div className={cn("scrolling-item", textClassName)}>{children}</div>
        <div className={cn("scrolling-item", textClassName)}>{children}</div>
      </div>
    </div>
  );
};

export default ScrollingText;