import clsx from 'clsx'
import { ReactNode, useMemo, useState } from 'react'

export enum BtnType {
    solidGradient = 'solidGradient',
    gradient = 'gradient',
    colorGradient = 'colorGradient',
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
    needLoading,
    id
}: {
    children: ReactNode
    className?: string
    type?: BtnType | string
    onClick?: any
    disabled?: boolean
    loading?: boolean
    style?: any
    needLoading?: boolean
    id?: string
}) => {

    const [interalLoading, setInternalLoading] = useState(false)
    const _loading = interalLoading || loading
    const classNameWithType = useMemo(() => {
        switch (type) {
            case BtnType.colorGradient: 
                return 'gradient-color bg-[#1D2127] border-[#FFFFFF1F] border'
            case BtnType.solidGradient:
                return 'gradient-border text-[#fff] hover:!border-[transparent]'
            case BtnType.gradient:
                return 'bg-gradient border-none !text-[#fff]';
            case BtnType.dark:
                return 'bg-[#000] border-none text-[#fff]';
            case BtnType.solid:
                return '!bg-[transparent] !border-[#fff] text-[#fff]';
            default:
                return '!bg-[transparent] !border-none text-[#fff]';
        }
    }, [type])

    return (
        <button
            id={id}
            style={style}
            disabled={disabled || _loading}
            onClick={async ()=>{
                if(needLoading){
                    setInternalLoading(true)
                }
                await onClick?.(()=>setInternalLoading(false))
                setInternalLoading(false)
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
