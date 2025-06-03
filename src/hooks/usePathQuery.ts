import useRefCode from "@/hooks/useRefCode";
import useRef from "@/models/_global/ref";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const useRefCode = () => {
    const { refCode, setRefCode } = useRef();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const refParam = searchParams.get('ref');

        if (refParam) {
            setRefCode(refParam);
        }
    }, [location?.search, setRefCode]);

    return { refCode, setRefCode };
};


const useBindPathQuery = () => {

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const bindStatus = searchParams.get('bindStatus');
        const bindType = searchParams.get('bindType');

        if (bindType) {
            if (bindStatus == '0') {
                toast.success(`${bindType?.toUpperCase()} bind success`)
            } else {
                toast.error(`Duplicate account, ${bindType?.toUpperCase()} bind failed`)
            }
        }
    }, [location?.search]);
}

const usePathQuery = () => {
    useRefCode()
    useBindPathQuery()
}
export default usePathQuery