import Copy from "@/components/Copy";
import GradientBorderCard from "@/components/GradientBorderCard";
import useAccount from "@/hooks/useAccount";
import { Divider } from "@nextui-org/react";

const InviteCard = () => {

    const { inviteCode, zkPart } = useAccount();
    return (
        <GradientBorderCard borderRadius={8} className="flex-[4] w-full">
            <div className="w-full px-6 py-4 h-full flex justify-between">
                <div className="flex flex-col justify-between gap-10 w-full">
                    <div className="uppercase !text-base title !font-light">INVITE<br />CODE</div>
                    <div className="flex items-center gap-2 self-end">
                        <Copy value={inviteCode} className="!text-2xl title !font-light">
                            {inviteCode || '-'}
                        </Copy>
                    </div>
                </div>


                <Divider className="mx-4 h-[auto]" orientation="vertical" />

                <div className="flex flex-col justify-between gap-10 w-full">
                    <div className="uppercase !text-base title !font-light">SUCCESSFUL<br />INVITES</div>
                    <div className="title !text-2xl !font-light self-end">{zkPart?.successInviteCnt || '0'}</div>
                </div>
            </div>
        </GradientBorderCard>

    )
}

export default InviteCard;