import Pagination from "@/components/Pagination";
import { commonPageSize } from "@/config";
import useAccount from "@/hooks/useAccount";
import usePagnation from "@/hooks/usePagnation";
import { shortStr } from "@/utils/tools";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const mock = {
  msg: "success",
  code: 10000,
  data: {
    index: 194, // 目标地址积分排名
    list: [
      {
        ID: 2354,
        CreatedAt: "2024-07-30T04:00:22.302Z",
        UpdatedAt: "2024-08-27T14:02:44.282Z",
        DeletedAt: null,
        verifier_id: 10078,
        name: "dayao377",
        logo: "https://api-testnet.prover.xyz/images/1.02.png",
        description: "臭鱼烂虾队",
        verifier: "0xF3063e8BeFcb9c2588BEB786d306a66c9fac5d27",
        verifier_cosmos: "cysic81yx95tl3syhc76yz3e407az53xer54vdpmw35td",
        claim_reward_address: "0xF3063e8BeFcb9c2588BEB786d306a66c9fac5d27",
        approve_hash:
          "2D1FA2F54DCCEF78E3308D62C579A2106D423F990353E00A243BC02A89B9213C",
        send_gas_hash: "",
        status: 1,
        last_heartbeat: "2024-08-27T14:02:44Z",
        rank: 12,
        verifier_point: "133.00", // 验证积分
        activity_score: "116.66", // 活动积分
        sum: "249.66", // 总积分
      },
      {
        ID: 2353,
        CreatedAt: "2024-07-30T04:00:22.302Z",
        UpdatedAt: "2024-08-27T14:02:44.282Z",
        DeletedAt: null,
        verifier_id: 10078,
        name: "dayao377",
        logo: "https://api-testnet.prover.xyz/images/1.02.png",
        description: "臭鱼烂虾队",
        verifier: "0x218B45fE3025f1ED1051cD5fee8a9136474aB1a1",
        verifier_cosmos: "cysic81yx95tl3syhc76yz3e407az53xer54vdpmw35td",
        claim_reward_address: "0x697CA2210429b2BBb26A221f339509Cc2109b377",
        approve_hash:
          "2D1FA2F54DCCEF78E3308D62C579A2106D423F990353E00A243BC02A89B9213C",
        send_gas_hash: "",
        status: 1,
        last_heartbeat: "2024-08-27T14:02:44Z",
        rank: 1,
        verifier_point: "133.00", // 验证积分
        activity_score: "116.66", // 活动积分
        sum: "249.66", // 总积分
      },
    ],
    total: 632, // 总数量
  },
};

enum sortKkey {
  sum = "sum",
  aPoint = "aPoint",
  vPoint = "vPoint",
}

const defaultSortKey = sortKkey.sum;

const UserTable = () => {
  const { t } = useTranslation();
  const { address } = useAccount();

  // 10.5 获取已经邀请人员列表
  const {
    data: taskList,
    totalPage,
    currentPage,
    setCurrentPage,
  } = usePagnation(
    (page: number) => {
      // return Promise.resolve(activatedUserList);

      return axios.get(`/api/v1/referral/${address}/activatedUserList`, {
        params: {
          pageNum: page,
          pageSize: commonPageSize,
          by: defaultSortKey,
          target: address,
        },
      });
    },
    {
      ready: !!address,
      refreshDeps: [address],
    }
  );
  const tableData = taskList?.data?.list || [];
  const rows = tableData || [];

  const columns = [
    {
      key: "Address",
      label: "User",
    },
    {
      key: "Status",
      label: "Status",
    },
    {
      key: "RebatePoint",
      label: "Referral",
    },
    {
      key: "BindAt",
      label: "Time",
    },
  ];

  const renderCell = (item: any, columnKey: any) => {
    switch (columnKey) {
      case "Status":
        return (
          <div className="flex items-center gap-1">
            {item?.ActivateAt ? (
              <>
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.28498 10.9154L12.0986 6.84227L11.2374 5.82442L7.38435 9.08467L5.48452 7.08614L4.51815 8.00479L7.28498 10.9154Z"
                    fill="#11D473"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.0013 8.00004C15.0013 11.6819 12.0165 14.6667 8.33464 14.6667C4.65274 14.6667 1.66797 11.6819 1.66797 8.00004C1.66797 4.31814 4.65274 1.33337 8.33464 1.33337C12.0165 1.33337 15.0013 4.31814 15.0013 8.00004ZM13.668 8.00004C13.668 10.9456 11.2802 13.3334 8.33464 13.3334C5.38912 13.3334 3.0013 10.9456 3.0013 8.00004C3.0013 5.05452 5.38912 2.66671 8.33464 2.66671C11.2802 2.66671 13.668 5.05452 13.668 8.00004Z"
                    fill="#11D473"
                  />
                </svg>
                <span className="text-[#A3A3A3]">Activated</span>
              </>
            ) : (
              <>
                <span className="text-[#A3A3A3]">Not Activated</span>
              </>
            )}
          </div>
        );
      case "RebatePoint":
        return (
          <div className="flex items-center gap-1">
            <div>{getKeyValue(item, columnKey) || "-"}</div>
            {/* <span className="text-[#A3A3A3]">Points</span> */}
          </div>
        );
      case "Address":
        const data = getKeyValue(item, columnKey);
        return (
          <div className="flex items-center gap-1">
            <div className="size-5 rounded-full bg-gradient" />
            <div>{data}</div>
          </div>
        );
      default:
        return getKeyValue(item, columnKey);
    }
  };

  return (
    <>
      <style>
        {`
      
      .self-addr-bg{
        background: linear-gradient(83.04deg, rgba(157, 71, 255, 0.12) 5.44%, rgba(0, 240, 255, 0.12) 54.92%);
      }
      .self-addr-bg td:first-child{
          border-start-start-radius: 8px;
          border-end-start-radius: 8px;
      }
      .self-addr-bg td:last-child{
        border-start-end-radius: 8px;
        border-end-end-radius: 8px;
      }
      `}
      </style>

      <Table
        aria-label="user list"
        classNames={{
          wrapper: "p-0 bg-[transparent]",
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
          {(item: any) => {
            return (
              <TableRow key={item?.Address}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      <Pagination
        offset={1}
        className="mt-4 flex justify-center"
        total={totalPage}
        currentPage={currentPage}
        onChange={setCurrentPage}
      />
    </>
  );
};
export default UserTable;
