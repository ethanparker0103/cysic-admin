import useMetadata from "@/hooks/useMetadata";
import useAuth from "@/models/_global/auth";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const whiteList = ['about', 'faq', 'aleopool', 'register']?.map(i => [i, '/' + i]).flat(Infinity)

const useAuthCheck = () => {
    // const [from, setFrom] = useState<any>()
    useMetadata()
    const from = useRef<string>()
    // const setFrom = v => from.current = v
    const { pathname } = useLocation()
    const navigate = useNavigate();
    const { authMap, currentAddr, setState, createAddress, updateAddress } = useAuth();
    const { address } = useAccount()

    const auth = authMap?.[address || '']?.auth
    const valid = authMap?.[address || '']?.valid

    useEffect(() => {
        setState({ currentAddr: address })
        if (address && !authMap?.[address]) {
            createAddress(address)
        }
    }, [authMap, address])

    useEffect(() => {
        if ((!auth || !valid) && !whiteList.includes(pathname)) {
            navigate('/referral/invite')
        }
    }, [!auth, valid, pathname])

    useEffect(()=>{
        if(!['/my', '/referral/invite'].includes(pathname)){
            // setFrom(pathname)
            from.current = pathname
        }
    }, [pathname])

    useEffect(() => {
        if (auth) {
            // dispatchEvent(new CustomEvent('refresh_profile'))
            axios.get(`/api/v1/referral/${address}/checkBind`).then((res: any) => {
                // 响应成功
                if (!res?.data?.bind) return;

                if (res?.data?.bind) {
                    updateAddress(address, { valid: true })
                    dispatchEvent(new CustomEvent('refresh_profile'))
                }


                if (from?.current?.includes('referral/invite') || from?.current == '/') {
                    navigate('/my', { replace: true })
                } else {
                    navigate(from?.current || '/my', { replace: true })
                }
            })
        }
    }, [auth, from])

    console.log('from', from, pathname)

};

export default useAuthCheck