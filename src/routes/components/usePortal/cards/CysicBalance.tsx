import GradientBorderCard from "@/components/GradientBorderCard";
import { mediasLink } from "@/config";
import useUser from "@/models/user";
import { handleConvertHistoryModal } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

const CysicBalance = () => {
  const { balance } = useUser();
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
            CYSIC BALANCE
          </div>
          <div className="flex items-center gap-6">
            <a
              // to="/zk/serviceHub"
              href={`${mediasLink.bridge}`}
              target="_blank"
              className="flex items-center text-sub text-sm hover:text-white"
            >
              BRIDGE <ArrowRight size={12} className="ml-1" />
            </a>
            <div
              onClick={handleConvertHistoryModal}
              className="flex items-center text-sub text-sm hover:text-white cursor-pointer"
            >
              HISTORY <ArrowRight size={12} className="ml-1" />
            </div>
          </div>
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

            <div className={cn("!text-3xl !font-light title", isMobile ? "text-left" : "text-right")}>{balance ? `${balance.amount} ${balance.symbol}` : "0 USDC"}</div>

          </div>
        </div>
      </div>
    </GradientBorderCard>
  )
}

export default CysicBalance;
