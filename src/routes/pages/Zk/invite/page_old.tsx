import Button from "@/components/Button";
import { getImageUrl, handleSignIn, shortStr } from "@/utils/tools";
import { ArrowRight, CircleHelp } from "lucide-react";
import Copy from "@/components/Copy";
import useUser from "@/models/user";
import { useEffect, useState } from "react";
import GradientBorderCard from "@/components/gradientBorderCard";
import { History } from 'lucide-react';
import CysicTable, { CysicTableColumn } from "@/components/Table";
import Tooltip from "@/components/Tooltip";


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
        cys: "123.45",
        CGT: "900.90"
    });

    // 在实际应用中，这里会从API获取数据
    useEffect(() => {
        // 模拟获取团队成员数据
        setMemberData([
            { id: 1, address: "0x123...1234S", status: "Activated", referral: { CGT: "100.12", cys: "200.46" }, time: "2024-06-26 16:12:44" },
            { id: 2, address: "0x22A5...CDE2f", status: "Not Activated", referral: { CGT: "100.12", cys: "200.46" }, time: "2024-06-26 16:12:44" },
            { id: 3, address: "0x123...1234S", status: "Activated", referral: { CGT: "100.12", cys: "200.46" }, time: "2024-06-26 16:12:44" },
            { id: 4, address: "0x123...1234S", status: "Activated", referral: { CGT: "100.12", cys: "200.46" }, time: "2024-06-26 16:12:44" },
            { id: 5, address: "0x123...1234S", status: "Activated", referral: { CGT: "100.12", cys: "200.46" }, time: "2024-06-26 16:12:44" },
        ]);

        // 模拟获取团队领导数据
        setLeaderData({
            id: 1,
            address: "0x123...1234S",
            status: "Activated",
            time: "2024-06-26 16:12:44"
        });
    }, []);

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
                    <div className={`h-3 w-3 rounded-full ${leader.status === "Activated" ? "bg-green-500" : "bg-red-500"} mr-2 flex-shrink-0`}></div>
                    <span>{leader.status}</span>
                </div>
            )
        },
        {
            key: "time",
            label: "Time",
            width: "33%",
            renderCell: (leader) => (
                <div className="">{leader.time}</div>
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
                    <div className={`h-3 w-3 rounded-full ${member.status === "Activated" ? "bg-green-500" : "bg-red-500"} mr-2 flex-shrink-0`}></div>
                    <span>{member.status}</span>
                </div>
            )
        },
        {
            key: "referral",
            label: "Referral",
            width: "35%",
            renderCell: (member) => (
                <div className="text-left">
                    <span className="text-sm">{member.referral.CGT} CGT | {member.referral.cys} CYS</span>
                </div>
            )
        },
        {
            key: "time",
            label: "Time",
            width: "25%",
            renderCell: (member) => (
                <div className="text-left">{member.time}</div>
            )
        }
    ];

    // 分享到Twitter
    const shareToTwitter = () => {
        if (!registeredInviteCode) return;

        const text = `Join me on Cysic using my invite code: ${registeredInviteCode}`;
        const url = `https://cysic.io/invite?code=${registeredInviteCode}`;

        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

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
                                    <span className="title text-2xl !font-[400]">WZX2L3</span>
                                    <Copy value={"WZX2L3"}>
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
                                    <span>CLICK HERE TO CHECK YOUR MULTIPLIER</span>
                                    <ArrowRight size={16} className="ml-2 inline" />
                                </Button>
                            </div>

                        </div>


                        {/* 等级显示 */}
                        <div className="grid grid-cols-5 gap-[10.25rem]">
                            {inviteTiers.map((tier, index) => {
                                return (
                                    <div key={index} className="relative">
                                        <GradientBorderCard
                                            key={index}
                                            borderRadius={8}
                                            borderWidth={1}
                                            className="h-full"
                                        >
                                            <div className="w-full p-4 flex flex-col items-center">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-base !font-[300] title uppercase font-light tracking-wider">{tier.name}</h3>
                                                    <Tooltip
                                                        classNames={{
                                                            content: '!p-0',
                                                        }}
                                                        content={<>
                                                            <GradientBorderCard innerClassName="p-4 flex flex-col gap-1">
                                                                <>
                                                                <div className="w-full flex items-center justify-between text-sm">
                                                                    <div className="!text-sub w-20">Reward</div>
                                                                    <div>+10,000 CGT</div>
                                                                </div>
                                                                <div className="w-full flex items-center justify-between text-sm">
                                                                    <div className="!text-sub w-20">Pool Fee</div>
                                                                    <div>0.8%</div>
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
                                                    <img src={tier.icon} alt={tier.name} className="h-full object-contain" />
                                                </div>

                                                {/* 用户数量指示器 */}
                                                <div className="mt-4 flex items-center flex-col gap-1">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M18 21C18 19.1362 17.2625 17.3487 15.9497 16.0485C14.637 14.7482 12.8326 14 11 14C9.16737 14 7.36302 14.7482 6.05025 16.0485C4.73748 17.3487 4 19.1362 4 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span className="text-base title !font-[300]">{tier.count}</span>
                                                </div>
                                            </div>
                                        </GradientBorderCard>

                                        {/* 连接线 - 除了最后一个项目外的所有项目都有 */}
                                        {index < 4 && (
                                            <div className="absolute left-full top-1/2 w-[6.75rem] h-px bg-white translate-x-[calc(calc(10.25rem-6.75rem)/2)] -translate-y-1/2 z-[1]"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </GradientBorderCard>

                {/* 团队领导部分 */}
                <GradientBorderCard
                    className="mt-8"
                    borderRadius={8}
                >
                    <div className="w-full px-6 py-4">
                        <div className="flex justify-between items-center">
                            <h2 className="title text-xl uppercase !font-[300]">TEAM LEADER</h2>
                            <div className="flex items-center gap-2">
                                <History size={16} />
                                <span className="text-sm text-sub">Daily update at 2PM UTC</span>
                            </div>
                        </div>

                        {/* 团队领导表格 */}
                        {leaderData && (
                            <CysicTable
                                data={[leaderData]}
                                columns={leaderColumns}
                                className="mb-6"
                            />
                        )}

                        <div className="flex justify-between items-center mt-4">
                            <h2 className="title text-xl uppercase !font-[300]">TEAM MEMBER</h2>
                            <div className="flex items-center gap-2">
                                <History size={16} />
                                <span className="text-sm text-sub">Daily update at 2PM UTC</span>
                            </div>
                        </div>

                        {/* 团队成员表格 */}
                        <CysicTable
                            data={memberData}
                            columns={memberColumns}
                        />
                    </div>
                </GradientBorderCard>
            </div>
        </div>
    );
};

export default InvitePage;