import Button from "@/components/Button";
import { getImageUrl, shortStr, handleHowInviteWorkModal, handleMultiplierModal } from "@/utils/tools";
import { ArrowRight, CircleHelp } from "lucide-react";
import Copy from "@/components/Copy";
import { useState } from "react";
import GradientBorderCard from "@/components/GradientBorderCard";

import CysicTable, { CysicTableColumn } from "@/components/Table";
import Tooltip from "@/components/Tooltip";
import axios from "@/service";
import { useRequest } from "ahooks";
import useAccount from "@/hooks/useAccount";
import { isMobile } from "react-device-detect";
import { cn } from "@nextui-org/react";
import useStatic from "@/models/_global";
import { TableAvatar, TaskReward } from "@/routes/pages/Zk/dashboard/components/tableComponents";

// 团队成员类型
interface TeamMember {
    avatar: string;
    address: string;
    status: number;
    joinAt: string;
    referralRewardList: Array<{
        amount: string;
        symbol: string;
    }>;
}

// 团队领导类型
interface TeamLeader {
    avatar: string;
    address: string;
    status: number;
    joinAt: string;
    referralRewardList: Array<{
        amount: string;
        symbol: string;
    }>;
}

export const getTierIcon = (tierName: string) => {
    if (!tierName) return '';
    const lowerName = tierName?.toLowerCase();
    return getImageUrl(`@/assets/images/invite/${lowerName}.png`);
};

