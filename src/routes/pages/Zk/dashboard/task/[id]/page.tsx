import { useRequest } from "ahooks";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import GradientBorderCard from "@/components/GradientBorderCard";
import { cn } from "@nextui-org/react";
import { renderCell } from "@/routes/pages/Zk/dashboard/components/detailTableConfig";
import { TaskReward, TaskStatus } from "@/routes/pages/Zk/dashboard/components/tableComponents";
import { getImageUrl } from "@/utils/tools";
import { DashboardDetailMainWrapper } from "@/routes/pages/Zk/components/template";



const TaskDetail = () => {
    const { t } = useTranslation();
    const params = useParams();
    const navigate = useNavigate();

    const { data } = useRequest(
        () => {
            return axios.get(`/api/v1/zkTask/dashboard/task/detail/${params?.id}`);
        },
        {
            ready: !!params?.id,
            refreshDeps: [params?.id],
        }
    );


    const rows = data?.data || {};

    const columns = [
        {
            key: "taskHash",
            label: "Task Hash",
        },
        {
            key: "reward",
            label: "Distributed Rewards",
            renderCell: (item: any) => {
                return <TaskReward rewardCYS={item?.rewardCYS} rewardCGT={item?.rewardCGT} />
            }
        },
        {
            key: "createBlock",
            label: "Create Block",
        },
        {
            key: "finishBlock",
            label: "Finish Block",
        },
        {
            key: "proofType",
            label: "Proof Backend",
        },
        {
            key: "status",
            label: "Status",
            renderCell: (item: any) => {
                return <TaskStatus status={item?.status} />
            }
        },
        {
            key: "projectName",
            label: "Project",
        },
        {
            key: "proofList",
            label: "Prover",
        },
        {
            key: "verifier",
            label: "Verifier",
        },
        {
            key: "inputData",
            label: "Input Data",
            renderCell: (item: any) => {
                return item.inputData || '-'
            }
        },
    ];



    return (


        <DashboardDetailMainWrapper
            title="Task Detail"
            detail={<GradientBorderCard className="px-4 py-6">
                <div className="flex flex-col gap-2">
                    {columns?.map((i, index) => {
                        return (
                            <div key={i?.key || index}
                                className={cn(
                                    ["verifier", "provider", "inputData"].includes(i?.key) &&
                                    "flex-col lg:flex-row !items-start",
                                    "gap-2 lg:gap-10",
                                    "flex items-start",
                                    ["proofList", "verifier", "inputData"].includes(i?.key) && "mt-2 flex-col lg:flex-row"
                                )}>
                                <div className="flex-1 lg:flex-none text-[#A3A3A3] w-[25%]">{t(i?.label)}</div>
                                <div className={cn(["proofList", "verifier", "inputData"].includes(i?.key) && "w-full lg:w-auto", "break-words flex-wrap flex-1")}>{renderCell(rows, i?.key, i)}</div>
                            </div>
                        );
                    })}
                </div>
            </GradientBorderCard>}


        />

    );
};

export default TaskDetail;
