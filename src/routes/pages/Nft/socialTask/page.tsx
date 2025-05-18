import { ArrowRight } from "lucide-react";
import GradientBorderCard from "@/components/GradientBorderCard";
import Button from "@/components/Button";
import { getImageUrl, handleVoucherModal } from "@/utils/tools";
import { ReactNode, useState, useEffect, Key } from "react";
import axios from "@/service";
import { useRequest } from "ahooks";
import { isMobile } from "react-device-detect";
import { cn } from "@nextui-org/react";
import usePagnation from "@/hooks/usePagnation";
import Spinner from "@/components/spinner";

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
        needLoading
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
  status: number; // 0: 未开始, 1: 已完成, 2: 进行中
}


const TaskGroup = ({ taskGroup }: { taskGroup: TaskGroup }) => {

  const { data, loading: _loading, run } = usePagnation(() => axios.get('/api/v1/social/task/list', {
    params: {
      groupId: taskGroup.id,
    }
  }), {
    ready: !!taskGroup.id,
    refreshDeps: [taskGroup.id]
  })

  const tasks = data?.data?.taskList as Task[]
  const loading = !tasks?.length && _loading


  // 处理任务认领和检查
  const handleClaim = async (task: Task) => {
    await axios.post('/api/v1/social/task/claim', {
      taskId: task.id
    })

    run()
  };

  return (
    <TaskSection
      key={taskGroup.id}
      title={taskGroup.name}
      rightAction={
        <div onClick={handleVoucherModal} className={cn("flex items-center text-sub hover:text-white", isMobile ? "text-base" : "text-sm")}>
          CHECK ALL YOUR VOUCHERS <ArrowRight size={16} className="ml-1" />
        </div>
      }
    >
      {loading ?
        <Spinner />
        : tasks?.length === 0 ? (
          <GradientBorderCard className="text-center py-12 text-gray-400">No task data...</GradientBorderCard>
        ) : (
          tasks?.map((task: Task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              status={task.description}
              buttonText={"CHECK"}
              onClick={() => handleClaim(task)}
            />
          ))
        )}
    </TaskSection>
  )
}
// 社交任务页面组件
const SocialTaskPage = () => {
  // 状态管理
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);

  const { loading: _loading } = useRequest(() => axios.get("/api/v1/social/task/group/list"), {
    onSuccess: (res) => {
      setTaskGroups(res.data.taskGroupList)
    }
  })

  const loading = !taskGroups?.length && _loading

  return (
    <>


      {/* content */}
      <div className={cn("mx-auto mb-auto relative z-10 pt-20 pb-16 w-full", isMobile ? "break-words" : "")}>
        {/* title */}
        <h1 className={cn("unbounded font-light mb-24 text-center", isMobile ? "text-7xl" : "text-[2.25rem]")}>SOCIAL TASKS</h1>

        {/* 根据API数据渲染任务组 */}
        {loading ? (
          <Spinner />
        ) : (
          // 按sort排序并渲染每个任务组
          taskGroups
            .sort((a, b) => a.sort - b.sort)
            .map(group => <TaskGroup key={group.id} taskGroup={group} />)
        )}
      </div>
    </>
  );
};

export default SocialTaskPage;