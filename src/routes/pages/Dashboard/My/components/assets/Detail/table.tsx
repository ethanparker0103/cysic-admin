import Pagination from "@/components/Pagination";
import { blockTime, commonPageSize } from "@/config";
import usePagnation from "@/hooks/usePagnation";
import { activatedUserList } from "@/mock/referral";
import useCosmos from "@/models/_global/cosmos";
import { getImageUrl, shortStr } from "@/utils/tools";
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
import useAccount from "@/hooks/useAccount";
import dayjs from "dayjs";

const mock = {
  msg: "success",
  code: 10000,
  data: {
    index: 194, // 目标地址积分排名
    list: [
      {
        "ID": 3,
        "CreatedAt": "2024-10-14T16:37:38.474Z",
        "UpdatedAt": "2024-10-14T16:37:38.474Z",
        "DeletedAt": null,
        "Height": 918,
        "TxHash": "4639901cc3653b05a1c53b3a2c237ff6d333765497f8f2583e721f28cb038aa5",
        "Address": "0x378ea1b8a4679964F585126E8578e231B4cf360a",
        "FromToken": "CGT",
        "FromAmount": "0.000000000000000666",
        "ToToken": "CYS",
        "ToAmount": "0.000000000000000666"
      }, {
        "ID": 4,
        "CreatedAt": "2024-10-14T16:37:38.474Z",
        "UpdatedAt": "2024-10-14T16:37:38.474Z",
        "DeletedAt": null,
        "Height": 918,
        "TxHash": "4639901cc3653b05a1c53b3a2c237ff6d333765497f8f2583e721f28cb038aa5",
        "Address": "0x378ea1b8a4679964F585126E8578e231B4cf360a",
        "FromToken": "CYS",
        "FromAmount": "0.000000000000000666",
        "ToToken": "CGT",
        "ToAmount": "0.000000000000000666"
      }
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
  const { address: cosmosAddress } = useCosmos()

  // 10.5 获取已经邀请人员列表
  const {
    data: taskList,
    totalPage,
    currentPage,
    setCurrentPage,
  } = usePagnation(
    (page: number) => {
      // return Promise.resolve(mock);  
      return axios.get(`/api/v1/myPage/${cosmosAddress}/exchangeHistory`, {
        params: {
          pageNum: page,
          pageSize: commonPageSize,
        },
      });
    },
    {
      ready: !!cosmosAddress,
      refreshDeps: [cosmosAddress],
      pollingInterval: blockTime.long,
    }
  );
  const tableData = taskList?.data?.list || [];
  const rows = tableData || [];

  const columns = [
    {
      key: "ToToken",
      label: "Coin",
    },
    {
      key: "UpdatedAt",
      label: "Time",
    },
    {
      key: "ToAmount",
      label: "Amount",
    }
  ];

  const renderCell = (item: any, columnKey: any) => {
    switch (columnKey) {
      case "ToToken":
        const token = getKeyValue(item, columnKey)
        const imgUrl = `@/assets/images/tokens/${token.toUpperCase()}.svg`
        return  <div className="flex items-center gap-2">
          <img className="size-6" src={getImageUrl(imgUrl)}/>
          <span>{token}</span>
        </div>
      case "UpdatedAt":
        return dayjs(getKeyValue(item, columnKey)).format("YYYY-MM-DD HH:mm:ss");
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
            <span className="text-[#A3A3A3]">Points</span>
          </div>
        );
      case "Address":
        const data = getKeyValue(item, columnKey);
        return (
          <div className="flex items-center gap-1">
            <div className="size-5 rounded-full bg-gradient" />
            <div>{shortStr(data, 12)}</div>
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
