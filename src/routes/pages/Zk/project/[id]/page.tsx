import Button from "@/components/Button";
import GradientBorderCard from "@/components/GradientBorderCard";
import { isMobile } from "react-device-detect";
import { cn } from "@nextui-org/react";
import CysicTable, { CysicTableColumn } from "@/components/Table";
import Modal from "@/components/Modal";
import useModalState from "@/hooks/useModalState";
import { useRequest } from "ahooks";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { shortStr } from "@/utils/tools";
import { ArrowRight } from "lucide-react";
import { TaskStatus } from "@/config";
import { TaskReward } from "@/routes/pages/Zk/dashboard/components/tableComponents";

interface ITask {
    taskId: number;
    taskHash: string;
    rewardCYS: string;
    rewardCGT: string;
    timeBounds: number;
    status: number;


    hardwareRequirement: string;
    latency: string;
    proofType: string;
    
}

interface IProjectDetail {
    avatar: string;
    id: number;
    name: string;
    proofCategory: string;
    proofSize: string;
    timeBounds: number;
    taskCount: number;
    hardwareRequirement: string;
    description: string;
    status: number;

}



const ProjectDetailPage = () => {
    const { id } = useParams();
    const [projectDetail, setProjectDetail] = useState<IProjectDetail>({} as IProjectDetail);
    const [taskList, setTaskList] = useState<ITask[]>([]);
    useRequest(() => {
        // /zkTask/project/detail
        return axios.get(`/api/v1/zkTask/project/detail`, {
            params: {
                id: id
            }
        });
    }, {
        ready: !!id,
        refreshDeps: [id],
        onSuccess: (res) => {
            setProjectDetail(res.data as IProjectDetail);
        }
    });

    useRequest(() => {
        return axios.get(`/api/v1/zkTask/dashboard/project/taskList/${id}`);
    }, {
        ready: !!id,
        refreshDeps: [id],
        onSuccess: (res) => {
            setTaskList(res.data?.list as ITask[]);
        }
    });



    const projectColumns: CysicTableColumn<ITask>[] = [
        {
            key: "taskID",
            label: "Task ID",
            width: "33%",
            renderCell: (project) => <span>{project.taskId}</span>,
        },
        {
            key: "taskHash",
            label: "Task Hash",
            width: "33%",
            renderCell: (project) => (
                <div className="flex items-center">
                    {shortStr(project.taskHash, 14)}
                </div>
            ),
        },
        {
            key: "bonus",
            label: "Bonus",
            width: "33%",
            renderCell: (project) => <TaskReward rewardCYS={project.rewardCYS} rewardCGT={project.rewardCGT} />,
        },
        {
            key: "latency",
            label: "Latency",
            width: "33%",
            renderCell: (project) => <span>{project?.latency || '-'}</span>,
        },
        {
            key: "proofType",
            label: "Proof Type",
            width: "33%",
            renderCell: (project) => <span>{project?.proofType || '-'}</span>,
        },
        {
            key: "status",
            label: "Status",
            width: "33%",
            renderCell: (project) => <span>{TaskStatus?.[project.status] || project.status}</span>,
        },
        {
            key: "detail",
            label: "Detail",
            width: "33%",
            renderCell: (project) => <Link className="flex items-center gap-2 justify-end" to={`/zk/dashboard/task/${project.taskId}`}>
                Detail
                <ArrowRight size={16} />
            </Link>,
        },
    ];

    const { visible, setVisible } = useModalState({
        eventName: "modal_project_pause_visible",
    });

    const handleClose = () => {
        setVisible(false);
    };

    const handlePause = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <div className="min-h-screen w-full pb-12 overflow-hidden mx-auto">
                {/* 主标题 */}
                <div className="pt-12 flex flex-col items-center gap-6 relative z-[2]">
                    <div className="flex flex-col items-center gap-4">
                        <span className="title !text-4xl !font-light !text-[#fff] text-center">
                            My projects
                        </span>
                    </div>
                </div>

                {/* 主要内容部分 */}
                <div className="mx-auto mt-12 relative z-[2]">
                    <GradientBorderCard borderRadius={8} className="mb-4">
                        <div className={cn("w-full", isMobile ? "px-6 py-4" : "px-6 py-4")}>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {projectDetail.avatar ? (
                                            <img src={projectDetail.avatar} alt="avatar" className="size-8 rounded-full" />
                                        ) : (
                                            <div className="size-8 rounded-full bg-gradient-to-b from-[#2744FF] to-[#589EFF] flex items-center justify-center">
                                                <span className="text-white">{projectDetail?.name?.slice(0, 2)}</span>
                                            </div>
                                        )}
                                        <h2
                                            className={cn(
                                                "title !font-light uppercase mt-2",
                                                isMobile ? "!text-base" : "!text-xl"
                                            )}
                                        >
                                            {projectDetail?.name}
                                        </h2>
                                    </div>
                                    {/* <div className="flex items-center gap-2">
                                        <Button
                                            type="light"
                                            className="uppercase !px-6 text-base min-w-fit min-h-fit"
                                            onClick={() => {
                                                dispatchEvent(new CustomEvent("modal_project_pause_visible", {
                                                    detail: {
                                                        visible: true
                                                    }
                                                }));
                                            }}
                                        >
                                            Pause
                                        </Button>
                                    </div> */}
                                </div>

                                <div className="flex flex-col lg:flex-row items-start gap-4">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sub">Proof Category</div>
                                            <div>{projectDetail.proofCategory}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sub">Proof Size</div>
                                            <div>{projectDetail.proofSize}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sub">Time Bounds</div>
                                            <div>{projectDetail.timeBounds}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sub">Task Count</div>
                                            <div>{projectDetail.taskCount}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sub">Hardware Requirements</div>
                                            <div className="text-right lg:text-left">{projectDetail.hardwareRequirement}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row lg:flex-col justify-between lg:justify-start w-full lg:w-auto gap-1 text-sm flex-1">
                                        <div className="text-sub">Description</div>
                                        <div>{projectDetail.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GradientBorderCard>

                    <GradientBorderCard borderRadius={8}>
                        <div className={cn("w-full", isMobile ? "px-6 py-4" : "px-6 py-4")}>
                            <h2
                                className={cn(
                                    "title !font-light uppercase mt-2",
                                    isMobile ? "!text-base" : "!text-xl"
                                )}
                            >
                                My projects
                            </h2>
                            <CysicTable
                                data={taskList || []}
                                columns={projectColumns}
                            />
                        </div>
                    </GradientBorderCard>
                </div>
            </div>

            <Modal
                isOpen={visible}
                onClose={handleClose}
                title={"Please COnfirm"}
                className="max-w-[600px]"
            >
                <div className="flex flex-col gap-6">
                    <div className="text-base">
                        Are you sure to pause this project?
                        <br />
                        Please contact our Admin to start this project anytime.
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            needLoading
                            type="light"
                            className="w-full py-4 rounded-lg text-base font-medium"
                            onClick={() => {
                                setVisible(false);
                            }}
                        >
                            CONFIRM
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ProjectDetailPage;
