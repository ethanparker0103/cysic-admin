import React from "react";
import { ArrowRight } from "lucide-react";
import GradientBorderCard from "@/components/GradientBorderCard";
import { cn } from "@nextui-org/react";

const AdCard = ({
  title,
  desc,
  imageSrc,
  onClick,
  className
}: {
  title: string | React.ReactNode;
  desc?: string | React.ReactNode;
  imageSrc: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div className="relative group overflow-hidden cursor-pointer h-[10rem]" onClick={onClick}>
      <img
        src={imageSrc}
        alt={typeof title === "string" ? title : "Advertisement"}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-500 rounded-lg",
          "group-hover:scale-105",
          className
        )}
      />

      {!onClick ? <div className="absolute inset-0 bg-black/30 z-10" /> : null}
      <GradientBorderCard borderRadius={8} className="relative z-20 p-4 flex flex-col justify-between backdrop-filter-none h-full bg-[transparent]">
        <div>
          <h3 className="unbounded text-2xl font-light text-white">{title}</h3>
          {desc? <p className="teacher normal-case text-base text-white mt-2">{desc}</p> : null}
        </div>
        {onClick ? <ArrowRight size={20} className="text-white self-end" /> : null}
      </GradientBorderCard>
    </div>
  );
};

export default AdCard;
