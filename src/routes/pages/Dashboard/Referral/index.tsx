import usePagnation from "@/hooks/usePagnation";
import { activatedUserList, bindDiscord, bindDiscordCheck, bindTwitter, bindTwitterCheck, checkBind, genCode, overview, referralLevel } from "@/mock/referral";
import useReferral from "@/models/_global/referral";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import Invalid from "@/routes/pages/Dashboard/Referral/Status/Invalid";
import Valid from "@/routes/pages/Dashboard/Referral/Status/Valid";
import { useEventListener, useRequest } from "ahooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

export const mock = true;
const Referral = () => {
    const [forceSubmit, setForceSubmit] = useState(false)
    const [searchParams] = useSearchParams()
    const codeFromUrl = searchParams.get('code')

    useEffect(() => {
        if (codeFromUrl) {
            setBindCode(codeFromUrl)
        }
    }, [codeFromUrl])

    const { address } = useAccount()

    const { setState, discordBinded, twitterBinded } = useReferral()
    const valid = discordBinded && twitterBinded && address
    // 10.1 获取等级列表
    useRequest(() => axios.get(`/api/v1/referral/level`), {
        onSuccess(e) {
            const data = e?.data?.list
            let termRequire = 0

            for(let i = 0; i < e?.data?.list?.length; i++){
                termRequire += (+data?.[i]?.Require || 0)
                data[i].termRequire = termRequire
            }

            setState({
                levelList: data,
                levelListMap: data?.reduce((prev: any,next: any)=>{ 
                    if(!prev?.[next?.Level]){
                        prev[next?.Level] = {}
                    }

                    prev[next?.Level] = next
                    return prev
                 }, {})
            })
        },
        onFinally(){
            if(!mock) return;
            const data: any = referralLevel?.data?.list
            let termRequire = 0

            for(let i = 0; i < referralLevel?.data?.list?.length; i++){
                termRequire += (+data?.[i]?.Require || 0)
                data[i].termRequire = termRequire
            }

            setState({                
                levelList: data,
                levelListMap: data?.reduce((prev: any,next: any)=>{
                    if(!prev?.[next?.Level]){
                        prev[next?.Level] = {}
                    }

                    prev[next?.Level] = next
                    return prev
                }, {})
            })
        }
    })
    // 10.2 查询地址是否绑定邀请码
    const { run } = useRequest(() => axios.get(`/api/v1/referral/${address}/checkBind`), {
        ready: !!address,
        refreshDeps: [address],
        onSuccess(e) {
            setState({
                checkBind: e?.data?.bind
            })
        },
        onFinally(){
            if(!mock) return;
            setState({
                checkBind: checkBind?.data?.bind
            })
        }
    })
    // 10.3 生成邀请码
    useRequest(() => axios.post(`/api/v1/referral/genCode/${address}`), {
        ready: !!address,
        refreshDeps: [address],
        onSuccess(e) {
            setState({
                code: e?.data?.code
            })
        },
        onFinally(){
            if(!mock) return;
            setState({
                code: genCode?.data?.code
            })
        }
    })
    // 10.4 获取当前地址基础信息
    useRequest(() => axios.get(`/api/v1/referral/${address}/overview`), {
        ready: !!address,
        refreshDeps: [address],
        onSuccess(e) {
            setState({
                overview: e?.data
            })
        },
        onFinally(){
            if(!mock) return;
            setState({
                overview: overview?.data
            })
        }
    })


    
    // useEventListener('refresh_mediaBind', ()=>{
    //     twitterCheckRun()
    //     discordCheckRun()
    // })
    // useEventListener('refresh_twitterBind', ()=>{
    //     twitterCheckRun()
    // })
    // useEventListener('refresh_discordBind', ()=>{
    //     discordCheckRun()
    // })


    const [bindCode, setBindCode] = useState<string>()

    const handleBindCode = async (closeLoading?: any) => {
        try {
            if (!address) throw 'Invalid Address'
            const res: any = await axios.put(`/api/v1/socialTask/referral/bind/${bindCode}/${address}`)

            if (!res?.data?.bind) {
                toast.error('Failed')
                return
            }

            toast.success('Success')
            run?.()

        } catch (e: any) {
            toast.error(e?.msg || e?.message || e?.toString())
        } finally {
            closeLoading?.()
        }
    }
    return (
        <MainContainer title="Invite">
            <>
                {
                    valid ? <Valid /> : <Invalid />
                }
            </>
        </MainContainer>
    );
};

export default Referral;
