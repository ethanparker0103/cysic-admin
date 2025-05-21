
import { LoginModalOptions, usePrivy as usePrivyAuth } from "@privy-io/react-auth";

const usePrivy = () => {
    const { login: _login, logout, user, connectWallet, linkEmail, linkGoogle, linkTwitter, linkDiscord, unlinkDiscord, unlinkGoogle, unlinkTwitter } = usePrivyAuth();

    // login() | login('wallet') | login({loginMethods: ['wallet', 'discord']})
    const login = async (props: LoginModalOptions) => {
        // set default as 'wallet'
        const innerType = typeof props == 'string' ? [props] : (props?.loginMethods || ['wallet'])

        // WARNING: One Type At A Time, Simple Handler, if includes wallet, then connectWallet, else _login
        // SO if you want to login with others, you need to pass in the loginMethods array, and exclude 'wallet'
        const ifWalletTypeExistInType = innerType?.includes('wallet')

        if(ifWalletTypeExistInType){
            return connectWallet()
        }else{
            return _login({
                loginMethods: innerType
            })
        }
    }

    return {
        login,
        logout,
        user,
        connectWallet,
        linkEmail,
        linkGoogle,
        linkTwitter,
        linkDiscord,
        unlinkDiscord,
        unlinkGoogle,
        unlinkTwitter
    }
}
export { usePrivy };