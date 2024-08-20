import ConnectButton from "@/components/connectButton"
import { getImageUrl } from "@/utils/tools"
import { Tooltip } from "@nextui-org/react"

const Header = () => {
    return <div className="w-full flex items-center justify-between">
        <div>
            <img
                className="w-[9.375rem]"
                src={getImageUrl("@/assets/images/_global/logo_content.svg")}
            />
        </div>

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
                <ConnectButton content={<div className="flex items-center gap-1 ">

                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5 4C4.452 4 4 4.452 4 5C4 5.548 4.452 6 5 6H20C20.527 6 21.044 6.18 21.432 6.568C21.82 6.956 22 7.473 22 8V20C22 20.527 21.82 21.044 21.432 21.432C21.044 21.82 20.527 22 20 22H6C3.748 22 2 20.252 2 18V5C2 3.348 3.348 2 5 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3C18 3.26522 17.8946 3.51957 17.7071 3.70711C17.5196 3.89464 17.2652 4 17 4H5ZM4 7.828V18C4 19.148 4.852 20 6 20H20V17H17C15.348 17 14 15.652 14 14C14 12.348 15.348 11 17 11H20V8H5C4.65 8 4.313 7.94 4 7.828ZM20 13H17C16.452 13 16 13.452 16 14C16 14.548 16.452 15 17 15H20V13Z" fill="black" />
                    </svg>

                    <span>Sign with Cysic Address</span>
                </div>} />
            </div>
        </Tooltip>
    </div>
}

export default Header