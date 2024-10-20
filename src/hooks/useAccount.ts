import { useAccount as useWagmiAccount } from 'wagmi'
const useAccount = ()=>{
    const props = useWagmiAccount()

    return props
    // address, isConnected, isConnecting, chain, chainId, connector

    // return { address: props?.address , ...props }
}

export default useAccount