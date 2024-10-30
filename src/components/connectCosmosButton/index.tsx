import { shortStr } from "@/utils/tools";
import Spinner from "../spinner";
import { useEffect } from "react";
import Button from "@/components/Button";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { connectWallet } from "@/utils/cosmos";
import useCosmos from "@/models/_global/cosmos";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import copy from "copy-to-clipboard";
import toast from "react-simple-toasts";
import useModalState from "@/hooks/useModalState";

export default function ConnectCosmosButton({ className, content }: any) {
  const { dispatch } = useModalState({eventName: 'modal_download_keplr_visible'})
  const { t } = useTranslation();
  const {
    hasConnectedWithKeplr,
    address,
    isConnected,
    isConnecting,
    chainId,
    connector,
  } = useCosmos();

  useEffect(() => {
    if (isConnected) {
      window.addEventListener("keplr_keystorechange", () => {
        console.log(
          "Key store in Keplr is changed. You may need to refetch the account info."
        );
        connectWallet()
      });
    }
  }, [isConnected]);
  useEffect(() => {
    if (hasConnectedWithKeplr) {
      connectWallet();
    }
  }, [hasConnectedWithKeplr]);

  if (isConnected) {
    return (
      <Dropdown>
        <DropdownTrigger>
          <div className="flex flex-row items-center gap-[0.75rem]">
            <div
              // onClick={handleOpen}
              style={{
                wordBreak: "break-word",
              }}
              className={clsx(
                "w-fit break-words rounded-full gradient-border cursor-pointer flex flex-row items-center gap-3 flex",
                isMobile ? "px-2 h-8" : "px-3 py-1 h-10"
              )}
            >
              <img
                className="size-5"
                src={connector?.signer?.keplr?.eip6963ProviderInfo?.icon}
              />
              {isMobile ? null : (
                <span className="text-sm font-[500]">
                  {shortStr(address as string, isMobile ? 6 : 10)}
                </span>
              )}
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="copy">
            <div
              onClick={() => {
                copy(address);
                toast("Copied");
              }}
            >
              Copy Address
            </div>
          </DropdownItem>
          <DropdownItem onClick={()=>{
            console.log('connector', connector)
            connector?.disable?.()
          }} key="disconnect" className="text-danger" color="danger">
            Disconnect
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <Button
      onClick={()=>dispatch({visible: true})}
      type="gradient"
      className={clsx(
        "w-fit cursor-pointer flex flex-row items-center justify-center gap-1 rounded-[6px] !text-[#000] ",
        isMobile ? "!min-h-8 !h-8 !px-2" : "px-4 !min-h-10 !h-10 py-[0.625rem]",
        className
      )}
    >
      {isConnecting ? <Spinner className="stroke-[#000] " /> : null}
      {content || (
        <span className="text-sm font-[500]">{t("Connect Keplr")}</span>
      )}
    </Button>
  );
}
