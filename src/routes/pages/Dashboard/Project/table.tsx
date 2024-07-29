import Image from "@/components/Image";
import Pagination from "@/components/Pagination";
import { commonPageSize } from "@/config";
import usePagnation from "@/hooks/usePagnation";
import { getImageUrl } from "@/utils/tools";
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
        ID: 2,
        CreatedAt: "2024-06-12T23:39:17.224094+08:00",
        UpdatedAt: "2024-06-12T23:39:17.224094+08:00",
        DeletedAt: null,
        project_id: 0, // 项目方链上ID
        name: "project1", // 项目方名称
        domain: "http://www.project1.com", // 项目方Domain
        logo: "project1 logo", // 项目方logo
        description: "project1, not real project worker", // 项目方描述
        worker: "0x0744eD18AF2559E404aEC794E227146708092285", // 项目方worker地址
        status: 0, // 项目方状态:  0: 待审批   1: 审批通过   2: 审批拒绝
      },
    ]
  },
};
const ProjectTable = ({classNames}: any) => {
  const { t }  = useTranslation()
  const { data, totalPage, currentPage, setCurrentPage  } = usePagnation((page: number) => {
    // return Promise.resolve(mock);

    return axios.get("/api/v1/project", {
      params: {
        // limit: 100,
        pageNum: page,
        pageSize: commonPageSize
      },
    });
  });

  const tableData = data?.data?.list;
  console.log("tableData", tableData);

  const rows = tableData || [];

  const columns = [
    {
      key: "name",
      label: "projectName",
    },
    {
      key: "domain",
      label: "domain",
    },
    {
      key: "worker",
      label: "workerAddress",
    },
    {
      key: "action",
      label: "detail",
    },
  ];

  const renderCell = (item: any, columnKey: any) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2">
            <Image text={item?.[columnKey]?.[0]} src={item?.logo} className="size-8 rounded-full" />
            <span>{item?.[columnKey]}</span>
          </div>
        );
      case "action":
        return (
          <Link to={'/dashboard/project/'+item?.ID?.toString()} className="flex items-center gap-1">
            <span className="text-[#21E9FA]">Detail</span>
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
        aria-label="Project"
        classNames={{
          wrapper: clsx("p-0 shadow-none bg-[transparent]", classNames?.wrapper),
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

export default ProjectTable;
