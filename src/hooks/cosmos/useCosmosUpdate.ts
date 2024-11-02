import useCosmosBalance from "@/hooks/cosmos/useCosmosBalance"
import useCosmosStakeBalance from "@/hooks/cosmos/useCosmosStakeBalance"
import useGasInfo from "@/hooks/cosmos/useGasInfo"
import useCosmosCheck from "@/hooks/cosmos/useCosmosCheck"

const useCosmosUpdate = ()=>{
    useCosmosCheck()
    useGasInfo()
    useCosmosBalance()
    useCosmosStakeBalance()
}

export default useCosmosUpdate