import Button from "@/components/Button"
import useModalState from "@/hooks/useModalState"
import { keplrDownloadLink } from "@/config";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { connectWallet, updateProvider } from "@/utils/cosmos";
import { ArrowRight } from "lucide-react";
import useCosmos from "@/models/_global/cosmos";
import { useEventListener } from "ahooks";
import { sleep } from "@/utils/tools";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

const KeplrConnectModal = () => {
    const [unmatchedError, setUnmatchedError] = useState(false)
    const { visible, setVisible } = useModalState({eventName: 'modal_download_keplr_visible'})

    useEventListener('modal_download_keplr_visible', (e: any)=>{
        console.log('eee', e)
        if(e?.detail?.type == 'unmathedAddress'){
            setUnmatchedError(true)
            // setVisible(true)
        }

    })

    const [walletValid, setWalletValid] = useState(false)
    const { address, connector } = useCosmos()

    useEffect(()=>{
        if(window?.keplr){
            setWalletValid(true)
            updateProvider()
        }
    }, [window?.keplr])

    useEffect(()=>{
        if(!visible){
            setUnmatchedError(false)
        }
    }, [])

    useEffect(()=>{
        if(address && visible && !unmatchedError){
            setVisible(false)
        }
    }, [address, visible, unmatchedError])

    const reconnectWallet = async ()=>{
        await connector?.disable?.()

        await sleep(500)
        await connectWallet()

        setVisible(false)
    }


    return <Modal isOpen={visible} onClose={() => setVisible(false)} className="[&_button]:z-[2] max-w-[820px] border border-[#FFFFFF33]">
            <div className={clsx("flex justify-between bg-[url(@/assets/images/_global/keplr_download_bg.png)]", isMobile ? "flex-col bg-contain bg-norepeat" : "bg-cover")}>
                <div className={clsx("w-[380px]", isMobile ? "aspect-[380/140]" : "")} />
                <div className={clsx("flex flex-col gap-6 bg-[#0B0C0F] relative z-1", isMobile ? "w-full p-3 " : "w-[440px] p-10 ")}>
                    <div className="flex flex-col uppercase text-[32px]">
                        <div className="text-gradient Gemsbuck">Unlock Phase II Features</div>
                    </div>
                    <div className="flex flex-col p-4 text-[#fff] text-sm gap-3 font-[500] bg-[#FFFFFF0D] rounded-[16px]">
                        <div>To fully unlock all the benefits of Phase II—such as staking $CGT, delegating VeCompute, and converting between tokens—follow these two easy steps:</div>
                        <div className="flex flex-col gap-1">
                            <div>👉 1. Download Keplr wallet.</div>
                            <div>👉 2. <span className="text-[#00F0FF]">Import this account's EVM address</span> into Keplr as an existing wallet.</div>
                        </div>


                    </div>
                    <Button onClick={() => {
                        unmatchedError ? reconnectWallet() : (walletValid) ? connectWallet() : window.open(keplrDownloadLink, '_blank');
                    }} type="gradient">{unmatchedError ? 'Reconnect Keplr' : walletValid ? 'Connect Keplr' : 'Download Keplr'} <ArrowRight size={16} /></Button>

                </div>
            </div>  
    </Modal>
}

export default KeplrConnectModal