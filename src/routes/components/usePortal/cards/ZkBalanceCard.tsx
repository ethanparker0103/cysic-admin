import GradientBorderCard from "@/components/GradientBorderCard";
import useCosmos from "@/models/_global/cosmos";
import { formatReward, getImageUrl, handleConvertModal, handleRewardsDetailModal, handleStakeModal } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
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
          <div className="flex justify-between items-center px-4 lg:px-6">
            <div
              className={cn(
                "font-light unbounded",
                "text-base lg:text-xl"
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
            "flex justify-between py-4 px-4 flex-col lg:px-6",
          )}
        >
          <div
            className={cn(
              "flex items-start lg:items-center justify-between gap-4 lg:gap-6 border-white lg:flex-row flex-col"
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
                "w-full lg:w-[8.125rem]"
              )}
            >
              CONVERT
            </Button>
          </div>

          <Divider className="bg-[#FFF] my-6" />

          <div className="flex items-start lg:items-center justify-between gap-4 lg:gap-6 flex-col lg:flex-row">
            <div className="unbounded text-2xl flex items-center gap-2">
              <>{cgtReward}</> <img src={getImageUrl('@/assets/images/tokens/CGT.svg')} className="w-6 h-6" /> <>CGT</>
            </div>
            <Button
              onClick={handleStakeModal}
              type="light"
              className={cn(
                "min-w-fit self-end text-base py-4 px-3 rounded-md",
                "w-full lg:w-[8.125rem]"
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
