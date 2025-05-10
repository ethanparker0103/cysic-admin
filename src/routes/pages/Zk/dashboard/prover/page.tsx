import axios from "@/service";
import { isMobile } from "react-device-detect";
import { cn, Pagination } from "@nextui-org/react";
import GradientBorderCard from "@/components/GradientBorderCard";
import { Link } from "react-router-dom";
import { ShareIcon } from "lucide-react";
import { getImageUrl, shortStr } from "@/utils/tools";
import CysicTable, { CysicTableColumn } from "@/components/Table";
import usePagnation from "@/hooks/usePagnation";
import { commonPageSize, TaskStatus } from "@/config";

interface IProver {
    "id": number,
    "name": string,
    "status": number,
}

const ProjectPage = () => {
    const { data, total, currentPage, setCurrentPage } = usePagnation((currentPage: number) => {
        return axios.get('/api/v1/zkTask/dashboard/prover/list', {
            params: {
                pageNum: currentPage,
                pageSize: commonPageSize,
            }
        })
    }, {
        staleTime: 10_000
    })

    const taskList = data?.data?.list || [] as IProver[]

    const taskListColumns: CysicTableColumn<IProver>[] = [
        {
            key: "id",
            label: "ID",
            renderCell: (row) => (row?.id)
        },
        {
            key: "name",
            label: "Name",
            renderCell: (row) => (row.name)
        },
        {
            key: "status",
            label: "Status",
            renderCell: (row) => (TaskStatus[row.status])
        },
        {
            key: "view",
            label: "View",
            renderCell: (row) => (
                <Link to={`/zk/dashboard/prover/${row.id}`} className="flex gap-1 items-center">
                    <span>Detail</span>
                    <img className="size-3" src={getImageUrl("@/assets/images/icon/share.svg")} />
                </Link>
            )
        }
    ];


    return (
        <>


            {/* content */}
            <div className={cn("mx-auto mb-auto relative z-10 pt-20 pb-16 w-full", isMobile ? "break-words" : "")}>
                {/* title */}
                <h1 className={cn("title !font-[200] mb-24 text-center", isMobile ? "text-7xl" : "text-[8rem]")}>Prover</h1>

                {/* s3 */}
                <GradientBorderCard className="mt-8 flex flex-col px-6 py-4">
                    <CysicTable
                        data={taskList}
                        columns={taskListColumns}
                        className="[&>div]:!pt-0"
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