import Button from "@/components/Button";
import { mediasLink } from "@/config";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutTestnetButton = () => {
    return (
        <Link to="/">
            <Button type="solid" className="backdrop-blur-sm !p-6 flex gap-4 flex items-center uppercase">
                <span>About Testnet</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
        </Link>
    )
}


const JoinTestnetPhaseIIIButton = () => {
    return (
        <Link to="/zk">
            <Button type="solid" className="backdrop-blur-sm !p-6 flex gap-4 flex items-center uppercase">
                <span>Join Testnet Phase III</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
        </Link>
    )
}

const CysicHardwareStackButton = () => {
    return (
        <Link to="/hardware">
            <Button type="solid" className="backdrop-blur-sm !p-6 flex gap-4 flex items-center uppercase">
                <span>Cysic Hardware Stack</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
        </Link>
    )
}

const SeeWhatsComingButton = () => {
    return (
        <a href={mediasLink.discord} target="_blank">
            <Button type="solid" className="backdrop-blur-sm !p-6 flex gap-4 flex items-center uppercase">
                <span>See What's Coming</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
        </a>
    )
}

export { AboutTestnetButton, JoinTestnetPhaseIIIButton, CysicHardwareStackButton, SeeWhatsComingButton };