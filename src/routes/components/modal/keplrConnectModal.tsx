import Button from "@/components/Button"
import useModalState from "@/hooks/useModalState"
import { keplrDownloadLink } from "@/config";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { connectWallet, updateProvider } from "@/utils/cosmos";
import { ArrowRight } from "lucide-react";
import useCosmos from "@/models/_global/cosmos";

const KeplrConnectModal = () => {
    const { visible, setVisible } = useModalState({eventName: 'modal_download_keplr_visible'})

    const [walletValid, setWalletValid] = useState(false)
    const { address } = useCosmos()

    useEffect(()=>{
        if(window?.keplr){
            setWalletValid(true)
            updateProvider()
        }
    }, [window?.keplr])


    useEffect(()=>{
        if(address && visible){
            setVisible(false)
        }
    }, [address, visible])


    return <Modal isOpen={visible} onClose={() => setVisible(false)} className="[&_button]:z-[2] max-w-[820px] border border-[#FFFFFF33]">
            <div className="flex justify-between bg-[url(@/assets/images/_global/keplr_download_bg.png)] bg-cover">
                <div className="w-[380px]" />
                <div className="w-[440px] p-10 flex flex-col gap-6 bg-[#0B0C0F] relative z-1">
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
                        walletValid ? connectWallet() : window.open(keplrDownloadLink, '_blank');
                    }} type="gradient">{walletValid ? 'Connect Keplr' : 'Download Keplr'} <ArrowRight size={16} /></Button>

                </div>
            </div>  
    </Modal>
}

export default KeplrConnectModal