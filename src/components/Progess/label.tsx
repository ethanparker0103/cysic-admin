import { ENUM_ProgressStatus } from "@/components/Progess/icon"
import clsx from "clsx"
import { useMemo } from "react"


const basicClassName = `px-2 py-1 text-base font-[500] rounded-full w-fit`
const ProgressLabel = ({status, className, children}: {status: ENUM_ProgressStatus, className?: string, children?: any})=>{

    const classes = useMemo(()=>{
        switch(status){
            case ENUM_ProgressStatus.pending:
            case ENUM_ProgressStatus.finish:
                return 'text-[#A3A3A3] bg-[#FFFFFF1F]'
            case ENUM_ProgressStatus.ongoing:
                return 'text-[#000] bg-[#00F0FF]'
        }
    }, [status])


    return <div className={clsx(basicClassName, classes, className)}>{children}</div>
}

export default ProgressLabel