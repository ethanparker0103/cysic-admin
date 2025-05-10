import { useRequest } from "ahooks";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import GradientBorderCard from "@/components/GradientBorderCard";
import { cn, Pagination } from "@nextui-org/react";
import { renderCell } from "@/routes/pages/Zk/dashboard/components/detailTableConfig";
import { getImageUrl, shortStr } from "@/utils/tools";
import { commonPageSize, explorerUrl, providerStatus, TaskStatus } from "@/config";
import usePagnation from "@/hooks/usePagnation";
import CysicTable from "@/components/Table";



const ProjectDetail = () => {
    const { t } = useTranslation();
    const params = useParams();

    const { data } = useRequest(
        () => {
            // return Promise.resolve(mock);

            return axios.get(`/api/v1/zkTask/dashboard/project/detail/${params?.id}`);
        },
        {
            ready: !!params?.id,
            refreshDeps: [params?.id],
        }
    );

    const rows = data?.data || {};

    const columns = [
        {
            key: "name",
            label: "Project Name",
        },
        {
            key: "domain",
            label: "Domain",
            renderCell: (item: any) => {
                if (item?.domain) {
                    return <a className="!underline" href={item?.domain} target="_blank">{item?.domain}</a>
                }
                return '-'
            }
        },
        {
            key: "address",
            label: "Address",
            renderCell: (item: any) => {
                return <div className="flex flex-col gap-2">
                    <a target="_blank" href={explorerUrl + `/address/${item?.address}`}
                        className="flex items-center gap-2">
                        <span>{item?.address}</span>
                        <img className="size-3" src={getImageUrl('@/assets/images/icon/share.svg')} />
                    </a>
                    <a target="_blank" href={explorerUrl + `/address/${item?.cysicAddress}`}
                        className="flex items-center gap-2 text-[#737373]">
                        <span>{item?.cysicAddress}</span>
                        <img className="size-3" src={getImageUrl('@/assets/images/icon/share.svg')} />
                    </a>
                </div>
            }
        },
        {
            key: "reward",
            label: "Reward",
            renderCell: (item: any) => {
                return <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                        <img className="size-4" src={getImageUrl('@/assets/images/tokens/CYS.svg')} />
                        <span>{item?.rewardCYS} CYS</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img className="size-4" src={getImageUrl('@/assets/images/tokens/CGT.svg')} />
                        <span>{item?.rewardCGT} CGT</span>
                    </div>
                </div>
            }
        },

        {
            key: "proofCategory",
            label: "Proof Category",
        },
        {
            key: "proofSize",
            label: "Proof Size",
        },
        {
            key: "timeBounds",
            label: "Time Bounds",
        },
        {
            key: "totalTask",
            label: "Task Count",
        },
        {
            key: "finishTask",
            label: "Finish Task Count",
        },

        {
            key: "description",
            label: "Hardware Requirements",
        },
    ];



    const { data: listData, currentPage, total, setCurrentPage } = usePagnation(
        (page: number) => {
            return axios.get(`/api/v1/zkTask/dashboard/project/taskList/${params?.id}`, {
                params: {
                    pageNum: page,
                    pageSize: commonPageSize
                }
            });
        },
        {
            ready: !!params?.id,
            refreshDeps: [params?.id],
            staleTime: 10_000,
        }
    );

    const listColumns = [
        {
            key: "taskId",
            label: "Task ID",
        },
        {
            key: "rewards",
            label: "Rewards",
            renderCell: (item: any) => {
                return <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                        <img className="size-4" src={getImageUrl('@/assets/images/tokens/CYS.svg')} />
                        <span>{item?.rewardCYS} CYS</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img className="size-4" src={getImageUrl('@/assets/images/tokens/CGT.svg')} />
                        <span>{item?.rewardCGT} CGT</span>
                    </div>
                </div>
            }
        },
        {
            key: "timeBounds",
            label: "Time Bounds"
        },
        {
            key: "status",
            label: "Status",
            renderCell: (item: any) => {
                return TaskStatus[item?.status] || item?.status
            }
        },
        {
            key: "taskHash",
            label: "Task Hash",
            renderCell: (item: any) => {
                return shortStr(item?.taskHash, 10)
            }
        },
        {
            key: "detail",
            label: "Task Detail",
            renderCell: (item: any) => {
                return <Link to={`/zk/dashboard/task/${item?.taskId}`} className="flex items-center gap-2">
                    <span>View</span>
                    <img className="size-3" src={getImageUrl('@/assets/images/icon/share.svg')} />
                </Link>
            }
        },

    ]

    return (
        <div className={cn("mx-auto mb-auto relative z-10 pt-20 pb-16 w-full", isMobile ? "break-words" : "")}>
            {/* title */}
            <h1 className={cn("title !font-[200] mb-24 text-center", isMobile ? "text-7xl" : "text-[4rem]")}>Project     Detail</h1>
            <GradientBorderCard className="px-4 py-6">
                <div className="flex flex-col gap-6">
                    {columns?.map((i, index) => {
                        return (
                            <div key={i?.key || index} className={cn(['verifier', 'provider', 'inputData'].includes(i?.key) && isMobile ? "flex-col !items-start" : "", isMobile ? "gap-2 flex-wrap" : "gap-10", "flex items-start")}>
                                <div className="text-[#A3A3A3] w-[25%]">{t(i?.label)}</div>
                                <div className={cn(isMobile ? "break-all flex-wrap" : "", "flex-1")}>{renderCell(rows, i?.key, i)}</div>
                            </div>
                        );
                    })}
                </div>
            </GradientBorderCard>

            <GradientBorderCard className="px-4 py-6 mt-8">
                <CysicTable className="[&>div]:!p-0" columns={listColumns} data={listData?.data?.list || []} />

                {total > commonPageSize && (
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
            </GradientBorderCard>
        </div>
    );
};

export default ProjectDetail;
