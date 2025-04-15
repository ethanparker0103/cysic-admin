import ConnectButton from "@/components/connectButton";
import GradientBorderCard from "@/components/gradientBorderCard";
import GradientNavDropdown from "@/components/GradientNavDropdown";
import { mediasLink } from "@/config";
import { getImageUrl } from "@/utils/tools";
import { useAccount } from "wagmi";
import { ArrowRight } from 'lucide-react';
import { useAppKit } from "@reown/appkit/react";
import ConnectInfo from "@/components/ConnectInfo";


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

export default function Header() {
    const { address } = useAccount()
    const { open } = useAppKit()
    const handleConnect = () => {
        open()
    }

    return (
        <div className="relative z-[1] ">
            <div className="relative px-[3rem] py-6">
                {/* GradientBorderCard */}
                <GradientBorderCard className="h-20 flex items-center backdrop-blur-sm bg-black/10">
                    <div className="w-full h-full flex justify-between items-center">
                        <div className="flex items-center h-full">
                            <img src={getImageUrl('@/assets/images/logo/cysic.svg')} className="w-[11.25rem]" />

                            {navs.map((nav) => (
                                <GradientNavDropdown key={nav.content} item={nav} />
                            ))}
                        </div>
                        <div className="h-full flex items-center">
                            {
                                address ? (
                                    <ConnectInfo />
                                ) : (
                                    <div onClick={handleConnect} className="px-10 w-full h-full flex items-center gap-1 cursor-pointer hover:bg-gradient-to-r from-[#17D1B2] to-[#4C1F99] ">
                                        <span className="text-sub font-[400] uppercase text-sm">sign in</span>
                                        <ArrowRight width={16} height={16} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </GradientBorderCard>
            </div>

        </div>
    )
}
