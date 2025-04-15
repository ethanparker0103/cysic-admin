import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import MainDetailContainer from "@/routes/pages/Dashboard/components/mainDetailContainer";
import { useRequest } from "ahooks";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    getKeyValue,
} from "@nextui-org/react";
import { commonPageSize, ProofBackend, TaskStatus } from "@/config";
import { getImageUrl } from "@/utils/tools";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";
import usePagnation from "@/hooks/usePagnation";
import Pagination from "@/components/Pagination";

const mock = {
    "msg": "success",
    "code": 10000,
    "data": {
        "provider": { // ProverDetail
            "ID": 1,
            "CreatedAt": "2024-06-12T23:42:37.602627+08:00",
            "UpdatedAt": "2024-06-12T23:42:37.602627+08:00",
            "DeletedAt": null,
            "provider_id": 1,   // Prover链上ID
            "name": "provider0",
            "domain": "http://www.provider0.com",
            "logo": "provider0 logo",
            "description": "provider0, hdPath 60/2/0",
            "prover": "0xe780d4f127baecE34523e94AbC190E32B4AE4470",
            "role": 1,
            "status": 1,
            "total_task": 0,
            "running_task": 0,
            "success_task": 0,
            "failed_task": 0
        },
        "taskList": [ // 任务列表, 内容同6中的 taskList
            {
                "ID": 1,
                "CreatedAt": "2024-06-12T23:11:00.645143+08:00",
                "UpdatedAt": "2024-06-13T00:07:00.484898+08:00",
                "DeletedAt": null,
                "project_worker": "0x0744eD18AF2559E404aEC794E227146708092284",
                "task_hash": "some_valid_hash",
                "prover_input_data": "dGVzdDEyMw==",
                "reward_id": 1,
                "latency": 10,
                "proof_type": 1,
                "task_status": 2,
                "provider_ids": "1001,1002,1003",  // 执行任务的Prover链上ID
                "Reason": "",   // 任务失败原因
                "provider_id": 1001, // 执行任务的当前Prover链上ID
                "provider_accept": false, // Prover是否已经接受该任务
                "commit_at": "0001-01-01T00:00:00Z", // Prover提交任务结果时间
                "proof_hash": "" // Prover提交任务结果hash
            }
        ]
    }
}

const ComputilityDetail = () => {
    const { t } = useTranslation()
    const params = useParams();

    const { data } = useRequest(
        () => {
            // return Promise.resolve(mock);

            return axios.get(`/api/v1/provider/${params?.id}`);
        },
        {
            ready: !!params?.id,
            refreshDeps: [params?.id],
        }
    );

    const { data: taskList, totalPage, currentPage, setCurrentPage  } = usePagnation(
        (page: number) => {
            // return Promise.resolve(mock);

            return axios.get(`/api/v1/provider/${params?.id}/taskList`, {
                params: {
                    pageNum: page,
                    pageSize: commonPageSize
                }
            });
        },
        {
            ready: !!params?.id,
            refreshDeps: [params?.id],
        }
    );

    const detail = data?.data;
    const tableData = taskList?.data?.list;

    const rows = tableData || [];

    const columns = [
        {
            key: "ID",
            label: "Task ID",
        },
        {
            key: "task_hash",
            label: "Task Hash",
        },
        {
            key: "proof_type",
            label: "Proof Type",
        },
        {
            key: "task_status",
            label: "Status",
        },
        {
            key: "action",
            label: "Detail",
        },
    ];

    const renderCell = (item: any, columnKey: any) => {
        switch (columnKey) {
            case "proof_type": 
                return (ProofBackend[getKeyValue(item, columnKey)])
            case "action":
                return (
                    <Link
                        to={"/dashboard/task/" + item?.ID?.toString()}
                        className="flex items-center gap-1"
                    >
                        <span className="text-[#21E9FA]">Detail</span>
                        <Image
                            className="size-3"
                            src={getImageUrl("@/assets/images/dashboard/share.svg")}
                        />
                    </Link>
                );
            case "task_status":
                return (
                    <div className="flex items-center gap-2">
                        <span>{TaskStatus[item?.[columnKey]]}</span>
                    </div>
                );
            default:
                return getKeyValue(item, columnKey);
        }
    };

    return (
        <>
        <MainContainer title="Prover Detail">
            <MainDetailContainer {...detail}>
                <div className="shadow-[0px_4px_0px_0px_#000000] p-4 rounded-2xl border-[#FFFFFF33] border">
                <Table
                    aria-label="TaskList"
                    classNames={{
                        wrapper: "bg-[transparent] p-0",
                        th: "border-b border-solid border-[#FFFFFF33]",
                    }}
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn className="bg-[transparent] " key={column?.key}>
                                {t(column?.label)}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item?.ID}>
                                {(columnKey) => (
                                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <Pagination offset={1} className="mt-2 flex justify-center" total={totalPage} currentPage={currentPage} onChange={setCurrentPage} />
                </div>
                
            </MainDetailContainer>
        </MainContainer>
        </>
    );
};

export default ComputilityDetail;