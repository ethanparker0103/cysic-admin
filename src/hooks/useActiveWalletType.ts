
// connectorType

import { useWallets } from "@privy-io/react-auth"
import { useAccount } from "wagmi"

// injected / coinbase / walletConnect / privy / embedded
const useActiveWalletType = ()=>{
    const {address} = useAccount()
    const {wallets} = useWallets()
    const activeWallet = wallets?.find(i=>i?.address?.toLowerCase() == address?.toLowerCase())

    return {
        wallet: activeWallet,
        connectorType: activeWallet?.connectorType,
        isEmbed: activeWallet?.connectorType == 'embedded',
        isHd: activeWallet?.connectorType != 'embedded',
    }

}
export {useActiveWalletType}