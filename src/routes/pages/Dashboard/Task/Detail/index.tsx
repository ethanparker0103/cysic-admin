import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import { useRequest } from "ahooks";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { explorerUrl, ProofBackend, rewardStatus, taskStatus, TaskStatus } from "@/config";
import Image from "@/components/Image";
import { getImageUrl } from "@/utils/tools";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import clsx from "clsx";
import StatusIcon from "@/components/StatusIcon";
import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView, isMobile } from "react-device-detect";

const mock = {
  msg: "success",
  code: 10000,
  data: {
    ID: 2,
    CreatedAt: "2024-06-12T23:39:17.224094+08:00",
    UpdatedAt: "2024-06-12T23:39:17.224094+08:00",
    DeletedAt: null,
    project_worker: "0x1",
    create_block: 123321,
    create_tx: "0x1",
    task_hash: "0x1",
    prover_input_data:
      "171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113",
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
    project_id: 1,
    project_name: "项目方名称",
    address: "0x123321",
    provider_list: [
      {
        id: 1,
        name: "算力方名称",
        address: "0x123",
        proof_hash:
          "171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113",
        commit_tx:
          "171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113",
      },
    ],
    verifier_list: [
      {
        id: 1,
        name: "Verifier Name",
        address:
          "171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113",
        verify_result: {
          "1": 1,
          "2": 2,
          "3": 0,
        },
        commit_tx:
          "171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113171786011317178601131717860113",
      },
    ],
  },
};

