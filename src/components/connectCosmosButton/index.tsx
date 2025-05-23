import Spinner from "../spinner";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { connectWallet } from "@/utils/cosmos";
import useCosmos from "@/models/_global/cosmos";
import { shortStr } from "@/utils/tools";
import { getImageUrl } from "@/utils/tools";
import useAccount from "@/hooks/useAccount";

export default function ConnectCosmosButton({ className, content }: any) {
  const { isConnected, isConnecting, init } = useCosmos();
  const { cosmosAddress } = useAccount();
  const [loading, setLoading] = useState(false);

  const handleDisconnect = () => {
    setLoading(true);
    init();
    setLoading(false);
  };

  const handleConnect = async () => {
    if (isConnected) {
      await handleDisconnect();
    } else {
      await connectWallet();
    }
  };

  return (
    <div className="py-4 px-6 flex items-center justify-between gap-2 w-full" onClick={handleConnect}>
      <div className="flex items-center gap-2">
        <img
          src={getImageUrl("@/assets/images/wallet/keplr.png")}
          className="rounded-full w-[1.875rem] h-[1.875rem]"
        />
        <span className="text-sm text-sub font-[400] uppercase">
          {shortStr(cosmosAddress || "-", 10)}
        </span>
      </div>

      {isConnected ? (
        <div  className="">
          disconnect
        </div>
      ) : (
        <Button
          loading={loading}
          needLoading
          className="!bg-[transparent] flex items-center justify-end gap-2 !px-0"
        >
          {isConnecting ? <Spinner className="stroke-black " /> : null}
          {content || <span className="text-sm uppercase">Connect Keplr</span>}
        </Button>
      )}
    </div>
  );
}
