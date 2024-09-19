import { types } from "@/mock/socialTask";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import { useRequest } from "ahooks";
import axios from "axios";
import clsx from "clsx";
import { isMobile } from "react-device-detect";
import { useAccount } from "wagmi";

const SocialTasks = () => {
    const { address } = useAccount()
    
    const {data} = useRequest(()=>{
        return Promise.resolve(types)
        return axios.get(`/api/v1/socialTask/types`)
    })

    const taskList = data?.data?.list

    console.log('taskList', data, taskList)

    return (
        <MainContainer title="Social Tasks">
            <>
                <div className={clsx(isMobile ? "" : "p-4", "shadow-[0px_4px_0px_0px_#000000] border-[#000] border rounded-[14px]")}>
                    
                </div>
            </>
        </MainContainer>
    );
};

export default SocialTasks;