const TaskDetail = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();

  const { data } = useRequest(
    () => {
      // return Promise.resolve(mock);

      return axios.get(`/api/v1/task/${params?.id}`);
    },
    {
      ready: !!params?.id,
      refreshDeps: [params?.id],
    }
  );

  const tableData = data?.data;

  const rows = tableData || {};

  const columns = [
    {
      key: "task_hash",
      label: "Task Hash",
    },
    {
      key: "reward_amount",
      label: "Reward",
    },
    {
      key: "create_block",
      label: "Create Block",
    },
    {
      key: "claim_reward_block",
      label: "Finish Block",
    },
    {
      key: "proof_type",
      label: "Proof Backend",
    },
    {
      key: "task_status",
      label: "Status",
    },
    {
      key: "project_name",
      label: "Project",
    },
    {
      key: "provider",
      label: "Prover",
    },
    {
      key: "verifier",
      label: "Verifier",
    },
    {
      key: "prover_input_data",
      label: "Input Data",
    },
  ];

  const renderCell = (item: any, columnKey: any) => {
    if (!item) return "-";
    switch (columnKey) {
      case "proof_hash":
        const hash = item?.[columnKey]
        return hash || '-'

      case "commit_tx":
        const tx = item?.[columnKey]
        return tx || '-'

      case "verifierName":
        const list = Object.entries(item?.['verify_result']) || [];
        return (
          <Link
            to={"/dashboard/verifier/" + item?.id?.toString()}
            className="flex items-center gap-1"
          >
            <BrowserView className="flex items-center gap-1">
              <span >{item?.name}</span>
              <Image
                className="size-3"
                src={getImageUrl("@/assets/images/dashboard/share.svg")}
              />
            </BrowserView>
            <MobileView className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span >{item?.name}</span>
                <Image
                  className="size-3"
                  src={getImageUrl("@/assets/images/dashboard/share.svg")}
                />
              </div>
              <div className="flex items-center gap-1">
                {list?.map((i: any, index: number) => {
                  return (
                    <Tooltip content={i?.[0]} key={index}>
                      <div>
                        <StatusIcon status={i?.[1]} />
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </MobileView>
          </Link>
        );
        case '#':
          return <div className="flex items-center justify-center font-semibold text-[#000] bg-[#00F0FF] size-5 rounded-full">{item?.[columnKey]}</div>;
      case "proverName":
        return (
          <Link
            to={"/dashboard/prover/" + item?.id?.toString()}
            className="flex items-center gap-1"
          >
            <span >{item?.name}</span>
            <Image
              className="size-3"
              src={getImageUrl("@/assets/images/dashboard/share.svg")}
            />
          </Link>
        );
      case "reward_amount":
        return BigNumber(getKeyValue(item, columnKey)).div(1e0).toString();
      case "verify_result":
        const _list = Object.entries(item?.[columnKey]) || [];
        return (
          <div className="flex items-center gap-1">
            {_list?.map((i: any, index: number) => {
              return (
                // i?.[0]
                <Tooltip content={index+1} key={index}>
                  <div>
                    <StatusIcon status={i?.[1]} />
                  </div>
                </Tooltip>
              );
            })}
          </div>
        );
      case "create_block":
        // jump to explorer
        return (
          <div className="flex items-center gap-1">
            <span>{item?.[columnKey]}</span>
            <a target="_blank" href={explorerUrl + `/blocks/${item?.[columnKey]}`}>
              <Image
                className="size-3"
                src={getImageUrl("@/assets/images/dashboard/share.svg")}
              />
            </a>
          </div>
        );
      case "claim_reward_block":
        // jump to explorer
        const blocks = item?.[columnKey]
        return (
          <div className="flex items-center gap-1">
            <span>{blocks > 0 ? blocks : '-'}</span>
            {
              +blocks > 0 ? <a target="_blank" href={explorerUrl + `/blocks/${blocks}`}>
                <Image
                  className="size-3"
                  src={getImageUrl("@/assets/images/dashboard/share.svg")}
                />
              </a> : null
            }

          </div>
        );
      case "proof_type":
        return (
          <div className="flex items-center gap-1">
            <span>{ProofBackend[item?.[columnKey]]}</span>
          </div>
        );
      case "task_status":
        return (
          <div className="flex items-center gap-1">
            <span>{TaskStatus[item?.[columnKey]]}</span>
          </div>
        );
      case "project_name":
        return (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => {
              navigate("/dashboard/project/" + item?.project_id);
            }}
          >
            <span>{item?.[columnKey]}</span>
            <Image
              className="size-3"
              src={getImageUrl("@/assets/images/dashboard/share.svg")}
            />
          </div>
        );

      case 'rewardStatus': 
        return (
          <div className="flex items-center gap-1">
            <StatusIcon status={item?.['has_reward']} />
            <span>{t(rewardStatus[item?.['has_reward']])}</span>
          </div>
        )
      case "provider":
        const _provider_list = item?.provider_list?.length ? item?.provider_list?.map((i, index)=>{
          return {
            ...i,
            '#': index + 1
          }
        }) : []

        return (
          <Table
            aria-label="provider_list"
            classNames={{
              wrapper: clsx(
                isMobile ? "text-xs" : "text-sm",
                "border border-[#FFFFFF33] rounded-[16px] px-0 py-3 bg-[transparent]"
              ),
              th: clsx(isMobile ? "text-xs" : "text-sm", "h-[18px] px-3"),
              td: clsx(isMobile ? "text-xs" : "text-sm", "h-[18px] px-3"),
              table: "border-spacing-x-1",
            }}
          >
            <TableHeader
              columns={[
                {
                  key: "#",
                  label: "#",
                },
                {
                  key: "proverName",
                  label: "proverName",
                },
                {
                  key: "rewardStatus",
                  label: "Reward Status",
                },
                {
                  key: "proof_hash",
                  label: "proof_hash",
                },
                {
                  key: "commit_tx",
                  label: "commitHash",
                },
              ]}
            >
              {(column) => (
                <TableColumn className="bg-[transparent]" key={column?.key}>
                  <div className={clsx(isMobile ? "w-16 break-words" : "")}>{t(column?.label)}</div>
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={_provider_list}>
              {(item: any) => (
                <TableRow key={item?.id}>
                  {(columnKey) => (
                    <TableCell>
                      <span className="text-sm break-all">
                        {renderCell(item, columnKey)}
                      </span>
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        );
      case "verifier":
        const column = isMobile ? [
          {
            key: "verifierName",
            label: "verifierName",
          },
          {
            key: "commit_tx",
            label: "commitHash",
          },
        ] : [
          {
            key: "verify_result",
            label: "verify_result",
          },
          {
            key: "verifierName",
            label: "verifierName",
          },
          {
            key: "rewardStatus",
            label: "Reward Status",
          },
          {
            key: "commit_tx",
            label: "commitHash",
          },
        ]
        return (
          <Table
            aria-label="provider_list"
            classNames={{
              wrapper: clsx(
                "text-sm border border-[#FFFFFF33] rounded-[16px] px-0 py-3 bg-[transparent]"
              ),
              th: "h-[18px] px-3 text-sm",
              td: "h-[18px] px-3 text-sm",
            }}
          >
            <TableHeader
              columns={column}
            >
              {(column) => (
                <TableColumn className="bg-[transparent] " key={column?.key}>
                  {t(column?.label)}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={item?.verifier_list || []}>
              {(item: any) => (
                <TableRow key={item?.id}>
                  {(columnKey) => (
                    <TableCell>
                      <span className="text-sm break-all	">
                        {renderCell(item, columnKey)}
                      </span>
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        );
      case "prover_input_data":
        return (
          <div className="break-all	flex items-center gap-1 text-sm border border-[#FFFFFF33] rounded-[16px] p-3 bg-[transparent]">
            <span>{item?.[columnKey]}</span>
          </div>
        );
      default:
        return item?.[columnKey];
    }
  };

  return (
    <MainContainer title="TaskDetail" className={isMobile ? "border-[#FFFFFF33] border rounded-[12px] px-4 py-6" : ""}>
      <div className="flex flex-col gap-6">
        {columns?.map((i, index) => {
          return (
            <div key={i?.key || index} className={clsx(['verifier', 'provider', 'prover_input_data'].includes(i?.key) && isMobile ? "flex-col !items-start" : "", isMobile ? "gap-2 flex-wrap" : "gap-10", "flex items-center")}>
              <div className="text-[#A3A3A3] w-[25%]">{t(i?.label)}</div>
              <div className={clsx(isMobile ? "break-all flex-wrap" : "", "flex-1")}>{renderCell(rows, i?.key)}</div>
            </div>
          );
        })}
      </div>
    </MainContainer>
  );
};

export default TaskDetail;
