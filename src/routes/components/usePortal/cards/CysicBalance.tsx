import GradientBorderCard from "@/components/GradientBorderCard";
import { enableBridge, mediasLink } from "@/config";
import useAccount from "@/hooks/useAccount";
import { handleBridgeHistoryModal } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CysicBalance = () => {
  const { balance } = useAccount()

  return (
    <GradientBorderCard borderRadius={8} className="h-full">
      <div className="py-4 px-4 lg:px-6 w-full h-full">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4 gap-4 lg:gap-0">
          <div
            className={cn(
              "unbounded-16-300",
            )}
          >
            BALANCE
          </div>
          <div className="flex items-center gap-6">
            {enableBridge ? <Link
              to={'/bridge'}
              target="_blank"
              className="flex items-center text-sub text-sm hover:text-white"
            >
              BRIDGE <ArrowRight size={12} className="ml-1" />
            </Link> : null}
            <div
              onClick={handleBridgeHistoryModal}
              className="flex items-center text-sub text-sm hover:text-white cursor-pointer"
            >
              HISTORY <ArrowRight size={12} className="ml-1" />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex justify-between flex-col",
          )}
        >
          <div
            className={cn(
              "flex items-end justify-end gap-6 border-white"
            )}
          >

            <div className={cn("unbounded-24-300", "text-left lg:text-right" )}>{balance ? `${balance.amount} ${balance.symbol}` : "0 USDC"}</div>

          </div>
        </div>
      </div>
    </GradientBorderCard>
  )
}

export default CysicBalance;
