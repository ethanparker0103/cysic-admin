import Button from "@/components/Button";
import Copy from "@/components/Copy";
import GradientBorderCard from "@/components/GradientBorderCard";
import Modal from "@/components/Modal";
import useAccount from "@/hooks/useAccount";
import useModalState from "@/hooks/useModalState";
import useUser from "@/models/user";
import { getTierIcon, InviteTier } from "@/routes/pages/Zk/invite/page";
import { handleStakeModal } from "@/utils/tools";
import { cn, Tab, Tabs, Tooltip } from "@nextui-org/react";
import { useRequest } from "ahooks";
import axios from "axios";
import { ArrowRight, Check, CircleHelp } from "lucide-react";
import { useState } from "react";
import { isMobile } from "react-device-detect";

const stakeBoosts = [
    {
        name: "STAKE 100 CGT",
        reward: "10", // +10 Boosts
        status: 2, // 0: pending, 1: completed, 2: claimed
    },
    {
        name: "STAKE 200 CGT",
        reward: "20", // +20 Boosts
        status: 1, // 0: pending, 1: completed, 2: claimed
    },
    {
        name: "STAKE 300 CGT",
        reward: "30", // +30 Boosts
        status: 0, // 0: pending, 1: completed, 2: claimed
    },
];

const tasks = [
    {
        name: "Start Digital Harvester Trial",
        reward: "10", // +10 Boosts
        status: 0, // 0: pending, 1: completed, 2: claimed
    },
    {
        name: "Bond your Discord",
        reward: "10", // +10 Boosts
        status: 2, // 0: pending, 1: completed, 2: claimed
    },
    {
        name: "Tweet with cysic PhaseIII",
        reward: "10", // +10 Boosts
        status: 1, // 0: pending, 1: completed, 2: claimed
    },
];

