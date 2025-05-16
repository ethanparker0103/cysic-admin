import axios from "@/service";
import { useRequest } from "ahooks";
import { isMobile } from "react-device-detect";
import { cn, Divider, Tab, Tabs } from "@nextui-org/react";
import GradientBorderCard from "@/components/GradientBorderCard";
import { Link } from "react-router-dom";
import { ArrowRight, ShareIcon } from "lucide-react";
import { getImageUrl, shortStr } from "@/utils/tools";
import Chart from "@/routes/pages/Zk/components/chart";
import CysicTable, { CysicTableColumn } from "@/components/Table";
import usePagnation from "@/hooks/usePagnation";
import { commonPageSize, TaskStatus } from "@/config";
import { useState } from "react";

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
    const { data: taskListData } = usePagnation((currentPage: number) => {
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
    console.log('taskList', taskList)

    const taskListColumns: CysicTableColumn<ITask>[] = [
        {
            key: "taskHash",
            label: "Task Hash",
            renderCell: (task) => ( shortStr(task.taskHash, 12) )
        },
        {
            key: "createBlock",
            label: "Create Block",
            renderCell: (task) => ( task.createBlock )
        },
        {
            key: "reward",
            label: "Reward",
            renderCell: (task) => ( task.reward )
        },
        {
            key: "createAt",
            label: "Created at",
            renderCell: (task) => ( task.createAt )
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
                <Link to={`/zk/dashboard/task/${task.id}`} className="flex gap-1 items-center">
                    <span>Detail</span>
                    <img className="size-3" src={getImageUrl("@/assets/images/icon/share.svg")} />
                </Link>
            )
        }
    ];


    return (
        <>


            {/* content */}
            <div className={cn("mx-auto mb-auto relative z-10 pt-20 pb-16 w-full", isMobile ? "break-words" : "")}>
                {/* title */}
                <h1 className={cn("title !font-[200] mb-24 text-center", isMobile ? "text-7xl" : "text-[8rem]")}>Dashboard</h1>

                {/* s1 */}
                <div className="flex flex-col gap-8">
                    <div className="flex gap-3">
                        <GradientBorderCard className="py-4 px-6 flex gap-4">
                            <div className="flex-1 flex flex-col gap-4 justify-between">
                                <div className="flex flex-col gap-4">
                                    <span className="title !text-xl !font-light">Prover</span>
                                    <span className="sub-title !tracking-widest !text-2xl !font-bold h-[5.625rem]">{overview?.proverNum || '0'}</span>
                                </div>
                                <Link to={"/zk/dashboard/prover"} className="title !text-xl !font-light flex items-center gap-2" >Details <ArrowRight className="size-4" /></Link>
                            </div>

                            <Divider orientation="vertical" className="bg-[#FFFFFFCC]" />

                            <div className="flex-1 flex flex-col gap-4 justify-between">
                                <div className="flex flex-col gap-4">
                                    <span className="title !text-xl !font-light">Verifier</span>
                                    <span className="sub-title !tracking-widest !text-2xl !font-bold h-[5.625rem]">{overview?.proverNum || '0'}</span>
                                </div>
                                <Link to={"/zk/dashboard/verifier"} className="title !text-xl !font-light flex items-center gap-2" >Details <ArrowRight className="size-4" /></Link>
                            </div>

                            <Divider orientation="vertical" className="bg-[#FFFFFFCC]" />

                            <div className="flex-1 flex flex-col gap-4 justify-between">
                                <div className="flex flex-col gap-4">
                                    <span className="title !text-xl !font-light">Project</span>
                                    <span className="sub-title !tracking-widest !text-2xl !font-bold h-[5.625rem]">{overview?.proverNum || '0'}</span>
                                </div>
                                <Link to={"/zk/dashboard/project"} className="title !text-xl !font-light flex items-center gap-2" >Details <ArrowRight className="size-4" /></Link>
                            </div>

                        </GradientBorderCard>
                    </div>

                    <div className="flex gap-3">
                        <GradientBorderCard className="flex-[2] py-4 px-6 flex gap-4">
                            <div className="flex-1 flex flex-col gap-4 justify-between">
                                <div className="flex flex-col gap-4">
                                    <span className="title !text-xl !font-light">task amount</span>
                                    <span className="sub-title !tracking-widest !text-2xl !font-bold h-[5.625rem]">{overview?.proverNum || '0'}</span>
                                </div>
                            </div>

                            <Divider orientation="vertical" className="bg-[#FFFFFFCC]" />

                            <div className="flex-1 flex flex-col gap-4 justify-between">
                                <div className="flex flex-col gap-4">
                                    <span className="title !text-xl !font-light">task in progress</span>
                                    <span className="sub-title !tracking-widest !text-2xl !font-bold h-[5.625rem]">{overview?.proverNum || '0'}</span>
                                </div>
                                <Link to={"/"} className="title !text-xl !font-light flex items-center gap-2" >Details <ArrowRight className="size-4" /></Link>
                            </div>
                        </GradientBorderCard>


                        <GradientBorderCard className="flex-1 py-4 px-6 flex gap-4">
                            <div className="flex-1 flex flex-col gap-4 justify-between">
                                <div className="flex flex-col gap-4">
                                    <span className="title !text-xl !font-light">Total Rewards</span>
                                    <div className="flex gap-8">
                                        <div className="flex flex-col">
                                            <div className="flex gap-1">
                                                <img className="size-4" src={getImageUrl('@/assets/images/tokens/CYS.svg')} />
                                                <span>CYS</span>
                                            </div>
                                            <span className="sub-title !tracking-widest !text-lg !font-semibold text-right">{overview?.proverNum || '0'}</span>
                                        </div>
                                        <Divider orientation="vertical" className="bg-[#FFFFFFCC]" />
                                        <div className="flex flex-col">
                                            <div className="flex gap-1">
                                                <img className="size-4" src={getImageUrl('@/assets/images/tokens/CGT.svg')} />
                                                <span>CGT</span>
                                            </div>
                                            <span className="sub-title !tracking-widest !text-lg !font-semibold text-right">{overview?.proverNum || '0'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GradientBorderCard>
                    </div>
                </div>

                {/* s2 */}
                <GradientBorderCard className="h-[280px] mt-8 px-6 py-4">
                    <Chart row={chartData} hasData={hasData} />
                </GradientBorderCard>

                {/* s3 */}
                <GradientBorderCard className="mt-8 flex flex-col px-6 py-4">
                    <Tabs 
                    classNames={{
                        tabList: "border-none"
                    }}
                    variant="bordered" selectedKey={status} onSelectionChange={(v) => {
                        setStatusTab(v)
                    }}>
                        {
                            tabs.map((tab) => (
                                <Tab key={tab.value} title={tab.name} />
                            ))
                        }
                    </Tabs>


                    <CysicTable
                        data={taskList}
                        columns={taskListColumns}
                    />
                </GradientBorderCard>





            </div>
        </>
    );
};

export default DashboardPage;