import Button from "@/components/Button";
import Input from "@/components/Input";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import { useRequest } from "ahooks";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

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

    const { data, run } = useRequest(() => axios.get(`/api/v1/socialTask/referral/${address}`), {
        ready: !!address,
        refreshDeps: [address]
    })

    const { data: code } = useRequest(() => axios.post(`/api/v1/socialTask/referral/genCode/${address}`), {
        ready: !!address,
        refreshDeps: [address]
    })

    const referralCode = code?.data?.code
    const currentStatus = data?.data?.bind

    const [bindCode, setBindCode] = useState<string>()

    const handleBindCode = async (closeLoading?: any) => {
        try {
            if (!address) throw 'Invalid Address'
            const res: any = await axios.put(`/api/v1/socialTask/referral/bind/${bindCode}/${address}`)
            if (res?.code != '10000') {
                toast.error(res?.msg)
            }

            run?.()

        } catch (e: any) {
            toast.error(e?.msg || e?.message || e?.toString())
        } finally {
            closeLoading?.()
        }
    }
    return (
        <MainContainer title="Referral">
            <>
                <div className={clsx(isMobile ? "" : "p-4", "shadow-[0px_4px_0px_0px_#000000] border-[#000] border rounded-[14px]")}>
                    <div className="flex flex-col gap-2 flex-wrap">
                        <div>Account: <span className="text-[#21E9FA]">{address}</span></div>
                        <div>Referral Code: <span className="text-[#21E9FA]">{referralCode}</span></div>
                        <div>Current Account Status: <span className="text-[#21E9FA]">{currentStatus ? 'Binded' : 'Not Binded'}</span></div>
                        <Input placeholder="Input Referral Code" type="solid" value={bindCode} onChange={setBindCode} disabled={forceSubmit ? false : currentStatus} suffix={<Button className="min-h-fit h-8" needLoading onClick={handleBindCode} disabled={forceSubmit ? false : (currentStatus || !bindCode)} >Bind</Button>}></Input>
                        <Button onClick={()=>setForceSubmit(old=>!old)}>{ forceSubmit ? 'Normal' : 'Debug' }</Button>
                    </div>
                </div>
            </>
        </MainContainer>
    );
};

export default Referral;
