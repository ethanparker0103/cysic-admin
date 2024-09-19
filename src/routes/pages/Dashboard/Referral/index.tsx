import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import { useRequest } from "ahooks";
import axios from "axios";
import clsx from "clsx";
import { isMobile } from "react-device-detect";
import { useAccount } from "wagmi";

const Referral = () => {

    const { address } = useAccount()

    const {} = useRequest(()=>axios.get(`/api/v1/socialTask/referral/${address}`), {
        ready: !!address,
        refreshDeps: [address]
    })

    const {} = useRequest(()=>axios.get(`/api/v1/socialTask/referral/genCode/${address}`), {
        ready: !!address,
        refreshDeps: [address]
    })

 
    return (
        <MainContainer title="Referral">
            <>
                <div className={clsx(isMobile ? "" : "p-4", "shadow-[0px_4px_0px_0px_#000000] border-[#000] border rounded-[14px]")}>
                Referral
                </div>
            </>
        </MainContainer>
    );
};

export default Referral;
