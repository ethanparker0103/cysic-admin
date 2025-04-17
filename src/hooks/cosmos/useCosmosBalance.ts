// @ts-nocheck
import { blockTime, cysicTestnet } from "@/config"
import useCosmos from "@/models/_global/cosmos"
import { useEventListener, useRequest } from "ahooks"
import BigNumber from "bignumber.js"
import { setupDepositExtension } from "@/utils/cysic-query"
import { DepositType } from "@/utils/cysic-msg"
import { QueryClient } from "@cosmjs/stargate"
import { CometClient, connectComet, Tendermint34Client } from "@cosmjs/tendermint-rpc";



const basicDecimaal = 18

const useCosmosBalance = () => {
    const { address, connector, unmatchedAddressWithEVM, setState } = useCosmos()
    
    // 获取余额信息
    const { run } = useRequest(() => {
        if (unmatchedAddressWithEVM) {
            setState({
                balanceMap: undefined,
                depositMap: undefined // 同时清空存款信息
            })

            throw new Error('Unmatched Address')
        }
        return connector?.['getAllBalances']?.(address)
    }, {
        ready: !!connector && !!address,
        refreshDeps: [connector, address, unmatchedAddressWithEVM],
        pollingInterval: blockTime.long,
        onSuccess(e: any) {
            const res = e?.reduce((prev: any, next: number) => {
                if (!prev?.[next?.denom]) {
                    prev[next?.denom] = {}
                }

                prev[next?.denom].amount = next?.amount
                prev[next?.denom].denom = next?.denom
                prev[next?.denom].decimal = basicDecimaal
                prev[next?.denom].hm_amount = BigNumber(next?.amount).div(10 ** basicDecimaal).toString()

                return prev
            }, {})

            setState({
                balanceMap: res
            })

            // 成功获取余额后，获取存款信息
            fetchDepositInfo()
        }
    })

    // 获取存款信息
    const fetchDepositInfo = async () => {
        if (!connector || !address) return;
        
        try {
            // 创建扩展
            // const tmClient = await Tendermint34Client.connect(cysicTestnet.rpc);
            const tmClient = await connectComet(cysicTestnet.rpc);
            const client = new QueryClient(tmClient);

            const depositExtension = setupDepositExtension(client);
            
            // 获取验证者和证明者的存款
            const [proverResult] = await Promise.allSettled([
                depositExtension.distribution.prover(address),
                // depositExtension.distribution.verifier(address)
            ]);

            console.log('proverResult', proverResult)
            
            // 处理存款结果
            const depositMap: any = {};
            
            // 处理验证者存款
            if (proverResult.status === 'fulfilled' && proverResult.value) {
                const proverAmount = proverResult.value.deposit_amount || "0";
                depositMap.proverAmount = proverAmount;
                depositMap.proverHmAmount = BigNumber(proverAmount).div(10 ** basicDecimaal).toString();
            }
            
            // 更新状态
            setState({
                depositMap
            });
            
            console.log("Deposit info updated:", depositMap);
        } catch (error) {
            console.error("Failed to fetch deposit info:", error);
        }
    };

    // 监听刷新事件
    useEventListener('refresh_cosmosBalance' as string, () => {
        run()
    })
    
    // 增加监听刷新存款信息的事件
    useEventListener('refresh_depositInfo' as string, () => {
        fetchDepositInfo()
    })
}

export default useCosmosBalance