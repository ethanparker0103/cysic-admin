import Copy from "@/components/Copy";
import GradientBorderCard from "@/components/GradientBorderCard";
import useAccount from "@/hooks/useAccount";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const InviteCodeCard = () => {

    const { inviteCode } = useAccount();
    return (
        <GradientBorderCard borderRadius={8} className="flex-[4] w-full">
            <div className="w-full px-6 py-4 h-full flex justify-between">
                <div className="flex flex-col justify-between gap-8 w-full">
                    <div className="unbounded-16-300">INVITE CODE</div>
                    <div className="flex items-center gap-2 self-end">
                        <Copy value={inviteCode} className="unbounded-24-300">
                            {inviteCode || '-'}
                        </Copy>
                    </div>
                    <Link to="/zk/invite" className="flex items-center gap-2 self-end">
                        <span className="text-sub text-sm hover:text-white">invite details</span>
                        <ArrowRight size={12} />
                    </Link>
                </div>
            </div>
        </GradientBorderCard>

    )
}

export default InviteCodeCard;