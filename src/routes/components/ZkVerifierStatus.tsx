import Button from "@/components/Button";
import GradientBorderCard from "@/components/GradientBorderCard";
import { downloadLink } from "@/config";
import useAccount from "@/hooks/useAccount";
import useStatic, { IProofType } from "@/models/_global";
import DownloadQRCodeTooltip from "@/routes/components/DownloadQRCodeTooltip";
import { cn } from "@nextui-org/react";
import { useRequest } from "ahooks";
import axios from "axios";
import { ArrowRight } from "lucide-react";


// {
//     "multiplier": 60,
//     "stakeStatus": 1,
//     "zkProverStatus": 1, z
//     "aleoProverStatus": 0
//   }
// /zkTask/prover/status

export const useVerifierStatus = () => {
    const { proofTypeList } = useStatic()
    const { zkPart } = useAccount();
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

        <GradientBorderCard borderRadius={8}>
            <div className={cn("w-full px-4 lg:px-6 py-4 flex justify-between items-center", "flex-col lg:flex-row gap-4 lg:gap-0")}>
                <div className="flex flex-col gap-4 w-full">
                    <h3 className="!text-base !font-light title uppercase">ZK PROVER STATUS</h3>

                    {
                        proofTypeList.map((item: IProofType, index: number) => (
                            <div className="flex items-center gap-2" key={index}>
                                <div className={`w-3 h-3 rounded-full ${proverStatusData[item.name as keyof typeof proverStatusData] ? 'bg-[#19FFE0]' : 'bg-red-500'}`}></div>
                                <span className="!font-light !text-sm title uppercase">{item.name} PROVER {proverStatusData[item.name as keyof typeof proverStatusData] ? 'ACTIVE' : 'INACTIVE'}</span>
                            </div>
                        ))
                    }

                </div>
            </div>
        </GradientBorderCard>
    );

    const VerifierCardListComponent = () => (
        <GradientBorderCard borderRadius={8}>
            <div className={cn("w-full px-4 lg:px-6 py-4 flex justify-between items-center", "flex-col lg:flex-row gap-4 lg:gap-0")}>
                <div className="flex flex-col gap-4 w-full">
                    <h3 className="!text-base !font-light title uppercase">ZK VERIFIER STATUS</h3>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${zkPart?.verifierStatus?.standardActive ? 'bg-[#19FFE0]' : 'bg-red-500'}`}></div>
                        <span className="!font-light !text-sm title uppercase">Standard {zkPart?.verifierStatus?.standardActive ? 'ACTIVE' : 'INACTIVE'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${zkPart?.verifierStatus?.mobileActive ? 'bg-[#19FFE0]' : 'bg-red-500'}`}></div>
                        <span className="!font-light !text-sm title uppercase">Mobile {zkPart?.verifierStatus?.mobileActive ? 'ACTIVE' : 'INACTIVE'}</span>
                    </div>
                </div>
                <DownloadQRCodeTooltip>
                    <a href={downloadLink.googlePlay} target="_blank">
                        <Button
                            type="solid"
                            className={cn("min-h-fit h-fit px-6 py-6", "w-full lg:w-auto")}
                        >
                            <div className="flex items-center justify-center gap-2 text-base !font-[400]">
                                <span>DOWNLOAD OUR ANDROID APP</span>
                                <ArrowRight size={16} />
                            </div>
                        </Button>
                    </a>
                </DownloadQRCodeTooltip>
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
                    <div className={cn(" rounded-full bg-[#111] flex items-center justify-center text-white", "h-8 w-8 lg:w-12 lg:h-12")}>
                        {icon}
                    </div>
                    <div className="flex-1 h-full flex flex-col">
                        <div className={cn("flex mb-4", "flex-col lg:flex-row lg:justify-between lg:items-start")}>
                            <h3 className={cn("font-light unbounded", "text-2xl mb-2 lg:text-3xl lg:mb-0")}>{name}</h3>
                            <div className="flex items-center gap-2">
                                <div className={`h-3 w-3 rounded-full ${isActive ? 'bg-[#19FFE0]' : 'bg-red-500'}`}></div>
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

