import { getImageUrl, shortStr, handleSignIn } from "@/utils/tools"

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link } from "@nextui-org/react";
import Copy from "@/components/Copy";
// import { useDisconnect } from "@reown/appkit/react";
import Button from "@/components/Button";
import useAccount from "@/hooks/useAccount";
import { useState, useEffect } from "react";
import ConnectCosmosButton from "@/components/connectCosmosButton";
import { usePrivy } from "@privy-io/react-auth";
import { useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";

const ConnectInfo = () => {
    const { cosmosAddress, address, connector, registeredInviteCode, isProfileCompleted, isRegistered, isConnectedOnly } = useAccount()

    const { logout } = usePrivy()
    const { disconnectAsync } = useDisconnect()

    // 状态：已注册但未完成资料填写
    const [needCompleteProfile, setNeedCompleteProfile] = useState(false);

    // 检查用户是否需要完成资料填写
    useEffect(() => {
        // 如果已注册但未完成资料填写
        if (isRegistered && !isProfileCompleted && !isConnectedOnly) {
            setNeedCompleteProfile(true);
        } else {
            setNeedCompleteProfile(false);
        }
    }, [isRegistered, isProfileCompleted, isConnectedOnly]);

    const handleEVMDisconnect = async () => {
        await logout()
        await disconnectAsync()
    }

    // 处理打开完善资料弹窗
    const handleCompleteProfile = () => {
        // 调用打开SignIn弹窗的方法，让它显示第二步(资料填写)
        handleSignIn('profile'); // 假设handleSignIn可以接受参数指定打开的步骤
    }

    const navigate = useNavigate()

    return (
        <>
            <Button className="!p-0">
                <img src={getImageUrl('@/assets/images/icon/faucet.svg')} className="rounded-full w-[1.875rem] h-[1.875rem]" />
            </Button>
            <Dropdown classNames={{
                content: 'p-0 mt-6',
            }}>
                <DropdownTrigger>
                    <div className="px-6 flex items-center gap-4 cursor-pointer">
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
                    {needCompleteProfile ? (
                        <DropdownItem
                            key="complete-profile"
                            className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between bg-gradient-to-r from-[#17D1B233] to-[#4C1F9933]"
                            onClick={handleCompleteProfile}
                        >
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#17D1B2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span className="text-[#17D1B2]">COMPLETE YOUR PROFILE</span>
                            </div>
                        </DropdownItem>
                    ) : null}

                    <DropdownItem key="user-portal" className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between ">
                        <div className="flex items-center gap-2" onClick={()=>{navigate('/nft/userPortal')}}>
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
                            <img src={getImageUrl('@/assets/images/wallet/keplr.png')} className="rounded-full w-[1.875rem] h-[1.875rem]" />
                            <span className="text-sm text-sub font-[400] uppercase">{shortStr(cosmosAddress || '-', 10)}</span>
                        </div>

                        <ConnectCosmosButton />
                    </DropdownItem>

                    {registeredInviteCode ? (
                        <DropdownItem key="referral-code" className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between ">
                            <span className="">Referral Code</span>
                            <Copy value={registeredInviteCode}>
                                {registeredInviteCode}
                            </Copy>
                        </DropdownItem>
                    ) : null}

                </DropdownMenu>
            </Dropdown>

        </>

    )
}

export default ConnectInfo