import { EVM_CHAIN_ID_MAP } from "@/config";
import { PublicClient, TransactionNotFoundError, createPublicClient, http } from "viem";
import { useAccount, useSwitchChain, useWriteContract as useWagmiWriteContract } from "wagmi";

  
  export const txAwaitV1 = async (
    hash: string | `0x${string}`,
    publicClient?: PublicClient,
    functionName?: string
  ) => {
    if (!hash) {
      throw new Error("Invalid hash");
    }
  
    try {
      const transaction = await publicClient?.waitForTransactionReceipt({
        hash: hash as `0x${string}`,
        pollingInterval: 12_000,
        retryDelay: 10_000,
        confirmations: 3,
      });
      if (transaction?.status !== "success") {
        throw new Error("Transaction Failed");
      }

      return transaction;
    } catch (e) {
      if (e instanceof TransactionNotFoundError) {
        const res: any = await txAwait(hash, publicClient, functionName);
        return res;
      }
  
      throw e;
    }
  };
  
  export const txAwait = async (
    hash: string | `0x${string}`,
    publicClient?: PublicClient,
  ) => {
    if (!hash) {
      throw new Error("Invalid hash");
    }
  
    // 使用轮询次数而不是超时时间
    const maxRetries = 200; // 最大轮询次数
    const pollingInterval = 6_000; // 轮询间隔
    let retryCount = 0;
  
    while (retryCount < maxRetries) {
      try {
        // 只发送一个 RPC 请求获取交易收据
        const transaction = await publicClient?.getTransactionReceipt({
          hash: hash as `0x${string}`,
        });
  
        // 如果找到收据
        if (transaction) {
  
          return transaction;
        }
  
        // 增加重试计数
        retryCount++;
        console.log(`Transaction not found, retry ${retryCount}/${maxRetries}, chainId: ${publicClient?.chain?.id}, rpc: ${publicClient?.chain?.rpcUrls?.default.http[0]}`);
  
        // 如果没有找到收据，等待一段时间后再次查询
        await new Promise((resolve) => setTimeout(resolve, pollingInterval));
      } catch (e: any) {
        if (e?.toString()?.includes?.("Transaction Failed")) {
          throw e;
        }
  
        // 如果是交易未找到错误，等待后重试
        // if (e instanceof TransactionNotFoundError ) {
        retryCount++;
        console.log(
          `Transaction not found error, retry ${retryCount}/${maxRetries}, chainId: ${publicClient?.chain?.id}, rpc: ${publicClient?.chain?.rpcUrls?.default.http[0]}`
        );
        await new Promise((resolve) => setTimeout(resolve, pollingInterval));
        continue;
        // }
  
        // 其他错误设置为 unknown 状态，因为我们不确定交易状态
        // await useTxStore.getState().updateTransactionStatus(hash, "unknown");
        // throw e;
      }
    }
  
    // 超出最大重试次数
    console.log(`Exceeded maximum retries (${maxRetries}) for transaction`);  
    throw new Error(`Transaction receipt not found after ${maxRetries} retries`);
  };
  
  // TODO Interface
  export const useWriteContract = (): any => {
    const { address, chainId } = useAccount();
    const { switchChainAsync } = useSwitchChain();
    const wagmiProps = useWagmiWriteContract();

  
    const writeContractAsync = async (props: any) => {
      const { ...params } = props; // 移除 id 参数，只保留 parent
  
      if (params?.chainId) {
        if (Number(chainId) !== +params.chainId) {
          await switchChainAsync({
            chainId: Number(params.chainId),
          });
        }
      }
  
      const txHash = await wagmiProps.writeContractAsync(params);
  
      const chain = EVM_CHAIN_ID_MAP[params.chainId as keyof typeof EVM_CHAIN_ID_MAP]
      const client = createPublicClient({
          chain: chain,
          transport: http(),
      })
  
      const tx = await txAwait(txHash, client);
      return txHash;
    };
  
    return {
      ...wagmiProps,
      writeContractAsync,
    };
  };
  