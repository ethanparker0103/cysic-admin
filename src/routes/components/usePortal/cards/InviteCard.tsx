import Copy from "@/components/Copy";
import GradientBorderCard from "@/components/GradientBorderCard";
import useAccount from "@/hooks/useAccount";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const InviteCard = () => {
    const { inviteCode, zkPart } = useAccount();

    return <GradientBorderCard borderRadius={8} className="flex-1 w-full h-full">
        <div className="w-full px-6 py-4 h-full flex justify-between">
            <div className="flex flex-col justify-between gap-4 w-full">
                <div className="flex items-center gap-2 justify-between">
                    <div className="text-sm unbounded font-light">INVITE CODE</div>
                    <Link to="/zk/invite" className="flex items-center gap-2 self-end">
                        <span className="text-sub text-sm teacher hover:text-white">invite details</span>
                        <ArrowRight size={12} />
                    </Link>

                </div>
                <div className="flex items-center gap-2 self-end">
                    <Copy value={inviteCode} className="text-2xl unbounded">
                        {inviteCode || '-'}
                    </Copy>
                </div>
            </div>
        </div>
    </GradientBorderCard>
}

const InviteCardWithStatus = () => {

    const { inviteCode, zkPart } = useAccount();
    return (
        <>
            <GradientBorderCard borderRadius={8} className="flex-1 w-full">
                <div className="w-full px-6 py-4 h-full flex justify-between">
                    <div className="flex flex-col justify-between gap-4 w-full">
                        <div className="uppercase !text-base unbounded font-light">INVITE CODE</div>
                        <div className="flex items-center gap-2 self-end">
                            <Copy value={inviteCode} className="text-2xl unbounded">
                                {inviteCode || '-'}
                            </Copy>
                        </div>
                    </div>
                </div>
            </GradientBorderCard>

            <GradientBorderCard borderRadius={8} className="flex-1 w-full">
                <div className="w-full px-6 py-4 h-full flex justify-between">
                    <div className="flex flex-col justify-between gap-4 w-full">
                        <div className="uppercase text-base unbounded !font-light">SUCCESSFUL INVITES</div>
                        <div className="unbounded text-2xl self-end">{zkPart?.successInviteCnt || '0'}</div>
                    </div>
                </div>
            </GradientBorderCard>


        </>
    )
}

export default InviteCardWithStatus;