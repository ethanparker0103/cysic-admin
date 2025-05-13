import GradientBorderCard from "@/components/GradientBorderCard";
import { ReactNode } from "react";

interface InfoCardProps {
    title: string;
    children: ReactNode;
    rightAction?: ReactNode;
    className?: string;
}

const InfoCard = ({ title, children, rightAction, className = "" }: InfoCardProps) => (
    <GradientBorderCard borderRadius={8} className={`h-full relative ${className}`}>
        <div className="h-full flex flex-col justify-between px-6 py-4 w-full gap-4">
            <div className="text-base !font-light uppercase font-medium ">{title}</div>
            <div className="flex-1 flex flex-col justify-between w-full gap-4">
                <div className="flex-1 flex items-center ">
                    {children}
                </div>
                {rightAction && (
                    <div className="">
                        {rightAction}
                    </div>
                )}
            </div>
        </div>
    </GradientBorderCard>
);

export default InfoCard;