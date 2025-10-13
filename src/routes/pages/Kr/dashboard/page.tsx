import GradientBorderCard from "@/components/GradientBorderCard";
import { PT12Wrapper } from "@/components/Wrappers";
import { Award, Calendar1Icon, Diamond } from "lucide-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Badge, cn, Divider } from "@nextui-org/react";
import { getImageUrl } from "@/utils/tools";
import Button from "@/components/Button";

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

const quizs = {
    fundamentalsQuiz: [
        {
            q: "What is the main focus of Cysic's technology?",
            choice: [
                "Social media platform",
                "Zero-knowledge proof acceleration",
                "E-commerce solutions",
                "Mobile gaming",
            ],
            a: 1,
        },
        {
            q: "Which of the following best describes ZK-SNARK?",
            choice: [
                "Social media platform",
                "Zero-knowledge proof acceleration",
                "E-commerce solutions",
                "Mobile gaming",
            ],
            a: 2,
        },
        {
            q: "What is the main focus of Cysic's technology?",
            choice: [
                "Social media platform",
                "Zero-knowledge proof acceleration",
                "E-commerce solutions",
                "Mobile gaming",
            ],
            a: 3,
        },
        {
            q: "What is the main focus of Cysic's technology?",
            choice: [
                "Social media platform",
                "Zero-knowledge proof acceleration",
                "E-commerce solutions",
                "Mobile gaming",
            ],
            a: 4,
        },
        {
            q: "What is the main focus of Cysic's technology?",
            choice: [
                "Social media platform",
                "Zero-knowledge proof acceleration",
                "E-commerce solutions",
                "Mobile gaming",
            ],
            a: 5,
        },
    ],
    basicsQuiz: [
        {
            q: "What is the purpose of the daily check-in system?",
            choice: [
                "To collect user data",
                "To maintain engagement and reward consistency",
                "To prevent spam",
                "To limit access to features",
            ],
            a: 1,
        },
        {
            q: "What is the purpose of the daily check-in system?",
            choice: [
                "To collect user data",
                "To maintain engagement and reward consistency",
                "To prevent spam",
                "To limit access to features",
            ],
            a: 2,
        },
        {
            q: "What is the purpose of the daily check-in system?",
            choice: [
                "To collect user data",
                "To maintain engagement and reward consistency",
                "To prevent spam",
                "To limit access to features",
            ],
            a: 3,
        },
        {
            q: "What is the purpose of the daily check-in system?",
            choice: [
                "To collect user data",
                "To maintain engagement and reward consistency",
                "To prevent spam",
                "To limit access to features",
            ],
            a: 4,
        },
        {
            q: "What is the purpose of the daily check-in system?",
            choice: [
                "To collect user data",
                "To maintain engagement and reward consistency",
                "To prevent spam",
                "To limit access to features",
            ],
            a: 5,
        },
    ],
};

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
    return (
        <GradientBorderCard borderRadius={8} className={cn("p-4 min-h-[8rem]", !item.earned && "opacity-50")}>
            <div className="flex items-start gap-4 justify-between">
                <div className="flex-1">
                    <div
                        className="w-fit mb-1 bg-white text-black px-1 uppercase scale-75 font-semibold origin-left rounded-[4px]"
                        children={item.label}
                    />
                    <div className="flex items-center gap-1">
                        <p className="unbounded-16-300">{item.title}</p>
                    </div>
                    <div className="teachers-14-200 !normal-case text-white/80 mt-1">
                        {item.subTitle}
                    </div>

                    {
                        item.earned ? (
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex flex-col items-start gap-1">
                                    <div>
                                        <span className="text-white/60">Earned At:</span> {dayjs(item.earned).format('MMM DD, YYYY')}
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>

                    <div className="">
                        <Award className={cn("size-6 stroke-[1px]", item.earned && "fill-white stroke-black")}/>
                    </div>

            </div>
        </GradientBorderCard>
    );
};

export const KrActivityDashboard = () => {
    const [last7, setLast7] = useState<
        { timestamp: number; format: string; isToday: false }[]
    >([]);

    useEffect(() => {
        const res: any = getRecent7Days();
        setLast7(res);
    }, []);

    const finishedStamps = stamps.filter((i) => i.earned);
    const unfinishedStamps = stamps.filter((i) => !i.earned);

    return (
        <>
            <PT12Wrapper className="w-full">
                <div className="flex justify-center gap-4">
                    <GradientBorderCard borderRadius={8} className="flex-1 p-4">
                        <>
                            <div className="unbounded-18-200">Stamp Collection</div>
                            <div className="text-white/80 mt-1">
                                {finishedStamps.length} of {stamps.length} stamps earned
                            </div>

                            <div className="flex flex-col gap-4 mt-4">
                                <div className="grid grid-cols-3 gap-4">
                                    {finishedStamps?.map((item, idx) => {
                                        return <StampCard key={idx} item={item} />;
                                    })}
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    {unfinishedStamps?.map((item, idx) => {
                                        return <StampCard key={idx} item={item} />;
                                    })}
                                </div>
                            </div>
                        </>
                    </GradientBorderCard>
                    <div className="w-full max-w-[400px] flex flex-col gap-4">
                        <GradientBorderCard borderRadius={8} className="w-full p-4">
                            <>
                                <div className="flex items-center gap-1 unbounded-18-200">
                                    <Calendar1Icon className="stroke-[1px] size-6" />
                                    <div className="flex flex-col ">
                                        Daily Check-In
                                        <span className="text-white/80 text-xs !normal-case">
                                            Check in every day to maintain your streak
                                        </span>
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
                                                        "opacity-30 text-black bg-white flex items-center justify-center rounded-[8px] text-center flex-1 aspect-[1/1.1]",
                                                        item?.isToday && "opacity-100 bg-white text-black"
                                                    )}
                                                >
                                                    {item.format}
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
                                        <span>1</span>
                                    </div>
                                    <div className="flex-1 items-center flex flex-col gap-2 py-2 rounded-[8px] bg-white text-black">
                                        <p>Tasks Completed</p>
                                        <span>1</span>
                                    </div>
                                    <div className="flex-1 items-center flex flex-col gap-2 py-2 rounded-[8px] bg-white text-black">
                                        <p>Stamps Earned</p>
                                        <span>1</span>
                                    </div>
                                </div>

                                <Divider className="my-4" />

                                <div className="flex items-center gap-1 unbounded-18-200">
                                    Tasks
                                </div>
                                <div className="relative mt-4 flex flex-col gap-4">
                                    {tasks.week1.map((item, idx) => {
                                        return (
                                            <GradientBorderCard
                                                key={idx}
                                                borderRadius={8}
                                                className="px-4 py-4"
                                            >
                                                <>
                                                    <div className="flex items-center gap-1">
                                                        <p className="unbounded-16-300">{item.title}</p>
                                                        <div
                                                            className="bg-white text-black px-1 uppercase scale-75 font-semibold origin-left rounded-[4px]"
                                                            children={item.label}
                                                        />
                                                    </div>
                                                    <div className="teachers-14-200 !normal-case text-white/80 mt-1">
                                                        {item.subTitle}
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
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

                                                        <Button
                                                            className="self-end !px-2 !py-1 text-xs min-h-fit"
                                                            type="light"
                                                        >
                                                            {item.buttonText}
                                                        </Button>
                                                    </div>
                                                </>
                                            </GradientBorderCard>
                                        );
                                    })}
                                </div>
                            </>
                        </GradientBorderCard>
                    </div>
                </div>
            </PT12Wrapper>
        </>
    );
};