const InvitePage = () => {
    const { referralLevelList: tiers } = useStatic()
    const { isRegistered, walletAddress, inviteCode: registeredInviteCode } = useAccount()
    const [memberData, setMemberData] = useState<TeamMember[]>([]);
    const [leaderData, setLeaderData] = useState<TeamLeader | null>(null);
    const [rewards, setRewards] = useState({
        cys: "0",
        CGT: "0"
    });

    // 获取邀请概览信息
    const { data: overviewData } = useRequest(
        () => axios.get('/api/v1/referral/overview'),
        {
            ready: !!isRegistered && !!walletAddress,
            refreshDeps: [isRegistered, walletAddress],
            onSuccess: (res) => {
                if (res?.data) {
                    // 设置邀请奖励数据
                    const cysReward = res.data.referralEaringList.find((item: { symbol: string }) => item.symbol === "CYS")?.amount || "0";
                    setRewards({
                        cys: cysReward,
                        CGT: res.data.upgradeEaring.amount
                    });
                }
            }
        }
    );

    // 获取团队列表
    const { loading: teamLoading } = useRequest(
        () => axios.get('/api/v1/referral/teamList'),
        {
            ready: !!isRegistered && !!walletAddress,
            refreshDeps: [isRegistered, walletAddress],
            onSuccess: (res) => {
                if (res?.data) {
                    setLeaderData(res.data.leaderInfo);
                    setMemberData(res.data.teamList);
                }
            }
        }
    );

    // 团队领导表格列定义
    const leaderColumns: CysicTableColumn<TeamLeader>[] = [
        {
            key: "address",
            label: "Address",
            width: "25%",
            renderCell: (leader) => (
                <TableAvatar avatar={leader.avatar} name={leader.address} />
            )
        },
        {
            key: "status",
            label: "Status",
            width: "35%",
            renderCell: (leader) => (
                <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${leader.status === 1 ? "bg-green-500" : "bg-red-500"} mr-2 flex-shrink-0`}></div>
                    <span>{leader.status === 1 ? "Activated" : "Not Activated"}</span>
                </div>
            )
        },
        {
            key: "time",
            label: "Time",
            width: "40%",
            renderCell: (leader) => (
                <div className="">{leader.joinAt}</div>
            )
        }
    ];

    // 团队成员表格列定义
    const memberColumns: CysicTableColumn<TeamMember>[] = [
        {
            key: "address",
            label: "Address",
            width: "25%",
            renderCell: (member) => (
                <TableAvatar avatar={member.avatar} name={member.address} />
            )
        },
        {
            key: "status",
            label: "Status",
            width: "15%",
            renderCell: (member) => (
                <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${member.status === 1 ? "bg-green-500" : "bg-red-500"} mr-2 flex-shrink-0`}></div>
                    <span>{member.status === 1 ? "Activated" : "Not Activated"}</span>
                </div>
            )
        },
        {
            key: "referral",
            label: "Referral Rewards",
            width: "35%",
            renderCell: (member) => (
                <div className="text-left flex gap-2">
                    {member?.referralRewardList?.map((reward: { amount: string, symbol: string }, index: number) => (
                        <TaskReward key={index} rewardCYS={reward.symbol === "CYS" ? reward.amount : undefined} rewardCGT={reward.symbol === "CGT" ? reward.amount : undefined} />
                    ))}
                </div>
            )
        },
        {
            key: "time",
            label: "Time",
            width: "25%",
            renderCell: (member) => (
                <div className="text-right">{member.joinAt}</div>
            )
        }
    ];

    // 分享到Twitter
    const shareToTwitter = () => {
        if (!overviewData?.data?.inviteCode && !registeredInviteCode) return;

        const inviteCode = overviewData?.data?.inviteCode || registeredInviteCode;
        const text = `Join me on Cysic using my invite code: ${inviteCode}`;
        const url = `https://cysic.io/invite?code=${inviteCode}`;

        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const inviteCode = overviewData?.data?.inviteCode || registeredInviteCode || "-----";

    // 获取当前用户等级
    const getCurrentLevelId = () => {
        return overviewData?.data?.currentLevelID || 1;
    };


    return (
        <>


            {/* 顶部标题部分 */}
            <div className="pt-12 flex flex-col items-center gap-6 relative z-[2]">
                <div className="flex flex-col items-center">
                    <span className="title !text-[2.25rem] !text-[#fff] text-center">INVITE</span>
                    <div className="flex items-center gap-4 mt-4 cursor-pointer" onClick={handleHowInviteWorkModal}>
                        <div className="title !text-base font-light">HOW INVITE WORK</div>
                        <ArrowRight width={16} height={16} />
                    </div>
                </div>
            </div>

            {/* 主要内容部分 */}
            <div className="mx-auto w-full mt-12 relative z-[2]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 左侧 - 总邀请奖励 */}
                    <GradientBorderCard
                        className={isMobile ? "" : "col-span-2"}
                        borderRadius={8}
                    >
                        <div className="w-full py-4">
                            <h2 className="title !text-xl !font-light uppercase mb-4 px-6">TOTAL INVITE REWARDS</h2>
                            <div className="border-b border-white my-4 "></div>


                            {/* 推荐收益 */}
                            <div className="flex justify-between items-start px-6">
                                <span className="!font-light uppercase !text-base title">REFERRAL EARNINGS</span>
                                <div className="flex flex-col items-center gap-4">
                                    <span className="!text-2xl text-right title !font-[400]">{rewards.cys} CYS</span>
                                    <div className="bg-white h-px w-8 self-end" />
                                    <span className="!text-2xl text-right title !font-[400]">{rewards.cys} CGT</span>
                                </div>
                            </div>

                            <div className="border-b border-white my-4 px-6"></div>

                            {/* 升级收益 */}
                            <div className="flex justify-between items-center px-6">
                                <span className="!font-light uppercase !text-base title">UPGRADE EARNINGS</span>
                                <span className="!text-2xl text-right title !font-[400]">{rewards.CGT} CGT</span>
                            </div>
                        </div>
                    </GradientBorderCard>

                    {/* 右侧 - 您的推荐码 */}
                    <GradientBorderCard
                        borderRadius={8}
                    >
                        <div className="w-full px-6 py-4">
                            <div className="flex justify-between items-start">
                                <h2 className="title !text-xl uppercase !font-light">YOUR<br />REFERRAL<br />CODE</h2>
                                {/* 推荐码显示 */}
                                <div className="flex items-center self-start">
                                    <Copy value={inviteCode}>
                                        <span className="title !text-2xl !font-[400]">{inviteCode}</span>
                                    </Copy>
                                </div>
                            </div>

                            <p className="text-base !font-[400] text-gray-300 mb-4 mt-4">
                                Invite your friends and earn <span className="text-[#19FFE0]">15%</span> of the Verifier/Prover Rewards your friends make.
                            </p>

                            <Button
                                type="solid"
                                className="w-full py-6 bg-black border border-gray-600 rounded-lg text-white hover:bg-gray-900 transition-colors"
                                onClick={shareToTwitter}
                            >
                                <div className="text-base !font-[400] flex items-center justify-between gap-2">
                                    TWEET TO INVITE FRIENDS
                                    <ArrowRight size={16} />
                                </div>
                            </Button>
                        </div>
                    </GradientBorderCard>
                </div>

                {/* 成功邀请部分 */}
                <GradientBorderCard
                    className="mt-8"
                    borderRadius={8}
                >
                    <div className="w-full px-6 py-4 flex flex-col gap-6">
                        <div className={cn("flex justify-between items-center", isMobile ? "flex-col gap-4" : "")}>
                            <div >
                                <h2 className="title !font-light !text-xl uppercase mb-2">INVITE LEVEL</h2>
                                <div className="text-base !font-[400] flex items-center">
                                    Successful Invites <Tooltip content={<div className="max-w-[16rem] py-2">A user must complete all Basic Tasks in the Social Tasks to count as a Successful Invite.</div>}><div className="text-sub text-xs">&nbsp;ⓘ&nbsp;</div></Tooltip> could also speed up your Multiplier for Earnings from Verifier/Prover.
                                </div>
                            </div>

                            <div className="flex self-start">
                                <Button
                                    type="solid"
                                    className="text-base !font-[400] !p-6"
                                    onClick={handleMultiplierModal}
                                >
                                    <div className="flex items-center gap-2">
                                        CLICK HERE TO CHECK YOUR MULTIPLIER
                                    </div>
                                </Button>
                            </div>
                        </div>

                        {/* 邀请等级 */}
                        <div 
                        style={{
                            gap: isMobile?'9rem':`calc(calc(100% - 10rem * ${tiers.length}) / ${tiers.length})`
                        }}
                        className={cn("grid grid-cols-5 overflow-x-scroll")}>
                            {tiers.sort((a, b) => a.level - b.level).map((tier, index) => (
                                <div key={tier.id} className="relative h-full min-w-[10rem]">
                                    <GradientBorderCard
                                        borderRadius={8}
                                        borderWidth={1}
                                        className="h-full"
                                    >
                                        <div className="w-full p-4 flex flex-col items-center">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="!text-base !font-light title uppercase font-light tracking-wider">{tier.name}</h3>
                                                <Tooltip
                                                    classNames={{
                                                        content: '!p-0',
                                                    }}
                                                    content={<>
                                                        <GradientBorderCard className="p-4 flex flex-col gap-1 w-[12.5rem]">
                                                            <>
                                                                {/* <div className="w-full flex items-center justify-between text-sm teacher !normal-case">
                                                                    <div className="!text-sub w-20">Reward</div>
                                                                    <div>+{tier.reward.amount} {tier.reward.symbol}</div>
                                                                </div> */}
                                                                <div className="w-full flex items-center justify-between text-sm teacher !normal-case">
                                                                    <div className="!text-sub w-20">Rebate Rate</div>
                                                                    <div>+{tier.rebateRate} %</div>
                                                                </div>
                                                                <div className="w-full flex items-center justify-between text-sm teacher !normal-case">
                                                                    <div className="!text-sub w-20">Multiplier</div>
                                                                    <div>+{tier.multiplier} 🔥FIRE</div>
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
                                                {/* <span className="text-base title !font-light">{tier.needInviteCnt}</span> */}
                                                <span className="!text-base title !font-light">
                                                    {(tiers[index - 1]?.needInviteCnt || 0)}
                                                </span>
                                            </div>
                                        </div>
                                    </GradientBorderCard>

                                    {/* 连接线 - 除了最后一个项目外的所有项目都有 */}
                                    {index < tiers.length - 1 && (
                                        <div
                                            style={{
                                                width: isMobile ? "1.2rem" : `calc(calc(100% / ${tiers.length - 1})`
                                            }}
                                        className={
                                            cn("absolute left-full top-1/2 h-px bg-white  -translate-y-1/2 z-[1]",
                                                // (100% - 10rem*tiers.length )/tiers.length
                                                isMobile ? " translate-x-[calc(calc(2rem-1.2rem)/2)] " : `translate-x-1/2`

                                            )
                                        } />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* 团队领导表格 */}
                        {leaderData && (
                            <div className="mt-4">
                                <h2 className="title !font-light !text-base uppercase mb-4">TEAM LEADER</h2>
                                <CysicTable
                                    data={[leaderData]}
                                    columns={leaderColumns}
                                    keyExtractor={() => "leader"}
                                />
                            </div>
                        )}

                        {/* 团队列表表格 */}
                        {memberData.length > 0 && (
                            <div className="mt-4">
                                <h2 className="title !font-light !text-base uppercase mb-4">TEAM MEMBERS</h2>
                                <CysicTable
                                    data={memberData}
                                    columns={memberColumns}
                                    keyExtractor={(member) => member.address}
                                />
                            </div>
                        )}

                        {teamLoading && (
                            <div className="text-center py-4">Loading team data...</div>
                        )}

                        {!teamLoading && memberData.length === 0 && (
                            <div className="text-center py-4 text-gray-400">No team members</div>
                        )}
                    </div>
                </GradientBorderCard>
            </div>
        </>
    );
};

export default InvitePage;