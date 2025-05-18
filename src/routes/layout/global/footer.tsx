import Media from "@/components/Media"
import { explorerUrl, mediasLink, routesConfig } from "@/config"
import { getImageUrl } from "@/utils/tools"
import { Button, cn, Link as NextLink } from "@nextui-org/react"
import { isMobile } from "react-device-detect"
import { Link } from "react-router-dom"

const navs = [
    {
        content: 'Home',
        href: '/'
    },
    {
        content: 'Cysic ZK',
        href: '/zk'
    },
    {
        content: 'Hardware',
        href: routesConfig.hardware
    },
    {
        content: 'Explorer',
        href: explorerUrl
    },
    {
        content: 'Academy',
        href: routesConfig.academy
    },
    {
        content: 'Docs',
        href: mediasLink.doc
    },
    {
        content: 'Blog',
        href: mediasLink.medium
    },
    {
        content: 'Contact Us',
        href: 'https://cysic.xyz/contact-us'
    }
]

export default function Footer() {
    return (
        <div className={cn("flex flex-col items-center gap-6 py-12 border-t border-[#fff] relative z-[1]", isMobile && "max-w-screen overflow-x-hidden")}>
            <img src={getImageUrl('@/assets/images/logo/cysic_light.svg')} className="w-[6rem]" />
            <div className={cn("flex items-center flex-wrap", isMobile ? "flex-col gap-4" : 'gap-6')}>
                {
                    navs.map((nav) => nav.href?.startsWith('http') ? (
                        <Button
                            // @ts-ignore
                            variant={'undefined'}
                            as={NextLink}
                            key={nav.content}
                            href={nav.href}
                            target="_blank"
                            className="uppercase font-[400] text-sub hover:text-[#fff]"
                        >
                            {nav.content}
                        </Button>
                    ) : (
                        <Button
                            // @ts-ignore
                            variant={'undefined'}
                            as={Link}
                            to={nav.href}
                            key={nav.content}
                            className="uppercase font-[400] text-sub hover:text-[#fff]"
                        >
                            {nav.content}
                        </Button>
                    ))}
            </div>
            <Media />


        </div>
    )
}