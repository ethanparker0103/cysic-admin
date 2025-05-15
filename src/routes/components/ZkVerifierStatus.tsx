import Button from "@/components/Button";
import GradientBorderCard from "@/components/GradientBorderCard";
import { downloadLink, verifierStatus } from "@/config";
import { cn } from "@nextui-org/react";
import { useRequest } from "ahooks";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { isMobile } from "react-device-detect";


// {
//     "multiplier": 60,
//     "stakeStatus": 1,
//     "zkProverStatus": 1, z
//     "aleoProverStatus": 0
//   }
// /zkTask/prover/status

export const useProverStatus = () => {
    const { data } = useRequest(() => {
        return axios.get('/api/v1/zkTask/prover/status')
    });
    
    const proverStatusData = {
        zkSync: data?.data?.zkProverStatus || 0,
        aleo: data?.data?.aleoProverStatus || 0,
        ethProve: data?.data?.ethProveProverStatus || 0
    };

    // 返回组件函数而不是组件实例
    const ProverCardListComponent = () => (
        <div className={cn("flex gap-4", isMobile ? "flex-col" : "")}>
            <ProverCard
                icon={<span>ZS</span>}
                name="zkSync Prover"
                description="For Scroll Prover, please first click here to register on the Cysic Network as a Prover. Then, please click here and follow these steps to complete the Prover test. *Scroll Provers need to fully complete these two steps to unlock subsequent rewards."
                isActive={!!proverStatusData.zkSync}
                btnText="Become a zkSync Prover"
            />
            <ProverCard
                icon={<span>EP</span>}
                name="ETHProve"
                description="Run an ETHProve on your GPU-compatible machine to process proofs for Aleo applications."
                isActive={!!proverStatusData.ethProve}
                btnText="Become a ETHProve Prover"
            />
        </div>
    );

    const VerifierCardListComponent = () => (
        <GradientBorderCard borderRadius={8}>
            <div className={cn("w-full px-6 py-4 flex justify-between items-center", isMobile ? "flex-col gap-4" : "")}>
                <div className="flex flex-col gap-4 w-full">
                    <h3 className="!text-base !font-light title uppercase">ZK VERIFIER STATUS</h3>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${proverStatusData.zkSync ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span className="!font-light !text-sm title uppercase">ZKSYNC PROVER {proverStatusData.zkSync ? 'ACTIVE' : 'INACTIVE'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${proverStatusData.ethProve ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="!font-light !text-sm title uppercase">ETHProve {proverStatusData.ethProve ? 'ACTIVE' : 'INACTIVE'}</span>
                    </div>
                </div>
                <a href={downloadLink.googlePlay} target="_blank">
                    <Button
                        type="solid"
                        className={cn("min-h-fit h-fit px-6 py-6", isMobile ? "w-full" : "")}
                    >
                        <div className="flex items-center justify-center gap-2 text-base !font-[400]">
                            <span>DOWNLOAD OUR ANDROID APP</span>
                            <ArrowRight size={16} />
                        </div>
                    </Button>
                </a>
            </div>
        </GradientBorderCard>
    );

    return {
        ProverCardListComponent,
        VerifierCardListComponent,
        proverStatusData
    };
};

interface ProverCardProps {
    icon: React.ReactNode;
    name: string;
    description: string;
    isActive: boolean;
    btnText: string;
}

export const ProverCard = ({ icon, name, description, isActive, btnText }: ProverCardProps) => {
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

