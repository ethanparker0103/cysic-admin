import { shortStr } from "@/utils/tools";
import Spinner from "../spinner";
import { useEffect } from "react";
import Button from "@/components/Button";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { connectWallet } from "@/utils/cosmos";
import useCosmos from "@/models/_global/cosmos";


export default function ConnectCosmosButton({className, content}: any) {
  const { t } = useTranslation();
  const { hasConnectedWithKeplr, address, isConnected, isConnecting, chainId, connector } = useCosmos();

  useEffect(()=>{
    if(isConnected){
      window.addEventListener("keplr_keystorechange", () => {
        console.log("Key store in Keplr is changed. You may need to refetch the account info.")
    }) 
    }
  }, [isConnected])
  useEffect(()=>{
    if(hasConnectedWithKeplr){
      connectWallet()
    }
  }, [hasConnectedWithKeplr])

  if (isConnected) {
    return (
      <div className="flex flex-row items-center gap-[0.75rem]">
        <div
          // onClick={handleOpen}
          style={{
            wordBreak: 'break-word'
          }}
          className={clsx("w-fit break-words rounded-[6px] bg-[#FFFFFF1F] cursor-pointer flex flex-row items-center gap-3 flex", isMobile ? "px-2 h-8" : "px-3 py-1 h-10")}
        >
          <img
            className="size-5"
            src={connector?.signer?.keplr?.eip6963ProviderInfo?.icon}
          />
          {
            isMobile ? null : (<span className="text-sm font-[500]">
              {shortStr(address as string, isMobile ? 6 : 10)}
            </span>)
          }
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      type="normal"
      style={{
        background: 'linear-gradient(83.04deg, #8624D3 5.44%, #54F2FF 54.92%)'
      }}
      className={clsx("w-fit cursor-pointer flex flex-row items-center justify-center gap-1 rounded-[6px] !text-[#000] ", isMobile ? "!min-h-8 !h-8 !px-2" : "px-4 !min-h-10 !h-10 py-[0.625rem]", className)}
    >
      {isConnecting ? <Spinner className="stroke-[#000] " /> : null}
      {
        content || <span className="text-sm font-[500]">{t('Connect Keplr')}</span>
      }
      
    </Button>
  );
}
