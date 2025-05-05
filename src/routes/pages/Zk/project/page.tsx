// @ts-nocheck
import Button from "@/components/Button";
import { ArrowRight } from "lucide-react";
import GradientBorderCard from "@/components/GradientBorderCard";
import { isMobile } from "react-device-detect";
import { cn } from "@nextui-org/react";
import CysicTable from "@/components/Table";
import { Link } from "react-router-dom";


interface IProject {
    name: string;
    domain: string;
    workerAddress: string;
    id: string;
}


const memberData: IProject[] = [
    {
        name: "Project 1",
        domain: "https://project1.com",
        workerAddress: "0x1234567890abcdef",
        id: "1"
    },
    {
        name: "Project 2",
        domain: "https://project2.com",
        workerAddress: "0x1234567890abcdef",
        id: "2"
    },
    {
        name: "Project 3",
        domain: "https://project3.com",
        workerAddress: "0x1234567890abcdef",
        id: "3"
    }
]

const ProjectPage = () => {

    const projectColumns: CysicTableColumn<IProject>[] = [
        {
            key: "projectName",
            label: "Project Name",
            width: "33%",
            renderCell: (project) => (
                <div className="flex items-center gap-2">
                    <div className="size-6 bg-sub rounded-full"></div>
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
            key: "workerAddress",
            label: <div className="text-right">Worker Address</div>,
            width: "33%",
            renderCell: (project) => (
                <div className="text-right">{project.workerAddress}</div>
            )
        },
        {
            key: "action",
            label: "",
            width: "10%",
            renderCell: () => (
                <div className="flex items-center gap-2 text-sm justify-end">
                    <span>VIEW</span>
                    <ArrowRight size={16} />
                </div>
            )
        }
    ];

    return (
        <div className="container min-h-screen w-full pb-12 overflow-hidden">
            {/* 主标题 */}
            <div className="pt-12 flex flex-col items-center gap-6 relative z-[2]">
                <div className="flex flex-col items-center gap-4">
                    <span className="title !text-4xl !font-[300] !text-[#fff] text-center">
                        PROJECT
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="!text-base title">learn about Cysic ZK Project and how to fully utilize it</span>
                        <ArrowRight size={16} />
                    </div>

                    <Button type="solid" className="uppercase !p-6 text-base flex gap-2 items-center ">
                        <span>apply</span>
                        <ArrowRight size={16} />
                    </Button>
                </div>
            </div>

            {/* 主要内容部分 */}
            <div className="mx-auto mt-12 relative z-[2]">
                {/* 第一部分：成为 Prover */}
                <GradientBorderCard borderRadius={8} className="mb-4">
                    <div className={cn("w-full", isMobile ? "px-6 py-4" : "px-6 py-4")}>
                        <div className="flex items-center justify-between gap-2 mb-6 ">
                            <h2
                                className={cn(
                                    "title !font-[300] uppercase mt-2",
                                    isMobile ? "!text-base" : "!text-xl"
                                )}
                            >
                                My projects
                            </h2>

                            <Link to="/zk/project/my" className="flex items-center gap-2 text-sm">
                                <span className="uppercase">see all</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        <p className="!font-[300] text-[32px] text-right title">
                            12
                        </p>
                    </div>
                </GradientBorderCard>


                <GradientBorderCard borderRadius={8}>
                    <div className={cn("w-full", isMobile ? "px-6 py-4" : "px-6 py-4")}>
                        <h2
                            className={cn(
                                "title !font-[300] uppercase mt-2",
                                isMobile ? "!text-base" : "!text-xl"
                            )}
                        >
                            My projects
                        </h2>
                        <CysicTable
                            data={memberData}
                            columns={projectColumns}
                            keyExtractor={(member) => member.address}
                        />
                    </div>
                </GradientBorderCard>



            </div>
        </div>
    );
};

export default ProjectPage;
