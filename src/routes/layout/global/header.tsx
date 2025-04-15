import ConnectButton from "@/components/connectButton";
import GradientBorderCard from "@/components/gradientBorderCard";
import GradientNavDropdown from "@/components/GradientNavDropdown";
import { mediasLink } from "@/config";
import { getImageUrl, handleSignIn } from "@/utils/tools";

import { ArrowRight } from 'lucide-react';
import ConnectInfo from "@/components/ConnectInfo";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import useAccount from "@/hooks/useAccount";
import { AccountStatus } from "@/hooks/useAccount";


const navs = [
    {
        content: 'Service',
        children: [
            {
                content: 'Compute Box',
                href: '/'
            },
            {
                content: 'Cysic ZK',
                href: '/'
            },
            {
                content: 'Cysic AI',
                href: '/'
            },
            {
                content: 'Cysic Mining',
                href: '/'
            },
        ]
    },
    {
        content: 'Hardware',
        children: [
            {
                content: 'ZK Air/Pro',
                href: '/'
            },
            {
                content: 'Doge Coin Miner',
                href: '/'
            },
        ]
    },
    {
        content: 'Cysic Portal',
        children: [
            {
                content: 'Staking',
                href: '/'
            },
            {
                content: 'Bridge',
                href: '/'
            },
            {
                content: 'swap',
                href: '/'
            },
            {
                content: 'Social Tasks',
                href: '/'
            },
            {
                content: 'Dashboard',
                href: '/'
            },
            {
                content: 'Explorer',
                href: '/'
            },
        ]
    },
    {
        content: 'Docs',
        href: mediasLink.whitePaper
    },
    {
        content: 'Community',
        children: [
            {
                content: 'blog',
                href: '/'
            },
            {
                content: 'media',
                href: '/'
            },

        ]
    }
]

// /zk
const zkNavs = [
    {
        content: 'Cysic zk',
        href: '/zk'
    },
    {
        content: 'Invite',
        href: '/zk/invite'
    },
    {
        content: 'leaderboard',
        href: '/'
    },
    {
        content: 'dashboard',
        href: '/'
    },
]

// /ai
const aiNavs = [
    {
        content: 'Cysic ai',
        children: [
            {
                content: 'Project',
                href: '/'
            },
            {
                content: 'Playground',
                href: '/'
            },
            {
                content: 'Synergy',
                href: '/'
            }
        ]
    },
    {
        content: 'leaderboard',
        href: '/'
    },
    {
        content: 'dashboard',
        href: '/'
    },
]



export default function Header() {
    const { address, status, needBindInviteCode } = useAccount();
    const location = useLocation();
    
    const handleConnect = () => {
        handleSignIn();
    };

    const handleBindInviteCode = () => {
        handleSignIn();
    };

    const currentNavs = useMemo(() => {
        const path = location.pathname;
        
        if (path === '/zk' || path.startsWith('/zk/')) {
            return zkNavs;
        }
        
        if (path === '/ai' || path.startsWith('/ai/')) {
            return aiNavs;
        }
        
        return navs;
    }, [location.pathname]);

    return (
        <div className="relative z-[1] ">
            <div className="relative px-[3rem] py-6">
                <GradientBorderCard className="h-20 flex items-center backdrop-blur-sm bg-black/10">
                    <div className="w-full h-full flex justify-between items-center">
                        <div className="flex items-center h-full">
                            <img src={getImageUrl('@/assets/images/logo/cysic.svg')} className="w-[11.25rem]" />

                            {currentNavs.map((nav) => (
                                <GradientNavDropdown key={nav.content} item={nav} />
                            ))}
                        </div>
                        <div className="h-full flex items-center">
                            {address ? (
                                needBindInviteCode ? (
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
