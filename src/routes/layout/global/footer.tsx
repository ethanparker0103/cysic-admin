import Button from "@/components/Button"
import Media from "@/components/Media"
import { getImageUrl } from "@/utils/tools"

const navs = [
    {
        content: 'Home',
        href: '/'
    },
    {
        content: 'Product',
        href: '/'
    },
    {
        content: 'Company',
        href: '/'
    },
    {
        content: 'Blog',
        href: '/'
    },
    {
        content: 'Join Testnet',
        href: '/'
    },
    {
        content: 'Explorer',
        href: '/'
    },
    {
        content: 'Media Kit',
        href: '/'
    },
    {
        content: 'Careers',
        href: '/'
    },
    {
        content: 'Contact Us',
        href: '/'
    },
    {
        content: 'About',
        href: '/'
    },
    {
        content: 'FAQ',
        href: '/'
    }
]

export default function Footer() {
    return (
        <div className="flex flex-col items-center gap-6 py-12 border-t border-[#fff]">
            <img src={getImageUrl('@/assets/images/logo/cysic_light.svg')} className="w-[6rem]" />
            <div className="flex items-center gap-6">
                {
                    navs.map((nav) => (
                        <Button
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