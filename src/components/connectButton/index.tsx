import { getImageUrl, shortStr } from "@/utils/tools";
import { useAccount, useConfig, useSwitchChain } from "wagmi";
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

export default function ConnectButton({className, content}: any) {
  const { t } = useTranslation();

  const { address, isConnected, isConnecting, chain, chainId, connector } = useAccount();
  const { chains } = useConfig();

  const { switchChainAsync: switchNetworkAsync } = useSwitchChain();
  const unsupported = useMemo(
    () => !chains.find((i) => i.id === chain?.id),
    [chain?.id, chains]
  );

  // const { disconnect } = useDisconnect()

  const { openConnectModal: open } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
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

  const tokenSelects = useMemo(
    () =>
      chains?.map((i) => {
        return {
          ...chains,
          text: i.name,
          value: i.id,
          prefix: (
            <img
              className="size-5"
              src={getImageUrl("@/assets/images/network/eth.svg")}
            />
          ),
        };
      }),
    [chains]
  );

  const handleOpen = () => {
    if (isConnected) {
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
          className={clsx("w-fit break-words rounded-[6px] bg-[#FFFFFF1F] cursor-pointer flex flex-row items-center gap-3 flex", isMobile ? "px-2 h-8" : "px-3 py-1 h-10")}
        >
          <img
            className="size-5"
            src={connector?.icon || getImageUrl(`@/assets/images/wallet/${connector?.id}.svg`)}
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
      onClick={handleOpen}
      type="normal"
      style={{
        background: 'linear-gradient(83.04deg, #8624D3 5.44%, #54F2FF 54.92%)'
      }}
      className={clsx("w-fit cursor-pointer flex flex-row items-center justify-center gap-1 rounded-[6px] !text-[#000] ", isMobile ? "!min-h-8 !h-8 !px-2" : "px-4 !min-h-10 !h-10 py-[0.625rem]", className)}
    >
      {isConnecting ? <Spinner className="stroke-[#000] " /> : null}
      {
        content || <span className="text-sm font-[500]">{t('Connect Wallet')}</span>
      }
      
    </Button>
  );
}
