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
import Image from "@/components/Image";
import { getImageUrl, shortStr } from "@/utils/tools";
import { useTranslation } from "react-i18next";
import usePagnation from "@/hooks/usePagnation";
import { commonPageSize, TaskStatus } from "@/config";
import Pagination from "@/components/Pagination";

const mock = {
  msg: "success",
  code: 10000,
  data: {
    verifier: {
      // VerifierDetail
      ID: 1,
      CreatedAt: "2024-06-12T23:49:57.651305+08:00",
      UpdatedAt: "2024-06-12T23:49:57.651305+08:00",
      DeletedAt: null,
      name: "verifier0",
      domain: "http://www.verifier0.com",
      logo: "verifier0 logo",
      description: "verifier0, hdPath 60/3/0",
      verifier: "0xe780d4f127baecE34523e94AbC190E32B4AE4470",
      Status: 0,
    },
    taskList: [
      // 任务列表, 内容同6中的 taskList
      {
        ID: 1,
        CreatedAt: "2024-06-12T23:11:00.645143+08:00",
        UpdatedAt: "2024-06-13T00:07:00.484898+08:00",
        DeletedAt: null,
        project_worker: "0x0744eD18AF2559E404aEC794E227146708092284",
        task_hash: "some_valid_hash",
        prover_input_data: "dGVzdDEyMw==",
        reward_id: 1,
        latency: 10,
        proof_type: 1,
        task_status: 2,
        provider_ids: "1001,1002,1003", // 执行任务的Prover链上ID
        Reason: "",
        provider_id: 1003, // 验证的Prover链上ID
        prover: "0xe780d4f127baecE34523e94AbC190E32B4AE4470", // 验证的Proverprover 地址
        verifier_id: 2001, // Verifier链上ID
        verifier: "0xe780d4f127baecE34523e94AbC190E32B4AE4470", // Verifier地址
        verifier_pass: false, // Result  true: 验证通过, false:验证不通过
        commit_at: "0001-01-01T00:00:00Z", // Verifier Result提交时间, 只有时间不是0001-01-01的时候才有Verifier Result
      },
    ],
  },
};

const VerifierDetail = () => {
  const { t } = useTranslation();
  const params = useParams();

  const { data } = useRequest(
    () => {
      // return Promise.resolve(mock);

      return axios.get(`/api/v1/verifier/${params?.id}`);
    },
    {
      ready: !!params?.id,
      refreshDeps: [params?.id],
    }
  );

  const { data: taskList, totalPage, currentPage, setCurrentPage } = usePagnation(
    (page: number) => {
      // return Promise.resolve(mock);

      return axios.get(`/api/v1/verifier/${params?.id}/taskList`, {
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
      label: "Task ID",
    },
    {
      key: "task_hash",
      label: "Task Hash",
    },
    {
      key: "provider_ids",
      label: "providers",
    },
    {
      key: "task_status",
      label: "Result",
    },
    {
      key: "reward_amount",
      label: "Reward",
    },
    {
      key: "action",
      label: "Detail",
    },
  ];

  const renderCell = (item: any, columnKey: any) => {
    switch (columnKey) {
      case "reward_amount":
        return (item?.task_status?.toString() == '100' ? (getKeyValue(item, columnKey) || 0) : '-')
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
      case "provider_ids":
        const addrs = getKeyValue(item, 'prover_addr_list')?.split(",");
        const ids = getKeyValue(item, columnKey)?.split(",");
        return (
          <div className="flex items-center gap-2">
            {ids?.map((i, index) => (
              <Link to={`/dashboard/prover/${i}`}>
                <span className="underline" key={i}>
                  {shortStr(addrs[index], 12)}
                </span>
              </Link>
            ))}
          </div>
        );
      case "task_status":
        return (
          <div className="flex items-center gap-2">
            <span>{TaskStatus[item?.[columnKey]]}</span>
          </div>
        );
      case "verifier_pass":
        return (
          <div className="flex items-center gap-2">
            <span>{item?.[columnKey] ? "Success" : "Failure"}</span>
          </div>
        );
      default:
        return getKeyValue(item, columnKey);
    }
  };

  return (
    <>
      <MainContainer title="Verifier Detail">
        <MainDetailContainer {...detail}>
          <div className="shadow-[0px_4px_0px_0px_#000000] p-4 rounded-2xl border-[#FFFFFF33] border">
            <Table
              aria-label="TaskList"
              classNames={{
                wrapper:
                  "p-0 bg-[transparent]",
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

export default VerifierDetail;
