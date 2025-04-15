import Pagination from "@/components/Pagination";
import { commonPageSize } from "@/config";
import usePagnation from "@/hooks/usePagnation";
import GradientContainer from "@/routes/components/GradientContainer";
import { shortStr, getImageUrl } from "@/utils/tools";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react"
import axios from "axios";
import copy from "copy-to-clipboard";
import { useTranslation } from "react-i18next";
import toast from "react-simple-toasts";
import useAccount from "@/hooks/useAccount";

const mock = {
  "msg": "success",
  "code": 10000,
  "data": {
    "index": 194, // 目标地址积分排名
    "list": [
      {
        "ID": 2354,
        "CreatedAt": "2024-07-30T04:00:22.302Z",
        "UpdatedAt": "2024-08-27T14:02:44.282Z",
        "DeletedAt": null,
        "verifier_id": 10078,
        "name": "dayao377",
        "logo": "https://api-testnet.prover.xyz/images/1.02.png",
        "description": "臭鱼烂虾队",
        "verifier": "0xF3063e8BeFcb9c2588BEB786d306a66c9fac5d27",
        "verifier_cosmos": "cysic81yx95tl3syhc76yz3e407az53xer54vdpmw35td",
        "claim_reward_address": "0xF3063e8BeFcb9c2588BEB786d306a66c9fac5d27",
        "approve_hash": "2D1FA2F54DCCEF78E3308D62C579A2106D423F990353E00A243BC02A89B9213C",
        "send_gas_hash": "",
        "status": 1,
        "last_heartbeat": "2024-08-27T14:02:44Z",
        "rank": 12,
        "verifier_point": "133.00",  // 验证积分
        "activity_score": "116.66", // 活动积分
        "sum": "249.66"  // 总积分
      },
      {
        "ID": 2353,
        "CreatedAt": "2024-07-30T04:00:22.302Z",
        "UpdatedAt": "2024-08-27T14:02:44.282Z",
        "DeletedAt": null,
        "verifier_id": 10078,
        "name": "dayao377",
        "logo": "https://api-testnet.prover.xyz/images/1.02.png",
        "description": "臭鱼烂虾队",
        "verifier": "0x218B45fE3025f1ED1051cD5fee8a9136474aB1a1",
        "verifier_cosmos": "cysic81yx95tl3syhc76yz3e407az53xer54vdpmw35td",
        "claim_reward_address": "0x697CA2210429b2BBb26A221f339509Cc2109b377",
        "approve_hash": "2D1FA2F54DCCEF78E3308D62C579A2106D423F990353E00A243BC02A89B9213C",
        "send_gas_hash": "",
        "status": 1,
        "last_heartbeat": "2024-08-27T14:02:44Z",
        "rank": 1,
        "verifier_point": "133.00",  // 验证积分
        "activity_score": "116.66", // 活动积分
        "sum": "249.66"  // 总积分
      }
    ],
    "total": 632 // 总数量
  }
}

enum sortKkey {
  sum = 'sum',
  aPoint = 'aPoint',
  vPoint = 'vPoint',
}

const defaultSortKey = sortKkey.sum

const VerifierTable = () => {
  const { t } = useTranslation();
  const { address } = useAccount()
  // const address = "0x9bf0355367907B42b4d1Fc397C969E1318bC6ca5";

  const {
    data: taskList,
    totalPage,
    currentPage,
    setCurrentPage,
  } = usePagnation(
    (page: number) => {
      // return Promise.resolve(mock);

      return axios.get(`/api/v1/leaderboard/verifier/list`, {
        params: {
          pageNum: page,
          pageSize: commonPageSize,
          by: defaultSortKey,
          target: address
        },
      });
    },
    {
      refreshDeps: [address],
    }
  );

  const self = taskList?.data?.target
  const selfId = self?.ID+'_'+self?.verifier_id

  const list = taskList?.data?.list || []
  const tableData = (self?.ID != 0) ? [self, ...list] : list;
  
  const rows = tableData || [];

  const columns = [
    {
      key: "rank",
      label: "Rank",
    },
    {
      key: "name",
      label: "Profile",
    },
    {
      key: "claim_reward_address",
      label: "Verifier Address",
    },
    // {
    //   key: "verifier_point",
    //   label: "Verifier Points",
    // },
    // {
    //   key: "activity_score",
    //   label: "Activity Points",
    // },
    {
      key: "sum",
      label: "Cumulation",
    },
  ];

  const renderCell = (item: any, columnKey: any) => {
    switch (columnKey) {
      case "rank":
        const ifSelf = selfId == (item?.ID+'_'+item?.verifier_id)
        const imgName = `@/assets/images/leadingboard/rank${+item?.rank+1}.svg`
        return <div className="flex items-center">
          <div>{[0, 1, 2].includes(+item?.rank) ? <img className="size-7" src={getImageUrl(imgName)} /> : `#${item?.rank+1}`}</div>
          {ifSelf ? <GradientContainer className="ml-1 px-1 rounded-[6px] basic-bg-gradient">
            <div className="text-xs italic">You</div>
          </GradientContainer> : null}

        </div>


      case "sum":
        return <div className="text-[#00F0FF]">{getKeyValue(item, columnKey)}</div>
      case "verifier":
        const value = getKeyValue(item, columnKey);
        return (
          <div
            className="cursor-pointer flex items-center gap-1"
            onClick={() => {
              copy(value);
              toast("Copied");
            }}
          >
            <span>{shortStr(value, 12)}</span>
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.875 5.0625C4.875 4.54473 5.29473 4.125 5.8125 4.125H10.875C11.2892 4.125 11.625 4.46079 11.625 4.875C11.625 5.18566 11.8768 5.4375 12.1875 5.4375C12.4982 5.4375 12.75 5.18566 12.75 4.875C12.75 3.83946 11.9105 3 10.875 3H5.8125C4.67341 3 3.75 3.92341 3.75 5.0625V10.125C3.75 11.1605 4.58946 12 5.625 12C5.93566 12 6.1875 11.7482 6.1875 11.4375C6.1875 11.1268 5.93566 10.875 5.625 10.875C5.21079 10.875 4.875 10.5392 4.875 10.125V5.0625Z"
                fill="white"
                fillOpacity="0.45"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.8125 6C7.67341 6 6.75 6.92341 6.75 8.0625V12.9375C6.75 14.0766 7.67341 15 8.8125 15H13.6875C14.8266 15 15.75 14.0766 15.75 12.9375V8.0625C15.75 6.92341 14.8266 6 13.6875 6H8.8125ZM7.875 8.0625C7.875 7.54473 8.29473 7.125 8.8125 7.125H13.6875C14.2053 7.125 14.625 7.54473 14.625 8.0625V12.9375C14.625 13.4553 14.2053 13.875 13.6875 13.875H8.8125C8.29473 13.875 7.875 13.4553 7.875 12.9375V8.0625Z"
                fill="white"
                fillOpacity="0.45"
              />
            </svg>
          </div>
        );
      case "name":
        return (
          <div className="flex items-center gap-2">
            <img src={item?.logo} className="w-8 h-8 rounded-full object-cover" />
            <div>{shortStr(item?.name, 12)}</div>
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
        aria-label="TaskList"
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
            const ifSelf = selfId == (item?.ID+'_'+item?.verifier_id)
            return (
              <TableRow key={item?.ID} className={ifSelf ? 'self-addr-bg' : ''}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )
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
  )
}
export default VerifierTable