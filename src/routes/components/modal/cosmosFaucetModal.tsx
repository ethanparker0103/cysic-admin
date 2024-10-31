import Button from "@/components/Button";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import { ModalBody, ModalHeader } from "@nextui-org/react";
import useCosmos from "@/models/_global/cosmos";
import { useCountDown, useRequest } from "ahooks";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import { checkKeplrWallet } from "@/utils/cosmos";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const CosmosFaucetModal = () => {
    const { address } = useCosmos()
    const [toTime, setToTime] = useState<any>()
    const { visible, setVisible } = useModalState({eventName: "modal_cosmos_faucet_visible"});

    // apiV1.GET("/faucet/:address/latestRecord", faucetSendRecord)
    useEffect(()=>{
        if(!visible && toTime){
            setToTime(undefined)
        }
    }, [visible, toTime])

    const [countdown, formattedRes] = useCountDown({
        targetDate: toTime
      });
      const { hours, minutes, seconds } = formattedRes;
      const countdownFormatted = toTime ? `In ${hours}:${minutes}:${seconds}` : ''

    const {run} = useRequest(()=>{
        if(!address) return Promise.reject(null)
        return axios.get(`/api/v1/myPage/faucet/${address}/latestRecord`)
    }, {
        ready: !!address && visible,
        refreshDeps: [address, visible],
        onSuccess(e){
            const _v = e?.data?.latestClaimTime
            if(_v && _v != '0001-01-01 00:00:00'){
                setToTime(+dayjs.utc(_v).add(24, 'hours'))
            }
            
        }
    })




    const { run: handleClaim, loading } = useRequest(() => {
        checkKeplrWallet()
        if(!address) return Promise.reject(null)
        return axios.get(`/api/v1/myPage/faucet/${address}`)
    }, {
        manual: true,
        onSuccess() {
            run()
            toast.success('Success!')
        },
        onError(e: any) {
            toast.error(e?.msg || e?.message || 'Failed!')
        }
    })
    return (
        <Modal
            isOpen={visible}
            onClose={() => setVisible(false)}
            className="[&_button]:z-[2] max-w-[480px] border border-[#FFFFFF33]"
        >
            <>
                <ModalHeader>Claim Gas</ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-6 pb-6">
                        <div className="font-[600]">Claim Cysic gas per 24 hours</div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[#9C9C9C]">Wallet Address</span>
                            <Input type="solid" className="text-[#626365]" disabled value={address || '-'} />
                        </div>
                        <Button type="gradient" loading={loading} onClick={handleClaim}>Claim 10 $CYS {countdownFormatted}</Button>
                    </div>
                </ModalBody>

            </>
        </Modal>
    );
};

export default CosmosFaucetModal;
