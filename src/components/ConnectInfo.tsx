import { getImageUrl, shortStr } from "@/utils/tools"
import { useAccount } from "wagmi"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link } from "@nextui-org/react";
import Copy from "@/components/Copy";
import { useDisconnect } from "@reown/appkit/react";

const ConnectInfo = () => {
    const { address, connector } = useAccount()
    const { disconnect } = useDisconnect()

    const handleEVMDisconnect = () => {
        disconnect()
    }
    const handleCosmosDisconnect = () => {
        disconnect()
    }

    return (
        <Dropdown classNames={{
            content: 'p-0 mt-6',
        }}>
            <DropdownTrigger>
                <div className="px-6 flex items-center gap-4">
                    <img src={getImageUrl('@/assets/images/icon/faucet.svg')} className="rounded-full w-[1.875rem] h-[1.875rem]" />
                    <div className="flex items-center gap-2">
                        <img src={connector?.icon} className="rounded-full w-[1.875rem] h-[1.875rem]" />
                        <span className="text-sm text-sub font-[400] uppercase">{shortStr(address || '', 10)}</span>
                    </div>

                    <img src={''} className="rounded-full w-[1.875rem] h-[1.875rem] bg-[#D9D9D9]" />

                </div>
            </DropdownTrigger>

            <DropdownMenu
                className="p-0 min-w-[330px] bg-[#090A09B2] backdrop-blur-md vertical-gradient-border rounded-lg overflow-hidden"
                variant="flat"

                itemClasses={{
                    base: "hover:!opacity-100 text-sub uppercase transition-colors ",
                }}
            >
                <DropdownItem key="user-portal" className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between ">
                    <div className="flex items-center gap-2">
                        <img src={''} className="rounded-full w-[1.875rem] h-[1.875rem] bg-[#D9D9D9]" />
                        <span>User Portal</span>
                    </div>
                </DropdownItem>

                <DropdownItem key="evm-disconnect" className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between ">
                    <div className="flex items-center gap-2">
                        <img src={connector?.icon} className="rounded-full w-[1.875rem] h-[1.875rem]" />
                        <span className="text-sm text-sub font-[400] uppercase">{shortStr(address || '', 10)}</span>
                    </div>

                    <div onClick={handleEVMDisconnect} className="">disconnect</div>

                </DropdownItem>

                <DropdownItem key="cosmos-disconnect" className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between ">
                    <div className="flex items-center gap-2">
                        <img src={connector?.icon} className="rounded-full w-[1.875rem] h-[1.875rem]" />
                        <span className="text-sm text-sub font-[400] uppercase">{shortStr(address || '', 10)}</span>
                    </div>

                    <div onClick={handleCosmosDisconnect} className="">disconnect</div>
                </DropdownItem>

                <DropdownItem key="referral-code" className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between ">
                    <span className="">Referral Code</span>
                    <Copy value={'WZX2L3'} >WZX2L3</Copy>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>



    )
}

export default ConnectInfo