import { ArrowRight } from "lucide-react";
import GradientBorderCard from "@/components/gradientBorderCard";
import Button from "@/components/Button";
import { getImageUrl } from "@/utils/tools";
import { ReactNode } from "react";

// 任务卡片组件
interface TaskCardProps {
  title: string;
  status: string;
  buttonText: "CLAIM" | "CHECK";
  onClick?: () => void;
}

const TaskCard = ({ title, status, buttonText, onClick }: TaskCardProps) => (
  <GradientBorderCard borderRadius={8} className="mb-4">
    <div className="py-4 px-6 w-full flex justify-between items-center">
      <div className="flex flex-col">
        <div className="text-base text-white">{title}</div>
        <div className="text-sm text-sub">Complete {status}</div>
      </div>
      <Button 
        type="light" 
        onClick={onClick} 
        className="min-w-[90px] py-2 px-3 text-sm rounded-md"
      >
        {buttonText}
      </Button>
    </div>
  </GradientBorderCard>
);

// 任务分类组件
interface TaskSectionProps {
  title: string;
  children: ReactNode;
  rightAction?: ReactNode;
}

const TaskSection = ({ title, children, rightAction }: TaskSectionProps) => (
  <div className="mb-12">
    <div className="flex justify-between items-center mb-6">
      <h2 className="title text-4xl !font-[300] uppercase">{title}</h2>
      {rightAction && (
        <div>{rightAction}</div>
      )}
    </div>
    {children}
  </div>
);

// 社交任务页面组件
const SocialTaskPage = () => {
  // 处理任务认领和检查
  const handleClaim = (taskTitle: string) => {
    console.log(`Claiming: ${taskTitle}`);
    // 这里添加认领任务的逻辑
  };

  const handleCheck = (taskTitle: string) => {
    console.log(`Checking: ${taskTitle}`);
    // 这里添加检查任务的逻辑
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#001910]/40 to-black">
      {/* 背景装饰 */}
      <div className="absolute w-full top-0 left-0 right-0 h-[100vh] overflow-hidden">
        <div className="w-full h-full">
          <img
            src={getImageUrl("@/assets/images/_global/socialTask_landing_bg.png")}
            alt="Background"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001910]/30 to-black"></div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="mx-auto px-[3rem] relative z-10 pt-20 pb-16">
        {/* 页面标题 */}
        <h1 className="title text-7xl md:text-[120px] !font-[200] mb-24 text-center">SOCIAL TASKS</h1>
        
        {/* 奖励任务部分 */}
        <TaskSection 
          title="EARN CGT REWARDS"
          rightAction={
            <a href="#" className="flex items-center text-sub text-sm hover:text-white">
              CHECK YOUR REWARDS <ArrowRight size={16} className="ml-1" />
            </a>
          }
        >
          <TaskCard 
            title="50 CGT" 
            status="xxxxxx" 
            buttonText="CLAIM"
            onClick={() => handleClaim("50 CGT")}
          />
          <TaskCard 
            title="50 CGT" 
            status="xxxxxx" 
            buttonText="CLAIM"
            onClick={() => handleClaim("50 CGT")}
          />
        </TaskSection>
        
        {/* 数字收割机部分 */}
        <TaskSection 
          title="DIGITAL HARVESTER"
          rightAction={
            <a href="#" className="flex items-center text-sub text-sm hover:text-white">
              CHECK ALL YOUR VOUCHERS <ArrowRight size={16} className="ml-1" />
            </a>
          }
        >
          <TaskCard 
            title="Tier 1 ZK Harvester 1-DAY 99% OFF Trail" 
            status="xxxxxx" 
            buttonText="CLAIM"
            onClick={() => handleClaim("Tier 1 ZK Harvester 1-DAY")}
          />
          <TaskCard 
            title="Tier 1 ZK Harvester 3-DAY 99% OFF Trail" 
            status="xxxxxx" 
            buttonText="CHECK"
            onClick={() => handleCheck("Tier 1 ZK Harvester 3-DAY")}
          />
          <TaskCard 
            title="20% OFF for purchase" 
            status="xxxxxx" 
            buttonText="CHECK"
            onClick={() => handleCheck("20% OFF")}
          />
        </TaskSection>
        
        {/* ZK 乘数部分 */}
        <TaskSection 
          title="ZK MULTIPLIER"
          rightAction={
            <a href="#" className="flex items-center text-sub text-sm hover:text-white">
              INCREASE YOUR MULTIPLIER <ArrowRight size={16} className="ml-1" />
            </a>
          }
        >
          <TaskCard 
            title="Check Task list to Boost your Multiplier" 
            status="xxxxxx" 
            buttonText="CHECK"
            onClick={() => handleCheck("Boost Multiplier")}
          />
          <TaskCard 
            title="3-DAY Max-Speed Free Trail" 
            status="xxxxxx" 
            buttonText="CLAIM"
            onClick={() => handleClaim("3-DAY Max-Speed")}
          />
        </TaskSection>
      </div>
    </div>
  );
};

export default SocialTaskPage;