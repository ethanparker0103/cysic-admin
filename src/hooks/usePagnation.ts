import { commonPageSize } from "@/config";
import { useRequest } from "ahooks";
import BigNumber from "bignumber.js";
import { useState } from "react"

const usePagnation = (fn: any, options: any = {})=>{

    const [currentPage, setCurrentPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [totalPage, setTotalPage] = useState('0')

    const { data, ...props } = useRequest(() => {
        return fn?.(currentPage);
    }, {
        ...options,
        refreshDeps: [...(options?.refreshDeps ?? []), currentPage],
        onSuccess(e: any){
            options?.onSuccess?.(e);
            setTotal(e?.data?.total || e?.data?.totalCnt)
            setTotalPage(BigNumber(e?.data?.total).div(commonPageSize).toFixed(0, BigNumber.ROUND_CEIL))
        }
    });


    return {
        currentPage,
        setCurrentPage,
        total,
        setTotal,
        totalPage,
        setTotalPage,
        data,
        ...props
    }

}

export default usePagnation