import Button from "@/components/Button";
import GradientBorderCard from "@/components/GradientBorderCard";
import { isMobile } from "react-device-detect";
import { cn } from "@nextui-org/react";
import CysicTable, { CysicTableColumn } from "@/components/Table";
import Modal from "@/components/Modal";
import useModalState from "@/hooks/useModalState";

interface ITask {
    id: string;
    hash: string;
    bonus: string;
    latency: number;
    proofType: string;
    status: number;
    detail: string;
}

interface IProjectDetail {
    name: string;
    proofCategory: string;
    description: string;
    proofSize: string;
    timebounds: string;
    taskCount: string;
    hardwareRequirements: string;

    tasks: ITask[];
}

const memberData: IProjectDetail = {
    name: "Project 1",
    proofCategory: "Proof Category",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae erat id justo sodales volutpat. Ut ut rutrum nulla. In semper bibendum eros ultrices varius. Donec egestas luctus augue vel auctor. Sed ac eros ut dui mattis bibendum. Suspendisse faucibus ultricies ante, vitae vestibulum quam porta non. In vulputate, lacus in convallis suscipit, dolor mauris efficitur magna, ut molestie erat mi ut tortor. ",
    proofSize: "Proof Size",
    timebounds: "Time Bounds",
    taskCount: "Task Count",
    hardwareRequirements: "Hardware Requirements",

    tasks: [
        {
            id: "1",
            hash: "Hash",
            bonus: "Bonus",
            latency: 100,
            proofType: "Proof Type",
            status: 0,
            detail: "Detail",
        },
        {
            id: "2",
            hash: "Hash",
            bonus: "Bonus",
            latency: 100,
            proofType: "Proof Type",
            status: 1,
            detail: "Detail",
        },
    ],
};

const ProjectDetailPage = () => {
    const detailData = memberData;
    const tasks = memberData.tasks;

    const projectColumns: CysicTableColumn<ITask>[] = [
        {
            key: "taskID",
            label: "Task ID",
            width: "33%",
            renderCell: (project) => <span>{project.id}</span>,
        },
        {
            key: "taskHash",
            label: "Task Hash",
            width: "33%",
            renderCell: (project) => (
                <div className="flex items-center">
                    <span>{project.hash}</span>
                </div>
            ),
        },
        {
            key: "bonus",
            label: "Bonus",
            width: "33%",
            renderCell: (project) => <span>{project.bonus}</span>,
        },
        {
            key: "latency",
            label: "Latency",
            width: "33%",
            renderCell: (project) => <span>{project.latency}</span>,
        },
        {
            key: "proofType",
            label: "Proof Type",
            width: "33%",
            renderCell: (project) => <span>{project.proofType}</span>,
        },
        {
            key: "status",
            label: "Status",
            width: "33%",
            renderCell: (project) => <span>{project.status}</span>,
        },
        {
            key: "detail",
            label: "Detail",
            width: "33%",
            renderCell: (project) => <span>{project.detail}</span>,
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
                                        <div className="size-8 rounded-full bg-white" />
                                        <h2
                                            className={cn(
                                                "title !font-light uppercase mt-2",
                                                isMobile ? "!text-base" : "!text-xl"
                                            )}
                                        >
                                            {detailData.name}
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-2">
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
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sub">Proof Category</div>
                                            <div>{detailData.proofCategory}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sub">Proof Size</div>
                                            <div>{detailData.proofSize}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sub">Time Bounds</div>
                                            <div>{detailData.timebounds}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sub">Task Count</div>
                                            <div>{detailData.taskCount}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sub">Hardware Requirements</div>
                                            <div>{detailData.hardwareRequirements}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 text-sm flex-1">
                                        <div className="text-sub">Description</div>
                                        <div>{detailData.description}</div>
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
                                data={tasks}
                                columns={projectColumns}
                            // keyExtractor={(member) => member.address}
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
                        Are you sure to pause this project? You can also start this project
                        anytime under the "My Projects".
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            needLoading
                            type="light"
                            className="w-full py-4 rounded-lg text-base font-medium"
                            onClick={handlePause}
                        >
                            PAUSE
                        </Button>

                        <Button
                            needLoading
                            type="solid"
                            className="w-full py-4 rounded-lg text-base font-medium"
                            onClick={handleCancel}
                        >
                            CANCEL
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ProjectDetailPage;
