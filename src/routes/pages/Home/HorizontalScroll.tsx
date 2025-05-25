import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  // 设置滚动动画的函数，以便在初始化和窗口大小变化时调用
  const setupScrollAnimation = () => {
    const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section");
    const sectionWidth = sections[0]?.offsetWidth || window.innerWidth;

    const initialOffset = ( Math.floor(sections.length / 2) - 0.5) * sectionWidth;
    const remainingSections = sections.length - Math.floor(sections.length / 2) - 0.5;

    // 清除之前的动画实例
    ScrollTrigger.getAll().forEach(st => st.kill());

    gsap.set('.horizontal-scroll', {
        x: initialOffset
    });
    gsap.to('.horizontal-scroll', {
        x: -(remainingSections * sectionWidth), // 只计算剩余需要移动的距离
        ease: "none",
        scrollTrigger: {
            trigger: '.horizontal-scroll-wrapper',
            start: "top top",
            end: `+=${sections.length * 100}%`,
            pin: '.horizontal-scroll',
            scrub: 2,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });
  };

  useEffect(() => {
    // 初始化滚动动画
    setupScrollAnimation();
    
    // 添加窗口大小变化监听器
    const handleResize = () => {
      // 使用requestAnimationFrame防止resize事件触发过于频繁
      window.requestAnimationFrame(() => {
        setupScrollAnimation();
      });
    };
    
    window.addEventListener("resize", handleResize);

    // 清理函数
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div ref={containerRef} className="horizontal-scroll-wrapper relative overflow-hidden">
      <div ref={scrollRef} className="horizontal-scroll flex">
        {React.Children.map(children, (child, index) => (
          <div className="horizontal-section w-screen h-screen" 
           key={index}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
