import useCosmosBalance from "@/hooks/cosmos/useCosmosBalance"
import useCosmos from "@/models/_global/cosmos"
import { useEffect } from "react"
import { connectWallet } from "@/utils/cosmos"
import useAccount from "@/hooks/useAccount"

const useCosmosUpdate = () => {

  const {
    hasConnectedWithKeplr,
  } = useCosmos();

  const { address, isSigned } = useAccount()

  useEffect(() => {
    if (hasConnectedWithKeplr && address && isSigned) {
      connectWallet({ mode: 'soft' });
    }
  }, [hasConnectedWithKeplr, address, isSigned]);

  // useCosmosCheck()
  // useGasInfo()
  useCosmosBalance()
  // useCosmosStakeBalance()
}

export default useCosmosUpdate