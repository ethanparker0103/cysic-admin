import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import axios from "axios";
import { useLocalStorageState, useRequest, useCountDown } from "ahooks";
import useAccount from "@/hooks/useAccount";
import { toast } from "react-toastify";


// GIN-debug] GET    /api/v1/user/faucet       --> github.com/cysic-tech/cysic-api/router.claimFaucet (6 handlers)
// [GIN-debug] GET    /api/v1/user/faucet/last  --> github.com/cysic-tech/cysic-api/router.getLastClaimFaucetRecord (6 handlers)


const cooldownTime = 24 * 60 * 60 * 1000
const FaucetModal = () => {
    const { address } = useAccount()
    // 获取模态框状态
    const { visible, setVisible, data } = useModalState({
        eventName: "modal_faucet_visible",
    });

    const handleClose = () => {
        setVisible(false);
    }


    // { [addr]: undefined | number }
    const [lastClaimTime, setLastClaimTime] = useLocalStorageState<{ [key: string]: undefined | number }>('lastClaimTime', {
        defaultValue: {}
    });

    const currentAddressCountdown = address ? (lastClaimTime?.[address] == undefined ? undefined : new Date(lastClaimTime[address]).getTime() + cooldownTime) : undefined

    useRequest(() => {
        return axios.get('/api/v1/user/faucet/last')
    }, {
        ready: !!address && !currentAddressCountdown,
        refreshDeps: [address, currentAddressCountdown],
        onSuccess: (res) => {
            setLastClaimTime((prev: any) => {
                if(!address) return prev
                prev[address] = res.data.lastClaimAt
                return prev
            })  
        }
    })

    const expireTime = currentAddressCountdown

    const [countdown, formattedRes] = useCountDown({
        targetDate: expireTime,
        onEnd: () => {
            setLastClaimTime((prev: any) => {
                if(!address) return prev
                prev[address] = undefined
                return prev
            }   )
        }
    })

    const { hours, minutes, seconds } = formattedRes;

    const handleClaim = async () => {
        try{

        if (countdown > 0) return
        if (lastClaimTime == undefined) return

        const res: any = await axios.get('/api/v1/user/faucet')
        if(res?.code == 0){
            setLastClaimTime((prev: any) => {
                if(!address) return prev
                prev[address] = Date.now()
                return prev
            })
        }else{
                toast.error(res?.msg)
            }
        } catch (error: any) {
            toast.error(error?.msg)
        }
    }

    return (
        <Modal
            isOpen={visible}
            onClose={handleClose}
            className="max-w-[600px]"
            title="Claim Gas"
        >
            <div className="flex flex-col gap-6">
                <p>1 $CYS gas is available to be claimed every 24 hours.</p>
                <Button type="light" onClick={handleClaim} disabled={countdown > 0 || lastClaimTime == undefined} className="py-6">
                    {
                        countdown > 0 ? `In ${hours}:${minutes}:${seconds}` : 'Claim'
                    }
                </Button>
            </div>
        </Modal>
    );
};

export default FaucetModal;