const StatusButton = ({
    status,
    children,
}: {
    status: number;
    children: React.ReactNode;
}) => {
    if (status === 2) {
        return (
            <Button
                type="dark"
                disabled
                className="opacity-[1] disabled:[--tw-text-opacity:1] disabled:[--tw-bg-opacity:1] 
                        bg-[#FFFFFF12] border border-[#FFFFFF1A]
                        rounded-full text-sm flex items-center gap-1"
            >
                {children}
            </Button>
        );
    }
    if (status === 1) {
        return (
            <Button type="light" className="rounded-full text-sm">
                {children}
            </Button>
        );
    }
    return (
        <Button type="solid" className="!rounded-full text-sm">
            {children}
        </Button>
    );
};

const MultiplierModal = () => {
    const { inviteCode } = useAccount();
    const { visible, setVisible } = useModalState({
        eventName: "modal_multiplier_visible",
    });

    const handleClose = () => {
        setVisible(false);
    };

    const [tiers, setTiers] = useState<InviteTier[]>([]);

    // 获取邀请等级列表
    const { loading: tierLoading } = useRequest(
        () => axios.get('/api/v1/referral/levelList'),
        {
            onSuccess: (res) => {
                if (res?.data?.levelList) {
                    setTiers(res.data.levelList);
                }
            }
        }
    );



    return (
        <Modal
            title="MULTIPLIER"
            className="max-w-[33.75rem]"
            isOpen={visible}
            onClose={handleClose}
        >
            <div className="flex flex-col gap-8">
                <span className="text-base">
                    Multiplier can be applied to boost the rewards you earn through Cysic
                    ZK Prover/Verifier.
                </span>
                <GradientBorderCard className="py-4 px-6 flex flex-col gap-4">
                    <>
                        <div className="!text-xl title !font-light">
                            Advanced Boosting
                            <br /> in Progress
                        </div>
                        <div className="relative w-full h-2 bg-gray-500 rounded-full overflow-hidden">
                            <div className="absolute inset-0 left-0 w-3/4 h-full bg-gradient-to-r from-purple-500 via-blue-400 to-green-300 rounded-full"></div>
                        </div>
                        <span className="text-sub text-sm ml-auto">
                            Earn 30 more Boosts to become Ultra
                        </span>
                    </>
                </GradientBorderCard>
                <div className="flex flex-col gap-4">
                    <div className="uppercase text-[32px] !font-normal">
                        Level up your Boosting
                    </div>
                    <Tabs
                        classNames={{
                            panel: "!p-0",
                            tabList:
                                "w-full p-0 gap-0 rounded-md overflow-hidden border border-[#FFFFFF80]",
                            tab: 'py-6 [&:not(:last-child)]:border-r  [&:not(:last-child)]:border-r-[#FFFFFF80] !rounded-none px-0 [data-selected="true"]:text-black [data-selected="true"]:bg-white [data-selected="true"]:border-black bg-[#FFFFFF1A] text-[#FFFFFF80]',
                            cursor: "rounded-none",
                        }}
                        className="w-full"
                    >
                        <Tab key="stake" title="STAKE">
                            <div className="flex flex-col gap-4">
                                <div className="text-base">
                                    Staking more CCT unlocks additional Boosts and a higher
                                    Multiplier.
                                </div>
                                <Button
                                    type="light"
                                    className="py-4 flex items-center justify-center gap-2"
                                    onClick={handleStakeModal}
                                >
                                    <span>STAKE</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Button>
                                <div className="flex flex-col gap-2">
                                    {stakeBoosts.map((stakeBoost) => (
                                        <div
                                            key={stakeBoost.name}
                                            className="flex items-center justify-between gap-2 p-4 border border-[#FFFFFF80] rounded-md"
                                        >
                                            <div>{stakeBoost.name}</div>
                                            <StatusButton status={stakeBoost.status}>
                                                {stakeBoost.status === 2 ? (
                                                    <>
                                                        <Check className="w-3 h-3 text-green-500" />
                                                        <span>Claimed</span>
                                                    </>
                                                ) : stakeBoost.status === 1 ? (
                                                    <span>Claim {stakeBoost.reward} Boosts</span>
                                                ) : (
                                                    <span>+{stakeBoost.reward} Boosts</span>
                                                )}
                                            </StatusButton>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tab>
                        <Tab key="tasks" title="TASKS">
                            <div className="flex flex-col gap-4">
                                {tasks.map((task) => (
                                    <div
                                        key={task.name}
                                        className="flex items-center justify-between gap-2 p-4 border border-[#FFFFFF80] rounded-md"
                                    >
                                        <div>{task.name}</div>
                                        <StatusButton status={task.status}>
                                            {task.status === 2 ? (
                                                <>
                                                    <Check className="w-3 h-3 text-green-500" />
                                                    <span>Claimed</span>
                                                </>
                                            ) : task.status === 1 ? (
                                                <span>Claim {task.reward} Boosts</span>
                                            ) : (
                                                <span>+{task.reward} Boosts</span>
                                            )}
                                        </StatusButton>
                                    </div>
                                ))}
                            </div>
                        </Tab>
                        <Tab key="invites" title="INVITES">
                            <div className="flex flex-col gap-4">
                                <GradientBorderCard className="py-4 px-6 flex flex-col gap-4">
                                    <div className="flex flex-col gap-4">
                                        <h2 className="title !text-base uppercase !font-[300]">Invite Code</h2>
                                        {/* 推荐码显示 */}
                                        <div className="flex items-center justify-end">
                                            {/* <span className="title !text-2xl !font-[400]">{inviteCode}</span> */}
                                            <Copy value={inviteCode} className="title !text-[24px] !font-[300]">{inviteCode}</Copy>
                                        </div>
                                        <div className="flex items-center gap-2 justify-end">
                                            <span className="text-sm uppercase !font-[400]">Check my Invites</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </GradientBorderCard>


                                {tierLoading ? (
                                    <div className="text-center py-4">Loading level data...</div>
                                ) : (
                                    <div className={cn("grid grid-cols-5 overflow-x-scroll", isMobile ? "gap-[9rem]" : "gap-[11.25rem]")}>
                                        {tiers.sort((a, b) => a.level - b.level).map((tier, index) => (
                                            <div key={tier.id} className="relative h-full min-w-[9.5rem]">
                                                <GradientBorderCard
                                                    borderRadius={8}
                                                    borderWidth={1}
                                                    className="h-full"
                                                >
                                                    <div className="w-full p-4 flex flex-col items-center">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h3 className="!text-base !font-[300] title uppercase font-light tracking-wider">{tier.name}</h3>
                                                            <Tooltip
                                                                classNames={{
                                                                    content: '!p-0',
                                                                }}
                                                                content={<>
                                                                    <GradientBorderCard className="p-4 flex flex-col gap-1">
                                                                        <>
                                                                            <div className="w-full flex items-center justify-between text-sm">
                                                                                <div className="!text-sub w-20">Reward</div>
                                                                                <div>+{tier.reward.amount} {tier.reward.symbol}</div>
                                                                            </div>
                                                                            <div className="w-full flex items-center justify-between text-sm">
                                                                                <div className="!text-sub w-20">Pool Fee</div>
                                                                                <div>{tier.poolFee}</div>
                                                                            </div>
                                                                        </>
                                                                    </GradientBorderCard>
                                                                </>}
                                                            >
                                                                <div className="flex items-center"><CircleHelp width={12} height={12} /></div>
                                                            </Tooltip>
                                                        </div>

                                                        {/* 宝石图标 */}
                                                        <div className="relative h-24 w-full flex items-center justify-center">
                                                            <img src={getTierIcon(tier.name)} alt={tier.name} className="h-full object-contain" />
                                                        </div>

                                                        {/* 用户数量指示器 */}
                                                        <div className="mt-4 flex items-center flex-col gap-1">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M18 21C18 19.1362 17.2625 17.3487 15.9497 16.0485C14.637 14.7482 12.8326 14 11 14C9.16737 14 7.36302 14.7482 6.05025 16.0485C4.73748 17.3487 4 19.1362 4 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            {/* <span className="text-base title !font-[300]">{tier.needInviteCnt}</span> */}
                                                            <span className="!text-base title !font-[300]">
                                                                {(tiers[index - 1]?.needInviteCnt || 0)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </GradientBorderCard>

                                                {/* 连接线 - 除了最后一个项目外的所有项目都有 */}
                                                {index < tiers.length - 1 && (
                                                    <div className={
                                                        cn("absolute left-full top-1/2 h-px bg-white  -translate-y-1/2 z-[1]",

                                                            isMobile ? "w-[1.2rem] translate-x-[calc(calc(2rem-1.2rem)/2)] " : "w-[1rem] translate-x-[calc(calc(1rem)/2)]"

                                                        )
                                                    } />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </Modal>
    );
};

export default MultiplierModal;
