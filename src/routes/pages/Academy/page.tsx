import GradientBorderCard from "@/components/GradientBorderCard";
import { academyConfig } from "@/routes/pages/Academy/config";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";

export const AcademyCard = ({item}:{item:any})=>{
    return <a href={item.href} target="_blank" className="w-full">
    <GradientBorderCard className="px-4 lg:px-6 py-4 flex justify-between cursor-pointer" >
        <div className="flex flex-col gap-2 flex-1">
            <span className="sub-title !text-base lg:!text-[1.5rem]">{item.title}</span>
            <span className="sub-title !tracking-wider !text-sm lg:!text-base min-h-6">{item.subTitle}</span>
        </div>
        <div className="px-4 self-center">
            <ArrowRight className="w-4 h-4 lg:w-6 lg:h-6" />
        </div>
    </GradientBorderCard>
</a>
}

const AcademyPage = () => {
    return (
        <>
            {/* 主标题 */}
            <div className="pt-12 flex flex-col items-center gap-6 relative z-[2]">
                <div className="flex flex-col items-center gap-4">
                    <span className={cn("unbounded-48-180-200 text-white text-center")}>
                        Cysic<br />Academy
                    </span>
                    <span className="sub-title text-center !text-base lg:!text-2xl !font-[400] !tracking-wider ">
                        Learn about the front tier of technology<br />
                        that changes the world through Cysic
                    </span>
                </div>
            </div>

            {/* 主要内容部分 */}
            <div className="container mx-auto mt-8 relative z-[2] flex flex-col gap-4">
                {
                    academyConfig.map((item) => (
                        <AcademyCard key={item.title} item={item} />
                    ))
                }
            </div>
        </>
    )
}

export default AcademyPage;