import Spinner from "../spinner";
import { useEffect } from "react";
import Button from "@/components/Button";
import { connectWallet } from "@/utils/cosmos";
import useCosmos from "@/models/_global/cosmos";



export default function ConnectCosmosButton({ className, content }: any) {

  const {
    isConnected,
    isConnecting,
    init,
  } = useCosmos();

  const handleDisconnect = ()=>{
    init()
  }

  if (isConnected) {
    return (
      <div onClick={handleDisconnect} className="">disconnect</div>
    )
  }

  return (
    <Button
      className="!bg-[transparent] flex items-center justify-end gap-2"
      onClick={connectWallet}
    >
      {isConnecting ? <Spinner className="stroke-[#000] " /> : null}
      {content || (
        <span className="desc text-sm font-[500]">Connect Keplr</span>
      )}
    </Button>
  );
}
