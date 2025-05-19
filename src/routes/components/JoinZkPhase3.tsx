import Button from "@/components/Button";
import { classes } from "@/config";
import { ArrowRight } from "lucide-react";
import { cn } from "@nextui-org/react";
import { JoinTestnetPhaseIIIButton } from "@/routes/components/JoinTestnetPhaseIIIButtonGroups";
import { Link } from "react-router-dom";

const JoinZkPhase3 = ({ slogen, title = 'Phase III', subTitle, className }: { slogen: string, title?: string, subTitle?: string, className?: string }) => {
    return (
        <div className={cn("relative z-1 size-full  flex flex-col gap-4 items-center justify-center", className)}>
            <span className={cn('slogen', classes.subTitle)}>{slogen}</span>
            <span className="title !text-[11.25rem] !font-[200]">{title}</span>
            {subTitle && <span className={cn('subTitle', classes.subTitle)}>{subTitle}</span>}
            <div className="flex gap-6">
                <JoinTestnetPhaseIIIButton />
                <Link to="/">
                    <Button type="solid" className="backdrop-blur-sm !p-6 !py-4 flex gap-4 flex items-center uppercase">
                        <span className="text-base">About Testnet</span>
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default JoinZkPhase3;
