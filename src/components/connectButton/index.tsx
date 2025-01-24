import { getImageUrl, shortStr } from "@/utils/tools";
import { useAccount, useConfig, useSignMessage, useSwitchChain } from "wagmi";
import Spinner from "../spinner";
import { useEffect, useMemo, useState } from "react";
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import Button from "@/components/Button";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import useAuth from "@/models/_global/auth";
import { loginSignContent } from "@/config";
import { useAppKit } from "@reown/appkit/react";
// import useAccount from "@/hooks/useAccount";

export default function ConnectButton({ className, content }: any) {
  const { authMap, updateAddress } = useAuth();
  const { address, isConnected, isConnecting, chain, chainId, connector } = useAccount();

  const auth = authMap?.[address as string]?.auth

  const { t } = useTranslation();

  const { chains } = useConfig();

  const { switchChainAsync: switchNetworkAsync } = useSwitchChain();
  const unsupported = useMemo(
    () => !chains.find((i) => i.id === chain?.id),
    [chain?.id, chains]
  );

  // const { disconnect } = useDisconnect()

  // const { openConnectModal: open } = useConnectModal();
  // const { openAccountModal } = useAccountModal();
  const { open } = useAppKit()
  const openAccountModal = ()=>{
    open({ view: 'Account' })
  }

  const [tokenSelect, setTokenSelect] = useState<number>();
  const handleTokenChange = async (v: number) => {
    try {
      if (chainId !== v) {
        await switchNetworkAsync?.({ chainId: v });
      }
      setTokenSelect(v);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!tokenSelect && chainId) {
      handleTokenChange(+chainId);
    }
  }, [chainId, tokenSelect]);

  // const tokenSelects = useMemo(
  //   () =>
  //     chains?.map((i) => {
  //       return {
  //         ...chains,
  //         text: i.name,
  //         value: i.id,
  //         prefix: (
  //           <img
  //             className="size-5"
  //             src={getImageUrl("@/assets/images/network/eth.svg")}
  //           />
  //         ),
  //       };
  //     }),
  //   [chains]
  // );

  const { signMessageAsync } = useSignMessage()
  const handleOpen = () => {
    if (isConnected) {
      if (!auth) {
        signMessageAsync({ message: loginSignContent }).then(res => {
          updateAddress(address, { auth: res })
        })
        return;
      }
      openAccountModal?.();
      return;
    }
    open?.();
  };

  const setupDefaultNetwork = () => {
    switchNetworkAsync?.({ chainId: +chains?.[0].id });
  };

  if (isConnected) {
    return (
      <div className="flex flex-row items-center gap-[0.75rem]">
        {unsupported ? (
          <div
            onClick={setupDefaultNetwork}
            className="h-[2.5rem] cursor-pointer flex flex-row items-center justify-center rounded-[0.75rem] py-[0.6875rem] px-[1rem] bg-[#0000000D] flex flex-row items-center gap-[0.375rem]"
          >
            <svg
              className="w-[1.5rem] h-[1.5rem]"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.7167 16.6667L10.4998 4.16667L3.28292 16.6667H17.7167ZM11.9432 3.33333C11.3017 2.22222 9.69792 2.22222 9.05643 3.33333L1.83955 15.8333C1.19805 16.9444 1.99992 18.3333 3.28292 18.3333H17.7167C18.9997 18.3333 19.8016 16.9444 19.1601 15.8333L11.9432 3.33333Z"
                fill="#FB923C"
              />
              <path
                d="M9.66634 14.5833C9.66634 14.1231 10.0394 13.75 10.4997 13.75C10.9599 13.75 11.333 14.1231 11.333 14.5833C11.333 15.0436 10.9599 15.4167 10.4997 15.4167C10.0394 15.4167 9.66634 15.0436 9.66634 14.5833Z"
                fill="#FB923C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.66634 12.5V8.33333H11.333V12.5H9.66634Z"
                fill="#FB923C"
              />
            </svg>
            <span>Error Network</span>
          </div>
        ) : null}

        <div
          onClick={handleOpen}
          style={{
            wordBreak: 'break-word'
          }}
          className={clsx("break-words rounded-full gradient-border cursor-pointer flex flex-row items-center gap-3 flex", isMobile ? "justify-center size-8" : "w-fit px-3 py-1 h-10")}
        >
          {auth ? <img
            className="size-5"
            src={connector?.icon || getImageUrl(`@/assets/images/wallet/${connector?.id}.svg`)}
          /> : <svg className="size-5" stroke="#FFA82D" fill="#FFA82D" strokeWidth="0" viewBox="0 0 256 256" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M235.07,189.09,147.61,37.22h0a22.75,22.75,0,0,0-39.22,0L20.93,189.09a21.53,21.53,0,0,0,0,21.72A22.35,22.35,0,0,0,40.55,222h174.9a22.35,22.35,0,0,0,19.6-11.19A21.53,21.53,0,0,0,235.07,189.09ZM224.66,204.8a10.46,10.46,0,0,1-9.21,5.2H40.55a10.46,10.46,0,0,1-9.21-5.2,9.51,9.51,0,0,1,0-9.72L118.79,43.21a10.75,10.75,0,0,1,18.42,0l87.46,151.87A9.51,9.51,0,0,1,224.66,204.8ZM122,144V104a6,6,0,0,1,12,0v40a6,6,0,0,1-12,0Zm16,36a10,10,0,1,1-10-10A10,10,0,0,1,138,180Z"></path></svg>}
          {
            isMobile ? null : (<span className={clsx("text-sm font-[500]")}>
              {auth ? shortStr(address as string, isMobile ? 6 : 10) : 'Please Sign to Continue'}
            </span>)
          }
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={handleOpen}
      type="gradient"
      className={clsx("w-fit cursor-pointer flex flex-row items-center justify-center gap-1 rounded-[6px] !text-[#000] ", isMobile ? "!min-h-8 !h-8 !px-2" : "px-4 !min-h-10 !h-10 py-[0.625rem]", className)}
    >
      {isConnecting ? <Spinner className="stroke-[#000] " /> : null}
      {
        content || <span className="text-sm font-[500]">{t('Connect Wallet')}</span>
      }

    </Button>
  );
}
