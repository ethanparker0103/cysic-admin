import { backgroundImageList } from "@/router";
import { useLocation } from "react-router-dom";
import React from "react";
import { cn } from "@nextui-org/react";

interface BackgroundConfig {
    img: string;
    height?: string; // 比如 "60vh" 或 "100vh"
    gradient?: string; // 可选，比如 "linear-gradient(to bottom, rgba(0,0,0,0.5), #000)"
    maxWidth?: string;
    className?: string;
    style?: React.CSSProperties;
}

export const LandingBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const path = location.pathname;

    // 根据当前路由拿背景配置
    const backgroundConfig: BackgroundConfig | undefined = backgroundImageList?.[path as keyof typeof backgroundImageList];

    if (!backgroundConfig?.img) {
        return (
            <main className="relative min-h-screen w-full pb-12 z-10 max-w-[1440px] mx-auto">
                {children}
            </main>
        );
    }

    const { img, height = "100vh", gradient = "", maxWidth = "", className = "", style = {} } = backgroundConfig;

    // 组合背景
    const backgroundImage = gradient
        ? `${gradient}, url(${img})`
        : `url(${img})`;

    return (
        <>
            {/* 背景层 */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className={cn("w-full h-full mx-auto", className)}
                    style={{
                        backgroundImage: backgroundImage,
                        backgroundSize: "cover",
                        backgroundPosition: "top center",
                        backgroundRepeat: "no-repeat",
                        maxWidth: maxWidth,
                        ...style
                    }}
                />
            </div>

            {/* 主体内容层 */}
            <div className="relative w-full" style={{ minHeight: height }}>
                <main className="relative min-h-screen w-full pb-12 z-10 max-w-[1440px] mx-auto flex flex-col items-center justify-center">
                    {children}
                </main>
            </div>
        </>
    );
};

export default LandingBackground;
