import GradientBorderCard from "@/components/GradientBorderCard";
import { Calendar1Icon, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { cn, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";


const min = dayjs('2025-10-29');
interface DayItem {
    timestamp: number;
    format: string;
    formatWithMonth: string;
    isToday: boolean;
}

interface CheckInSectionProps {
    signInList: string[];
    ifActive: boolean;
}

function getRecentMonthDays(): DayItem[] {
    const firstDayOfMonth = dayjs().startOf("month");
    const lastDayOfMonth = dayjs().endOf("month");
    const today = dayjs();
    const days: DayItem[] = [];

    for (let i = firstDayOfMonth; i <= lastDayOfMonth; i = i.add(1, "day")) {
        days.push({
            timestamp: i.valueOf(),
            format: i.format("DD"),
            formatWithMonth: i.format("YYYY-MM-DD"),
            isToday: i.isSame(today, "day"),
        });
    }

    return days;
}

function getRecentWeekDays(): DayItem[] {
    const firstDayOfWeek = dayjs().startOf("week");
    const lastDayOfWeek = dayjs().endOf("week");
    const today = dayjs();
    const days: DayItem[] = [];

    for (let i = firstDayOfWeek; i <= lastDayOfWeek; i = i.add(1, "day")) {
        days.push({
            timestamp: i.valueOf(),
            format: i.format("DD"),
            formatWithMonth: i.format("YYYY-MM-DD"),
            isToday: i.isSame(today, "day"),
        });
    }

    return days;
}

function getNextMonthDays(): DayItem[] {
    const firstDayOfWeek = dayjs(Math.max(dayjs().subtract(7, 'day').valueOf(), min.valueOf())).startOf("day");
    const lastDayOfWeek = dayjs().add(1, "month").endOf("day");
    const today = dayjs();
    const days: DayItem[] = [];

    for (let i = firstDayOfWeek; i <= lastDayOfWeek; i = i.add(1, "day")) {
        days.push({
            timestamp: i.valueOf(),
            format: i.format("DD"),
            formatWithMonth: i.format("YYYY-MM-DD"),
            isToday: i.isSame(today, "day"),
        });
    }

    return days;
}

export const CheckInSection = ({ signInList, ifActive }: CheckInSectionProps) => {
    const [last7, setLast7] = useState<DayItem[]>([]);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        const res = getNextMonthDays();
        setLast7(res);
    }, []);

    // 滚动到今天的位置
    useEffect(() => {
        if (scrollContainer && last7.length > 0) {
            const todayIndex = last7.findIndex((item) => item.isToday);
            if (todayIndex !== -1) {
                const targetElement = scrollContainer.children[todayIndex] as HTMLElement;
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                    });
                }
            }
        }
    }, [scrollContainer, last7]);

    // 检查滚动位置，显示/隐藏箭头
    useEffect(() => {
        if (!scrollContainer) return;

        const updateArrows = () => {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        };

        updateArrows();
        scrollContainer.addEventListener("scroll", updateArrows);

        return () => {
            scrollContainer.removeEventListener("scroll", updateArrows);
        };
    }, [scrollContainer]);

    const activeList = signInList || [];

    // 滚动函数
    const scrollLeft = () => {
        if (scrollContainer) {
            scrollContainer.scrollBy({ left: -100, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainer) {
            scrollContainer.scrollBy({ left: 100, behavior: "smooth" });
        }
    };

    return (
        <GradientBorderCard borderRadius={8} className="w-full p-4">
            <>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-1 unbounded-18-200">
                        <Calendar1Icon className="stroke-[1px] size-6" />
                        <div className="flex flex-col ">
                            <Tooltip
                                delay={0}
                                disableAnimation
                                closeDelay={0}
                                content={
                                    <div className="py-2 flex flex-col gap-1 text-white/80">
                                        <span>✅ 1st check-in: "First Check-In" badge</span>
                                        <span>
                                            🔥 7 consecutive days: "7-Day Warrior" badge
                                        </span>
                                        <span>
                                            🏆 30 consecutive days: "30-Day Champion" badge
                                        </span>
                                        <span>
                                            👑 100 consecutive days: "100-Day Legend" badge
                                        </span>
                                    </div>
                                }
                            >
                                <p className="flex items-center gap-1">
                                    Daily Check-In <Info className="size-3" />{" "}
                                </p>
                            </Tooltip>

                            <span className="text-white/80 text-xs !normal-case">
                                Check in every day to maintain your streak
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-[8px] bg-white/10 border border-white/20">
                        <span className="text-white/60 text-xs uppercase tracking-wide">
                            Streak
                        </span>
                        <span className="unbounded-18-400 text-white">
                            {signInList?.length || 0}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <div className="text-left">Check-In Calendar</div>
                    <div className="relative w-full">
                        {/* 左侧渐变阴影遮罩 */}
                        {showLeftArrow && (
                            <div
                                className="absolute left-0 top-0 bottom-0 w-12 z-20 pointer-events-none"
                                style={{
                                    background:
                                        "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, transparent 100%)",
                                }}
                            />
                        )}

                        {/* 右侧渐变阴影遮罩 */}
                        {showRightArrow && (
                            <div
                                className="absolute right-0 top-0 bottom-0 w-12 z-20 pointer-events-none"
                                style={{
                                    background:
                                        "linear-gradient(to left, rgba(0, 0, 0, 1) 0%, transparent 100%)",
                                }}
                            />
                        )}

                        {/* 左侧箭头按钮 */}
                        {showLeftArrow && (
                            <button
                                onClick={scrollLeft}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-30  rounded-full p-1 transition-all"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="size-4 " />
                            </button>
                        )}

                        {/* 右侧箭头按钮 */}
                        {showRightArrow && (
                            <button
                                onClick={scrollRight}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-30  rounded-full p-1 transition-all"
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="size-4 " />
                            </button>
                        )}

                        {/* 滚动容器 */}
                        <div
                            ref={setScrollContainer}
                            className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {last7?.map((item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "min-w-[40px] relative opacity-30 text-black bg-white flex flex-col gap-1 pt-1 items-center justify-center rounded-[6px] text-center aspect-[1/1.1] shadow-md",
                                            activeList.includes(item?.formatWithMonth) &&
                                                "opacity-100 bg-white text-black shadow-lg",
                                            item.isToday && "ring-2 ring-blue-500"
                                        )}
                                    >
                                        <span>{item.format}</span>
                                        <span
                                            className={cn(
                                                !activeList.includes(item?.formatWithMonth) &&
                                                    "grayscale",
                                                ""
                                            )}
                                        >
                                            🔥
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        </GradientBorderCard>
    );
};

