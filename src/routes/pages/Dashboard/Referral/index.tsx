import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import Invalid from "@/routes/pages/Dashboard/Referral/Status/Invalid";
import Valid from "@/routes/pages/Dashboard/Referral/Status/Valid";
import { useRequest } from "ahooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

const valid = false

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
