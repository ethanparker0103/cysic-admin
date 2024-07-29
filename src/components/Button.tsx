import clsx from 'clsx'
import { ReactNode, useMemo, useState } from 'react'

export enum BtnType {
    normal = 'normal',
    solid = 'solid',
    dark = 'dark',
}
const Button = ({
    children,
    className,
    type,
    onClick,
    disabled,
    loading,
    style = {},
    needLoading
}: {
    children: ReactNode
    className?: string
    type?: BtnType | string
    onClick?: any
    disabled?: boolean
    loading?: boolean
    style?: any
    needLoading?: boolean
}) => {

    const [interalLoading, setInternalLoading] = useState(false)
    const _loading = interalLoading || loading
    const classNameWithType = useMemo(() => {
        switch (type) {
            default:
                return 'bg-[#21E9FA] border-none hover:bg-[#21E9FA] text-[#000]';
        }
    }, [type])

    return (
        <button
            style={style}
            disabled={disabled || _loading}
            onClick={()=>{
                if(needLoading){
                    setInternalLoading(true)
                }
                onClick?.(()=>setInternalLoading(false))
            }}
            className={clsx(
                className,
                classNameWithType,
                disabled ? 'opacity-50 disabled:[--tw-text-opacity:0.5] disabled:[--tw-bg-opacity:0.5]' : '',
                'btn',
             )}
        >
            {_loading ? <span className="loading loading-dots loading-md" /> : children}
        </button>
    )
}

export default Button
