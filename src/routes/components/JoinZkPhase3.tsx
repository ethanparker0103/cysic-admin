import { classes } from "@/config";
import { cn } from "@nextui-org/react";
import { AboutTestnetButton, JoinTestnetPhaseIIIButton } from "@/routes/components/JoinTestnetPhaseIIIButtonGroups";

const JoinZkPhase3 = ({ slogen, title = 'Phase III', subTitle, className }: { slogen: string, title?: string, subTitle?: string | React.ReactNode, className?: string }) => {
    return (
        <div className={cn("main-container py-12 lg:py-0 relative z-1 size-full flex flex-col gap-4 items-center justify-between lg:justify-center", className)}>
            <div className="flex flex-col gap-1 items-center">
            <span className={cn('slogen', classes.subTitle)}>{slogen}</span>
            <span className="unbounded-36-96-200 text-center">{title}</span>
            </div>
            {subTitle && <span className={cn('teachers-16-24-400 tracking-widest text-center', classes.subTitle)}>{subTitle}</span>}
            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-6 w-full lg:w-auto">
                <JoinTestnetPhaseIIIButton className="w-full lg:w-auto" />
                <AboutTestnetButton className="w-full lg:w-auto" />
            </div>
        </div>
    )
}

export default JoinZkPhase3;
