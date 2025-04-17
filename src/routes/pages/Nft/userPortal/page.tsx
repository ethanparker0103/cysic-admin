import { ArrowRight, ExternalLink } from "lucide-react";
import GradientBorderCard from "@/components/gradientBorderCard";
import { ReactNode } from "react";
import { getImageUrl } from "@/utils/tools";
import Button from "@/components/Button";
import Copy from "@/components/Copy";

// 信息卡片组件
interface InfoCardProps {
    title: string;
    children: ReactNode;
    rightAction?: ReactNode;
    className?: string;
}

const InfoCard = ({ title, children, rightAction, className = "" }: InfoCardProps) => (
    <GradientBorderCard borderRadius={8} className={`h-full relative ${className}`}>
        <div className="h-full flex flex-col justify-between px-6 py-4 w-full gap-4">
            <div className="text-base !font-[300] uppercase font-medium ">{title}</div>
            <div className="flex-1 flex flex-col justify-between w-full gap-4">
                <div className="flex-1 flex items-center ">
                    {children}
                </div>
                {rightAction && (
                    <div className="">
                        {rightAction}
                    </div>
                )}
            </div>
        </div>
    </GradientBorderCard>
);

// 服务卡片组件
interface ServiceCardProps {
    title: string;
    imageSrc: string;
    onClick?: () => void;
}

const ServiceCard = ({ title, imageSrc, onClick }: ServiceCardProps) => (
    <GradientBorderCard borderRadius={8} className="overflow-hidden">
        <div className="relative h-[10.625rem] w-full group cursor-pointer overflow-hidden" onClick={onClick}>
            {/* 背景图片 */}
            <img
                src={imageSrc}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* 叠加的半透明层 */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* 内容区域 */}
            <div className="relative inset-0 flex flex-col h-full justify-between items-start p-4 z-10">
                <h3 className="title text-2xl !font-[300]">{title}</h3>
                <ArrowRight size={20} className="self-end text-white" />
            </div>
        </div>
    </GradientBorderCard>
);

// 社交账户项组件
interface SocialAccountItemProps {
    icon: ReactNode;
    account: string;
    action?: ReactNode;
}

const SocialAccountItem = ({ icon, account, action }: SocialAccountItemProps) => (
    <div className="flex justify-between items-center py-2 w-full">
        <div className="flex items-center justify-between gap-2 w-full">
            {icon}
            <span className="text-white">{account}</span>
        </div>
        {action}
    </div>
);

