import Button from "@/components/Button";
import { getImageUrl, handleReserveModal } from "@/utils/tools";
import { ArrowRight, CircleHelp, Pencil } from "lucide-react";
import { useState } from "react";
import GradientBorderCard from "@/components/gradientBorderCard";
import Tooltip from "@/components/Tooltip";

const hasNFT = true

const NFTProverCard = ({ status }: { status: { nft: boolean } }) => {
    return (
        <GradientBorderCard
            borderRadius={8}
        >
            <div className="w-full px-6 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="col-span-4 flex flex-col">
                        <div className="bg-gray-300 w-full flex-1 rounded-lg mb-3"></div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-3 h-3 rounded-full ${status.nft ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="uppercase">NFT ACTIVE</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2 text-sm !font-[400]">
                            <div className="text-sub ">Chip</div>
                            <div className="text-right">Intel</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-4 text-sm !font-[400]">
                            <div className="text-sub ">Computing Power</div>
                            <div className="text-right">50 TH</div>
                        </div>
                        <Button
                            type="light"
                            className="py-3 !font-[400] text-base w-full rounded-lg"
                        >
                            EXTEND
                        </Button>
                    </div>

                    <div className="col-span-8">
                        <div className="flex justify-between items-center mb-4 text-3xl !font-[400] ">
                            <h3 className="uppercase">ZK Dust Harvester</h3>
                            <span>x3</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="text-sub">Purchase Price</div>
                            <div className="text-right flex items-center justify-end gap-1">
                                888 USDC <Pencil width={12} height={12} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-1">
                            <div className="text-sub">Current Earnings Efficiency</div>
                            <div className="text-right">
                                39.80 CYS + 32.29 CGT /Day
                                <div className="text-xs text-green-400 flex items-center gap-1 justify-end"><img src={getImageUrl('@/assets/images/icon/flash.svg')} /> Ultra Speed Applied</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-6">
                            <div className="text-sub">Maintenance Fee</div>
                            <div className="text-right">3.23 CYS/Day</div>
                        </div>

                        <div className="border-t border-white/10 my-4"></div>

                        <div className="grid grid-cols-2 gap-2 mb-1">
                            <div className="text-sub">Realized Earnings</div>
                            <div className="text-right">39.80 CYS + 32.29 CGT</div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-1">
                            <div className="text-sub">Realized Net Earnings</div>
                            <div className="text-right">30.80 CYS + 32.29 CGT</div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-1">
                            <div className="text-sub">Estimated Remaining Earnings</div>
                            <div className="text-right">3092.23 CYS + 2332.23 CGT</div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-6">
                            <div className="text-sub">Estimated Remaining Net Earnings</div>
                            <div className="text-right">3000.23 CYS + 2332.23 CGT</div>
                        </div>

                        <div className="border-t border-white/10 my-4"></div>

                        <div className="grid grid-cols-2 gap-2 mb-1">
                            <div className="text-sub">Start Time</div>
                            <div className="text-right">Mar 29, 1:23PM UTC</div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="text-sub">End In</div>
                            <div className="text-right">10 Days</div>
                        </div>
                    </div>
                </div>
            </div>
        </GradientBorderCard>
    )
}

// SELF Prover 的步骤组件
const SelfProverStepCard = ({ step, title, description, buttonText, children, onClick }: { step: number, title: string, description?: any, buttonText?: string, children?: React.ReactNode, onClick?: () => void }) => {
    return (
        <div className="mb-8">
            <div className="flex flex-col items-start ">
                <div className="w-full flex justify-between">

                    <div className="flex flex-col ">
                        <div className="text-xl !font-[400]">Step {step}/2</div>
                        <h3 className="title text-3xl uppercase !font-[300] mb-2">{title}</h3>
                    </div>
                    {buttonText ? <Button
                        onClick={onClick}
                        type="light"
                        className="rounded-lg px-12 py-6 min-h-fit h-fit text-base !font-[400]"
                    >
                        {buttonText}
                    </Button> : null}
                </div>

                <div className="flex-1">
                    <p className="text-sub text-sm mb-4">{description}</p>
                </div>

                <div className="flex items-center gap-2 uppercase text-sm !font-[400] text-sub">
                    <span>Click here to know how to earn CGT</span>
                    <ArrowRight width={16} height={16} />
                </div>
            </div>
            {children || <div className="border-b border-white/10 mt-4"></div>}
        </div>
    );
};

// Prover 组件卡片
const ProverCard = ({ icon, name, description, isActive, btnText }: any) => {
    return (
        <GradientBorderCard
            borderRadius={8}
            className="mb-4 flex-1"
        >
            <div className="w-full p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                    <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center text-white">
                        {icon}
                    </div>
                    <div className="flex-1 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className=" text-3xl !font-[400]">{name}</h3>
                            <div className="flex items-center gap-2">
                                <div className={`h-3 w-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="uppercase text-sm !font-[300] title">{isActive ? 'SELF ACTIVE' : 'INACTIVE'}</span>
                            </div>
                        </div>
                        <p className="flex-1 text-sm !font-[400] mb-6 text-sub">{description}</p>
                        <div className="flex items-center gap-2 uppercase text-sm !font-[400] text-sub">
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
    const [status] = useState({
        standard: true,
        mobile: false,
        nft: true,
    });

    return (
        <div className="min-h-screen w-full pb-12 overflow-hidden">

            {/* 主标题 */}
            <div className="pt-12 flex flex-col items-center gap-6 relative z-[2]">
                <div className="flex flex-col items-center">
                    <span className="title text-4xl !font-[300] !text-[#fff] text-center">PROVER</span>
                </div>
            </div>

            {/* 主要内容部分 */}
            <div className="mx-auto px-[3rem] mt-12 relative z-[2]">
                {/* 第一部分：成为 Prover */}
                <GradientBorderCard
                    borderRadius={8}
                    className="mb-4"
                >
                    <div className="w-full p-8">
                        <div className="flex flex-col gap-2 mb-6 ">
                            <h1 className="title !font-[300] text-4xl uppercase">BECOME A CYSIC PROVER</h1>
                            <h1 className="title !font-[300] text-4xl uppercase">AND EARN CYS & CGT</h1>
                            <h2 className="title !font-[300] text-xl uppercase mt-2">EASIER THAN EVER BEFORE!</h2>
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
                        <div className="w-full px-6 py-4 flex justify-between items-center">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-base !font-[300] title uppercase">ZK VERIFIER STATUS</h3>
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${status.standard ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                    <span className="!font-[300] text-sm title uppercase">STANDARD ACTIVE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${status.mobile ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="!font-[300] text-sm title uppercase">MOBILE INACTIVE</span>
                                </div>
                            </div>
                            <Button
                                type="solid"
                                className="min-h-fit h-fit px-6 py-6"
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
                                    <h3 className="text-base !font-[300] title uppercase">MULTIPLIER</h3>
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


                                <div className="flex items-center gap-2">
                                    <span className="text-sub text-sm !font-[400]">SPEED UP</span>
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
                            </div>

                            <div className="w-full h-3 bg-[#FFFFFF4D] rounded-full overflow-hidden mb-6">
                                <div className="h-full w-[75%] bg-gradient-to-r from-purple-600 via-blue-400 to-green-300 rounded-full"></div>
                            </div>

                            <div className="flex justify-end items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                    <span className="text-sm !font-[400] title">HIGH SPEED</span>
                                </div>
                            </div>
                        </div>
                    </GradientBorderCard>
                </div>

                {/* 第二部分：成为 ZK Prover */}
                <div className="mb-8 mt-12">
                    <h2 className="title text-3xl uppercase text-center mb-8 !font-[300]">BECOMING A CYSIC ZK PROVER</h2>

                    {/* 选项卡 */}
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 mb-6 rounded-lg overflow-hidden">
                            <button
                                className={`py-4 uppercase text-base text-center ${selectedTab === 'nft' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-[#FFFFFF80]'}`}
                                onClick={() => setSelectedTab('nft')}
                            >
                                NFT PROVER
                            </button>
                            <button
                                className={`py-4 uppercase text-base text-center ${selectedTab === 'self' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-[#FFFFFF80]'}`}
                                onClick={() => setSelectedTab('self')}
                            >
                                SELF PROVER
                            </button>
                        </div>
                    </div>

                    {/* NFT Prover 内容 - 有 NFT 的状态 */}
                    {selectedTab === 'nft' && hasNFT && (
                        <>
                            <div className="flex gap-10">
                                <div className="text-white text-base mb-6 flex-1">
                                    Become a Cysic ZK Prover easier than ever before - simply purchase a Digital Harvester to instantly become a Cysic ZK Prover and start earning right away, with no additional steps required.
                                </div>

                                <div className="flex justify-end mb-6">
                                    <Button
                                        type="solid"
                                        className="!p-6"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-base !font-[400]">EXPLORE COMPUTE BOX</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </Button>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <NFTProverCard key={index} status={{ nft: true }} />
                                    ))
                                }
                            </div>
                        </>
                    )}

                    {/* NFT Prover 内容 - 没有 NFT 的状态 */}
                    {selectedTab === 'nft' && !hasNFT && (
                        <>
                            <div className="text-white text-base mb-6">
                                Become a Cysic ZK Prover easier than ever before - simply purchase a Digital Harvester to instantly become a Cysic ZK Prover and start earning right away, with no additional steps required.
                            </div>

                            <GradientBorderCard
                                borderRadius={8}
                            >
                                <div className="w-full px-6 py-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="uppercase">You are currently not holding any Digital Harvester.</span>
                                    </div>

                                    <Button
                                        type="solid"
                                        className="!p-6"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-base !font-[400]">PURCHASE MY COMPUTE BOX</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </Button>
                                </div>
                            </GradientBorderCard>
                        </>
                    )}

                    {/* Self Prover 内容 */}
                    {selectedTab === 'self' && (
                        <>

                            {/* 步骤 1/2 */}
                            <SelfProverStepCard
                                step={1}
                                title="RESERVE 100 CGT"
                                description={<>To become a self Prover on Cysic ZK, you need to reserve at least 100 CGT as collateral.<br /> Cysic will oversee Prover actions, retaining this collateral if any irregular behavior occurs to protect Cysic ZK's operation.</>}
                                buttonText="RESERVE"
                                onClick={handleReserveModal}
                            />

                            {/* 步骤 2/2 */}
                            <SelfProverStepCard
                                step={2}
                                title="PROVIDE YOUR OWN COMPUTATIONAL POWER"
                                description={<>To become a self Prover on Cysic ZK, you need to reserve at least 100 CGT as collateral.<br /> Cysic will oversee Prover actions, retaining this collateral if any irregular behavior occurs to protect Cysic ZK's operation.</>}
                            >

                                <div className="mt-4 flex gap-4">
                                    {/* zkSync Prover 组件 */}
                                    <ProverCard
                                        icon={<span className="text-lg">⚡</span>}
                                        name="zkSync Prover"
                                        description="For Scroll Prover, please first click here to register on the Cysic Network as a Prover. Then, please click here and follow these steps to complete the Prover test. *Scroll Provers need to fully complete these two steps to unlock subsequent rewards."
                                        isActive={true}
                                        btnText="BECOME A ZKSYNC PROVER"
                                    />

                                    {/* Aleo Prover 组件 */}
                                    <ProverCard
                                        icon={<span className="text-lg">A</span>}
                                        name="Aleo Prover"
                                        description="For Aleo Prover, please click here and follow these steps to complete the Prover test. Make sure to click here to register on the Cysic Network as a Prover to unlock more rewards. *Aleo Provers who are already running but have not yet registered on the Cysic Network will receive the same rewards, and registering can increase rewards."
                                        isActive={false}
                                        btnText="BECOME AN ALEO PROVER"
                                    />
                                </div>
                            </SelfProverStepCard>


                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProverPage;