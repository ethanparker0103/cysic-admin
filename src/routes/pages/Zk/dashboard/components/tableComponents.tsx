import { TaskStatus as TaskStatusText, TaskStatusColor } from "@/config";
import { getImageUrl, shortStr } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { isMobile } from "react-device-detect";

export const Avatar = ({ className, avatar, name }: { className?: string; avatar: string; name: string }) => {
  return (
    avatar ? (
      <img src={avatar} className={cn(className, "size-8 rounded-full")} />
    ) : (
      <div className={cn(className, "size-8 rounded-full bg-gradient-to-b from-[#2744FF] to-[#589EFF] flex items-center justify-center")}>
        {name?.slice(0, 2)}
      </div>
    )
  )
}

export const TableAvatar = ({ avatar, name }: { avatar: string; name: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar avatar={avatar} name={name} />
      <span>{shortStr(name, isMobile ? 10 : 140)}</span>
    </div>
  );
};



export const TaskStatus = ({ status }: { status: number }) => {
  return (
    <div className=" rounded-full flex items-center gap-1">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TaskStatusColor[status] }} />
      {TaskStatusText[status]}
    </div>
  );
};

export const TaskReward = ({ className, rewardCYS, rewardCGT }: { className?: string, rewardCYS?: string, rewardCGT?: string }) => {
  return (
    <div className={cn("flex gap-2", className)}>
      {rewardCYS && <div className="flex items-center gap-1">
        <img className="size-4" src={getImageUrl('@/assets/images/tokens/CYS.svg')} />
        <span>{rewardCYS} CYS</span>
      </div>}
      {rewardCGT && <div className="flex items-center gap-1">
        <img className="size-4" src={getImageUrl('@/assets/images/tokens/CGT.svg')} />
        <span>{rewardCGT} CGT</span>
      </div>}
    </div>
  )
}