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
import { commonPageSize, defaultRewardAmount, ProofBackend, TaskStatus } from "@/config";
import BigNumber from "bignumber.js";
import Image from "@/components/Image";
import { getImageUrl } from "@/utils/tools";
import { useTranslation } from "react-i18next";
import Pagination from "@/components/Pagination";
import usePagnation from "@/hooks/usePagnation";

const mock = {
  msg: "success",
  code: 10000,
  data: {
    project: {
      // 项目方基础信息, 同列表返回字段含义
      ID: 1,
      CreatedAt: "2024-06-12T23:09:21.840889+08:00",
      UpdatedAt: "2024-06-12T23:09:21.840889+08:00",
      DeletedAt: null,
      name: "project0",
      domain: "http://www.project0.com",
      logo: "project0 logo",
      description: "project0, hdPath 60/0/0",
      worker: "0x0744eD18AF2559E404aEC794E227146708092284",
      status: 0,
    },
    taskList: [
      // 项目方任务列表
      {
        ID: 1,
        CreatedAt: "2024-06-12T23:11:00.645143+08:00",
        UpdatedAt: "2024-06-12T23:11:00.645143+08:00",
        DeletedAt: null,
        project_worker: "0x0744eD18AF2559E404aEC794E227146708092284", // 发布任务项目方地址
        task_hash: "some_valid_hash", // 任务hash
        prover_input_data: "dGVzdDEyMw==", // 任务输入数据
        reward_id: 1, // 任务奖励ID
        latency: 10, // 任务算力要求
        proof_type: 1, // 任务要求算法
        task_status: 1, // Status  见 6.1 任务状态列表
        reason: "", // 任务拒绝原因, 如果有的话
        reward_chain_id: "cysicmint_8487538071262-1", // 奖励链ID
        reward_token_addr: "cosmos1...", // 奖励token地址
        reward_amount: 1000, // Reward token 数量
        reward_amount_in_usdt: "0.123456", // Reward token 折合 USDT
      },
    ],
  },
};

const ProjectDetail = () => {
  const { t } = useTranslation()
  const params = useParams();

  const { data } = useRequest(
    () => {
      // return Promise.resolve(mock);

      return axios.get(`/api/v1/project/${params?.id}`);
    },
    {
      ready: !!params?.id,
      refreshDeps: [params?.id],
    }
  );

  const { data: taskList, totalPage, currentPage, setCurrentPage } = usePagnation(
    (page: number) => {
      // return Promise.resolve(mock);

      return axios.get(`/api/v1/project/${params?.id}/taskList`, {
        params: {
          pageNum: page,
          pageSize: commonPageSize,
        },
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
      label: "taskID",
    },
    {
      key: "task_hash",
      label: "taskHash",
    },
    {
      key: "reward_amount",
      label: "bonus",
    },
    {
      key: "latency",
      label: "latency",
    },
    {
      key: "proof_type",
      label: "proofType",
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
      case "reward_amount":
        return BigNumber(getKeyValue(item, columnKey) || defaultRewardAmount).div(1e0).toString();
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
      <MainContainer title="Project Detail">
        <MainDetailContainer displayBonus {...detail}>
          <div className="shadow-[0px_4px_0px_0px_#000000] p-4 rounded-2xl border-[#FFFFFF33] border">
            <Table
              aria-label="TaskList"
              classNames={{
                wrapper:
                  "bg-[transparent] p-0",
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

            <Pagination offset={1} className="mt-4 flex justify-center" total={totalPage} currentPage={currentPage} onChange={setCurrentPage} />
          </div>
        </MainDetailContainer>
      </MainContainer>

    </>
  );
};

export default ProjectDetail;
