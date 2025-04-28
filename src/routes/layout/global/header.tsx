import GradientBorderCard from "@/components/GradientBorderCard";
import GradientNavDropdown from "@/components/GradientNavDropdown";
import { baseHref, BIND_CHECK_PATHS } from "@/config";
import { getImageUrl, handleLoginPersonalMessage, handleSignIn } from "@/utils/tools";

import { ArrowRight, Menu } from 'lucide-react';
import ConnectInfo from "@/components/ConnectInfo";
import useAccount from "@/hooks/useAccount";
import useNav from "@/hooks/useNav";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { isMobile } from "react-device-detect";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerContent, useDisclosure } from "@nextui-org/react";
import Button from "@/components/Button";

const size = 'full'

export default function Header() {
    const { walletAddress, isSigned, isBinded } = useAccount();
    const { currentNavs } = useNav();
    const location = useLocation();

    // 检查当前路径是否需要绑定邀请码
    const needsBindCheck = useMemo(() => {
        const path = location.pathname;
        // 使用 includes 检查路径是否包含特定字符串
        return BIND_CHECK_PATHS.some(checkPath => path.includes(checkPath));
    }, [location.pathname]);

    // 需要显示绑定提示的条件
    const shouldShowBindPrompt = isSigned && needsBindCheck && !isBinded;


    const handleConnect = () => {
        handleSignIn();
    };

    const handleBindInviteCode = () => {
        handleSignIn();
    };



    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
        onOpen();
    };
    return isMobile ? <>
        <div className="h-[5.625rem] flex items-center relative z-[1]">
            <div className="flex flex-wrap gap-3 relative w-full">
                <Button onClick={handleOpen}>
                    <Menu width={30} height={30} />
                </Button>

                <Link to={'/'} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" >
                    <img src={getImageUrl('@/assets/images/logo/cysic.svg')} className="w-[11.25rem]" />
                </Link>
            </div>
            <Drawer isOpen={isOpen} size={size} onClose={onClose}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
                            <DrawerBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                    quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                                    adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                    officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                </p>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button onClick={onClose}>
                                    Close
                                </Button>
                                <Button onClick={onClose}>
                                    Action
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    </> : (
        <div className="relative z-[1] h-[8rem]">
            <div className="relative px-[3rem] py-6">
                <GradientBorderCard className="h-20 flex items-center backdrop-blur-sm bg-black/10">
                    <div className="w-full h-full flex justify-between items-center">
                        <div className="flex items-center h-full flex-1">
                            <Link to={'/'}><img src={getImageUrl('@/assets/images/logo/cysic.svg')} className="flex-1 max-w-[11.25rem]" /></Link>

                                {currentNavs.map((nav: any) => (
                                    <GradientNavDropdown className="flex-1 max-w-[11.25rem]" key={nav.content} item={nav} />
                                ))}
                        </div>
                        <div className="h-full flex items-center justify-end w-[26.75rem]">
                            {walletAddress ? (
                                !isSigned ? (
                                    <div onClick={handleLoginPersonalMessage} className="px-10 w-fit h-full flex items-center justify-end gap-1 cursor-pointer hover:bg-gradient-to-r from-[#17D1B2] to-[#4C1F99] ">
                                        <span className="text-sub font-[400] uppercase text-sm">SIGN MESSAGE</span>
                                        <ArrowRight width={16} height={16} />
                                    </div>
                                ) : shouldShowBindPrompt ? (
                                    <div onClick={handleBindInviteCode} className="px-10 w-fit h-full flex items-center justify-end gap-1 cursor-pointer hover:bg-gradient-to-r from-[#17D1B2] to-[#4C1F99] ">
                                        <span className="text-sub font-[400] uppercase text-sm">BIND INVITE CODE</span>
                                        <ArrowRight width={16} height={16} />
                                    </div>
                                ) : (
                                    <ConnectInfo />
                                )
                            ) : (
                                <div onClick={handleConnect} className="px-10 w-fit h-full flex items-center justify-end gap-1 cursor-pointer hover:bg-gradient-to-r from-[#17D1B2] to-[#4C1F99] ">
                                    <span className="text-sub font-[400] uppercase text-sm">SIGN IN</span>
                                    <ArrowRight width={16} height={16} />
                                </div>
                            )}
                        </div>
                    </div>
                </GradientBorderCard>
            </div>
        </div>
    );
}
