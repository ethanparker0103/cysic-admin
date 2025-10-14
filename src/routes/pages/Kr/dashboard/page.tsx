import GradientBorderCard from "@/components/GradientBorderCard";
import { PT12Wrapper } from "@/components/Wrappers";
import { Award, Calendar1Icon, Diamond, Info } from "lucide-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Badge, cn, Divider, Tooltip } from "@nextui-org/react";
import { getImageUrl } from "@/utils/tools";
import Button from "@/components/Button";
import useKrActivity from "@/models/kr";

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

const tasks = {
    week1: [
        {
            title: "Cysic Fundamentals Quiz",
            subTitle: "Test your knowledge about Cysic's core technology",
            label: "quiz",
            points: "100",
            expireAt: dayjs().add(7, "day").format("MMM DD, YYYY"),
            type: "fundamentalsQuiz",
            buttonText: "Start",
        },
        {
            title: "Community Basics Quiz",
            subTitle: "Learn about the Cysic community and ecosystem",
            label: "quiz",
            points: "75",
            expireAt: dayjs().add(7, "day").format("MMM DD, YYYY"),
            type: "basicsQuiz",
            buttonText: "Start",
        },
        {
            title: "Share Your Journey",
            subTitle: "Post about your Cysic experience on Twitter",
            label: "social",
            points: "50",
            expireAt: dayjs().add(7, "day").format("MMM DD, YYYY"),
            type: "link",
            buttonText: "Share",
        },
        {
            title: "Invite Friends",
            subTitle: "Invite 3 friends to join the community",
            label: "social",
            points: "150",
            expireAt: dayjs().add(7, "day").format("MMM DD, YYYY"),
            type: "action",
            buttonText: "Check",
        },
    ],
};

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

const StampCard = ({ item }: any) => {
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
                        ifActive ? (
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
    const { tweetUnderReview, user, setState } = useKrActivity()
    const [last7, setLast7] = useState<
        { timestamp: number; format: string; isToday: false }[]
    >([]);


    const ifActive = user?.id && !tweetUnderReview

    useEffect(() => {
        const res: any = getRecent7Days();
        setLast7(res);
    }, []);

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
                                {tasks.week1.map((item, idx) => {
                                    return (
                                        <GradientBorderCard
                                            key={idx}
                                            borderRadius={8}
                                            className="px-4 py-4 flex flex-row justify-between items-center"
                                        >
                                            <>
                                                <div>
                                                    <div className="flex items-center gap-1">
                                                        <p className="unbounded-18-400">{item.title}</p>
                                                        <div
                                                            className="bg-white text-black px-1 uppercase scale-75 font-semibold origin-left rounded-[4px]"
                                                            children={item.label}
                                                        />
                                                    </div>
                                                    <div className="teachers-14-200 !normal-case text-white/80 mt-1">
                                                        {item.subTitle}
                                                    </div>
                                                    <div className="flex items-center justify-between mt-4 text-sm">
                                                        <div className="flex flex-col items-start gap-1">
                                                            <div>
                                                                <span className="text-white/60">Reward:</span>{" "}
                                                                {item.points} Points
                                                            </div>
                                                            <div>
                                                                <span className="text-white/60">
                                                                    Expire At:
                                                                </span>{" "}
                                                                {item.expireAt}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    disabled={!ifActive}
                                                    className="min-h-fit h-fit"
                                                    type="light"
                                                    onClick={() => dispatchEvent(new CustomEvent('cysic_kr_tasks_action', { detail: item }))}
                                                >
                                                    {item.buttonText}
                                                </Button>
                                            </>
                                        </GradientBorderCard>
                                    );
                                })}
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
