import GradientBorderCard from "@/components/GradientBorderCard";
import useCosmos from "@/models/_global/cosmos";
import { formatReward, handleConvertModal, handleStakeModal } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { Divider } from "@nextui-org/react";


const ZkBalanceCard = () => {
    const { balanceMap } = useCosmos();

  
    const cysReward = formatReward(balanceMap?.CYS?.hm_amount || "0", 2);
    const cgtReward = formatReward(balanceMap?.CGT?.hm_amount || "0", 2);

    return (
        <GradientBorderCard borderRadius={8} className="h-full">
                <div className="py-4 px-6 w-full h-full">
                  <div className="flex justify-between items-center mb-4">
                    <div
                      className={cn(
                        "text-base !font-light title",
                        isMobile ? "!text-base" : ""
                      )}
                    >
                      TOTAL REWARDS
                    </div>
                    <Link
                      to="/zk/serviceHub"
                      className="flex items-center text-sub text-sm hover:text-white"
                    >
                      DETAILS <ArrowRight size={12} className="ml-1" />
                    </Link>
                  </div>

                  <div
                    className={cn(
                      "flex justify-between",
                      isMobile ? "flex-col" : "flex-col"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-end justify-end gap-6 border-white py-2"
                      )}
                    >
                      <div className="title !text-3xl !font-light">
                        {cysReward} CYS
                      </div>
                      <Button
                        onClick={handleConvertModal}
                        type="light"
                        className={cn(
                          "min-w-fit self-end text-base py-2 px-3 rounded-md",
                          isMobile ? "w-full" : "w-[8.125rem]"
                        )}
                      >
                        CONVERT
                      </Button>
                    </div>

                    <Divider className="bg-[#FFF] my-6" />

                    <div className="flex items-end justify-end gap-6 py-2">
                      <div className="title !text-3xl !font-light">
                        {cgtReward} CGT
                      </div>
                      <Button
                        onClick={handleStakeModal}
                        type="light"
                        className={cn(
                          "min-w-fit self-end text-base py-2 px-3 rounded-md",
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
