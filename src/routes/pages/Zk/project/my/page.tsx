import Button from "@/components/Button";
import { ArrowRight, TriangleAlert } from "lucide-react";
import GradientBorderCard from "@/components/GradientBorderCard";
import { isMobile } from "react-device-detect";
import { cn, Pagination } from "@nextui-org/react";
import CysicTable, { CysicTableColumn } from "@/components/Table";
import { Link } from "react-router-dom";
import Modal from "@/components/Modal";
import useModalState from "@/hooks/useModalState";
import { getImageUrl } from "@/utils/tools";
import { useState } from "react";
import useCosmos from "@/models/_global/cosmos";
import { commonPageSize } from "@/config";
import axios from "axios";
import usePagnation from "@/hooks/usePagnation";
import { IProject } from "@/routes/pages/Zk/project/page";



// pending - #EE6700
// ongoing - #33CD0E
// underreview - #316BD9
// pause -#D0221C
// ended - #FFFFFF33

const switchStatusColor = (status: number) => {
    switch (status) {
        case 0:
            return "bg-[#EE6700]";
        case 1:
            return "bg-[#33CD0E]";
        case 2:
            return "bg-[#316BD9]";
        case 3:
            return "bg-[#D0221C]";
        case 4:
            return "bg-[#FFFFFF33]";
    }
}

const switchStatusText = (status: number) => {
    switch (status) {
        case 0:
            return "Pending";
        case 1:
            return "Ongoing";
        case 2:
            return "Under Review";
        case 3:
            return "Pause";
        case 4:
            return "Ended";
    }
}

const switchStatusTextColor = (status: number) => {
    switch (status) {
        case 0:
            return "text-[#EE6700]";
        case 1:
        case 2:
        case 3:
        case 4:
            return "text-[#75FF52CC]"
    }
}

const MyProjectPage = () => {

    const { data, total, setCurrentPage, currentPage } =
        usePagnation(() => {
            return axios.get(`/api/v1/zkTask/project/list`);
        });

    const memberData = data?.data?.list || [];


    const projectColumns: CysicTableColumn<IProject>[] = [
        {
            key: "projectName",
            label: "Project Name",
            width: "33%",
            renderCell: (project) => (
                <div className="flex items-center gap-2">

                    {project.avatar ? (
                        <img
                            src={project.avatar}
                            alt="avatar"
                            className="size-6 rounded-full"
                        />
                    ) : (
                        <div className="size-6 bg-gradient-to-b from-[#2744FF] to-[#589EFF] rounded-full flex items-center justify-center">
                            {project.name.slice(0, 2)}
                        </div>
                    )}
                    <span>{project.name}</span>
                </div>
            )
        },
        {
            key: "domain",
            label: "Domain",
            width: "33%",
            renderCell: (project) => (
                <div className="flex items-center">
                    <span>{project.domain}</span>
                </div>
            )
        },
        {
            key: "status",
            label: "Status",
            width: "33%",
            renderCell: (project) => (
                <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", switchStatusColor(project.status))} />
                    <span>{switchStatusText(project.status)}</span>
                </div>

            )
        },
        {
            key: "detail",
            label: "Detail",
            width: "33%",
            renderCell: (project) => (
                <Link to={`/zk/project/${project.id}`} className="flex items-center gap-2">
                    <span className="uppercase text-sm">Detail</span>
                    <ArrowRight size={16} />
                </Link>
            )
        },
        {
            key: "manager",
            label: <div className="text-right">Manager</div>,
            width: "33%",
            renderCell: (project) => (
                <div onClick={() => {
                    dispatchEvent(new CustomEvent("modal_project_manager_visible", {
                        detail: {
                            project,
                            visible: true
                        }
                    }))
                }} className={cn("cursor-pointer flex items-center gap-2 justify-end", switchStatusTextColor(project.status))}>

                    {
                        project.status === 0 ? (
                            <>
                                <TriangleAlert size={16} className=""/>
                            </>
                        ) : null
                    }
                    <span className="uppercase text-sm">Start</span>
                    <ArrowRight size={16} className="text-white" />
                </div>
            )
        },
    ];

    const { balanceMap } = useCosmos();
    const cgtBalance = balanceMap?.CGT?.hm_amount || 0;


    const { visible, setVisible } = useModalState({
        eventName: "modal_project_manager_visible",
    });
    const handleClose = () => {
        setVisible(false);
        // setTimeout(resetState, 300);
    };
    const [amount, setAmount] = useState("");
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 仅允许数字和小数点
        const value = e.target.value.replace(/[^0-9.]/g, "");
        setAmount(value);
    };

    const handlePay = () => {
        console.log("pay");
    }

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
                    <GradientBorderCard borderRadius={8} className="px-6 py-4">
                        <div className={cn("w-full")}>
                            <h2
                                className={cn(
                                    "title !font-light uppercase mt-2",
                                    isMobile ? "!text-base" : "!text-xl"
                                )}
                            >
                                My projects
                            </h2>
                            <CysicTable
                                data={memberData}
                                columns={projectColumns}
                            // keyExtractor={(member) => member.address}
                            />

                            {total >= commonPageSize && (
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
                        </div>
                    </GradientBorderCard>
                </div>
            </div>

            <Modal
                isOpen={visible}
                onClose={handleClose}
                title={"PAYMENT"}
                className="max-w-[600px]"
            >
                <div className="flex flex-col gap-6">
                    <div className="bg-[#0E0E0E] border border-[#333] rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div className="!text-3xl title font-light !font-light">
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    placeholder="1,234"
                                    className="bg-transparent border-none outline-none w-full max-w-[200px] text-white"
                                />
                            </div>
                            <div className="text-base flex items-center bg-[#222] p-2 rounded-full">
                                <img
                                    src={getImageUrl('@/assets/images/tokens/CGT.svg')}
                                    alt={"CGT"}
                                    className="w-6 h-6 mr-2"
                                />
                                <span className="title !font-[500] !text-base ">{"CGT"}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <div className="text-sm text-[#777]">Amount</div>
                            <div className="text-white">
                                Balance ${cgtBalance}
                            </div>
                        </div>
                    </div>

                    <Button
                        needLoading
                        type="light"
                        className="w-full py-4 rounded-lg text-base font-medium"
                        onClick={handlePay}
                    >
                        PAY
                    </Button>

                </div>
            </Modal>

        </>
    )
}

export default MyProjectPage;