import { isMobile } from "react-device-detect";
import { cn } from "@nextui-org/react";
import GradientBorderCard from "@/components/GradientBorderCard";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
// 详情指标卡片
interface DetailCardProps {
    title: string;
    subtitle?: string;
    value: ReactNode;
    moreLink?: string;
    className?: string;
    status?: Array<{
        label: string;
        value: string;
        color: string;
    }>;
}

const DetailCard = ({ title, subtitle, value, moreLink, status, className }: DetailCardProps) => (
    <GradientBorderCard borderRadius={8} className={cn("h-full w-full flex-1", className)}>
        <div className="px-6 py-4 h-full w-full">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="!text-base !font-light title uppercase">{title}</div>
                    {subtitle && <div className="text-sm !font-[400] text-sub">{subtitle}</div>}
                </div>
                {moreLink && (
                    <a href={moreLink} className="flex items-center text-sub text-xs hover:text-white">
                        {moreLink} <ArrowRight size={12} className="ml-1" />
                    </a>
                )}
            </div>

            <div className="flex justify-between items-center">
                <div className="text-2xl !font-light">{value}</div>
            </div>

            {status && (
                <div className="mt-4 flex flex-col gap-4">
                    {status.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full mr-2 ${item.color}`}></span>
                            <span className="title !text-sm !font-light">{item.label}</span>
                            <span className="ml-auto text-sm text-sub">{item.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </GradientBorderCard>
);

const ZkTasks = () => {
    return (
        <div className={cn("flex gap-4 w-full", isMobile ? "flex-col" : "")}>
            {/* ZK 验证器 */}
            <DetailCard
                title="ZK VERIFIER"
                moreLink="MORE ABOUT ZK VERIFIER"
                value={<div></div>}
                status={[
                    { label: "STANDARD ACTIVE", value: "", color: "bg-[#19FFE0]" },
                    { label: "MOBILE INACTIVE", value: "", color: "bg-red-500" }
                ]}
            />

            {/* ZK 证明者 */}
            <DetailCard
                title="ZK PROVER"
                moreLink="MORE ABOUT ZK PROVER"
                value={<div></div>}
                status={[
                    { label: "NFT ACTIVE", value: "", color: "bg-[#19FFE0]" },
                    { label: "SELF INACTIVE", value: "", color: "bg-red-500" }
                ]}
            />

            {/* ZK 项目 */}
            <DetailCard
                title="ZK PROJECT"
                moreLink="MORE ABOUT ZK PROJECT"
                value={<div></div>}
                status={[
                    { label: "100 ONGOING PROJECTS", value: "", color: "bg-[#19FFE0]" },
                    { label: "10 PROJECTS UNDER REVIEW", value: "", color: "bg-yellow-500" }
                ]}
            />
        </div>
    )
}

export default ZkTasks;