import useCosmosBalance from "@/hooks/cosmos/useCosmosBalance"
import useCosmosStakeBalance from "@/hooks/cosmos/useCosmosStakeBalance"
import useGasInfo from "@/hooks/cosmos/useGasInfo"

const useCosmosUpdate = ()=>{
    useGasInfo()
    useCosmosBalance()
    useCosmosStakeBalance()
}

export default useCosmosUpdate