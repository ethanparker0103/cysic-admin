import GradientBorderCard from "@/components/GradientBorderCard";
import useCosmos from "@/models/_global/cosmos";
import { formatReward, getImageUrl, handleConvertModal, handleRewardsDetailModal, handleStakeModal } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { Divider } from "@nextui-org/react";


const ZkBalanceCard = () => {
  const { balanceMap } = useCosmos();


  const cysReward = formatReward(balanceMap?.CYS?.hm_amount || "0", 4);
  const cgtReward = formatReward(balanceMap?.CGT?.hm_amount || "0", 4);

  return (
    <GradientBorderCard borderRadius={8} className="h-full">
      <div className=" w-full h-full">
        <div className="py-4 border-b">
          <div className="flex justify-between items-center px-6">
            <div
              className={cn(
                "text-xl !font-light title",
                isMobile ? "!text-base" : ""
              )}
            >
              TOTAL REWARDS
            </div>
            <div
              onClick={handleRewardsDetailModal}
              className="flex items-center text-sub text-sm hover:text-white cursor-pointer"
            >
              DETAILS <ArrowRight size={12} className="ml-1" />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex justify-between py-4 px-6",
            isMobile ? "flex-col" : "flex-col"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-6 border-white"
            )}
          >
            <div className="unbounded text-2xl flex items-center gap-2">
              <>{cysReward}</> <img src={getImageUrl('@/assets/images/tokens/CYS.svg')} className="w-6 h-6" /> <>CYS</>
            </div>
            <Button
              onClick={handleConvertModal}
              type="light"
              className={cn(
                "min-w-fit self-end text-base py-4 px-3 rounded-md",
                isMobile ? "w-full" : "w-[8.125rem]"
              )}
            >
              CONVERT
            </Button>
          </div>

          <Divider className="bg-[#FFF] my-6" />

          <div className="flex items-cetner justify-between gap-6">
            <div className="unbounded text-2xl flex items-center gap-2">
              <>{cgtReward}</> <img src={getImageUrl('@/assets/images/tokens/CGT.svg')} className="w-6 h-6" /> <>CGT</>
            </div>
            <Button
              onClick={handleStakeModal}
              type="light"
              className={cn(
                "min-w-fit self-end text-base py-4 px-3 rounded-md",
                isMobile ? "w-full" : "w-[8.125rem]"
              )}
            >
              STAKE
            </Button>
          </div>
        </div>
      </div>
    </GradientBorderCard>
  )
}

export default ZkBalanceCard;
