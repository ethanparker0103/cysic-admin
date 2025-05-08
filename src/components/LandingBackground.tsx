import { backgroundImageList } from "@/router";
import { useLocation } from "react-router-dom";
import React from "react";
import { cn } from "@nextui-org/react";
import { isMobile } from "react-device-detect";

interface BackgroundConfig {
    img: string;
    height?: string; // 比如 "60vh" 或 "100vh"
    gradient?: string; // 可选，比如 "linear-gradient(to bottom, rgba(0,0,0,0.5), #000)"
    maxWidth?: string;
    className?: string;
    needShadow?: boolean;
    style?: React.CSSProperties;
}

export const LandingBackground: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    const location = useLocation();
    const path = location.pathname;

    // 根据当前路由拿背景配置
    const backgroundConfig: BackgroundConfig | undefined =
        backgroundImageList?.[path as keyof typeof backgroundImageList];

    if (!backgroundConfig?.img) {
        return (
            <main className={cn("relative min-h-screen w-full z-10 mx-auto",
                ['/hardware', '/zk'].includes(path) ? "" : "max-w-[1440px] px-[3rem] ",
                isMobile ? "pb-6 px-3" : ['/hardware', '/zk'].includes(path) ? "pb-0" : "pb-12")}>
                {children}
            </main>
        );
    }

    const {
        img,
        height = "100vh",
        gradient = "",
        maxWidth = "",
        className = "",
        style = {},
        needShadow = false,
    } = backgroundConfig;

    // 组合背景
    const backgroundImage = gradient ? `${gradient}, url(${img})` : `url(${img})`;

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
                        ...style,
                    }}
                />

                {needShadow ? (
                    <div
                        className={cn(
                            "absolute w-full z-1 top-0 shadow-[#090A09_0_-50px_200px_100px_inset]",
                            className
                        )}
                    />
                ) : null}
            </div>

            {/* 主体内容层 */}
            <div className="relative w-full" style={{ minHeight: height }}>
                <main className={
                    cn("relative min-h-screen w-full z-10 mx-auto flex flex-col items-center justify-center",
                        ['/hardware', '/zk'].includes(path) ? "" : "max-w-[1440px] px-[3rem] ",
                        isMobile ? "pb-6 px-3" : ['/hardware', '/zk'].includes(path) ? "pb-0" : "pb-12"
                    )
                }>
                    {children}
                </main>
            </div>
        </>
    );
};

export default LandingBackground;
