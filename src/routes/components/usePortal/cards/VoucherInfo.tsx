import GradientBorderCard from "@/components/GradientBorderCard";
import { enableSocialTask } from "@/config";
import useAccount from "@/hooks/useAccount";
import { handleVoucherModal } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const VoucherInfo = () => {
    const {
        voucherCnt = 0
    } = useAccount();

    return (
        <GradientBorderCard borderRadius={8} className="h-full">
            <div className="py-4 px-4 lg:px-6 w-full h-full">
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4 gap-4 lg:gap-0">
                    <div
                        className={cn("text-base font-light unbounded")}
                    >
                        VOCHER
                    </div>
                    <div className="flex items-center gap-6">
                        <div
                            onClick={handleVoucherModal}
                            className="flex items-center text-sub text-sm hover:text-white cursor-pointer"
                        >
                            VIEW ALL <ArrowRight size={12} className="ml-1" />
                        </div>
                        {enableSocialTask ? <Link
                            to="/socialTask"
                            className="flex items-center text-sub text-sm hover:text-white"
                        >
                            SOCIAL TASKS <ArrowRight size={12} className="ml-1" />
                        </Link> : null}
                    </div>
                </div>

                <div
                    className={cn(
                        "flex justify-between flex-col"
                    )}
                >
                    <div
                        className={cn(
                            "flex items-end justify-end gap-6 border-white"
                        )}
                    >
                        <div className="unbounded text-2xl font-light">
                            {voucherCnt}
                        </div>
                    </div>
                </div>
            </div>
        </GradientBorderCard>
    )
}

export default VoucherInfo;