// 主要组件
const UserPortal = () => {
    // 复制邀请码

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#001910]/40 to-black">
            {/* 背景装饰 */}
            <div className="absolute w-full top-0 left-0 right-0 h-[100vh] overflow-hidden">
                <div className="w-full h-full">
                    <img
                        src={getImageUrl("@/assets/images/_global/userPortal_landing_bg.png")}
                        alt="Background"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#001910]/30 to-black"></div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className="container mx-auto px-4 relative z-10 pt-20 pb-16">
                {/* 页面标题 */}
                <h1 className="title text-7xl md:text-[120px] !font-[200] mb-24 text-center">USER PORTAL</h1>

                {/* GENERAL 部分 */}
                <div className="mb-4">
                    <h2 className="title text-4xl !font-[300] uppercase mb-12 text-center">GENERAL</h2>

                    <div className="flex flex-wrap gap-4">
                        {/* 个人资料卡片 */}
                        <div className="flex-1 min-w-[250px]">
                            <InfoCard title="PROFILE">
                                <>
                                    <div className="absolute right-6 top-4 flex items-start">
                                        <img
                                            src={getImageUrl("@/assets/images/nft/preset1.png")}
                                            alt="Profile"
                                            className="w-[6.25rem] h-[6.25rem] rounded-md object-cover"
                                        />
                                    </div>

                                    <div className="flex justify-between gap-4 w-full">
                                        <div className="flex flex-col gap-1 justify-end">
                                            <div className="text-base text-sub ">NAME</div>
                                            <div className="flex items-center gap-2 text-base">
                                                <span className="text-white">cysicpioneer_01</span>
                                                <button className="text-sub p-0 bg-transparent border-0">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </InfoCard>
                        </div>

                        {/* 邀请码卡片 */}
                        <div className="flex-1 min-w-[250px]">
                            <InfoCard
                                title="INVITE CODE"
                                rightAction={
                                    <a href="#" className="flex items-center text-sub justify-end hover:text-white text-sm font-[400]">
                                        INVITE DETAILS <ArrowRight size={12} className="ml-1" />
                                    </a>
                                }
                            >

                                <Copy className="text-2xl !font-[300] justify-end title w-full" value={'WZX2L3'}>WZX2L3</Copy>
                            </InfoCard>
                        </div>

                        {/* 余额卡片 */}
                        <div className="flex-1 min-w-[250px]">
                            <InfoCard
                                title="BALANCE"
                                rightAction={
                                    <a href="#" className="flex items-center text-sub justify-end hover:text-white text-sm font-[400]">
                                        HISTORY <ArrowRight size={12} className="ml-1" />
                                    </a>
                                }
                            >
                                <div className="text-2xl !font-[300] text-right title w-full">10,000 USDC</div>
                            </InfoCard>
                        </div>

                        {/* 代金券卡片 */}
                        <div className="flex-1 min-w-[250px]">
                            <InfoCard
                                title="VOUCHER"
                                rightAction={
                                    <a href="#" className="flex items-center text-sub justify-end hover:text-white text-sm font-[400]">
                                        VIEW ALL <ArrowRight size={12} className="ml-1" />
                                    </a>
                                }
                            >
                                <div className="text-2xl !font-[300] text-right title w-full">27</div>
                            </InfoCard>
                        </div>
                    </div>
                </div>

                {/* 奖励信息和社交账户 */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {/* 总奖励信息 */}
                    <div className="flex-[2] min-w-[300px]">
                        <GradientBorderCard borderRadius={8} className="h-full">
                            <div className="py-4 px-6 w-full h-full">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-base !font-[300] title">TOTAL REWARDS</div>
                                    <a href="#" className="flex items-center text-sub text-sm hover:text-white">
                                        DETAILS <ArrowRight size={12} className="ml-1" />
                                    </a>
                                </div>

                                <div className="flex gap-6 justify-between">
                                    <div className="flex flex-col gap-6 pr-6 border-r border-white">
                                        <div className="title !text-3xl !font-[300]">999,999.99 CYS</div>
                                        <Button type="light" className="min-w-fit w-[8.125rem] self-end text-base py-2 px-3 rounded-md">
                                            CONVERT
                                        </Button>
                                    </div>

                                    <div>
                                        <div className="flex flex-col gap-6">
                                            <div className="title !text-3xl !font-[300]">999,999.99 CGT</div>
                                            <Button type="light" className="min-w-fit w-[8.125rem] self-end text-base py-2 px-3 rounded-md">
                                                STAKE
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GradientBorderCard>
                    </div>

                    {/* 社交账户 */}
                    <div className="flex-1 min-w-[300px]">
                        <GradientBorderCard borderRadius={8} className="h-full">
                            <div className="py-4 px-6 w-full h-full">
                                <div className="text-base !font-[300] uppercase mb-2">SOCIAL ACCOUNT</div>

                                <SocialAccountItem
                                    icon={<span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">G</span>}
                                    account="gg@gmail.com"
                                />

                                <SocialAccountItem
                                    icon={<span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">X</span>}
                                    account="@pppi"
                                />

                                <SocialAccountItem
                                    icon={<span className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs text-white">D</span>}
                                    account="BOND DISCORD"
                                    action={<ArrowRight size={12} className="text-sub ml-2" />}
                                />
                            </div>
                        </GradientBorderCard>
                    </div>

                    {/* 我的NFT */}
                    <div className="flex-1 min-w-[300px]">
                        <GradientBorderCard borderRadius={8} className="h-full">
                            <div className="py-4 px-6 h-full w-full flex flex-col justify-between">
                                <div className="flex justify-between items-center w-full">
                                    <div className="title !font-[300] text-base">MY NFTS</div>
                                    <div className="title !font-[300] !text-2xl">999</div>
                                </div>

                                <div className="flex justify-end items-center">
                                    <a href="#" className="flex items-center text-sub text-sm !font-[400] hover:text-white">
                                        CHECK DETAILS <ArrowRight size={12} className="ml-1" />
                                    </a>
                                </div>
                            </div>
                        </GradientBorderCard>
                    </div>
                </div>

                {/* SERVICE HUB 部分 */}
                <div>
                    <h2 className="title text-4xl !font-[300] uppercase mb-12 text-center">SERVICE HUB</h2>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[300px]">
                            <ServiceCard
                                title="CYSIC ZK"
                                imageSrc={getImageUrl("@/assets/images/nft/preset1.png")}
                                onClick={() => console.log("Navigate to ZK service")}
                            />
                        </div>

                        <div className="flex-1 min-w-[300px]">
                            <ServiceCard
                                title="CYSIC AI"
                                imageSrc={getImageUrl("@/assets/images/nft/preset2.png")}
                                onClick={() => console.log("Navigate to AI service")}
                            />
                        </div>

                        <div className="flex-1 min-w-[300px]">
                            <ServiceCard
                                title="CYSIC MINING"
                                imageSrc={getImageUrl("@/assets/images/nft/preset1.png")}
                                onClick={() => console.log("Navigate to Mining service")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPortal;