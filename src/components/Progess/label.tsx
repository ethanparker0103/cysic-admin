import { ENUM_ProgressStatus } from "@/components/Progess/icon"
import clsx from "clsx"
import { useMemo } from "react"


const basicClassName = `text-xs font-[500] w-fit`
const ProgressLabel = ({status, className, children}: {status: ENUM_ProgressStatus, className?: string, children?: any})=>{

    const classes = useMemo(()=>{
        switch(status){
            case ENUM_ProgressStatus.pending:
            case ENUM_ProgressStatus.finish:
                return 'text-white'
            case ENUM_ProgressStatus.ongoing:
                return 'text-[##D3D3D3]'
        }
    }, [status])


    return <div className={clsx(basicClassName, classes, className)}>{children}</div>
}

export default ProgressLabel