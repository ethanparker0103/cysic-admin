import GradientBorderCard from "@/components/GradientBorderCard";
import useAccount from "@/hooks/useAccount";
import useStatic from "@/models/_global";
import { handleMultiplierModal } from "@/utils/tools";
import { cn, Tooltip } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";

export const MultiplierPercentBar = () => {
  const { zkPart } = useAccount();
  const multiplierPercent = zkPart?.multiplierFire || 0;
  return (
    <div className="relative group py-2">

      <div className="opacity-0 group-hover:opacity-100 absolute top-0 unbounded-14-300 px-2 py-1 bg-[#292929] rounded-md whitespace-nowrap"
        style={{
          left: `${multiplierPercent < 7 ? '6' : multiplierPercent > 92 ? '92' : multiplierPercent}%`,
          transform: `translate(-50%, -100%)`,
        }}
      >
        {multiplierPercent} FIRE
      </div>

      <div className="relative w-full h-2 bg-gray-500 rounded-full overflow-hidden">
        <div
          style={{ width: `${multiplierPercent}%` }}
          className="absolute inset-0 left-0 h-full bg-gradient-to-r from-purple-500 via-blue-400 to-green-300 rounded-full"
        ></div>
      </div>

    </div>

  );
};

export const Multiplier = ({
  actionPlacement = "bottom",
}: {
  actionPlacement?: "bottom" | "top";
}) => {
  const { multiplierLevelList } = useStatic();
  const { zkPart } = useAccount();
  const currentMultiplier = multiplierLevelList?.find(
    (item: { level: number | undefined }) =>
      item.level == zkPart?.multiplierLevel
  );

  return (
    <GradientBorderCard borderRadius={8} className="flex-[3] w-full h-full">
      <div className="flex flex-col justify-between">
        <div className="w-full px-4 lg:px-6 py-4 h-full flex flex-col justify-between gap-4 lg:gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="unbounded-16-300">
                MULTIPLIER
              </div>
              <Tooltip
                content={
                  <div className="max-w-[16rem] py-2">
                    A higher level Multiplier gives you a boost in rewards when
                    earning rewards through Verifier/Prover.
                  </div>
                }
              >
                <div className="text-sub text-xs">ⓘ</div>
              </Tooltip>
            </div>

            {actionPlacement === "top" && (
              <div
                className="flex items-center justify-end gap-1 cursor-pointer"
                onClick={handleMultiplierModal}
              >
                <span className="text-sm text-sub">SPEED UP</span>
                <ArrowRight size={12} />
              </div>
            )}
          </div>

          {/* 进度条 */}
          <MultiplierPercentBar />

          <div className="flex items-center justify-between">
            <div className="unbounded-14-300">
              🔥 {zkPart?.multiplierFire || 0} FIRE
            </div>
            <div
              className={cn("flex items-center gap-2","self-start lg:self-end")}
            >
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="unbounded-14-300">
                {currentMultiplier?.name || "-"}
              </span>
            </div>
          </div>
          {actionPlacement === "bottom" && (
            <div
              className="flex items-center justify-end gap-1 cursor-pointer"
              onClick={handleMultiplierModal}
            >
              <span className="text-sm text-sub">SPEED UP</span>
              <ArrowRight size={12} />
            </div>
          )}
        </div>
      </div>
    </GradientBorderCard>
  );
};
