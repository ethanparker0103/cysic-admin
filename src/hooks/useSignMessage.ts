import { useSignMessage as useWagmiSignMessage } from 'wagmi'
import { useSignMessage as usePrivySignMessage } from '@privy-io/react-auth'
import {useActiveWalletType} from './useActiveWalletType'

const useSignMessage = () => {
    const { signMessageAsync: signMessageAsyncWagmi } = useWagmiSignMessage()
    const { signMessage } = usePrivySignMessage()

    const { isEmbed } = useActiveWalletType()

    const signMessageAsync = async (str: string) => {
        if (isEmbed) {
            // Type error: Argument of type 'string' is not assignable to parameter of type '{ message: string; }'.
            // strange error
            return await signMessage(str as any)
        }
        return await signMessageAsyncWagmi({ message: str })
    }

    return {
        signMessageAsync
    }
}

export { useSignMessage }