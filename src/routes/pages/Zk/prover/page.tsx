// @ts-nocheck
import Button from "@/components/Button";
import { handleMultiplierModal, handleReserveModal } from "@/utils/tools";
import { ArrowRight, CircleHelp } from "lucide-react";
import { useState } from "react";
import GradientBorderCard from "@/components/GradientBorderCard";
import Tooltip from "@/components/Tooltip";
import axios from "@/service";
import { useRequest } from "ahooks";
import NFTProverCard from "@/components/NFTCard";
import { useNavigate } from "react-router-dom";
import useAccount from "@/hooks/useAccount";
import { isMobile } from "react-device-detect";
import { cn } from "@nextui-org/react";

// SELF Prover 的步骤组件
const SelfProverStepCard = ({ step, title, description, buttonText, children, onClick }: {
    step: number,
    title: string,
    description?: string | React.ReactNode,
    buttonText?: string,
    children?: React.ReactNode,
    onClick?: () => void
}) => {
    return (
        <div className="mb-8">
            <div className="flex flex-col items-start">
                <div className={cn("w-full flex ", isMobile ? "flex-col" : "justify-between items-start")}>
                    <div className="flex flex-col">
                        <div className="!text-base !font-light title">Step {step}/2</div>
                        <h3 className={cn("title uppercase !font-light mb-2", isMobile ? "!text-2xl" : "!text-3xl")}>{title}</h3>
                    </div>
                    {buttonText ? <Button
                        onClick={onClick}
                        type="light"
                        className="rounded-lg px-12 py-3 min-h-fit h-fit !text-base !font-[400]"
                    >
                        {buttonText}
                    </Button> : null}
                </div>

                <div className="flex-1 mt-4">
                    <p className="text-sub text-sm mb-4">{description}</p>
                </div>

                <div className="flex items-center gap-2 uppercase text-sm !font-[400] text-sub cursor-pointer hover:text-white transition-colors">
                    <span>Click here to know how to earn CGT</span>
                    <ArrowRight width={16} height={16} />
                </div>
            </div>
            {children || <div className="border-b border-white/10 mt-6"></div>}
        </div>
    );
};

// Prover 组件卡片
interface ProverCardProps {
    icon: React.ReactNode;
    name: string;
    description: string;
    isActive: boolean;
    btnText: string;
}

