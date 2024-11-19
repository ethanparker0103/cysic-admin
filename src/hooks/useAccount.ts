import useAuth from '@/models/_global/auth';
import { useAccount as useWagmiAccount } from 'wagmi'
const useAccount = () => {
    const props = useWagmiAccount()
    const { authMap } = useAuth(); // 状态初始为null，表示正在检查
    const valid = authMap?.[props?.address as string]?.valid


    return valid ? props : {
        address: undefined,
        addresses: undefined,
        chain: undefined,
        chainId: undefined,
        connector: undefined,
        isConnected: false,
        isReconnecting: false,
        isConnecting: false,
        isDisconnected: true,
        status: "disconnected",
    }
    // address, isConnected, isConnecting, chain, chainId, connector

    // return { address: props?.address , ...props }
}

export default useAccount