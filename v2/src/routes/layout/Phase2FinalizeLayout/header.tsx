import ConnectButton from "@/components/connectButton"
import Image from "@/components/Image"
import { getImageUrl } from "@/utils/tools"
import { Tooltip } from "@nextui-org/react"
import clsx from "clsx"
import { isMobile } from "react-device-detect"

const Header = () => {
    return <>
        <style>
            {`
        
            .gradient-border {
                border: 1px solid transparent;
                background-clip: padding-box, border-box;
                background-origin: padding-box, border-box;
                background-image: linear-gradient(to right, #000, #000), linear-gradient(83.04deg, #9D47FF 5.44%, #00F0FF 54.92%);

            }
        `}
        </style>

        <div className="w-full flex items-center justify-between gap-4">
            <a href="https://cysic.xyz/" >
                <img
                    className={clsx(isMobile ? "w-8" : "w-[9.375rem]")}
                    src={isMobile ? getImageUrl("@/assets/images/_global/logo.svg") : getImageUrl("@/assets/images/_global/logo_content.svg")}
                />
            </a>
            <div className={clsx("flex items-center", isMobile ? "gap-2" : "gap-6")}>
                <a href="https://medium.com/@cysic/incentivized-testnet-phase-1-stage-2-cysic-aleo-mining-pool-launch-3ebe89e4573b" target="_blank" className={clsx("text-sm font-[500] rounded-[8px] gradient-border bg-[#000] flex items-center justify-center", isMobile ? "h-8 px-1" : "h-10 px-3")}>
                    <div className={clsx("flex items-center", isMobile?"text-[#fff]":"text-[#00F0FF] gap-1")}>
                        <span className={clsx("font-[500]", isMobile ? "text-xs " : "text-sm ")}>Join Whitelist</span>
                        {/* <Image className="size-4" src={getImageUrl('@/assets/images/dashboard/share.svg')} /> */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={clsx(isMobile ? "size-4" : "")}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.449 14.8842C14.7942 14.8842 15.074 14.6044 15.074 14.2592L15.0737 6.00941C15.0737 5.66669 14.7977 5.3879 14.455 5.38447L6.12191 5.3009C5.77675 5.29744 5.49413 5.57444 5.49067 5.9196C5.48721 6.26476 5.76421 6.54738 6.10937 6.55084L12.9548 6.61948L5.16798 14.4063C4.9239 14.6504 4.9239 15.0461 5.16798 15.2902C5.41205 15.5343 5.80778 15.5343 6.05186 15.2902L13.8238 7.51827L13.824 14.2592C13.824 14.6044 14.1038 14.8842 14.449 14.8842Z" fill="currentColor" />
                        </svg>

                    </div>
                </a>
                <Tooltip
                    closeDelay={200}
                    classNames={{
                        base: [
                            // arrow color
                            "before:bg-[#525252] dark:before:bg-[#525252]",
                        ],
                        content: [
                            "bg-[#525252]"
                        ]
                    }}
                    showArrow
                    placement={'left'}
                    content={<div className="p-2 text-[#fff]">Sign with your cysic whitelist address</div>}>
                    <div>
                        <ConnectButton className="relative z-[2]" content={<div className="flex items-center gap-1 ">

                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 4C4.452 4 4 4.452 4 5C4 5.548 4.452 6 5 6H20C20.527 6 21.044 6.18 21.432 6.568C21.82 6.956 22 7.473 22 8V20C22 20.527 21.82 21.044 21.432 21.432C21.044 21.82 20.527 22 20 22H6C3.748 22 2 20.252 2 18V5C2 3.348 3.348 2 5 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3C18 3.26522 17.8946 3.51957 17.7071 3.70711C17.5196 3.89464 17.2652 4 17 4H5ZM4 7.828V18C4 19.148 4.852 20 6 20H20V17H17C15.348 17 14 15.652 14 14C14 12.348 15.348 11 17 11H20V8H5C4.65 8 4.313 7.94 4 7.828ZM20 13H17C16.452 13 16 13.452 16 14C16 14.548 16.452 15 17 15H20V13Z" fill="#fff" />
                            </svg>

                            {
                                isMobile ? null : <span className={clsx(isMobile ? "text-xs" : 'text-sm')}>Sign with Cysic Address</span>
                            }
                        </div>} />
                    </div>
                </Tooltip>
            </div>

        </div>
    </>
}

export default Header