const ProverCard = ({ icon, name, description, isActive, btnText }: ProverCardProps) => {
    return (
        <GradientBorderCard
            borderRadius={8}
            className="mb-4 flex-1"
        >
            <div className="w-full p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                    <div className={cn(" rounded-full bg-[#111] flex items-center justify-center text-white", isMobile ? "h-8 w-8" : "w-12 h-12")}>
                        {icon}
                    </div>
                    <div className="flex-1 h-full flex flex-col">
                        <div className={cn("flex mb-4", isMobile ? "flex-col" : "justify-between items-start")}>
                            <h3 className={cn("!font-light title", isMobile ? "!text-2xl mb-2" : "!text-3xl")}>{name}</h3>
                            <div className="flex items-center gap-2">
                                <div className={`h-3 w-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="uppercase !text-sm !font-light title">{isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                            </div>
                        </div>
                        <p className="flex-1 text-sm !font-[400] mb-6 text-sub">{description}</p>
                        <div className="flex items-center gap-2 uppercase text-sm !font-[400] text-sub cursor-pointer hover:text-white transition-colors">
                            <span>{btnText}</span>
                            <ArrowRight width={16} height={16} />
                        </div>
                    </div>
                </div>
            </div>
        </GradientBorderCard>
    );
};

const ProverPage = () => {
    const [selectedTab, setSelectedTab] = useState("nft");

    const { address, isRegistered } = useAccount()

    // 获取ZK任务概览信息
    const { data: zkTaskOverview, loading: zkTaskLoading } = useRequest(
        () => axios.get('/api/v1/zkTask/overview'),
        {
            onSuccess: (res) => {
                console.log('ZK任务概览数据:', res?.data);
            },
            ready: !!address && !!isRegistered,
            refreshDeps: [address, isRegistered],
        }
    );

    // 从API获取状态
    const proverStatus = zkTaskOverview?.data?.proverStatus || {
        nftActive: 0,
        selfActive: 0
    };

    const verifierStatus = zkTaskOverview?.data?.verifierStatus || {
        standardActive: 0,
        mobileActive: 0
    };

    const multiplierPercent = zkTaskOverview?.data?.multiplierPercent || 0;

    const navigate = useNavigate()

    return (
        <div className="min-h-screen w-full pb-12 overflow-hidden">

            {/* 主标题 */}
            <div className="pt-12 flex flex-col items-center gap-6 relative z-[2]">
                <div className="flex flex-col items-center">
                    <span className="title !text-4xl !font-light !text-[#fff] text-center">PROVER</span>
                </div>
            </div>

            {/* 主要内容部分 */}
            <div className="container mx-auto mt-12 relative z-[2]">
                {/* 第一部分：成为 Prover */}
                <GradientBorderCard
                    borderRadius={8}
                    className="mb-4"
                >
                    <div className={cn("w-full", isMobile ? "px-6 py-4" : "p-8")}>
                        <div className="flex flex-col gap-2 mb-6 ">
                            <h1 className={cn("title !font-light uppercase", isMobile ? "!text-2xl" : "text-4xl")}>BECOME A CYSIC PROVER</h1>
                            <h1 className={cn("title !font-light uppercase", isMobile ? "!text-2xl" : "text-4xl")}>AND EARN CYS & CGT</h1>
                            <h2 className={cn("title !font-light uppercase mt-2", isMobile ? "!text-base" : "text-xl")}>EASIER THAN EVER BEFORE!</h2>
                                    </div>

                        <p className="text-white !font-[400] text-base mb-6">
                            Contribute your own computational power or purchase a Digital Harvester to support ZK proofs and earn rewards now!
                            <br />
                            You can also boost your earnings by increasing your Multiplier. A higher Multiplier enhances task acquisition speed, maximizing your rewards!
                        </p>
                    </div>
                </GradientBorderCard>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* ZK VERIFIER STATUS */}
                    <GradientBorderCard
                        borderRadius={8}
                    >
                        <div className={cn("w-full px-6 py-4 flex justify-between items-center", isMobile ? "flex-col gap-4" : "")}>
                            <div className="flex flex-col gap-4 w-full">
                                <h3 className="!text-base !font-light title uppercase">ZK VERIFIER STATUS</h3>
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${verifierStatus.standardActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                    <span className="!font-light !text-sm title uppercase">STANDARD {verifierStatus.standardActive ? 'ACTIVE' : 'INACTIVE'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${verifierStatus.mobileActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="!font-light !text-sm title uppercase">MOBILE {verifierStatus.mobileActive ? 'ACTIVE' : 'INACTIVE'}</span>
                                </div>
                            </div>
                            <Button
                                type="solid"
                                className={cn("min-h-fit h-fit px-6 py-6", isMobile ?"w-full":"")}
                            >
                                <div className="flex items-center justify-center gap-2 text-base !font-[400]">
                                    <span>DOWNLOAD OUR ANDROID APP</span>
                                    <ArrowRight size={16} />
                                </div>
                            </Button>
                        </div>
                    </GradientBorderCard>

                    {/* MULTIPLIER */}
                    <GradientBorderCard
                        borderRadius={8}
                    >
                        <div className="w-full px-6 py-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="!text-base !font-light title uppercase">MULTIPLIER</h3>
                                    <Tooltip
                                        classNames={{
                                            content: '!p-0',
                                        }}
                                        content={<>
                                            desc
                                        </>}
                                    >
                                        <div className="flex items-center"><CircleHelp width={12} height={12} /></div>
                                    </Tooltip>
                                </div>


                                <div className="flex items-center gap-2 cursor-pointer" onClick={handleMultiplierModal}>
                                    <span className="text-sub text-sm !font-[400]">SPEED UP</span>
                                    <Tooltip
                                        classNames={{
                                            content: '!p-0',
                                        }}
                                        content={<>
                                            {multiplierPercent + '%'}
                                        </>}
                                    >
                                        <div className="flex items-center"><CircleHelp width={12} height={12} /></div>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="w-full h-3 bg-[#FFFFFF4D] rounded-full overflow-hidden mb-6">
                                <div style={{width: multiplierPercent+'%'}} className="h-full bg-gradient-to-r from-purple-600 via-blue-400 to-green-300 rounded-full"></div>
                            </div>

                            <div className="flex justify-end items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                    <span className="!text-sm !font-[400] title">HIGH SPEED</span>
                                </div>
                                    </div>
                    </div>
                    </GradientBorderCard>
                </div>

                {/* 第二部分：Tabs */}
                <GradientBorderCard
                    borderRadius={8}
                    className="mt-4"
                >
                    <div className="w-full">
                        {/* Tabs 标签 */}
                        <div className="flex gap-4 px-6 py-4">
                            <button
                                className={`title !font-light !text-xl uppercase pb-2 border-b-2 ${selectedTab === 'nft' ? 'border-white' : 'border-transparent'}`}
                                onClick={() => setSelectedTab('nft')}
                            >
                                NFT
                            </button>
                            <button
                                className={`title !font-light !text-xl uppercase pb-2 border-b-2 ${selectedTab === 'self' ? 'border-white' : 'border-transparent'}`}
                                onClick={() => setSelectedTab('self')}
                            >
                                SELF
                            </button>
                        </div>

                        {/* 当前选中 Tab 的内容 */}
                        <div className="px-6 py-4">
                            {selectedTab === 'nft' && (
                                <>
                                    {zkTaskLoading ? (
                                        <div className="text-center py-6">正在加载Prover状态...</div>
                                    ) : proverStatus.nftActive ? (
                                        <NFTProverCard status={{ nft: Boolean(proverStatus.nftActive) }}  className={isMobile ? "w-full" : "w-1/2"} />
                                    ) : (
                                        <div className="flex flex-col items-center gap-4 py-6">
                                            <h3 className="title !font-light !text-2xl uppercase">NFT INACTIVE</h3>
                                            <p className="text-center max-w-xl text-sub text-base mb-4">
                                                Purchase a Digital Harvester to become a Prover on the Cysic Network. No technical setup required.
                                            </p>
                                            <Button
                                                type="light"
                                                className="rounded-lg px-12 py-6"
                                                onClick={() => { navigate('/nft') }}
                                            >
                                                <div className="flex items-center gap-2 text-base !font-[400]">
                                                    <span>PURCHASE A DIGITAL HARVESTER</span>
                                                    <ArrowRight size={16} />
                                                </div>
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}

                            {selectedTab === 'self' && (
                                <div className="flex flex-col">
                                    <SelfProverStepCard
                                        step={1}
                                        title="RESERVE 100 CGT"
                                        description="Reserve 100 CGT tokens to enable your own computational resources to work as a prover on the Cysic Network."
                                        buttonText="RESERVE"
                                        onClick={handleReserveModal}
                                    />

                                    <SelfProverStepCard
                                        step={2}
                                        title="PROVIDE YOUR OWN COMPUTATIONAL POWER"
                                        description="Run a Cysic Prover on your own hardware to contribute to the network and earn rewards."
                                    >
                                        <div className="flex flex-col gap-5 mt-4">
                                            <div className={cn("flex gap-4", isMobile ? "flex-col" : "")}>
                                                <ProverCard
                                                    icon="ZS"
                                                    name="zkSync Prover"
                                                    description="Run a zkSync Prover on your CPU-compatible machine to process proofs for zkSync transactions."
                                                    isActive={false}
                                                    btnText="COMING SOON"
                                                />

                                                <ProverCard
                                                    icon="AL"
                                                    name="Aleo Prover"
                                                    description="Run an Aleo Prover on your GPU-compatible machine to process proofs for Aleo applications."
                                                    isActive={false}
                                                    btnText="COMING SOON"
                                                />
                                            </div>
                                        </div>
                                    </SelfProverStepCard>
                                </div>
                            )}
                        </div>
                    </div>
                </GradientBorderCard>
            </div>
        </div>
    );
};

export default ProverPage;