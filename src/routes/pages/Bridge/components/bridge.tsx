import Button from "@/components/Button";
import ConnectButton from "@/components/connectButton";
import Input from "@/components/Input";
import {
  bridgeConfig,
  bridgeToken,
  cysicChain,
  fromCysAbi,
  toCysAbi,
} from "@/config";
import useBridge from "@/models/bridge";
import ChainSelectModal from "./modal/chainSelectModal";
import TokenSelectModal from "./modal/tokenSelectModal";
import { getImageUrl, txAwait } from "@/utils/tools";
import BigNumber from "bignumber.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { erc20Abi, maxInt256 } from "viem";
import { useAccount, useReadContracts, useSwitchChain, useWriteContract } from "wagmi";

const BridgeC = () => {
  // 0 - deposit, 1 - withdraw
  const { bridgeDir, fromChainId, toChainId, fromTokenAddress, setState } =
    useBridge();
  const fromChain = bridgeConfig?.[fromChainId]?.chain;
  const toChain = cysicChain;
  const [bridgeAmount, setBridgeAmount] = useState<string | undefined>();
  const { address, chainId, chain } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const handleSwitch = () => {
    setState({
      bridgeDir: bridgeDir ? 0 : 1,
    });
  };

  const functionName = !bridgeDir ? "deposit" : "withdraw";
  const bridgeAbi = !bridgeDir ? toCysAbi : fromCysAbi;
  const topDir = !bridgeDir ? fromChain : toChain;
  const bottomDir = !bridgeDir ? toChain : fromChain;

  const topChainId = !bridgeDir ? fromChainId : toChainId;
  const topToken = bridgeToken?.[topChainId]?.[fromTokenAddress];
  const fromToken = bridgeToken?.[fromChainId]?.[fromTokenAddress];
  const spender = !bridgeDir
    ? fromToken?.toCysBridge
    : fromToken?.fromCysBridge;

  const { data: fromTokenData, refetch: fromTokenRefetch }: any = useReadContracts({
    contracts: [
      {
        address: fromTokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address as any],
        chainId: fromChainId
      },
      {
        address: fromTokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
        chainId: fromChainId
      },
      {
        address: fromTokenAddress,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address as any, spender as any],
        chainId: fromChainId
      },
    ],
  });

  const { data: cysicTokenData, refetch: cysicTokenRefetch }: any = useReadContracts({
    contracts: [
      {
        address: fromToken?.underlyingAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address as any],
        chainId: toChainId
      },
      {
        address: fromToken?.underlyingAddress,
        abi: erc20Abi,
        functionName: "decimals",
        chainId: toChainId
      },
      {
        address: fromToken?.underlyingAddress,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address as any, spender as any],
        chainId: toChainId
      },
    ],
  });


  const topTokenData = !bridgeDir ? fromTokenData : cysicTokenData

  const topTokenBalance_hm =
    BigNumber(topTokenData?.[0]?.result)
      .div(10 ** topTokenData?.[1]?.result)
      .toString() || "0";
  const topNeedApprove = BigNumber(bridgeAmount || 0).gt(topTokenData?.[2]?.result);
  const topNeedSwitchChain = topChainId != chainId

  const { switchChainAsync } = useSwitchChain()

  const handleClick = async (needLoading: any) => {
    try {
      if (topNeedSwitchChain) {
        await switchChainAsync({ chainId: topChainId })
        return
      }

      const tokenAddress = !bridgeDir ? fromToken?.address : fromToken?.underlyingAddress
      const decimal = !bridgeDir ? fromToken?.decimal : fromToken?.decimal
      if (topNeedApprove) {
        const hash = await writeContractAsync({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [spender as any, maxInt256],
        });

        toast.success('Approve Successfully')
        await txAwait(hash, chain)
        return;
      }

      const args = bridgeDir
        ? [
          fromToken?.address,
          BigNumber(bridgeAmount || "0")
            .multipliedBy(10 ** decimal)
            .toString(),
          bottomDir?.id,
          address
        ]
        : [
          tokenAddress,
          BigNumber(bridgeAmount || "0")
            .multipliedBy(10 ** decimal)
            .toString(),
          address
        ];

      const hash = await writeContractAsync({
        address: spender,
        abi: bridgeAbi,
        functionName: functionName,
        args: args,
      });
      await txAwait(hash, chain)
      toast.success('Bridge Successfully')
    } catch (e: any) {
      console.log('error', e)
      toast.error(e?.msg || e?.shortMessage || e?.message || 'Failed')
    } finally {
      fromTokenRefetch?.();
      cysicTokenRefetch?.();
      needLoading?.();
    }
  };

  return (
    <>
      <div className="border border-[#00F0FF4D] rounded-[20px] bg-[#10141A] p-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="border border-[#273345] rounded-[12px] p-6 flex flex-col gap-4">
              <div className="text-[#A1A1AA] text-sm">From</div>
              <div
                className="cursor-pointer flex items-center gap-2"
                onClick={() => {
                  dispatchEvent(
                    new CustomEvent("modal_chain_select_visible", {
                      detail: { visible: true },
                    })
                  );
                }}
              >
                <img
                  className="size-6 rounded-full"
                  src={getImageUrl("@/assets/images/tokens/CYS.svg")}
                />
                <span className="text-base">{topDir?.name}</span>
                {!bridgeDir ? (
                  <svg
                    className="size-5"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.3033 8.44661L10 13.7499L4.6967 8.44661"
                      stroke="#737373"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </div>
            </div>
            <svg
              onClick={handleSwitch}
              className="self-center cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3522_1909)">
                <path
                  d="M-5.24537e-07 12C-8.1423e-07 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 -2.34843e-07 12 -5.24537e-07C5.37258 -8.1423e-07 -2.34843e-07 5.37258 -5.24537e-07 12Z"
                  fill="#00F0FF"
                />
                <path
                  d="M16 18L16 11.162C15.9996 10.2413 15.7096 9.34404 15.1713 8.59714C14.6329 7.85025 13.8733 7.29152 13 7"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 16L16 18L14 16M8 6L8 12.838C8.00045 13.7587 8.29036 14.656 8.82873 15.4029C9.3671 16.1498 10.1267 16.7085 11 17"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 8L8 6L10 8"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3522_1909">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(24) rotate(90)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div className="border border-[#273345] rounded-[12px] p-6 flex flex-col gap-4">
              <div className="text-[#A1A1AA] text-sm">To</div>
              <div className="cursor-pointer flex items-center gap-2"
                onClick={() => {
                  if (!bridgeDir) return;
                  dispatchEvent(
                    new CustomEvent("modal_chain_select_visible", {
                      detail: { visible: true },
                    })
                  );
                }}>
                <img
                  className="size-6 rounded-full"
                  src={getImageUrl("@/assets/images/tokens/CYS.svg")}
                />
                <span className="text-base">{bottomDir?.name}</span>
                {bridgeDir ? (
                  <svg
                    className="size-5"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.3033 8.44661L10 13.7499L4.6967 8.44661"
                      stroke="#737373"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="border border-[#273345] rounded-[12px] p-6 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="text-[#A1A1AA] text-sm">Amount</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#A1A1AA]">
                    Balance: {+topTokenBalance_hm ? topTokenBalance_hm : '-'}
                  </span>
                  <Button
                    onClick={() => {
                      setBridgeAmount(topTokenBalance_hm);
                    }}
                    type="ghost"
                    className="px-0 text-[#00F0FF] text-sm"
                  >
                    Max
                  </Button>
                </div>
              </div>

              <Input
                value={bridgeAmount}
                onChange={setBridgeAmount}
                type="text"
                suffix={
                  <div
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      dispatchEvent(
                        new CustomEvent("modal_token_select_visible", {
                          detail: { visible: true },
                        })
                      );
                    }}
                  >
                    <img
                      className="size-6 rounded-full"
                      src={getImageUrl("@/assets/images/tokens/CYS.svg")}
                    />
                    <span className="text-base">{fromToken?.symbol}</span>
                    <svg
                      className="size-5"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.3033 8.44661L10 13.7499L4.6967 8.44661"
                        stroke="#737373"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                }
                placeholder="0"
                className="!text-[36px] p-0 [&_input]:flex-1 "
              />
            </div>
            <span>You will receive: {bridgeAmount || '-'}</span>
          </div>

          {chainId && address ? (
            <Button onClick={handleClick} type="gradient" needLoading>
              {topNeedSwitchChain ? 'Switch Network' : topNeedApprove ? "Approve" : "Bridge"}
            </Button>
          ) : (
            <ConnectButton className="w-full"/>
          )}
        </div>
      </div>

      <ChainSelectModal />
      <TokenSelectModal />
    </>
  );
};

export default BridgeC;
