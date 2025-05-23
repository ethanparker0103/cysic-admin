import Button from "@/components/Button";
import { mediasLink } from "@/config";
import { handleSignIn } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AboutTestnetButton = ({className}:{className?: string}) => {
    return (
        <Link to="/" className={cn(className)}  >
            <Button type="solid" className="w-full lg:w-auto backdrop-blur-sm px-6 py-4 lg:!p-6 flex gap-4 flex items-center justify-between lg:justify-start uppercase">
                <span>About Testnet</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
        </Link>
    )
}


const JoinTestnetPhaseIIIButton = ({className}:{className?: string}) => {
    const navigate = useNavigate()
    const pathname = useLocation().pathname
    return (
        // <Link to="/zk">
            <Button type="solid" className={cn("backdrop-blur-sm px-6 py-4 lg:!p-6 flex gap-4 flex items-center justify-between lg:justify-start uppercase", className)}
            onClick={()=>{
                if(!pathname.includes('zk')){
                    navigate('/zk')
                }else{
                    handleSignIn()
                }
            }}
            >
                <span>Join Testnet Phase III</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
        // </Link>
    )
}

const CysicHardwareStackButton = ({className}:{className?: string}) => {
    return (
        <Link to="/hardware" className={cn(className)}>
            <Button type="solid" className="w-full lg:w-auto backdrop-blur-sm px-6 py-4 lg:!p-6 flex gap-4 flex items-center justify-between lg:justify-start uppercase">
                <span>Cysic Hardware Stack</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
        </Link>
    )
}

const SeeWhatsComingButton = ({className}:{className?: string}) => {
    return (
        <a href={mediasLink.discord} target="_blank" className={cn(className)}>
            <Button type="solid" className="w-full lg:w-auto backdrop-blur-sm px-6 py-4 lg:!p-6 flex gap-4 flex items-center justify-between lg:justify-start uppercase">
                <span>See What's Coming</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
        </a>
    )
}

export { AboutTestnetButton, JoinTestnetPhaseIIIButton, CysicHardwareStackButton, SeeWhatsComingButton };