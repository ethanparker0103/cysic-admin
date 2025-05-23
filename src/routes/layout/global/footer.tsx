import Media from "@/components/Media"
import { mediasLink } from "@/config"
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
        href: '/hardware'
    },
    {
        content: 'Explorer',
        href: mediasLink.cosmosExplorer
    },
    {
        content: 'Academy',
        href: '/academy'
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
        href: mediasLink.contactUs
    }
]

export default function Footer() {
    return (
        <div className={cn("flex flex-col items-center gap-6 py-12 border-t border-white relative z-[1]", isMobile && "max-w-screen overflow-x-hidden")}>
            <img src={getImageUrl('@/assets/images/logo/cysic_light.svg')} className="w-[6rem]" />
            <div className={cn("flex items-center flex-wrap flex-col lg:flex-row gap-4 lg:gap-6")}>
                {
                    navs.map((nav) => nav.href?.startsWith('http') ? (
                        <Button
                            // @ts-ignore
                            variant={'undefined'}
                            as={NextLink}
                            key={nav.content}
                            href={nav.href}
                            target="_blank"
                            className="uppercase font-[400] text-sub hover:text-white h-fit"
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
                            className="uppercase font-[400] text-sub hover:text-white h-fit"
                        >
                            {nav.content}
                        </Button>
                    ))}
            </div>
            <Media />


        </div>
    )
}