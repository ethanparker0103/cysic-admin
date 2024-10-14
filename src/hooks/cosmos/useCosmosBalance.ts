import useCosmos from "@/models/_global/cosmos"
import { useRequest } from "ahooks"
import BigNumber from "bignumber.js"

const basicDecimaal = 18

const useCosmosBalance = ()=>{
    const { address, connector, setState } = useCosmos()
    useRequest(()=>{
        return connector?.['getAllBalances']?.(address)
    }, {
        ready: !!connector && !!address,
        refreshDeps: [connector, address],
        onSuccess(e: any){
            const res = e?.reduce((prev, next)=>{
                if(!prev?.[next?.denom]){
                    prev[next?.denom] = {}
                }

                prev[next?.denom].amount = next?.amount
                prev[next?.denom].denom = next?.denom
                prev[next?.denom].decimal = basicDecimaal
                prev[next?.denom].hm_amount = BigNumber(next?.amount).div(10**basicDecimaal).toString()

                return prev
            }, {})

            setState({
                balanceMap: res
            })

        }
    })
}
export default useCosmosBalance