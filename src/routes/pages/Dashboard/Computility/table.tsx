import Image from "@/components/Image";
import Pagination from "@/components/Pagination";
import { commonPageSize, providerStatus } from "@/config";
import usePagnation from "@/hooks/usePagnation";
import { getImageUrl } from "@/utils/tools";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import axios from "axios";
import clsx from "clsx";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const mock = {
    msg: "success",
    code: 10000,
    data: {
        list: [
            {
                "ID": 2,
                "CreatedAt": "2024-06-12T23:43:02.876064+08:00",
                "UpdatedAt": "2024-06-12T23:43:02.876064+08:00",
                "DeletedAt": null,
                "provider_id": 0,      // Prover链上ID
                "name": "provider1",  // Prover名称
                "domain": "http://www.provider1.com", // ProverDomain
                "logo": "provider1 logo",  // Proverlogo
                "description": "provider1, hdPath 60/2/1", // Prover描述
                "prover": "0xe780d4f127baecE34523e94AbC190E32B4AE4470", // Proverprover地址
                "role": 0,  // Prover角色:   0:普通Prover   1:白名单Prover  100:IDC
                "status": 0,  // Prover状态:  0:待审批    1:审批通过  2:审批拒绝
                "total_task": 0,  // 总执行任务数量, 含正在执行任务
                "running_task": 0, // 正在执行任务数量
                "success_task": 0, // 执行成功任务数量
                "failed_task": 0 // 执行失败任务数量
            }
        ]
    }
};
const ComputilityTable = ({ classNames }: any) => {
    const { t } = useTranslation()
    const { data, totalPage, currentPage, setCurrentPage  } = usePagnation((page: number) => {
        // return Promise.resolve(mock);

        return axios.get("/api/v1/provider", {
            params: {
                // limit: 100,
                pageNum: page,
                pageSize: commonPageSize
            },
        });
    })

    const tableData = data?.data?.list
    console.log("tableData", tableData);

    const rows = tableData || []

    const columns = [
        {
            key: "name",
            label: "proverName",
        },
        {
            key: "domain",
            label: "domain",
        },
        {
            key: 'status',
            label: 'status'
        },
        {
            key: "action",
            label: "detail",
        },
    ];

    const renderCell = (item: any, columnKey: any) => {

        switch (columnKey) {
            case "name":
                return (<div className="flex items-center gap-2">
                    <Image text={item?.[columnKey]?.[0]} src={item?.logo} className="size-8 rounded-full" />
                    <span>{item?.[columnKey]}</span>
                </div>)
            case 'status':
                return t(providerStatus[item?.status?.toString()])
            case "action":
                return (
                    <Link to={'/dashboard/provider/' + item?.ID?.toString()} className="flex items-center gap-1">
                        <span className="text-[#21E9FA]">{t('detail')}</span>
                        <Image className="size-3" src={getImageUrl('@/assets/images/dashboard/share.svg')} />
                    </Link>
                );
            default:
                return getKeyValue(item, columnKey)
        }
    }

    return (
        <div className={clsx(isMobile ? "px-3 py-6 rounded-[12px]" : "p-8 rounded-[24px]", "border-[#FFFFFF33] border")}>
            <Table aria-label="Prover" classNames={{
                wrapper: clsx("p-0 shadow-none bg-[transparent]", classNames?.wrapper),
                th: "border-b border-solid border-[#FFFFFF33]"
            }}>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn className="bg-[transparent] " key={column?.key}>{t(column?.label)}</TableColumn>
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

export default ComputilityTable