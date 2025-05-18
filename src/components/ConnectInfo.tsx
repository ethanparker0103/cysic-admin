import { getImageUrl, shortStr, handleFaucetModal } from "@/utils/tools"

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn } from "@nextui-org/react";
import Copy from "@/components/Copy";
import Button from "@/components/Button";
import useAccount from "@/hooks/useAccount";
import ConnectCosmosButton from "@/components/connectCosmosButton";
import { usePrivy } from "@privy-io/react-auth";
import { useDisconnect } from "wagmi";
import { Link, useLocation } from "react-router-dom";
import useUser from "@/models/user";
import { useWriteContract } from "@/hooks/useWriteContract";
import { routesConfig } from "@/config";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import HoverDropdown from "@/components/HoverDropdown";

const ConnectInfo = () => {
    // 使用新的useAccount获取状态
    const {
        cosmosAddress,
        address,
        connector,
        name,
        avatarUrl,
        inviteCode
    } = useAccount();

    const { logout } = usePrivy();
    const { disconnectAsync } = useDisconnect();
    const { reset } = useUser();

    // 状态：已注册但未完成资料填写

    // 处理断开连接
    const handleEVMDisconnect = async () => {
        await logout();
        await disconnectAsync();
        reset();
    };

    // 处理测试代币领取
    const { writeContractAsync } = useWriteContract();

    const pathname = useLocation().pathname;

    return (
        <>
            <Button needLoading className="!p-0" onClick={handleFaucetModal}>
                <img src={getImageUrl('@/assets/images/icon/faucet.svg')} className="rounded-full w-[1.875rem] h-[1.875rem]" />
            </Button>

            <HoverDropdown
                trigger={
                    <div className="px-6 flex items-center gap-4 cursor-pointer">
                        <div className="flex items-center gap-2">
                            <img src={connector?.icon || getImageUrl('@/assets/images/tokens/CYS.svg')} className="rounded-full w-[1.875rem] h-[1.875rem]" />
                            <span className="text-sm text-sub font-[400] uppercase">{shortStr(address || '', 10)}</span>
                        </div>

                        <img src={avatarUrl || ''} className="rounded-full w-[1.875rem] h-[1.875rem] bg-[#D9D9D9]" />
                    </div>
                }
            >

                <DropdownMenu
                    className="p-0 min-w-[330px] backdrop-blur gradient-border-card bg-[transparent] rounded-lg overflow-hidden"
                    variant="flat"
                    itemClasses={{
                        base: "hover:!opacity-100 text-sub uppercase transition-colors hover-bright-gradient",
                    }}
                >
                    {/* {needCompleteProfile ? (
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
                        ) : null} */}

                    <DropdownItem as={Link} to={pathname.includes('/zk') ? '/zk/userPortal' : '/userPortal'} key="user-portal" className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between ">
                        <div className="flex items-center gap-2" >
                            <img src={avatarUrl || ''} className="rounded-full w-[1.875rem] h-[1.875rem] bg-[#D9D9D9]" />
                            <span>User Portal</span>
                        </div>
                    </DropdownItem>

                    <DropdownItem key="evm-disconnect" className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between ">
                        <div className="flex items-center gap-2">
                            <img src={connector?.icon || getImageUrl('@/assets/images/tokens/CYS.svg')} className="rounded-full w-[1.875rem] h-[1.875rem]" />
                            <span className="text-sm text-sub font-[400] uppercase">{shortStr(address || '', 10)}</span>
                        </div>

                        <Button needLoading type="text" onClick={handleEVMDisconnect} className="uppercase !px-0">disconnect</Button>
                    </DropdownItem>

                    <DropdownItem key="cosmos-disconnect" className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between ">
                        <div className="flex items-center gap-2">
                            <img src={getImageUrl('@/assets/images/wallet/keplr.png')} className="rounded-full w-[1.875rem] h-[1.875rem]" />
                            <span className="text-sm text-sub font-[400] uppercase">{shortStr(cosmosAddress || '-', 10)}</span>
                        </div>

                        <ConnectCosmosButton />
                    </DropdownItem>


                    <DropdownItem key="referral-code" className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between ">
                        <span className="">Referral Code</span>
                        <Copy value={inviteCode}>
                            {inviteCode || '-'}
                        </Copy>
                    </DropdownItem>

                    <DropdownItem as={Link} to={routesConfig.invite} key="check-invite" className="py-4 px-6 ">
                        <div className="flex items-center gap-2 text-[#00F0FF]">
                            <span>Check invite details</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </DropdownItem>


                </DropdownMenu>
            </HoverDropdown>


        </>
    );
};

export default ConnectInfo;