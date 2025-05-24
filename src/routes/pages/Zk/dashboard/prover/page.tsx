import axios from "@/service";
import { isMobile } from "react-device-detect";
import { cn, Input, Pagination } from "@nextui-org/react";
import GradientBorderCard from "@/components/GradientBorderCard";
import { Link } from "react-router-dom";
import { ArrowRight, Search, ShareIcon } from "lucide-react";
import CysicTable, { CysicTableColumn } from "@/components/Table";
import usePagnation from "@/hooks/usePagnation";
import { commonPageSize } from "@/config";
import { ProverStatus, TableAvatar, TaskStatus } from "@/routes/pages/Zk/dashboard/components/tableComponents";
import { useState } from "react";
import { useDebounce } from "ahooks";

interface IProver {
    "id": number,
    "name": string,
    "status": number,
    "avatar": string,
}

const ProjectPage = () => {
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, { wait: 500 })
    const { data, loading, total, currentPage, setCurrentPage } = usePagnation((currentPage: number) => {
        return axios.get('/api/v1/zkTask/dashboard/prover/list', {
            params: {
                pageNum: currentPage,
                pageSize: commonPageSize,
                keyword: debouncedSearch
            }
        })
    }, {
        staleTime: 10_000,
        refreshDeps: [debouncedSearch]
    })

    const taskList = data?.data?.list || [] as IProver[]

    const taskListColumns: CysicTableColumn<IProver>[] = [
        // {
        //     key: "id",
        //     label: "ID",
        //     renderCell: (row) => (row?.id)
        // },
        {
            key: "name",
            label: "Name",
            renderCell: (row) => <TableAvatar avatar={row?.avatar} name={row?.name} />
        },
        {
            key: "status",
            label: "Status",
            renderCell: (row) => <ProverStatus status={row.status} />
        },
        {
            key: "detail",
            label: "View",
            renderCell: (row) => (
                <Link to={`/zk/dashboard/prover/${row.id}`} className="flex gap-1 items-center justify-end">
                    <span>View</span>
                    <ArrowRight className="size-3" />
                </Link>
            )
        }
    ];


    return (
        <>


            {/* content */}
            <div className={cn("mx-auto mb-auto relative z-10 pt-20 pb-16 w-full", isMobile ? "break-words" : "")}>
                {/* title */}
                <h1 className={cn("unbounded font-light mb-12 text-center", isMobile ? "text-7xl" : "text-[2.25rem]")}>Prover</h1>

                {/* s3 */}
                <Input variant="bordered" classNames={{
                    inputWrapper: "!py-4 min-h-fit"
                }} startContent={<Search />} placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <GradientBorderCard className="mt-4 flex flex-col px-6 py-4">
                    <CysicTable
                        data={taskList}
                        columns={taskListColumns}
                        className="[&>div]:!pt-0"
                        loading={loading}
                    />

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
        </>
    );
};

export default ProjectPage;