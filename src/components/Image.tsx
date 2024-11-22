import { getImageUrl } from "@/utils/tools"
import { useState } from "react"

const basicSrc = getImageUrl('@/assets/images/dashboard/basic.svg')
const Image = ({ src, ...props }: any) => {
    const _src = src || basicSrc
    const [forceSrc, setForceSrc] = useState<any>()

    const handleError = () => {
        setForceSrc(basicSrc)
    }
    return forceSrc ? (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="20" cy="20" r="20" fill="url(#paint0_linear_2699_34684)" />
            <defs>
                <linearGradient id="paint0_linear_2699_34684" x1="5" y1="37" x2="37.5954" y2="30.4825" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9D47FF" />
                    <stop offset="0.796948" stopColor="#00F0FF" />
                </linearGradient>
            </defs>
        </svg>


    ) : (<img onError={handleError} src={forceSrc || _src} {...props} />)
}

export default Image