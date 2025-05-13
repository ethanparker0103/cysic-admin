import GradientBorderCard from "@/components/GradientBorderCard";
import { handleMultiplierModal } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { isMobile } from "react-device-detect";

export const Multiplier = () => {
    return (
        <GradientBorderCard borderRadius={8} className="flex-[3] w-full">
            <div className="w-full px-6 py-4 h-full flex flex-col justify-between gap-6">
                <div className="flex items-center gap-1">
                    <div className="uppercase !text-base !font-light title">
                        MULTIPLIER
                    </div>
                    <div className="text-sub text-xs">ⓘ</div>
                </div>

                {/* 进度条 */}
                <div className="relative w-full h-2 bg-gray-500 rounded-full overflow-hidden">
                    <div className="absolute inset-0 left-0 w-3/4 h-full bg-gradient-to-r from-purple-500 via-blue-400 to-green-300 rounded-full"></div>
                </div>

                {/* HIGH SPEED 指示器 */}
                <div
                    className={cn(
                        "flex items-center gap-2",
                        isMobile ? "self-start" : "self-end"
                    )}
                >
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span className="!text-sm title">HIGH SPEED</span>
                </div>
            </div>
            <div
                className="flex items-center justify-end gap-1 cursor-pointer px-6 pb-4"
                onClick={handleMultiplierModal}
            >
                <span className="text-sm text-sub text-sub">SPEED UP</span>
                <ArrowRight size={12} />
            </div>
        </GradientBorderCard>
    );
};
