import Button from "@/components/Button";
import GradientBorderCard from "@/components/GradientBorderCard";
import { downloadLink, verifierStatus } from "@/config";
import useAccount from "@/hooks/useAccount";
import useStatic from "@/models/_global";
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
    const { zkPart } = useAccount();
    const { proofTypeList } = useStatic();

    console.log('proofTypeList', proofTypeList)
    const { data } = useRequest(() => {
        return axios.get('/api/v1/zkTask/prover/status')
    });

    const proverStatusData = {
        zkSync: data?.data?.proverStatus || 0,
        aleo: data?.data?.proverStatus || 0,
        ethProve: data?.data?.proverStatus || 0
    };

    // 返回组件函数而不是组件实例
    const ProverCardListComponent = () => (
        <div className={cn("flex gap-4 flex-wrap", isMobile ? "flex-col" : "")}>
            {proofTypeList?.map(i => {
                return <ProverCard
                    className="max-w-[calc(50%-1rem)]"
                    icon={<img src={i.logo} alt={i.name} />}
                    name={i?.name + ' Prover'}
                    description={i?.description}
                    isActive={!!proverStatusData.zkSync}
                    btnText={`Become a ${i?.name} Prover`}
                />
            })}
        </div>
    );

    const VerifierCardListComponent = () => (
        <GradientBorderCard borderRadius={8}>
            <div className={cn("w-full px-6 py-4 flex justify-between items-center", isMobile ? "flex-col gap-4" : "")}>
                <div className="flex flex-col gap-4 w-full">
                    <h3 className="!text-base !font-light title uppercase">ZK PROVER STATUS</h3>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${proverStatusData.zkSync ? 'bg-[#19FFE0]' : 'bg-gray-500'}`}></div>
                        <span className="!font-light !text-sm title uppercase">ZKSYNC PROVER {proverStatusData.zkSync ? 'ACTIVE' : 'INACTIVE'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${proverStatusData.ethProve ? 'bg-[#19FFE0]' : 'bg-red-500'}`}></div>
                        <span className="!font-light !text-sm title uppercase">ETHProve {proverStatusData.ethProve ? 'ACTIVE' : 'INACTIVE'}</span>
                    </div>
                </div>
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
    className?: string;
}

export const ProverCard = ({ icon, name, description, isActive, btnText, className }: ProverCardProps) => {
    return (
        <GradientBorderCard
            borderRadius={8}
            className={cn("", className)}
        >
            <div className="w-full p-6 h-full flex flex-col">
                <div className="flex flex-col items-start gap-4 flex-1">
                    <div className="flex items-center gap-4 justify-between w-full">
                        <div className="flex items-center gap-4">

                            <div className={cn("rounded-full bg-[#111] flex items-center justify-center text-white", isMobile ? "h-8 w-8" : "w-12 h-12")}>
                                {icon}
                            </div>
                            <h3 className={cn("!font-light title", isMobile ? "!text-2xl mb-2" : "!text-3xl")}>{name}</h3>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <div className={`h-3 w-3 rounded-full ${isActive ? 'bg-[#19FFE0]' : 'bg-red-500'}`}></div>
                            <span className="uppercase text-sm !font-light unbounded">{isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                        </div>

                    </div>

                    <div className="flex-1 h-full flex flex-col">

                        <p className="flex-1 text-sm  mb-6 text-sub teacher !normal-case">{description}</p>
                        <div className="flex items-center gap-2 teacher tracking-widest text-sm text-sub cursor-pointer hover:text-white transition-colors">
                            <span>{btnText}</span>
                            <ArrowRight width={16} height={16} />
                        </div>
                    </div>
                </div>
            </div>
        </GradientBorderCard>
    );
};

