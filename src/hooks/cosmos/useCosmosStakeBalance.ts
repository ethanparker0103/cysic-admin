import useCosmos from "@/models/_global/cosmos"
import { useEventListener, useRequest } from "ahooks"
import BigNumber from "bignumber.js"

const basicDecimaal = 18

const useCosmosStakeBalance = ()=>{
    const { address, connector, setState } = useCosmos()
    const { run } = useRequest(()=>{
        // getDelegation
        return connector?.['getBalanceStaked']?.(address)
    }, {
        ready: !!connector && !!address,
        refreshDeps: [connector, address],
        onSuccess(e: any){
            const res = (Array.isArray(e) ? e : [e])?.reduce((prev, next)=>{
                if(!prev?.[next?.denom]){
                    prev[next?.denom] = {}
                }

                prev[next?.denom].amount = next?.amount
                prev[next?.denom].denom = next?.denom
                prev[next?.denom].decimal = basicDecimaal
                prev[next?.denom].hm_amount = BigNumber(next?.amount).div(10**basicDecimaal).toString()

                return prev
            }, {})


            console.log('stake balance', res)
            setState({
                stakeMap: res
            })

        }
    })


    useEventListener('refresh_cosmosBalance' as string, ()=>{
        run()
    })
}
export default useCosmosStakeBalance