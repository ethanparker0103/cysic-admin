
import Button from "@/components/Button";
import { handleReserveModal } from "@/utils/tools";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import GradientBorderCard from "@/components/GradientBorderCard";
import axios from "@/service";
import { useRequest } from "ahooks";
import NFTProverCard from "@/components/NFTCard";
import { useNavigate } from "react-router-dom";
import useAccount from "@/hooks/useAccount";
import { isMobile } from "react-device-detect";
import { cn } from "@nextui-org/react";
import { Multiplier } from "@/routes/components/Multiplier";
import { useProverStatus } from "@/routes/components/ZkVerifierStatus";

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

const ProverPage = () => {
    const [selectedTab, setSelectedTab] = useState("self");

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

    const navigate = useNavigate()

    const { ProverCardListComponent, VerifierCardListComponent } = useProverStatus()

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
                    <VerifierCardListComponent />

                    {/* MULTIPLIER */}
                    <Multiplier />
                </div>

                {/* 第二部分：Tabs */}
                <GradientBorderCard
                    borderRadius={8}
                    className="mt-4"
                >
                    <div className="w-full">
                        {/* Tabs 标签 */}
                        <div className="flex gap-4 px-6 py-4">
                            {/* <button
                                className={`title !font-light !text-xl uppercase pb-2 border-b-2 ${selectedTab === 'nft' ? 'border-white' : 'border-transparent'}`}
                                onClick={() => setSelectedTab('nft')}
                            >
                                NFT
                            </button> */}
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
                                            <ProverCardListComponent />
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