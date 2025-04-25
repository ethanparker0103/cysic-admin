import { mediasLink } from "@/config"
import useAccount from "@/hooks/useAccount"
import useUser from "@/models/user"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const navs = [
    {
        content: 'Service',
        children: [
            {
                content: 'Cysic NFT',
                href: '/nft'
            },
            {
                content: 'Cysic ZK',
                href: '/zk'
            },
            {
                content: 'Cysic AI',
                href: '/ai'
            },
            {
                content: 'Cysic Mining',
                href: '/stake'
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
                href: '/stake'
            },
            {
                content: 'Bridge',
                href: 'https://testnet-bridge.prover.xyz/bridge'
            },
            {
                content: 'swap',
                href: 'https://dev-swap.prover.xyz/'
            },
            {
                content: 'Social Tasks',
                href: '/nft/socialTask'
            },
            {
                content: 'Dashboard',
                href: '/nft/userPortal'
            },
            {
                content: 'Explorer',
                href: 'https://cys-dev.prover.xyz/'
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

// zk
const _zkNavs = [
    {
        content: 'Cysic ZK',
        children: [
            {
                content: 'Service',
                href: '/'
            },
            {
                content: 'Cysic NFT',
                href: '/nft'
            },
            {
                content: 'Cysic AI',
                href: '/ai'
            },
            {
                content: 'Cysic Mining',
                href: '/stake'
            },
        ]
    },
    {
        content: 'leaderboard',
        href: '/'
    },
    {
        content: 'dashboard',
        href: '/zk/serviceHub'
    },
    {
        content: 'prover',
        href: '/zk/prover'
    },
]

// /ai
const aiNavs = [
    {
        content: 'Cysic AI',
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
        href: '/nft/userPortal'
    },
]

const computeNavs = navs.map((i, index) => {
    if (index == 0) {
        return {
            content: 'Cysic NFT',
            children: [
                {
                    content: 'Service',
                    href: '/'
                },
                {
                    content: 'Cysic ZK',
                    href: '/zk'
                },
                {
                    content: 'Cysic AI',
                    href: '/ai'
                },
                {
                    content: 'Cysic Mining',
                    href: '/stake'
                },
            ]
        }
    }
    return i
})

const stakeeNavs = navs.map((i, index) => {
    if (index == 0) {
        return {
            content: 'Cysic Mining',
            children: [
                {
                    content: 'Service',
                    href: '/'
                },
                {
                    content: 'Cysic NFT',
                    href: '/nft'
                },
                {
                    content: 'Cysic ZK',
                    href: '/zk'
                },
                {
                    content: 'Cysic AI',
                    href: '/ai'
                },
            ]
        }
    }
    return i
})

const useNav = ()=>{
    const location = useLocation();
    const { isRegistered } = useAccount()


    const zkNavs = useMemo(()=>{
        if(isRegistered){
            return _zkNavs.slice(0, 1).concat({
                content: 'Invite',
                href: '/zk/invite'
            }, _zkNavs.slice(1));
        }
        return _zkNavs
    }, [isRegistered])


    const currentNavs = useMemo(() => {
        const path = location.pathname;

        if (path === '/zk/serviceHub') {
            return computeNavs
        }

        if (path === '/zk' || path.startsWith('/zk/')) {
            return zkNavs;
        }

        if (path === '/ai' || path.startsWith('/ai/')) {
            return aiNavs;
        }

        if (path === '/nft' || path.startsWith('/nft/')) {
            return computeNavs
        }

        if (path === '/stake' || path.startsWith('/stake/')) {
            return stakeeNavs
        }
        return navs;
    }, [location.pathname, zkNavs]);

    return {
        currentNavs
    }
}

export default useNav