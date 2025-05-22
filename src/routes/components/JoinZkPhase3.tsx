import { classes } from "@/config";
import { cn } from "@nextui-org/react";
import { AboutTestnetButton, JoinTestnetPhaseIIIButton } from "@/routes/components/JoinTestnetPhaseIIIButtonGroups";

const JoinZkPhase3 = ({ slogen, title = 'Phase III', subTitle, className }: { slogen: string, title?: string, subTitle?: string, className?: string }) => {
    return (
        <div className={cn("relative z-1 size-full  flex flex-col gap-4 items-center justify-center", className)}>
            <span className={cn('slogen', classes.subTitle)}>{slogen}</span>
            <span className="unbounded text-[48px] lg:text-[11.25rem] font-[200] text-center">{title}</span>
            {subTitle && <span className={cn('subTitle text-center', classes.subTitle)}>{subTitle}</span>}
            <div className="flex flex-col lg:flex-row items-center gap-6">
                <JoinTestnetPhaseIIIButton />
                <AboutTestnetButton />
            </div>
        </div>
    )
}

export default JoinZkPhase3;
