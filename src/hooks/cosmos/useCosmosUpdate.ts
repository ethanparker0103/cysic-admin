import useCosmosBalance from "@/hooks/cosmos/useCosmosBalance"
import useCosmos from "@/models/_global/cosmos"
import { useEffect } from "react"
import { connectWallet } from "@/utils/cosmos"

const useCosmosUpdate = ()=>{

    const {
        hasConnectedWithKeplr,
      } = useCosmos();
    
      useEffect(() => {
        if (hasConnectedWithKeplr) {
          connectWallet({mode: 'soft'});
        }
      }, [hasConnectedWithKeplr]);

    // useCosmosCheck()
    // useGasInfo()
    useCosmosBalance()
    // useCosmosStakeBalance()
}

export default useCosmosUpdate