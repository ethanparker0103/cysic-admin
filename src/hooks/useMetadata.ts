import {useAccount} from "wagmi"
import useAuth from "@/models/_global/auth";
import useUser from "@/models/_global/user";
import { useEventListener, useRequest } from "ahooks";
import axios from "axios";
import useReferral from "@/models/_global/referral";
import { useNavigate } from "react-router-dom";

const formatArray = (v: any) => {
    return Array.isArray(v) ? v : [v]
}

const useMetadata = () => {
    const navigate = useNavigate()
    const { address } = useAccount()
    const { createAddress, phase2ModalStatus } = useUser()
    const { authMap } = useAuth(); // 状态初始为null，表示正在检查
    const auth = authMap?.[address as string]?.auth
    const { setState: setReferralState } = useReferral();

    const handleSearch = async () => {
        if (!auth) return;
        
        const res: any = await axios.get(`/api/v1/myPage/${address}/profile`)

        const queryData = res?.data?.searchResult
        const bindCodeData = res?.data?.referralCode

        setReferralState({code: bindCodeData})

        const project = formatArray(queryData?.Project)?.filter(i => i?.ID)
        const provider = formatArray(queryData?.Provider)?.filter(i => i?.ID)
        const verifier = formatArray(queryData?.Verifier)?.filter(i => i?.ID)

        const registered = project?.find(i => i.ID != 0) || provider?.find(i => i.ID != 0) || verifier?.find(i => i.ID != 0)

        const needRegister = !registered
        const notInWhitelist = !res?.data?.inWhitelist

        createAddress(address, {
            notInWhitelist,
            project,
            provider,
            verifier,
            needRegister,
            ...res?.data
        })

        if(needRegister){
            dispatchEvent(new CustomEvent('modal_new_to_visible', {
                detail: {visible: true}
            }))
        }else{
            dispatchEvent(new CustomEvent('modal_new_to_visible', {
                detail: {visible: false}
            }))

            if(phase2ModalStatus){
                dispatchEvent(new CustomEvent('modal_phase_2_desc_visible', {
                    detail: {visible: true}
                }))
            }
        }


        console.log('needRegister', needRegister)
        return {
            needRegister
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

    return { runAsync }

}

export default useMetadata