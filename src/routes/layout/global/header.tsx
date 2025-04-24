import GradientBorderCard from "@/components/GradientBorderCard";
import GradientNavDropdown from "@/components/GradientNavDropdown";
import { baseHref, BIND_CHECK_PATHS } from "@/config";
import { getImageUrl, handleLoginPersonalMessage, handleSignIn } from "@/utils/tools";

import { ArrowRight } from 'lucide-react';
import ConnectInfo from "@/components/ConnectInfo";
import useAccount from "@/hooks/useAccount";
import useNav from "@/hooks/useNav";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import useUser from "@/models/user";

export default function Header() {
    const { walletAddress, address, isSigned, isRegistered, isBinded } = useAccount();
    const { currentNavs } = useNav();
    const location = useLocation();
    const userStore = useUser();
    
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


    console.log('isSigned', isSigned)
    return (
        <div className="relative z-[1] ">
            <div className="relative px-[3rem] py-6">
                <GradientBorderCard className="h-20 flex items-center backdrop-blur-sm bg-black/10">
                    <div className="w-full h-full flex justify-between items-center">
                        <div className="flex items-center h-full">
                            <a href={baseHref}><img src={getImageUrl('@/assets/images/logo/cysic.svg')} className="w-[11.25rem]" /></a>

                            {currentNavs.map((nav: any) => (
                                <GradientNavDropdown key={nav.content} item={nav} />
                            ))}
                        </div>
                        <div className="h-full flex items-center">
                            {walletAddress ? (
                                !isSigned ? (
                                    <div onClick={handleLoginPersonalMessage} className="px-10 w-full h-full flex items-center gap-1 cursor-pointer hover:bg-gradient-to-r from-[#17D1B2] to-[#4C1F99] ">
                                        <span className="text-sub font-[400] uppercase text-sm">SIGN MESSAGE</span>
                                        <ArrowRight width={16} height={16} />
                                    </div>
                                ) : shouldShowBindPrompt ? (
                                    <div onClick={handleBindInviteCode} className="px-10 w-full h-full flex items-center gap-1 cursor-pointer hover:bg-gradient-to-r from-[#17D1B2] to-[#4C1F99] ">
                                        <span className="text-sub font-[400] uppercase text-sm">BIND INVITE CODE</span>
                                        <ArrowRight width={16} height={16} />
                                    </div>
                                ) : (
                                    <ConnectInfo />
                                )
                            ) : (
                                <div onClick={handleConnect} className="px-10 w-full h-full flex items-center gap-1 cursor-pointer hover:bg-gradient-to-r from-[#17D1B2] to-[#4C1F99] ">
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
