import GradientBorderCard from "@/components/GradientBorderCard";
import { PT12Wrapper } from "@/components/Wrappers";
import { Calendar1Icon, Diamond, Info } from "lucide-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { cn, Divider, Tooltip, Spinner } from "@nextui-org/react";
import { getImageUrl } from "@/utils/tools";
import Button from "@/components/Button";
import useKrActivity from "@/models/kr";

// 任务类型定义（与krApi.ts中的Task接口保持一致）
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
  currentStatus: number; // 0: 未完成, 1: 待审核, 2: 待领取, 3: 已完成
  taskResult: string;
  createdAt: number;
  updatedAt: number;
}

export interface ITask {
    title: string;
    subTitle: string;
    label: string;
    points: string;
    expireAt: string;
    type: string;
    buttonText: string;
}

const stamps = [
    {
        title: "Early Bird",
        subTitle: "Pre-registration exclusive",
        earned: Date.now(),
        label: "legendary",
    },
    {
        title: "First Check-In",
        subTitle: "Complete your first daily check-in",
        earned: Date.now(),
        label: "common",
    },
    {
        title: "7-Day Warrior",
        subTitle: "Check in for 7 consecutive days",
        earned: false,
        label: "legendary",
    },
    {
        title: "30-Day Champion",
        subTitle: "Check in for 30 consecutive days",
        earned: false,
        label: "legendary",
    },
    {
        title: "100-Day Warrior",
        subTitle: "Check in for 100 consecutive days",
        earned: false,
        label: "legendary",
    },
    {
        title: "Week 1 Master",
        subTitle: "Complete all Week 1 tasks",
        earned: false,
        label: "legendary",
    },
    {
        title: "Week 2 Master",
        subTitle: "Complete all Week 2 tasks",
        earned: false,
        label: "legendary",
    },
];


function getRecent7Days() {
    const today = dayjs();
    const days = [];

    for (let i = -3; i <= 3; i++) {
        const date = today.add(i, "day");
        days.push({
            timestamp: date.valueOf(), // 毫秒时间戳
            format: date.format("DD"), // 格式化日期
            isToday: date.isSame(today, "day"), // 是否是今天
        });
    }

    return days;
}

const StampCard = ({ item }: { item: { title: string; subTitle: string; earned: number | boolean; label: string } }) => {
    const { tweetUnderReview, user } = useKrActivity()


    const ifActive = user?.id && item?.earned && !tweetUnderReview
    return (
        <GradientBorderCard gradientFrom={ifActive && "#00F0FF"} gradientTo={ifActive && "#9D47FF"} borderRadius={8} className={cn("p-4 min-h-[8rem]", !ifActive && "opacity-50")}>
            <div className="flex flex-col items-center ">
                <img className="size-16 mb-2" src={getImageUrl("@/assets/images/assets/token.png")} />
                <div className="flex-1">
                    <div className="flex items-center gap-1 justify-center">
                        <p className="unbounded-14-300 text-center">{item.title}</p>
                    </div>
                    <div className="teachers-12-200 !normal-case text-white/80 mt-1 text-center">
                        {item.subTitle}
                    </div>

                    {
                        ifActive && typeof item.earned === 'number' ? (
                            <div className="flex items-center justify-between text-xs absolute top-2 right-2 text-white/80 origin-right scale-80">
                                {dayjs(item.earned).format('MMM DD, YYYY')}
                            </div>
                        ) : null
                    }
                </div>

            </div>
        </GradientBorderCard>
    );
};

