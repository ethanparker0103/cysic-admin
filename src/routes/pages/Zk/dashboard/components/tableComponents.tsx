import { TaskStatus as TaskStatusText, TaskStatusColor, proverStatus, projectStatus, verifierStatus, StatusColor, verifierTaskStatus } from "@/config";
import { formatReward, getImageUrl, shortStr } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { isMobile } from "react-device-detect";

export const Avatar = ({ switchColor, className, avatar, name }: { switchColor?: boolean, className?: string; avatar: string; name: string }) => {

  const colors = switchColor && name?.charCodeAt(0) % 2 === 0 ? 'from-purple-700 to-purple-500' : 'from-[#2744FF] to-[#589EFF]';
  return (
    avatar ? (
      <img src={avatar} className={cn(className, "size-8 rounded-full")} />
    ) : (
      <p className={cn(className, colors, "size-8 rounded-full bg-gradient-to-b  flex items-center justify-center")}>
        {name?.slice(0, 2)}
      </p>
    )
  )
}

export const TableAvatar = ({ switchColor, className, avatar, name }: { switchColor?: boolean, className?: string, avatar?: string; name: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Avatar switchColor={switchColor} avatar={avatar || ''} name={name} />
      <span>{shortStr(name, isMobile ? 10 : 140)}</span>
    </div>
  );
};



export const TaskStatus = ({ status }: { status: number }) => {
  return (
    <div className=" rounded-full flex items-center gap-1">
      <div className=" min-w-2 min-h-2 w-2 h-2 rounded-full" style={{ backgroundColor: TaskStatusColor[status] }} />
      {TaskStatusText[status]}
    </div>
  );
};

export const TaskReward = ({ className, rewardCYS, rewardCGT }: { className?: string, rewardCYS?: string, rewardCGT?: string }) => {
  return (
    <div className={cn("flex gap-2", className)}>
      {rewardCYS && <div className="flex items-center gap-1">
        <img className="size-4" src={getImageUrl('@/assets/images/tokens/CYS.svg')} />
        <span>{formatReward(rewardCYS, 4, true)} CYS</span>
      </div>}
      {rewardCGT && <div className="flex items-center gap-1">
        <img className="size-4" src={getImageUrl('@/assets/images/tokens/CGT.svg')} />
        <span>{formatReward(rewardCGT, 4, true)} CGT</span>
      </div>}
    </div>
  )
}

export const ProverStatus = ({ status }: { status: number }) => {
  return (
    <div className=" rounded-full flex items-center gap-1">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: StatusColor[status] }} />
      {proverStatus[status]}
    </div>
  );
};

export const ProjectStatus = ({ status }: { status: number }) => {
  return (
    <div className=" rounded-full flex items-center gap-1">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: StatusColor[status] }} />
      {projectStatus[status]}
    </div>
  );
};

export const VerifierStatus = ({ status }: { status: number }) => {
  return (
    <div className=" rounded-full flex items-center gap-1">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: StatusColor[status] }} />
      {verifierStatus[status]}
    </div>
  );
};

export const VerifierTaskStatus = ({ status }: { status: number }) => {
  return (
    <div className=" rounded-full flex items-center gap-1">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: StatusColor[status] }} />
      {verifierTaskStatus[status]}
    </div>
  );
};