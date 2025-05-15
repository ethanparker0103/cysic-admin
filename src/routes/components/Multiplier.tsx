import GradientBorderCard from "@/components/GradientBorderCard";
import useAccount from "@/hooks/useAccount";
import { handleMultiplierModal } from "@/utils/tools";
import { cn, Tooltip } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { isMobile } from "react-device-detect";

export const Multiplier = () => {
    const { zkPart } = useAccount()
    const multiplierPercent = zkPart?.multiplierPercent || 0
    return (
        <GradientBorderCard borderRadius={8} className="flex-[3] w-full">
            <div className="flex flex-col ">
            <div className="w-full px-6 py-4 h-full flex flex-col justify-between gap-6">
                <div className="flex items-center gap-1">
                    <div className="uppercase !text-base !font-light title">
                        MULTIPLIER
                    </div>
                    <Tooltip content={<div className="max-w-[16rem] py-2">A higher level Multiplier gives you a boost in rewards when earning rewards through Verifier/Prover.</div>}><div className="text-sub text-xs">ⓘ</div></Tooltip>
                </div>

                {/* 进度条 */}
                <div className="relative w-full h-2 bg-gray-500 rounded-full overflow-hidden">
                    <div 
                        style={{ width: `${multiplierPercent}%` }}
                        className="absolute inset-0 left-0 h-full bg-gradient-to-r from-purple-500 via-blue-400 to-green-300 rounded-full"
                    ></div>
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
            </div>
        </GradientBorderCard>
    );
};
