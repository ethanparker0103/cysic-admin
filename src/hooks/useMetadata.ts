import {useAccount} from "wagmi"
import useAuth from "@/models/_global/auth";
import useUser from "@/models/_global/user";
import { useEventListener, useRequest } from "ahooks";
import axios from "axios";
import useReferral from "@/models/_global/referral";

const formatArray = (v: any) => {
    return Array.isArray(v) ? v : [v]
}

const useMetadata = () => {
    const { address } = useAccount()
    const { createAddress } = useUser()
    const { authMap } = useAuth(); // 状态初始为null，表示正在检查
    const auth = authMap?.[address as string]?.auth
    const { setState: setReferralState } = useReferral();


    const handleSearch = async () => {
        if (!auth) return;
        
        const res: any = await Promise.allSettled([axios.get(`/api/v1/dashboard/queryByReward/${address}`), axios.post(`/api/v1/referral/${address}/genCode`)])  
        const queryData = res?.[0]?.value?.data
        const bindCodeData = res?.[1]?.value?.data
        setReferralState({code: bindCodeData?.code})

        const project = formatArray(queryData?.project)?.filter(i => i?.ID)
        const provider = formatArray(queryData?.provider)?.filter(i => i?.ID)
        const verifier = formatArray(queryData?.verifier)?.filter(i => i?.ID)

        const registered = project?.find(i => i.ID != 0) || provider?.find(i => i.ID != 0) || verifier?.find(i => i.ID != 0)

        const needRegister = !registered
        const notInWhitelist = !queryData?.inWhitelist

        createAddress(address, {
            notInWhitelist,
            project,
            provider,
            verifier,
            needRegister
        })


        console.log('needRegister', needRegister)
        if(needRegister){
            dispatchEvent(new CustomEvent('modal_new_to_visible', {
                detail: {visible: true}
            }))
        }else{
            dispatchEvent(new CustomEvent('modal_new_to_visible', {
                detail: {visible: false}
            }))

            dispatchEvent(new CustomEvent('modal_phase_2_desc_visible', {
                detail: {visible: true}
            }))
        }
    };


    const { runAsync } = useRequest(handleSearch, {
        manual: true,
        // ready: !!address,
        // refreshDeps: [address],
        onError(e: any){
            if(e?.code){
                dispatchEvent(new CustomEvent('modal_new_to_visible', {
                    detail: {visible: true}
                }))
            }
        }
    })


    useEventListener('refresh_profile', ()=>{
        runAsync()
    })

    return { runAsync }

}

export default useMetadata