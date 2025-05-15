import { mediasLink } from "@/config"
import useAccount from "@/hooks/useAccount"
import useUser from "@/models/user"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"
const comingSoonConfig = {
    content: 'Coming Soon',
    key: 'coming-soon',
    href: '/',
    disabled: true
}

const navs = [
    {
        content: 'Service',
        children: [
            {
                content: 'Cysic ZK',
                key: 'zk',
                href: '/zk'
            },
            comingSoonConfig
            // {
            //     content: <div className="text-center">Cysic NFT<br/>(Coming Soon)</div>,
            //     key: 'nft',
            //     href: '/nft',
            //     disabled: true
            // },
            // {
            //     content: <div className="text-center">Cysic AI<br/>(Coming Soon)</div>,
            //     key: 'ai',
            //     href: '/ai',
            //     disabled: true
            // },
            // {
            //     content: 'Cysic Mining',
            //     key: 'stake',
            //     href: '/stake'
            // },
        ]
    },
    {
        content: 'Hardware',
        children: [
            {
                content: 'Hardware',
                key: 'hardware',
                href: '/hardware'
            },
            {
                content: 'ZK Air/Pro',
                key: 'zk-air-pro',
                href: '/'
            },
            {
                content: 'Doge Coin Miner',
                key: 'doge-coin-miner',
                href: '/'
            },
        ]
    },
    {
        content: 'Cysic Portal',
        children: [
            {
                content: 'Social Tasks',
                key: 'social-tasks',
                href: '/nft/socialTask'
            },
            {
                content: 'Staking',
                key: 'staking',
                href: '/stake'
            },
            {
                content: 'Bridge',
                key: 'bridge',
                href: 'https://testnet-bridge.prover.xyz/bridge'
            },
            {
                content: 'swap',
                key: 'swap',
                href: 'https://dev-swap.prover.xyz/'
            },
            {
                content: 'Dashboard',
                key: 'dashboard',
                href: '/nft/userPortal'
            },
            {
                content: 'Explorer',
                key: 'explorer',
                href: 'https://cys-dev.prover.xyz/'
            },
        ]
    },
    {
        content: 'Resource',
        children: [
            {
                content: 'Academy',
                key: 'academy',
                href: '/academy'
            },
            {
                content: 'Whitepaper',
                key: 'whitepaper',
                href: mediasLink.whitePaper
            },
            {
                content: 'Docs',
                key: 'docs',
                href: mediasLink.discord
            },
            {
                content: 'blog',
                key: 'blog',
                href: mediasLink.medium
            },
            {
                content: 'media',
                key: 'media',
                href: '/'
            },
        ]
    },
    {
        content: 'Ecosystem',
        key: 'ecosystem',
        href: '/ecosystem'
    },
    {
        content: 'Company',
        key: 'company',
        href: '/'
    }
]

// zk
const _zkNavs = [
    {
        content: 'Cysic ZK',
        children: [
            // {
            //     content: 'Service',
            //     href: '/'
            // },
            // {
            //     content: <div className="text-center">Cysic NFT<br/>(Coming Soon)</div>,
            //     href: '/nft'
            // },
            // {
            //     content: <div className="text-center">Cysic AI<br/>(Coming Soon)</div>,
            //     href: '/ai'
            // },
            // {
            //     content: 'Cysic Mining',
            //     href: '/stake'
            // },
            {
                content: 'Prover',
                key: 'prover',
                href: '/zk/prover'
            },
            {
                content: 'Verifier',
                key: 'verifier',
                href: '/zk/verifier'
            },
            {
                content: 'Project',
                key: 'project',
                href: '/zk/project'
            },
        ]
    },
    {
        content: 'leaderboard',
        key: 'leaderboard',
        href: '/'
    },
    {
        content: 'dashboard',
        children: [
            {
                content: 'Dashboard',
                key: 'dashboard',
                href: '/zk/dashboard'
            },
            {
                content: 'Project',
                key: 'project',
                href: '/zk/dashboard/project'
            },
            {
                content: 'Prover',
                key: 'prover',
                href: '/zk/dashboard/prover'
            },
            {
                content: 'Verifier',
                key: 'verifier',
                href: '/zk/dashboard/verifier'
            },
            {
                content: 'Task',
                key: 'task',
                href: '/zk/dashboard/task'
            },
        ]
        // href: '/zk/dashboard'
    },
]

// /ai
const aiNavs = [
    {
        content: <div className="text-center">Cysic AI<br/>(Coming Soon)</div>,
        children: [
            {
                content: 'Project',
                key: 'project',
                href: '/'
            },
            {
                content: 'Playground',
                key: 'playground',
                href: '/'
            },
            {
                content: 'Synergy',
                key: 'synergy',
                href: '/'
            }
        ]
    },
    {
        content: 'leaderboard',
        key: 'leaderboard',
        href: '/'
    },
    {
        content: 'dashboard',
        key: 'dashboard',
        href: '/nft/userPortal'
    },
]

const computeNavs = navs.map((i, index) => {
    if (index == 0) {
        return {
            content: <div className="text-center">Cysic NFT<br/>(Coming Soon)</div>,
            children: [
                {
                    content: 'Service',
                    key: 'service',
                    href: '/'
                },
                {
                    content: 'Cysic ZK',
                    key: 'zk',
                    href: '/zk'
                },
                {
                    content: <div className="text-center">Cysic AI<br/>(Coming Soon)</div>,
                    key: 'ai',
                    href: '/ai',
                    disabled: true
                },
                {
                    content: 'Cysic Mining',
                    key: 'stake',
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
                    key: 'service',
                    href: '/'
                },
                {
                    content: <div className="text-center">Cysic NFT<br/>(Coming Soon)</div>,
                    key: 'nft',
                    href: '/nft',
                    disabled: true
                },
                {
                    content: 'Cysic ZK',
                    key: 'zk',
                    href: '/zk'
                },
                {
                    content: <div className="text-center">Cysic AI<br/>(Coming Soon)</div>,
                    key: 'ai',
                    href: '/ai',
                    disabled: true
                },
            ]
        }
    }
    return i
})

const useNav = ()=>{
    const location = useLocation();
    const { isSigned } = useAccount()


    const zkNavs = useMemo(()=>{
        if(isSigned){
            return _zkNavs.slice(0, 1).concat({
                content: 'Invite',
                href: '/zk/invite'
            }, _zkNavs.slice(1));
        }
        return _zkNavs
    }, [isSigned])


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