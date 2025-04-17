// @ts-nocheck
import Button from "@/components/Button";
import { getImageUrl, handleSignIn, shortStr } from "@/utils/tools";
import { ArrowRight } from "lucide-react";
import Copy from "@/components/Copy";
import useUser from "@/models/user";
import { useState } from "react";
import GradientBorderCard from "@/components/gradientBorderCard";
import { History } from 'lucide-react';
import CysicTable, { CysicTableColumn } from "@/components/Table";
import Tooltip from "@/components/Tooltip";
import axios from "@/service";
import { useRequest } from "ahooks";

// 邀请等级数据
const inviteTiers = [
    { name: "BRONZE", icon: getImageUrl("@/assets/images/invite/bronze.png"), count: 0 },
    { name: "SILVER", icon: getImageUrl("@/assets/images/invite/silver.png"), count: 10 },
    { name: "GOLD", icon: getImageUrl("@/assets/images/invite/gold.png"), count: 20 },
    { name: "PLATINUM", icon: getImageUrl("@/assets/images/invite/platinum.png"), count: 30 },
    { name: "DIAMOND", icon: getImageUrl("@/assets/images/invite/diamond.png"), count: 40 }
];

const InvitePage = () => {
    const { registeredInviteCode } = useUser();
    const [memberData, setMemberData] = useState([]);
    const [leaderData, setLeaderData] = useState(null);
    const [rewards, setRewards] = useState({
        cys: "0",
        CGT: "0"
    });

    // 获取邀请概览信息
    const { data: overviewData } = useRequest(
        () => axios.get('/api/v1/referral/overview'),
        {
            onSuccess: (res) => {
                if (res?.data) {
                    // 设置邀请奖励数据
                    const cysReward = res.data.referralEaringList.find((item: {symbol: string}) => item.symbol === "CYS")?.amount || "0";
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
            onSuccess: (res) => {
                if (res?.data) {
                    setLeaderData(res.data.leaderInfo);
                    setMemberData(res.data.teamList);
                }
            }
        }
    );

    // 团队领导表格列定义
    const leaderColumns: CysicTableColumn<any>[] = [
        {
            key: "address",
            label: "Address",
            width: "33%",
            renderCell: (leader) => (
                <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-white mr-2 flex-shrink-0"></div>
                    <span>{leader.address}</span>
                </div>
            )
        },
        {
            key: "status",
            label: "Status",
            width: "33%",
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
            width: "33%",
            renderCell: (leader) => (
                <div className="">{leader.joinAt}</div>
            )
        }
    ];

    // 团队成员表格列定义
    const memberColumns: CysicTableColumn<any>[] = [
        {
            key: "address",
            label: "Address",
            width: "25%",
            renderCell: (member) => (
                <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-white mr-2 flex-shrink-0"></div>
                    <span>{member.address}</span>
                </div>
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
            label: "Referral",
            width: "35%",
            renderCell: (member) => (
                <div className="text-left">
                    {member.referralRewardList.map((reward: {amount: string, symbol: string}, index: number) => (
                        <span key={index} className="text-sm">
                            {index > 0 && " | "}
                            {reward.amount} {reward.symbol}
                        </span>
                    ))}
                </div>
            )
        },
        {
            key: "time",
            label: "Time",
            width: "25%",
            renderCell: (member) => (
                <div className="text-left">{member.joinAt}</div>
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

    return (
        <div className="min-h-screen w-full pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={getImageUrl('@/assets/images/_global/invite_landing_bg.png')}
                    alt="Background"
                    className="absolute top-1/2 left-1/2 w-full h-full object-cover"
                    style={{
                        filter: 'grayscale(0%)',
                        transform: 'translate(-50%, -50%) scale(1)',
                        transformOrigin: 'center 0%',
                        objectPosition: '50% 50%'
                    }}
                />
            </div>

            {/* 顶部标题部分 */}
            <div className="pt-12 flex flex-col items-center gap-6 relative z-[2]">
                <div className="flex flex-col items-center">
                    <span className="title text-[2.25rem] !text-[#fff] text-center">INVITE</span>
                    <div className="flex items-center gap-4 mt-4 cursor-pointer">
                        <div className="title text-base font-[300]">HOW INVITE WORK</div>
                        <ArrowRight width={16} height={16} />
                    </div>
                </div>
            </div>

            {/* 主要内容部分 */}
            <div className="mx-auto px-[3rem] mt-12 relative z-[2]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 左侧 - 总邀请奖励 */}
                    <GradientBorderCard
                        className="col-span-2"
                        borderRadius={8}
                    >
                        <div className="w-full py-4">
                            <h2 className="title text-xl !font-[300] uppercase mb-4 px-6">TOTAL INVITE REWARDS</h2>
                            <div className="border-b border-white my-4 "></div>


                            {/* 推荐收益 */}
                            <div className="flex justify-between items-start px-6">
                                <span className="!font-[300] uppercase text-base title">REFERRAL EARNINGS</span>
                                <div className="flex flex-col items-center gap-4">
                                    <span className="text-2xl text-right title !font-[400]">{rewards.cys} CYS</span>
                                    <div className="bg-white h-px w-8 self-end" />
                                    <span className="text-2xl text-right title !font-[400]">{rewards.cys} CGT</span>
                                </div>
                            </div>

                            <div className="border-b border-white my-4 px-6"></div>

                            {/* 升级收益 */}
                            <div className="flex justify-between items-center px-6">
                                <span className="!font-[300] uppercase text-base title">UPGRADE EARNINGS</span>
                                <span className="text-2xl text-right title !font-[400]">{rewards.CGT} CGT</span>
                            </div>
                        </div>
                    </GradientBorderCard>

                    {/* 右侧 - 您的推荐码 */}
                    <GradientBorderCard
                        borderRadius={8}
                    >
                        <div className="w-full px-6 py-4">
                            <div className="flex justify-between items-start">
                                <h2 className="title text-xl uppercase !font-[300]">YOUR<br />REFERRAL<br />CODE</h2>
                                {/* 推荐码显示 */}
                                <div className="flex items-center self-start">
                                    <span className="title text-2xl !font-[400]">{inviteCode}</span>
                                    <Copy value={inviteCode}>
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
                        <div className="flex justify-between items-center">
                            <div >
                                <h2 className="title !font-[300] text-xl uppercase mb-2">SUCCESSFUL INVITES</h2>
                                <p className="text-base !font-[400]">
                                    Successful Invites could also speed up your Multiplier for Earnings from Verifier/Prover.
                                </p>
                            </div>

                            <div className="flex self-start">
                                <Button
                                    type="solid"
                                    className="text-base !font-[400] !p-6"
                                >
                                    <div className="flex items-center gap-2">
                                        CLICK HERE TO CHECK YOUR MULTIPLIER
                                    </div>
                                </Button>
                            </div>
                        </div>

                        {/* 邀请等级 */}
                        <div className="grid grid-cols-5 gap-4">
                            {inviteTiers.map((tier, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <img src={tier.icon} alt={tier.name} className="w-16 h-16 mb-2" />
                                    <div className="text-center">
                                        <div className="text-sm">{tier.name}</div>
                                        <div className={`text-center ${index === 0 ? "text-green" : "text-white"}`}>{tier.count}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 团队领导表格 */}
                        {leaderData && (
                            <div className="mt-4">
                                <h2 className="title !font-[300] text-base uppercase mb-4">TEAM LEADER</h2>
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
                                <h2 className="title !font-[300] text-base uppercase mb-4">TEAM MEMBERS</h2>
                                <CysicTable
                                    data={memberData}
                                    columns={memberColumns}
                                    keyExtractor={(member) => member.address}
                                />
                            </div>
                        )}

                        {teamLoading && (
                            <div className="text-center py-4">加载团队数据中...</div>
                        )}

                        {!teamLoading && memberData.length === 0 && (
                            <div className="text-center py-4 text-gray-400">暂无团队成员</div>
                        )}
                    </div>
                </GradientBorderCard>
            </div>
        </div>
    );
};

export default InvitePage;