export const KrActivityDashboard = () => {
    const { tweetUnderReview, user, setState, taskList, loading, initTaskList } = useKrActivity()
    const [last7, setLast7] = useState<
        { timestamp: number; format: string; isToday: boolean }[]
    >([]);

    const ifActive = user?.id && !tweetUnderReview

    console.log('user', user);

    useEffect(() => {
        const res = getRecent7Days();
        setLast7(res);
    }, []);

    useEffect(() => {
        // 初始化任务列表（需要用户ID存在）
        if (user?.id) {
            initTaskList();
        }
    }, [user?.id, initTaskList]);

    const finishedStamps = ifActive ? stamps.filter((i) => i.earned) : [];
    const unfinishedStamps = ifActive ? stamps.filter((i) => !i.earned) : stamps;

    const activeList = ifActive ? [dayjs().format('DD')] : []

    return (
        <>
            {user?.id && tweetUnderReview ? (
                <div className="flex items-center justify-between gap-4 teachers-14-300 px-8 py-2 rounded-[8px] mb-6 w-fit mx-auto bg-[#00eeff]/20 border border-[#00eeff]">
                    <span className="text-white">Your tweet is now under reviewing, please wait...</span>
                    <Button onClick={()=>{setState({tweetUnderReview: false})}} className="" type="light">Confirm(Debug)</Button>
                </div>
            ) : null}

            <PT12Wrapper className="w-full pt-0">

                <div className="flex justify-center gap-4">
                    <GradientBorderCard borderRadius={8} className="flex-1 p-4">
                        <>
                            <div className="flex items-center gap-1 unbounded-24-200">
                                Tasks
                            </div>
                            <div className="relative mt-4 flex flex-col gap-4">
                                {loading ? (
                                    <div className="flex justify-center py-8">
                                        <Spinner size="lg" />
                                    </div>
                                ) : taskList.length > 0 ? (
                                    taskList.map((task: Task) => {
                                        const getTaskStatusText = (status: number) => {
                                            switch (status) {
                                                case 0: return "Start";
                                                case 1: return "Pending";
                                                case 2: return "Claim";
                                                case 3: return "Completed";
                                                default: return "Start";
                                            }
                                        };


                                        return (
                                            <GradientBorderCard
                                                key={task.id}
                                                borderRadius={8}
                                                className="px-4 py-4 flex flex-row justify-between items-center"
                                            >
                                                <>
                                                    <div className="flex items-start gap-3">
                                                        <img 
                                                            src={task.imgUrl || getImageUrl("@/assets/images/_global/stake_landing_bg.png")} 
                                                            alt={task.title}
                                                            className="w-12 h-12 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <div className="flex items-center gap-1">
                                                                <p className="unbounded-18-400">{task.title}</p>
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
                                                                        <span className="text-white/60">Reward:</span>{" "}
                                                                        {task.RewardPoints} Points
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-white/60">
                                                                            Expire At:
                                                                        </span>{" "}
                                                                        {dayjs(task.endAt * 1000).format("MMM DD, YYYY")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Button
                                                        disabled={!ifActive || task.currentStatus === 3}
                                                        className="min-h-fit h-fit"
                                                        type="light"
                                                        onClick={() => dispatchEvent(new CustomEvent('cysic_kr_tasks_action', { detail: task }))}
                                                    >
                                                        {getTaskStatusText(task.currentStatus)}
                                                    </Button>
                                                </>
                                            </GradientBorderCard>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-8 text-white/60">
                                        No tasks available
                                    </div>
                                )}
                            </div>
                        </>
                    </GradientBorderCard>
                    <div className="w-full max-w-[400px] flex flex-col gap-4">
                        <GradientBorderCard borderRadius={8} className="w-full p-4">
                            <>
                               <div className="flex items-center justify-between gap-4">

                               <div className="flex items-center gap-1 unbounded-18-200">
                                    <Calendar1Icon className="stroke-[1px] size-6" />
                                    <div className="flex flex-col ">
                                        <Tooltip delay={0} disableAnimation closeDelay={0} content={<div className="py-2 flex flex-col gap-1 text-white/80">
                                            <span>✅ 1st check-in: "First Check-In" badge</span>
                                            <span>🔥 7 consecutive days: "7-Day Warrior" badge</span>
                                            <span>🏆 30 consecutive days: "30-Day Champion" badge</span>
                                            <span>👑 100 consecutive days: "100-Day Legend" badge</span>
                                            </div>}>
                                            <p className="flex items-center gap-1">Daily Check-In <Info className="size-3" /> </p>
                                        </Tooltip>
                                        
                                        <span className="text-white/80 text-xs !normal-case">
                                            Check in every day to maintain your streak
                                        </span>
                                    </div>
                                </div>

                                <div className="items-center flex flex-col gap-1 px-2 py-1 rounded-[8px] bg-white text-black text-xs">
                                        <p>Daily streak</p>
                                        <span>{ifActive ? 1 : 0}</span>
                                    </div>
                               </div>

                                <div className="flex flex-col gap-2 mt-4">
                                    <div className="text-left">Last 7 days</div>
                                    <div className="flex items-center gap-2">
                                        {last7?.map((item, idx) => {
                                            return (
                                                <div
                                                    key={idx}
                                                    className={cn(
                                                        "relative opacity-30 text-black bg-white flex flex-col gap-1 pt-1 items-center justify-center rounded-[8px] text-center flex-1 aspect-[1/1.1]",
                                                        activeList.includes(item?.format) && "opacity-100 bg-white text-black"
                                                    )}
                                                >
                                                    <span>{item.format}</span>
                                                    <span className={cn(!activeList.includes(item?.format) && "grayscale", "")}>🔥</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        </GradientBorderCard>

                        <GradientBorderCard borderRadius={8} className=" w-full p-4">
                            <>
                                <div className="flex items-center gap-1 unbounded-18-200">
                                    <Diamond className="stroke-[1px] size-6" /> Overview
                                </div>

                                <div className="flex items-center gap-2 mt-4 [&_p]:font-medium">
                                    <div className="flex-1 items-center flex flex-col gap-2 py-2 rounded-[8px] bg-white text-black">
                                        <p>Total Points</p>
                                        <span>{ifActive ? 2 : 0}</span>
                                    </div>
                                    <div className="flex-1 items-center flex flex-col gap-2 py-2 rounded-[8px] bg-white text-black">
                                        <p>Tasks Completed</p>
                                        <span>{ifActive ? 2 : 0}</span>
                                    </div>
                                    <div className="flex-1 items-center flex flex-col gap-2 py-2 rounded-[8px] bg-white text-black">
                                        <p>Stamps Earned</p>
                                        <span>{ifActive ? 2 : 0}</span>
                                    </div>
                                </div>

                                <Divider className="my-4" />


                                <>
                                    <div className="unbounded-18-200">Stamp Collection</div>
                                    <div className="text-white/80 mt-1">
                                        {finishedStamps.length} of {stamps.length} stamps earned
                                    </div>

                                    <div className="flex flex-col gap-4 mt-4">
                                        {finishedStamps?.length ? <div className="grid grid-cols-2 gap-4">
                                            {finishedStamps?.map((item, idx) => {
                                                return <StampCard key={idx} item={item} />;
                                            })}
                                        </div> : null}

                                        <div className="grid grid-cols-2 gap-4">
                                            {unfinishedStamps?.map((item, idx) => {
                                                return <StampCard key={idx} item={item} />;
                                            })}
                                        </div>
                                    </div>
                                </>



                            </>
                        </GradientBorderCard>
                    </div>
                </div>
            </PT12Wrapper>
        </>
    );
};
