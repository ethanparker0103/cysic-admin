import { ArrowRight } from "lucide-react";
import GradientBorderCard from "@/components/GradientBorderCard";
import Button from "@/components/Button";
import { getImageUrl } from "@/utils/tools";
import { ReactNode, useState, useEffect } from "react";
import axios from "@/service";
import { useRequest } from "ahooks";
import { isMobile } from "react-device-detect";
import { cn } from "@nextui-org/react";

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
    <div className={cn("flex mb-6 gap-4", isMobile ? "flex-col" : " justify-between items-center")}>
      <h2 className={cn("title !font-light uppercase", isMobile ? "!text-2xl" : "text-4xl")}>{title}</h2>
      {rightAction && (
        <div>{rightAction}</div>
      )}
    </div>
    {children}
  </div>
);

// 任务组类型
interface TaskGroup {
  id: number;
  name: string;
  sort: number;
}

// 任务类型
interface Task {
  id: number;
  title: string;
  description: string;
  status: string; // 0: 未开始, 1: 已完成, 2: 进行中
}

// 社交任务页面组件
const SocialTaskPage = () => {
  // 状态管理
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);
  const [taskLists, setTaskLists] = useState<{[key: number]: Task[]}>({});
  const [loading, setLoading] = useState(true);
  
  // 获取任务组列表和所有组的任务
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 1. 获取任务组列表
        const groupResponse = await axios.get('/api/v1/social/task/group/list');
        if (groupResponse?.data?.taskGroupList) {
          const groups = groupResponse.data.taskGroupList;
          setTaskGroups(groups);
          
          // 2. 为每个组加载任务列表
          const taskPromises = groups.map(group => 
            axios.get('/api/v1/social/task/list', {
              params: {
                groupId: group.id,
                pageNum: 1,
                pageSize: 10
              }
            })
          );
          
          // 等待所有任务列表加载完成
          const taskResponses = await Promise.all(taskPromises);
          
          // 处理任务列表响应
          const taskMap: {[key: number]: Task[]} = {};
          taskResponses.forEach((response, index) => {
            if (response?.data?.taskList) {
              taskMap[groups[index].id] = response.data.taskList;
            }
          });
          
          setTaskLists(taskMap);
        }
      } catch (error) {
        console.error("Failed to load task data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []);
  
  // 处理任务认领和检查
  const handleClaim = (taskTitle: string) => {
    console.log(`Claiming: ${taskTitle}`);
    // 这里添加认领任务的逻辑
  };

  const handleCheck = (taskTitle: string) => {
    console.log(`Checking: ${taskTitle}`);
    // 这里添加检查任务的逻辑
  };
  
  // 渲染任务组内容
  const renderTaskGroup = (group: TaskGroup) => {
    const tasks = taskLists[group.id] || [];
    
    // 根据任务组类型决定右侧操作按钮文本
    let rightActionText = "CHECK YOUR REWARDS";
    if (group.name === "DIGITAL HARVESTER") {
      rightActionText = "CHECK ALL YOUR VOUCHERS";
    } else if (group.name === "ZK MULTIPLIER") {
      rightActionText = "INCREASE YOUR MULTIPLIER";
    }
    
    return (
      <TaskSection 
        key={group.id}
        title={group.name}
        rightAction={
          <a href="#" className={cn("flex items-center text-sub hover:text-white", isMobile ? "text-base" : "text-sm")}>
            {rightActionText} <ArrowRight size={16} className="ml-1" />
          </a>
        }
      >
        {tasks.length === 0 ? (
          <div className="text-center py-4 text-gray-400">Loading task data...</div>
        ) : (
          tasks.map(task => (
            <TaskCard 
              key={task.id}
              title={task.title} 
              status={task.description} 
              buttonText={task.status === "1" ? "CHECK" : "CLAIM"}
              onClick={() => task.status === "1" ? handleCheck(task.title) : handleClaim(task.title)}
            />
          ))
        )}
      </TaskSection>
    );
  };

  return (
    <>


      {/* content */}
      <div className={cn("mx-auto mb-auto relative z-10 pt-20 pb-16 w-full", isMobile ? "break-words" : "")}>
        {/* title */}
        <h1 className={cn("title !font-[200] mb-24 text-center", isMobile ? "text-7xl" : "text-[8rem]")}>SOCIAL TASKS</h1>
        
        {/* 根据API数据渲染任务组 */}
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading task groups...</div>
        ) : (
          // 按sort排序并渲染每个任务组
          taskGroups
            .sort((a, b) => a.sort - b.sort)
            .map(group => renderTaskGroup(group))
        )}
      </div>
    </>
  );
};

export default SocialTaskPage;