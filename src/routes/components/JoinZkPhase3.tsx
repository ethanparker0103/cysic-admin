import { classes } from "@/config";
import { cn } from "@nextui-org/react";
import { AboutTestnetButton, JoinTestnetPhaseIIIButton } from "@/routes/components/JoinTestnetPhaseIIIButtonGroups";

const JoinZkPhase3 = ({ slogen, title = 'Phase III', subTitle, className }: { slogen: string, title?: string, subTitle?: string, className?: string }) => {
    return (
        <div className={cn("relative z-1 size-full  flex flex-col gap-4 items-center justify-center", className)}>
            <span className={cn('slogen', classes.subTitle)}>{slogen}</span>
            <span className="title !text-[11.25rem] !font-[200]">{title}</span>
            {subTitle && <span className={cn('subTitle', classes.subTitle)}>{subTitle}</span>}
            <div className="flex gap-6">
                <JoinTestnetPhaseIIIButton />
                <AboutTestnetButton />
            </div>
        </div>
    )
}

export default JoinZkPhase3;
