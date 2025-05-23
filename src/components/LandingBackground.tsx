import { backgroundImageList } from "@/router";
import { Link, useLocation } from "react-router-dom";
import React, { useMemo } from "react";
import { cn } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { NO_CONTAINER_PATHS } from "@/config";

interface BackgroundConfig {
    img: string;
    height?: string;
    gradient?: string;
    maxWidth?: string;
    className?: string;
    needShadow?: boolean;
    needBack?: boolean;
    backTo?: string;
    backContent?: string;
    style?: React.CSSProperties;
    mainClassName?: string;
}

export const LandingBackground: React.FC<{ children?: React.ReactNode }> =
    React.memo(({ children }) => {
        const location = useLocation();
        const path = location.pathname;

        // 使用useMemo缓存背景配置
        const backgroundConfig = useMemo<BackgroundConfig | undefined>(() => {
            // 直接检查是否有完全匹配的路径
            const config =
                backgroundImageList[path as keyof typeof backgroundImageList];
            if (config) {
                return config;
            }

            // 如果路径中没有找到匹配项，检查是否有适用的动态路由
            // 只在没有直接匹配时处理动态路由逻辑
            for (const key in backgroundImageList) {
                // 只处理包含':' 的动态路由键
                if (key.includes(":")) {
                    // 将路由模式转换为正则表达式
                    const pattern = key.replace(/:[^/]+/g, "[^/]+");
                    const regex = new RegExp(`^${pattern}$`);

                    // 检查当前路径是否匹配此模式
                    if (regex.test(path)) {
                        return backgroundImageList[key as keyof typeof backgroundImageList];
                    }
                }
            }

            return undefined;
        }, [path]);

        const needBack = backgroundConfig?.needBack ?? false;

        const backPath = useMemo(() => {
            if (needBack) {
                return (
                    backgroundConfig?.backTo ?? path.split("/").slice(0, -1).join("/")
                );
            }
            return path;
        }, [needBack, path, backgroundConfig?.backTo]);

        const noContainer = path == "/" || NO_CONTAINER_PATHS.includes(path);

        if (!backgroundConfig?.img) {
            return (
                <main
                    className={cn(
                        "relative min-h-screen w-full z-10 mx-auto",
                        noContainer ? "!pb-0" : "main-container lg:pb-12",
                        "pb-6 px-3"
                    )}
                >
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
            mainClassName = "",
        } = backgroundConfig;

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
                    <main
                        className={cn(
                            "relative min-h-screen w-full z-10 mx-auto flex flex-col items-center justify-start pt-[8rem]",
                            noContainer ? "!pb-0" : "main-container lg:pb-12",
                            "pb-6",
                            mainClassName
                        )}
                    >
                        <>
                            {needBack ? (
                                <div className={cn("relative w-full", noContainer ? "main-container" : "")}>
                                    <Link
                                        to={backPath}
                                        className="z-[11] flex items-center gap-2 !text-base font-light unbounded"
                                    >
                                        <ArrowLeft className="size-5" />
                                        <span>{backgroundConfig?.backContent ?? "Back"}</span>
                                    </Link>
                                </div>
                            ) : null}
                            {children}
                        </>
                    </main>
                </div>
            </>
        );
    });

export default LandingBackground;
