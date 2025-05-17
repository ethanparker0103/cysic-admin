import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { connectWallet } from "@/utils/cosmos";
import { keplrDownloadLink } from "@/config";
import useCosmos from "@/models/_global/cosmos";
import { useEffect } from "react";


const CheckKeplrModal = () => {
  const { address } = useCosmos()
  // 获取模态框状态
  const { visible, setVisible, data } = useModalState({
    eventName: "modal_check_keplr_visible",
  });

  const handleClose = () => {
    setVisible(false);
  };
  useEffect(()=>{
    if(address){
      handleClose()
    }
  }, [address])

  return (
    <Modal
      isOpen={visible}
      onClose={handleClose}
      className="max-w-[600px]"
      title="Connect your keplr"
    >
      <div className="flex flex-col gap-6">
        <span className="text-base font-[400]">To unlock Staking and Reserving $CYS, your need to connect your Keplr wallet to continue.</span>
        <Button onClick={connectWallet} type="light" className="w-full py-5 text-base font-normal">Connect Keplr</Button>
        <span className="text-base font-[400]">Not yet setup your Keplr wallet? Simply follow these 2 steps:</span>
        

        <div className="flex flex-col gap-6">
            <span>👉 1. Download Keplr wallet </span>
            <a href={keplrDownloadLink} target="_blank" rel="noreferrer"><Button type="solid" className="w-full py-5 text-base font-normal">Download Keplr</Button></a>
            <span>👉 2. <span className="font-bold">Import this account’s EVM address </span> into Keplr as an existing wallet.</span>

        </div>
      </div>
    </Modal>
  );
};

export default CheckKeplrModal;