import GradientBorderCard from "@/components/GradientBorderCard";
import useUser from "@/models/user";
import { handleVoucherModal } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

const VoucherInfo = () => {
    const { 
        voucherCnt = 0 
    } = useUser();

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
                        VOCHER
                    </div>
                    <div className="flex items-center gap-6">
                        <div
                            onClick={handleVoucherModal}
                            className="flex items-center text-sub text-sm hover:text-white cursor-pointer"
                        >
                            VIEW ALL <ArrowRight size={12} className="ml-1" />
                        </div>
                        <Link
                            to="/socialTask"
                            className="flex items-center text-sub text-sm hover:text-white"
                        >
                            SOCIAL TASKS <ArrowRight size={12} className="ml-1" />
                        </Link>
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
                        <div className="title !text-3xl !font-light">
                            {voucherCnt}
                        </div>
                    </div>
                </div>
            </div>
        </GradientBorderCard>
    )
}

export default VoucherInfo;
