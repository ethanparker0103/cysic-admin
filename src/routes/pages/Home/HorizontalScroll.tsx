import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section");
    const sectionWidth = sections[0]?.offsetWidth || window.innerWidth;

    const initialOffset = ( Math.floor(sections.length / 2) - 0.5) * sectionWidth;
    const remainingSections = sections.length - Math.floor(sections.length / 2) - 0.5;


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

    return () => ScrollTrigger.killAll();
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
