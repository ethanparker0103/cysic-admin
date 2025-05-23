import clsx from 'clsx'
import { ReactNode, useMemo } from 'react'

export enum BtnType {
    normal = 'normal',
    solid = 'solid',
    dark = 'dark'
}
const Button = ({
    children,
    className,
    type,
    onClick,
    disabled,
    loading
}: {
    children: ReactNode
    className?: string
    type?: BtnType | string
    onClick?: any
    disabled?: boolean
    loading?: boolean
}) => {

    const classNameWithType = useMemo(() => {
        switch (type) {
            case BtnType.normal:
                return '[--fallback-n:#EEA90E] [--fallback-bc:#000] bg-[#EEA90E] text-black border-none hover:bg-[#8247E5] hover:text-white'
            case BtnType.solid:
                return '[--fallback-n:transparent] [--fallback-bc:#fff] bg-[transparent] text-white border-white border-[2px] border-solid hover:bg-[transparent] hover:border-[#8247E5] hover:text-[#8247E5]'
            case BtnType.dark:
                return '[--fallback-n:#000] [--fallback-bc:#fff] bg-black text-white border-none hover:bg-white hover:text-black'
            default:
                return '[--fallback-n:#EEA90E] [--fallback-bc:#000] bg-[#EEA90E] text-black border-none hover:bg-[#8247E5] hover:text-white';
        }
    }, [type])

    return (
        <button
            disabled={disabled || loading}
            onClick={onClick}
            className={clsx(
                className,
                classNameWithType,
                disabled ? 'opacity-50 disabled:[--tw-text-opacity:0.5] disabled:[--tw-bg-opacity:0.5]' : '',
                'btn rounded-2.5 text-[1.125rem] font-[700] leading-[1] px-[2.25rem] py-[1.25rem] h-fit',
             )}
        >
            {loading ? <span className="loading loading-dots loading-md" /> : children}
        </button>
    )
}

export default Button
