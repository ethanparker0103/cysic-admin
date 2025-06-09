import GradientBorderCard from "@/components/GradientBorderCard";
import HoverDropdown from "@/components/HoverDropdown";
import CysicTable from "@/components/Table";
import { commonPageSize } from "@/config";
import useAccount from "@/hooks/useAccount";
import usePagnation from "@/hooks/usePagnation";
import { TaskReward, TaskStatus } from "@/routes/pages/Zk/dashboard/components/tableComponents";
import { shortStr } from "@/utils/tools";
import { Dropdown, DropdownItem, DropdownMenu, Pagination } from "@nextui-org/react";
// import Tab, { TabItem } from "@/routes/components/Tab";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useRequest } from "ahooks";
import axios from "axios";
import dayjs from "dayjs";
import { ArrowDown, ArrowRight, ArrowRightIcon, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IVerifier {
    "taskId": number
    "taskHash": string
    "prover": string
    "rewardCYS": string
    "rewardCGT": string
    "verifyResult": number
    "taskResult": number
    "startAt": string
    "finishAt": string
}

interface IProver {
    "taskId": number
    "taskHash": string
    "proofType": string
    "status": number
    "startAt": string
    "finishAt": string
}

const verifierListColumns = [
    {
        key: "taskId",
        label: "Task ID",
        renderCell: (item: any) => {
            return item?.taskId || item?.task_id;
        },
    },
    {
        key: "taskHash",
        label: "Task Hash",
        renderCell: (item: any) => {
            return shortStr(item?.taskHash || item?.task_hash, 16);
        },
    },
    {
        key: "result",
        label: "Result",
        renderCell: (item: any) => {
            // return <VerifierTaskStatus status={item?.verifyResult} />
            return <TaskStatus status={item?.taskResult} />;
        },
    },
    {
        key: "reward",
        label: "Reward",
        renderCell: (item: any) => {
            // return <VerifierTaskStatus status={item?.verifyResult} />
            return <TaskReward rewardCGT={item?.rewardCGT} rewardCYS={item?.rewardCYS} />;
        },
    },
    {
        key: "startAt",
        label: "Start Time",
        renderCell: (item: any) => {
            // return <VerifierTaskStatus status={item?.verifyResult} />
            return dayjs(item?.startAt * 1000).format('YYYY-MM-DD HH:mm:ss');
        },
    },
    {
        key: "finishAt",
        label: "End Time",
        renderCell: (item: any) => {
            // return <VerifierTaskStatus status={item?.verifyResult} />
            return item?.finishAt ? dayjs(item?.finishAt * 1000).format('YYYY-MM-DD HH:mm:ss') : '-';
        },
    },
    {
        key: "detail",
        label: "Task Detail",
        renderCell: (item: any) => {
            return (
                <Link
                    to={`/zk/dashboard/task/${item?.taskId || item?.task_id}`}
                    className="flex items-center justify-end gap-2"
                >
                    <span>View</span>
                    <ArrowRightIcon className="size-3" />
                </Link>
            );
        },
    },
];

const proverListColumns = [
    {
        key: "taskId",
        label: "Task ID",
    },
    {
        key: "taskHash",
        label: "Task Hash",
        renderCell: (item: any) => {
            return shortStr(item?.taskHash, 10)
        }
    },
    {
        key: "proofType",
        label: "Proof Type",
    },
    {
        key: "status",
        label: "Status",
        renderCell: (item: any) => {
            return <TaskStatus status={item?.status} />
        }
    },
    {
        key: "startAt",
        label: "Start Time",
        renderCell: (item: any) => {
            // return <VerifierTaskStatus status={item?.verifyResult} />
            return dayjs(item?.startAt * 1000).format('YYYY-MM-DD HH:mm:ss');
        },
    },
    {
        key: "finishAt",
        label: "End Time",
        renderCell: (item: any) => {
            // return <VerifierTaskStatus status={item?.verifyResult} />
            return item?.finishAt ? dayjs(item?.finishAt * 1000).format('YYYY-MM-DD HH:mm:ss') : '-';
        },
    },
    {
        key: "detail",
        label: "Task Detail",
        renderCell: (item: any) => {
            return <Link to={`/zk/dashboard/task/${item?.taskId}`} className="flex items-center justify-end gap-2">
                <span>View</span>
                <ArrowRight className="size-3" />
            </Link>
        }
    },

]

const MyVerifierTaskList = ({ id, removeData }: { id?: string, removeData: boolean }) => {
    const { data: listData, loading, total, currentPage, setCurrentPage } = usePagnation(
        (currentPage: number) => {
            return axios.get(`/api/v1/zkTask/dashboard/verifier/taskList/${id}`, {
                params: {
                    pageNum: currentPage,
                    pageSize: commonPageSize,
                },
            });
        },
        {
            ready: !!id,
            staleTime: 10_000,
            refreshDeps: [id],
        }
    );
    const list = removeData ? [] : listData?.data?.list || [] as IVerifier[]


    return (
        <>
            <CysicTable
                columns={verifierListColumns}
                data={(list || [])}
                loading={loading}
            />

            {!removeData && total > commonPageSize && (
                <div className="flex justify-center mb-4">
                    <Pagination
                        total={Math.ceil(total / commonPageSize)}
                        initialPage={1}
                        page={currentPage}
                        onChange={setCurrentPage}
                        color="primary"
                        size="sm"
                    />
                </div>
            )}
        </>
    );
};

const MyProverTaskList = ({ id, removeData }: { id?: string, removeData: boolean }) => {
    const { data: listData, loading, total, currentPage, setCurrentPage } = usePagnation(
        (currentPage: number) => {
            return axios.get(`/api/v1/zkTask/dashboard/prover/taskList/${id}`, {
                params: {
                    pageNum: currentPage,
                    pageSize: commonPageSize,
                },
            });
        },
        {
            ready: !!id,
            staleTime: 10_000,
            refreshDeps: [id],
        }
    );
    const list = removeData ? [] : listData?.data?.list || [] as IProver[]

    return (
        <>
            <CysicTable
                columns={proverListColumns}
                data={(list || [])}
                loading={loading}
            />

            {!removeData && total > commonPageSize && (
                <div className="flex justify-center mb-4">
                    <Pagination
                        total={Math.ceil(total / commonPageSize)}
                        initialPage={1}
                        page={currentPage}
                        onChange={setCurrentPage}
                        color="primary"
                        size="sm"
                    />
                </div>
            )}
        </>
    );
};

const tabs = [
    {
        name: "My Task List - Verifier",
        value: 0,
    },
    {
        name: "My Task List - Prover",
        value: 1,
    },
];

export const MyTask = () => {
    const { address } = useAccount()

    const [tab, setTab] = useState<any>(tabs[0].value);

    const [verifierIds, setVerifierIds] = useState<string[]>()
    const [proverIds, setProverIds] = useState<string[]>()

    const [selectedVerifierId, setSelectedVerifierId] = useState<string>()
    const [selectedProverId, setSelectedProverId] = useState<string>()

    const activeSelectIds = tab == tabs?.[0]?.value ? verifierIds : proverIds
    const activeSelectId = tab == tabs?.[0]?.value ? selectedVerifierId : selectedProverId

    useEffect(()=>{
        if(!address){
            setSelectedVerifierId(undefined)
            setSelectedProverId(undefined)
            setVerifierIds(undefined)
            setProverIds(undefined)
        }
    }, [address])

    const handleSelectId = (v: string)=>{
        if(tab == tabs?.[0]?.value){
            setSelectedVerifierId(v)
        }else{
            setSelectedProverId(v)
        }
    }

    useRequest(() => {
        return Promise.allSettled([
            axios.get("/api/v1/zkTask/dashboard/prover/list", {
                params: {
                    keyword: address,
                },
            }),
            axios.get("/api/v1/zkTask/dashboard/verifier/list", {
                params: {
                    keyword: address,
                },
            }),
        ])
    }, {
        ready: !!address,
        refreshDeps: [address],
        onSuccess(data: any) {
            const proverIds = data?.[0]?.value?.data?.list?.map(i => i?.id)
            const verifierIds = data?.[1]?.value?.data?.list?.map(i => i?.id)
            setVerifierIds(verifierIds)
            setProverIds(proverIds)

            setSelectedVerifierId(verifierIds?.[0])
            setSelectedProverId(proverIds?.[0])
        }
    })

    return (
        <>
            <GradientBorderCard borderRadius={8} className="px-6 py-4 relative">
                <>
                    {
                        activeSelectIds?.length && address ? (
                            <HoverDropdown
                                offset={0}
                                trigger={
                                    <div className="absolute right-0 top-2 "><GradientBorderCard borderRadius={8} className="z-[1] w-fit px-4 py-2 flex items-center gap-2 text-xs">{activeSelectId}<ChevronDown className="size-4 min-size-4"/> </GradientBorderCard></div>
                                }
                            >
                                <DropdownMenu
                                    className="p-0 min-w-[40px] backdrop-blur gradient-border-card bg-[transparent] rounded-lg overflow-hidden"
                                    variant="flat"
                                    itemClasses={{
                                        base: "hover:!opacity-100 text-sub uppercase transition-colors hover-bright-gradient",
                                    }}
                                >
                                    {
                                        activeSelectIds?.map(i => {
                                            return <DropdownItem
                                                onClick={()=>handleSelectId(i)}
                                                key={i}
                                                className="py-4 px-6 flex items-center gap-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between "
                                            >
                                                {i}
                                            </DropdownItem>
                                        })
                                    }
                                </DropdownMenu>
                            </HoverDropdown>
                        ) : null
                    }


                    <Tabs
                        key={"underlined"}
                        aria-label="Tabs variants"
                        variant={"underlined"}
                        classNames={{
                            base: "pb-4",
                            tabList: "w-full  !p-0 !gap-0",
                            cursor: "h-px w-full",
                            tab: "!px-0 !py-4 h-fit w-[12.75rem]",
                            panel: "!p-0",
                            tabContent: "teachers-16 font-medium",
                        }}
                        className="w-full"
                        selectedKey={tab}
                        onSelectionChange={(v) => {
                            if(v == tabs?.[0]?.value){
                                setSelectedVerifierId(verifierIds?.[0])
                            }else{
                                setSelectedProverId(proverIds?.[0])
                            }
                            setTab(v);
                        }}
                    >
                        {tabs.map((tab) => (
                            <Tab key={tab.value} title={tab.name} />
                        ))}
                    </Tabs>

                    {tab == tabs?.[0]?.value ? (
                        <MyVerifierTaskList id={activeSelectId} removeData={!address} />
                    ) : (
                        <MyProverTaskList id={activeSelectId} removeData={!address} />
                    )}
                </>
            </GradientBorderCard>
        </>
    );
};
