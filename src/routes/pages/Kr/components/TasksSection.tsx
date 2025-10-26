import GradientBorderCard from "@/components/GradientBorderCard";
import Button from "@/components/Button";
import { getImageUrl } from "@/utils/tools";
import { Spinner } from "@nextui-org/react";
import dayjs from "dayjs";
import { EUserTaskStatus } from "@/routes/pages/Admin/interface";

interface Task {
    id: number;
    title: string;
    description: string;
    imgUrl: string;
    taskType: string;
    RewardPoints: number;
    RewardStampId: number;
    startAt: number;
    endAt: number;
    forceLocked: boolean;
    currentStatus: number;
    taskResult: string;
    createdAt: number;
    updatedAt: number;
}

interface TasksSectionProps {
    taskList: Task[];
    loading: boolean;
    ifActive: boolean;
}

const getTaskStatusText = (status: number) => {
    switch (status) {
        case EUserTaskStatus.UserTaskCompletionStatusIncomplete:
            return "Start";
        case EUserTaskStatus.UserTaskCompletionStatusPending:
            return "Pending";
        case EUserTaskStatus.UserTaskCompletionStatusWaitClaim:
            return "Claim";
        case EUserTaskStatus.UserTaskCompletionStatusCompleted:
            return "Completed";
        default:
            return "Start";
    }
};

export const TasksSection = ({ taskList, loading, ifActive }: TasksSectionProps) => {
    // 根据startAt分类
    const formattedTaskMap = taskList.reduce(
        (acc: Record<string, Task[]>, task: Task) => {
            const startAt = (task.startAt * 1000).toString();
            if (!acc[startAt]) {
                acc[startAt] = [];
            }
            acc[startAt].push(task);
            return acc;
        },
        {} as Record<string, Task[]>
    );

    const formattedTaskList = Object.values(formattedTaskMap);

    return (
        <div className="flex-1 py-4">
            <div className="flex items-center gap-1 unbounded-24-200">
                Tasks
            </div>
            <div className="relative mt-4 flex flex-col gap-6">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <Spinner size="lg" />
                    </div>
                ) : formattedTaskList.length > 0 ? (
                    (formattedTaskList as Task[][]).map((tasks: Task[], idx: number) => {
                        const day = dayjs(tasks[0].startAt * 1000).format("dddd");
                        const startAt = dayjs(tasks[0].startAt * 1000).format("YYYY-MM-DD");
                        return (
                            <div key={idx} className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="">
                                        <span className="unbounded-18-200">{day}</span>{" "}
                                        <span className="text-white/60 text-sm">({startAt})</span>
                                    </div>
                                </div>
                                {tasks.map((task: Task) => (
                                    <GradientBorderCard
                                        key={task.id}
                                        borderRadius={8}
                                        className="px-4 py-4 flex flex-row justify-between items-center"
                                    >
                                        <>
                                            <div className="flex items-start gap-3">
                                                <img
                                                    src={
                                                        task.imgUrl ||
                                                        getImageUrl(
                                                            "@/assets/images/_global/stake_landing_bg.png"
                                                        )
                                                    }
                                                    alt={task.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <div className="flex items-center gap-1">
                                                        <p className="unbounded-18-400">
                                                            {task.title}
                                                        </p>
                                                        <div
                                                            className="bg-white text-black px-1 uppercase scale-75 font-semibold origin-left rounded-[4px]"
                                                            children={task.taskType}
                                                        />
                                                    </div>
                                                    <div className="teachers-14-200 !normal-case text-white/80 mt-1">
                                                        {task.description}
                                                    </div>
                                                    <div className="flex items-center justify-between mt-4 text-sm">
                                                        <div className="flex flex-col items-start gap-1">
                                                            <div>
                                                                <span className="text-white/60">
                                                                    Reward:
                                                                </span>{" "}
                                                                {task.RewardPoints} Points
                                                            </div>
                                                            <div>
                                                                <span className="text-white/60">
                                                                    Expire At:
                                                                </span>{" "}
                                                                {dayjs(task.endAt * 1000).format(
                                                                    "MMM DD, YYYY"
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Button
                                                disabled={!ifActive || task.currentStatus == EUserTaskStatus.UserTaskCompletionStatusCompleted || task.currentStatus == EUserTaskStatus.UserTaskCompletionStatusPending}
                                                className="min-h-fit h-fit"
                                                type="light"
                                                onClick={() =>
                                                    dispatchEvent(
                                                        new CustomEvent("cysic_kr_tasks_action", {
                                                            detail: task,
                                                        })
                                                    )
                                                }
                                            >
                                                {getTaskStatusText(task.currentStatus)}
                                            </Button>
                                        </>
                                    </GradientBorderCard>
                                ))}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-8 text-white/60">
                        No tasks available
                    </div>
                )}
            </div>
        </div>
    );
};

