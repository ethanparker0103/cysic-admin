import useCosmosBalance from "@/hooks/cosmos/useCosmosBalance"
import useGasInfo from "@/hooks/cosmos/useGasInfo"

const useCosmosUpdate = ()=>{
    useGasInfo()
    useCosmosBalance()
}

export default useCosmosUpdate