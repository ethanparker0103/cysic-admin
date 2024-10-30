import useAuth from "@/models/_global/auth";
import { useEffect, useRef } from "react";
import { useAccount, useSignMessage } from "wagmi";

const MiddlePage = ({ children }: any) => {
    const al = useRef(false)
    const { signMessageAsync } = useSignMessage()
    const { address, connector } = useAccount()
    const { authMap, updateAddress } = useAuth(); // 状态初始为null，表示正在检查
    const auth = authMap?.[address as string]?.auth

    useEffect(() => {
        if (!al.current && connector && address && !auth) {
            al.current = true
            signMessageAsync({ message: 'Welcome to Cysic！' }).then(res => {
                updateAddress(address, { auth: res })
            }).catch((e: any)=>{
                console.log('error', e)
            }).finally(()=>{al.current = false})
        }
    }, [connector, address, auth])


    return children
    // return auth ? children : <Spinner size="lg" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
}

export default MiddlePage