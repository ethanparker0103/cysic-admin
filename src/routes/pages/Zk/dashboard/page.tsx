import axios from "@/service";
import { useRequest } from "ahooks";
import { isMobile } from "react-device-detect";
import { cn, Divider, Tab, Tabs } from "@nextui-org/react";
import GradientBorderCard from "@/components/GradientBorderCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getImageUrl, shortStr } from "@/utils/tools";
import Chart from "@/routes/pages/Zk/components/chart";
import CysicTable, { CysicTableColumn } from "@/components/Table";
import usePagnation from "@/hooks/usePagnation";
import { commonPageSize, TaskStatus } from "@/config";
import { useState } from "react";
import dayjs from "dayjs";

interface IOverview {
    "projectNum": number,
    "proverNum": number,
    "verifierNum": number,
    "approvedVerifierNum": number,
    "totalTask": number,
    "runningTask": number,
    "totalRewardCys": string,
    "totalRewardCgt": string
}

interface ITask {
    "id": number,
    "taskHash": string,
    "createBlock": number,
    "createAt": string,
    "reward": string,
    "status": number
}

const tabs = [
    {
        name: "All",
        value: 0
    },
    {
        name: "In Progress",
        value: 1
    },
    {
        name: "Finished",
        value: 2
    },
];


const DashboardPage = () => {
    const { data } = useRequest(() => {
        return axios.get('/api/v1/zkTask/dashboard/overview')
    })
    const overview = data?.data as IOverview

    const { loading, data: dailyTaskSummaryData } = useRequest(() => {
        return axios.get('/api/v1/zkTask/dashboard/dailyTaskSummary')
    })

    const hasData = !!dailyTaskSummaryData?.data?.list?.length;
    const chartData = dailyTaskSummaryData?.data?.list || [];


    const [status, setStatusTab] = useState<any>(tabs[0].value)
    const { data: taskListData, loading: taskListLoading } = usePagnation((currentPage: number) => {
        return axios.get('/api/v1/zkTask/dashboard/task/list', {
            params: {
                pageNum: currentPage,
                pageSize: commonPageSize,
                status: status
            }
        })
    }, {
        refreshDeps: [status],
        staleTime: 10_000
    })

    const taskList = taskListData?.data?.list || [] as ITask[]

    const taskListColumns: CysicTableColumn<ITask>[] = [
        {
            key: "taskHash",
            label: "Task Hash",
            renderCell: (task) => (shortStr(task.taskHash, 12))
        },
        {
            key: "createBlock",
            label: "Create Block",
            renderCell: (task) => (task.createBlock)
        },
        {
            key: "reward",
            label: "Reward",
            renderCell: (task) => (task.reward)
        },
        {
            key: "createAt",
            label: "Created at",
            renderCell: (task) => task.createAt ? dayjs.unix(Number(task.createAt)).format("YYYY-MM-DD HH:mm:ss") : '-'
        },
        {
            key: "status",
            label: "Status",
            renderCell: (task) => (TaskStatus[task.status])
        },
        {
            key: "view",
            label: "View",
            renderCell: (task) => (
                <Link to={`/zk/dashboard/task/${task.id}`} className="flex gap-1 items-center justify-end">
                    <span className="teacher text-sm ">View</span>
                    <ArrowRight className="size-3" />
                    {/* <img className="size-3" src={getImageUrl("@/assets/images/icon/share.svg")} /> */}
                </Link>
            )
        }
    ];


    return (
        <>


            {/* content */}
            <div className={cn("mx-auto mb-auto relative z-10 pt-20 pb-16 w-full", isMobile ? "break-words" : "")}>
                {/* title */}
                <h1 className={cn("unbounded font-light mb-24 text-center", isMobile ? "text-7xl" : "text-[2.25rem]")}>Dashboard</h1>

                {/* s1 */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col lg:flex-row gap-3">
                        <GradientBorderCard borderRadius={8} className="py-4 px-6 flex gap-4 flex-1">
                            <div className="flex-1 flex flex-col gap-4 justify-between h-full">
                                <div className="flex flex-col gap-4 justify-between h-full">
                                    <div className="flex items-center gap-2 justify-between">
                                        <span className="unbounded text-base font-light">Prover</span>
                                        <Link to={"/zk/dashboard/prover"} className="teacher text-sm text-sub flex items-center gap-2" >Details <ArrowRight className="size-4" /></Link>
                                    </div>
                                    <span className="unbounded text-[32px] !tracking-widest self-end ">{overview?.proverNum || '0'}</span>
                                </div>
                            </div>
                        </GradientBorderCard>

                        <GradientBorderCard borderRadius={8} className="py-4 flex gap-4 flex-[2]">
                            <div className="flex flex-col gap-4 justify-between h-full w-full">
                                <div className="flex items-center gap-2 justify-between px-6">
                                    <span className="unbounded text-xl font-light">verifier</span>
                                    <Link to={"/zk/dashboard/verifier"} className="teacher text-sm text-sub flex items-center gap-2" >Details <ArrowRight className="size-4" /></Link>
                                </div>
                                <Divider className="bg-[#FFFFFFCC]" />

                                <div className="px-6 flex flex-col gap-4">
                                    <div className="flex items-center gap-2 justify-between">
                                        <span className="unbounded text-base font-light !tracking-widest ">running</span>
                                        <span className="unbounded text-[24px] !tracking-widest ">{overview?.approvedVerifierNum || '0'}</span>
                                    </div>
                                    <Divider className="bg-[#FFFFFFCC]" />
                                    <div className="flex items-center gap-2 justify-between">
                                        <span className="unbounded text-base font-light !tracking-widest ">applied</span>
                                        <span className="unbounded text-[24px] !tracking-widest ">{overview?.verifierNum || '0'}</span>
                                    </div>
                                </div>
                            </div>
                        </GradientBorderCard>

                        <GradientBorderCard borderRadius={8} className="py-4 px-6 flex gap-4 flex-1">
                            <div className="flex-1 flex flex-col gap-4 justify-between h-full">
                                <div className="flex flex-col gap-4 justify-between h-full">
                                    <div className="flex items-center gap-2 justify-between">
                                        <span className="unbounded text-base font-light">Project</span>
                                        <Link to={"/zk/dashboard/project"} className="teacher text-sm text-sub flex items-center gap-2" >Details <ArrowRight className="size-4" /></Link>
                                    </div>
                                    <span className="unbounded text-[32px] !tracking-widest self-end ">{overview?.projectNum || '0'}</span>
                                </div>
                            </div>
                        </GradientBorderCard>



                    </div>

                    <div className="flex flex-col lg:flex-row gap-3">
                        <GradientBorderCard borderRadius={8} className="py-4 flex gap-4 flex-1">
                            <div className="flex flex-col gap-4 justify-between h-full w-full">
                                <div className="flex items-center gap-2 justify-between px-6">
                                    <span className="unbounded text-xl font-light">Task</span>
                                    <Link to={"/zk/dashboard/task"} className="teacher text-sm text-sub flex items-center gap-2" >Details <ArrowRight className="size-4" /></Link>
                                </div>
                                <Divider className="bg-[#FFFFFFCC]" />

                                <div className="px-6 flex flex-col gap-4">
                                    <div className="flex items-center gap-2 justify-between">
                                        <span className="unbounded text-base font-light !tracking-widest ">Task amount</span>
                                        <span className="unbounded text-[24px] !tracking-widest ">{overview?.totalTask || '0'}</span>
                                    </div>
                                    <Divider className="bg-[#FFFFFFCC]" />
                                    <div className="flex items-center gap-2 justify-between">
                                        <span className="unbounded text-base font-light !tracking-widest ">Task in progress</span>
                                        <span className="unbounded text-[24px] !tracking-widest ">{overview?.runningTask || '0'}</span>
                                    </div>
                                </div>
                            </div>
                        </GradientBorderCard>


                        <GradientBorderCard borderRadius={8} className="py-4 flex gap-4 flex-1">
                            <div className="flex flex-col gap-4 justify-between h-full w-full">
                                <div className="flex items-center gap-2 justify-between px-6">
                                    <span className="unbounded text-xl font-light">Total Rewards</span>
                                </div>
                                <Divider className="bg-[#FFFFFFCC]" />

                                <div className="px-6 flex flex-col gap-4">
                                    <div className="flex items-center gap-2 justify-between">
                                        <span className="unbounded text-base font-light !tracking-widest " />
                                        <div className="flex items-center gap-2 unbounded text-[24px] font-light">
                                            <span className="unbounded text-[24px] !tracking-widest font-normal">{overview?.totalRewardCys || '0'}</span>
                                            <img src={getImageUrl("@/assets/images/tokens/CYS.svg")} className="size-6" />
                                            CYS
                                        </div>
                                    </div>
                                    <Divider className="bg-[#FFFFFFCC]" />
                                    <div className="flex items-center gap-2 justify-between">
                                        <span className="unbounded text-base font-light !tracking-widest " />
                                        <div className="flex items-center gap-2 unbounded text-[24px] font-light">
                                            <span className="unbounded text-[24px] !tracking-widest font-normal">{overview?.totalRewardCgt || '0'}</span>
                                            <img src={getImageUrl("@/assets/images/tokens/CGT.svg")} className="size-6" />
                                            CGT
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GradientBorderCard>
                    </div>
                </div>

                {/* s2 */}
                <GradientBorderCard className="h-[320px] mt-8 px-6 py-4 pb-10">
                    <>
                        <Chart row={chartData} hasData={hasData} />
                    </>
                </GradientBorderCard>

                {/* s3 */}
                <GradientBorderCard className="mt-8 flex flex-col px-6 py-4">
                    <Tabs
                        key={"underlined"}
                        aria-label="Tabs variants"
                        variant={"underlined"}
                        classNames={{
                            base: 'pb-4',
                            tabList: "w-full border-b border-white/30 !p-0 !gap-0",
                            cursor: "h-px w-full",
                            tab: "!p-0 w-[8.75rem]",
                            panel: "!p-0",
                            tabContent: "teacher text-base font-medium !normal-case"
                        }}
                        className="w-full"
                        selectedKey={status} onSelectionChange={(v) => {
                            setStatusTab(v)
                        }}>
                        {
                            tabs.map((tab) => (
                                <Tab key={tab.value} title={tab.name} />
                            ))
                        }
                    </Tabs>



                    <CysicTable
                        loading={taskListLoading}
                        data={taskList}
                        columns={taskListColumns}
                    />
                </GradientBorderCard>





            </div>
        </>
    );
};

export default DashboardPage;