/* eslint-disable no-case-declarations */
import axios from "@/service"
import { useAccount } from "wagmi"
import { useState } from "react"
import Copy from "@/components/Copy"
import { Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import usePagnation from "@/hooks/usePagnation"
import { bridgeChains, commonPageSize } from "@/config"
import Pagination from "@/components/Pagination"
import clsx from "clsx"
import { shortStr } from "@/utils/tools"
import ConnectButton from "@/components/connectButton";
import dayjs from "dayjs";
import Spinner from "@/components/spinner";

const TxStatus: any = {
    init: 'Pending',
    waitFinish: 'Pending',
    finish: 'Finish',
    failed: 'Failed'
}

const TxStatusColor: any = {
    init: '#737373',
    waitFinish: '#737373',
    finish: '#11D473',
    failed: '#FF401A'
}

const HistoryTable = ({ isLoading, type, columns, rows, classNames }: any) => {
    const renderCell = (item: any, columnKey: any) => {
        switch (columnKey) {
            case "status": {
                return <div className="flex items-center gap-1" >
                    <div className="size-3 rounded-full" style={{ background: TxStatusColor[item?.[columnKey]] }} />
                    <span>{TxStatus[item?.[columnKey]]}</span>
                </div>
            }
            case "createdAt":
                return <div>{dayjs(item?.[columnKey]).format('YYYY/MM/DD HH:mm:ss')}</div>
            case "targetTxHash":
                const targetExplorer = bridgeChains?.find(i => i?.id == item?.targetChainId)?.blockExplorers?.default?.url
                return (
                    <a target="_blank" href={targetExplorer + '/tx/' + item?.[columnKey]}>
                        <div className="cursor-pointer underline text-[#00F0FF]">{shortStr(item?.[columnKey], 10) || '-'}</div>
                    </a>
                );
            case "sourceTxHash":
                const sourceExplorer = bridgeChains?.find(i => i?.id == item?.sourceChainId)?.blockExplorers?.default?.url
                return (
                    <a target="_blank" href={sourceExplorer + '/tx/' + item?.[columnKey]}>
                        <div className="cursor-pointer underline text-[#00F0FF]">{shortStr(item?.[columnKey], 10) || '-'}</div>
                    </a>
                );
            case "transaction":
                return (
                    <div className="cursor-pointer underline text-[#00F0FF]">{shortStr(item?.['TxHash'], 10)}</div>
                );

            default:
                return getKeyValue(item, columnKey);
        }
    };
    return <Table
        aria-label="Project"
        classNames={{
            wrapper: clsx("p-0 shadow-none bg-[transparent]", classNames?.wrapper),
            th: "border-b border-solid border-[#FFFFFF33]",
        }}
    >
        <TableHeader columns={columns}>
            {(column: any) => (
                <TableColumn className="bg-[transparent] " key={column?.key}>
                    {column?.label}
                </TableColumn>
            )}
        </TableHeader>
        <TableBody loadingContent={<Spinner className="absolute inset-0" />} isLoading={isLoading} items={rows || []} className="relative">
            {(item: any) => (
                <TableRow key={type + '_' + item?.ID}>
                    {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                </TableRow>
            )}
        </TableBody>
    </Table>

}

const HistoryC = () => {
    const { address } = useAccount()
    const [selected, setSelected] = useState<any>("deposit");

    // const [dataList, setDataList] = useState<any>()
    // useRequest(() => {
    //     return axios.get(`/api/v1/bridge/history/${address}?pageNum=0&pageSize=100`)
    // }, {
    //     ready: !!address && !!selected,
    //     refreshDeps: [address, selected],
    //     onSuccess(e) {
    //         console.log('res', e?.data?.list)
    //         setDataList(e?.data?.list)
    //     },
    // })


    const {
        data: dataList,
        totalPage,
        currentPage,
        setCurrentPage,
        loading: isLoading,
    } = usePagnation(
        (page: number) => {
            // return Promise.resolve(mock);

            return axios.get(`/api/v1/bridge/history/${address}`, {
                params: {
                    event: selected,
                    pageNum: page,
                    pageSize: commonPageSize,
                },
            });
        },
        {
            ready: !!address,
            refreshDeps: [address, selected, selected],
        }
    );

    const depositColumns = [
        {
            key: "createdAt",
            label: "Time",
        },
        {
            key: "amount",
            label: "Amount",
        },
        {
            key: "sourceTxHash",
            label: "TX1",
        },
        {
            key: "targetTxHash",
            label: "TX2",
        },
        {
            key: "status",
            label: "Status",
        },
    ];

    const withdrawColumns = [
        {
            key: "createdAt",
            label: "Time",
        },
        {
            key: "amount",
            label: "Amount",
        },
        {
            key: "sourceTxHash",
            label: "TX1",
        },
        {
            key: "targetTxHash",
            label: "TX2",
        },
        {
            key: "status",
            label: "Status",
        },
    ]


    const tabs = [
        {
            id: "deposit",
            label: "Deposit",
            content: <HistoryTable type="deposit" columns={depositColumns} rows={dataList?.data?.events} isLoading={isLoading} />
        },
        {
            id: "withdraw",
            label: "Withdraw",
            content: <HistoryTable type="withdraw" columns={withdrawColumns} rows={dataList?.data?.events} isLoading={isLoading} />
        },
    ];


    return (<div className="min-w-[68.5rem] border border-[#FFFFFF33] rounded-[24px] p-8">
        <div className="flex flex-col gap-12">
            <div className="flex items-center gap-8">
                <div className="rounded-full size-[3rem] bg-[#00F0FF]"></div>
                <div className="flex flex-col gap-2">
                    <span className="text-[20px] font-semibold">Account</span>
                    <Copy value={address}>
                        <span className="text-[#A1A1AA]">{address}</span>
                    </Copy>
                </div>
            </div>
            <div>
                <Tabs selectedKey={selected} onSelectionChange={(v) => {
                    setSelected(v);
                    setCurrentPage(0);
                }} variant={'underlined'} aria-label="Dynamic tabs" items={tabs}>
                    {(item) => (
                        <Tab key={item.id} title={item.label}>
                            {item.content}
                        </Tab>
                    )}
                </Tabs>

                <Pagination
                    offset={1}
                    className="mt-4 flex justify-center"
                    total={totalPage}
                    currentPage={currentPage}
                    onChange={setCurrentPage}
                />

                {
                    !address ? <ConnectButton className="mx-auto" /> : null
                }
            </div>
        </div>
    </div>)
}

export default HistoryC