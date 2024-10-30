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
        <svg className={props?.className} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_176_10923)">
                <path d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64Z" fill="#21E9FA" />
                <text x="32" y="32" style={{ 'dominant-baseline': 'middle', 'text-anchor': 'middle' }} fill="#032E6C" font-weight="700" font-size="20" >{props?.text || '?'}</text>
            </g>
            <defs>
                <clipPath id="clip0_176_10923">
                    <rect width="64" height="64" fill="white" />
                </clipPath>
            </defs>
        </svg>

    ) : (<img onError={handleError} src={forceSrc || _src} {...props} />)
}

export default Image