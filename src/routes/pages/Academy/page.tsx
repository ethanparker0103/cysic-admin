import GradientBorderCard from "@/components/GradientBorderCard";
import { academyConfig, academyConfigShowInHome } from "@/routes/pages/Academy/config";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { isMobile } from "react-device-detect";

export const AcademyCard = ({item}:{item:any})=>{
    return <a href={item.href} target="_blank" className="w-full">
    <GradientBorderCard className="px-6 py-4 flex justify-between cursor-pointer" >
        <div className="flex flex-col gap-1 flex-1">
            <span className="sub-title !text-[1.5rem]">{item.title}</span>
            <span className="sub-title !text-base min-h-6">{item.subTitle}</span>
        </div>
        <div className="px-4 self-center">
            <ArrowRight className="w-6 h-6" />
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
                    <span className={cn("title !font-[200] !text-[#fff] text-center", isMobile ? "!text-[32px]" : "!text-[11.25rem]")}>
                        Cysic<br />Academy
                    </span>
                    <span className="sub-title text-center text-2xl !font-[400]">
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