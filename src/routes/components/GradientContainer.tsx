import clsx from "clsx"
import { cloneElement } from "react"

const GradientContainer = ({ className, children, ...props }: any) => {
    return <>
        <div className={clsx("gradient-border", className)} {...props}>
            {cloneElement(children, {
                className: clsx(children?.props?.className, 'relative z-[3]')
            })}
        </div>
    </>


}

export default GradientContainer