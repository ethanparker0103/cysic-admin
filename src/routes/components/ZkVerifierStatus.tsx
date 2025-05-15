import Button from "@/components/Button";
import GradientBorderCard from "@/components/GradientBorderCard";
import { downloadLink, verifierStatus } from "@/config";
import { cn } from "@nextui-org/react";
import { useRequest } from "ahooks";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { isMobile } from "react-device-detect";


// {
//     "multiplier": 60,
//     "stakeStatus": 1,
//     "zkProverStatus": 1, z
//     "aleoProverStatus": 0
//   }
// /zkTask/prover/status
const ZkVerifierStatus = () => {
    const { data } = useRequest(()=>{
        return axios.get('/api/v1/zkTask/prover/status')
    })


    const verifierStatus = {
        zkSync: data?.data?.zkProverStatus || 0,
        aleo: data?.data?.aleoProverStatus || 0,
        ethProve: data?.data?.ethProveProverStatus || 0
    }
    console.log('data', data?.data)
    return (
        <GradientBorderCard
            borderRadius={8}
        >
            <div className={cn("w-full px-6 py-4 flex justify-between items-center", isMobile ? "flex-col gap-4" : "")}>
                <div className="flex flex-col gap-4 w-full">
                    <h3 className="!text-base !font-light title uppercase">ZK VERIFIER STATUS</h3>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${verifierStatus.zkSync ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span className="!font-light !text-sm title uppercase">ZKSYNC PROVER {verifierStatus.zkSync ? 'ACTIVE' : 'INACTIVE'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${verifierStatus.ethProve ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="!font-light !text-sm title uppercase">ETHProve {verifierStatus.ethProve ? 'ACTIVE' : 'INACTIVE'}</span>
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
    )
}

export default ZkVerifierStatus;