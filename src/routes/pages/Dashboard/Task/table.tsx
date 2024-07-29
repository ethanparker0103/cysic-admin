import Image from "@/components/Image";
import Pagination from "@/components/Pagination";
import { commonPageSize, taskStatus, TaskStatus } from "@/config";
import usePagnation from "@/hooks/usePagnation";
import { getImageUrl, shortStr } from "@/utils/tools";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    getKeyValue,
} from "@nextui-org/react";
import { useRequest } from "ahooks";
import axios from "axios";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import dayjs from "dayjs";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const mock = {
    msg: "success",
    code: 10000,
    data: {
        list: [
            {
                ID: 2,
                CreatedAt: "2024-06-12T23:39:17.224094+08:00",
                UpdatedAt: "2024-06-12T23:39:17.224094+08:00",
                DeletedAt: null,
                project_worker: "0x1",
                create_block: 123321,
                create_tx: "0x1",
                task_hash: "0x1",
                prover_input_data: "MTIz",
                reward_amount: 100,
                latency: 123,
                proof_type: 1,
                task_status: 1,
                reward_status: 1,
                provider_ids: "1001,1002",
                verifier_ids: "1001,1002",
                failed_reason: "失败原因",
                claim_reward_at: "2024-06-19T17:08:23.453216+08:00",
                claim_reward_block: 123321,
                claim_reward_tx: "0x1",
            },
        ]
    },
};
const TaskTable = ({ classNames, status = 0 }: any) => {
    const { t } = useTranslation()
    const { data, totalPage, currentPage, setCurrentPage } = usePagnation((page: number) => {
        // return Promise.resolve(mock);

        return axios.get("/api/v1/task", {
            params: {
                status,
                // limit: 100,
                pageNum: page,
                pageSize: commonPageSize
            },
        });
    }, {
        ready: status != undefined,
        refreshDeps: [status]
    });

    const tableData = data?.data?.list;

    const rows = tableData || [];

    const columns = [
        {
            key: "task_hash",
            label: "taskHash"
        },
        {
            key: "create_block",
            label: "createBlock",
        },
        {
            key: "reward_amount",
            label: "reward",
        },
        {
            key: "CreatedAt",
            label: "createdAt",
        },
        {
            key: "task_status",
            label: "status",
        },
        {
            key: "action",
            label: "detail",
        },
    ];

    const renderCell = (item: any, columnKey: any) => {
        switch (columnKey) {
            case "task_hash":
                const value = getKeyValue(item, columnKey)
                return isMobile ? shortStr(value, 12) : value
            case "reward_amount":
                return BigNumber(getKeyValue(item, columnKey)).div(1e0).toString()
            case "CreatedAt":
                return (
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <span>{dayjs(item?.[columnKey]).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </div>
                );
            case "name":
                return (
                    <div className="flex items-center gap-2">
                        <Image text={item?.[columnKey]?.[0]} src={item?.logo} className="size-8 rounded-full" />
                        <span>{item?.[columnKey]}</span>
                    </div>
                );
            case "task_status":
                return (
                    <div className="flex items-center gap-1 whitespace-nowrap">
                        <span>{TaskStatus[item?.[columnKey]]}</span>
                    </div>
                );
            case "action":
                return (
                    <Link
                        to={"/dashboard/task/" + item?.ID?.toString()}
                        className="flex items-center gap-1"
                    >
                        <span className="text-[#21E9FA]">{t('detail')}</span>
                        <Image
                            className="size-3"
                            src={getImageUrl("@/assets/images/dashboard/share.svg")}
                        />
                    </Link>
                );
            default:
                return getKeyValue(item, columnKey);
        }
    };

    return (
        <div className={clsx(isMobile ? "px-3 py-6 rounded-[12px]" : "p-8 rounded-[24px]", "border-[#FFFFFF33] border")}>
            <Table
                aria-label="Task"
                classNames={{
                    wrapper: clsx(
                        "p-0 shadow-none bg-[transparent]",
                        classNames?.wrapper
                    ),
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
    );
};

export default TaskTable;
