import Button from "@/components/Button";
import Image from "@/components/Image";
import Pagination from "@/components/Pagination";
import { commonPageSize, cysicStCoin } from "@/config";
import usePagnation from "@/hooks/usePagnation";
import useCosmos from "@/models/_global/cosmos";
import useDelegate from "@/models/_global/delegate";
import { getImageUrl } from "@/utils/tools";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react"
import { useEventListener } from "ahooks";
import axios from "axios";
import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";

const mock = {
  "msg": "success",
  "code": 10000,
  "data": {
    "list": [
      {
        "name": "ValidatorName1",
        "voting_power": "1123.333",
        "voting_power_percent": "9.87",
        "commission_rate": "0.1",
        "expected_apr": "0.1034"
      }
    ],
    "total": 1
  }
}

enum sortKkey {
  sum = 'sum',
  aPoint = 'aPoint',
  vPoint = 'vPoint',
}

const defaultSortKey = sortKkey.sum

const UserTable = () => {
  const { t } = useTranslation();
  const { address } = useCosmos()
  // const address = "0x9bf0355367907B42b4d1Fc397C969E1318bC6ca5";
  const { setState, activeDelegate } = useDelegate()

  const {
    data: taskList,
    totalPage,
    currentPage,
    setCurrentPage,
    run
  } = usePagnation(
    (page: number) => {
      // return Promise.resolve(mock);
      return axios.get(`/api/v1/myPage/${address}/balance`, {
        params: {
          pageNum: page,
          pageSize: commonPageSize,
        },
      });
    },
    {
      ready: !!address,
      refreshDeps: [address],
      onSuccess(res) {
        const list = res?.data?.list?.map(i=>{
          return ({
            ...i,
            hm_amount: BigNumber(i?.amount).div(1e18).toString()
          })
        })
        setState({ activeDelegate: list })
      }
    }
  );
  const rows = activeDelegate || [];

  const columns = [
    {
      key: "token",
      label: "Coin",
    },
    {
      key: "amount",
      label: "Amount",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "cc_valued", 
      label: "Computing Governance Value",
    },
    {
      key: "action",
      label: "Action",
    }
  ];

  const renderCell = (item: any, columnKey: any) => {
    switch (columnKey) {
      case 'token':
        const v = getKeyValue(item, columnKey)
        const imgUrl = `@/assets/images/tokens/${v}.svg`
        return <div className="flex items-center gap-1">
          <Image className="size-6" src={getImageUrl(imgUrl)}/>
          <span>{v}</span>
        </div>
      case 'amount':
        return <div className="flex items-center gap-1">
          <span>{item?.hm_amount}</span>
          <span>{item?.token}</span>
        </div>
      case 'price':
        return <div className="flex items-center gap-1">
          <span>{getKeyValue(item, columnKey)}</span>
          <span>USDT</span>
        </div>
      case 'cc_valued':
        return <div className="flex items-center gap-1">
          <span>{getKeyValue(item, columnKey)}</span>
          <span>{cysicStCoin}</span>
        </div>
      case 'action':
        return <div className="flex items-center gap-2">
          <Button onClick={() => {

            dispatchEvent(new CustomEvent('modal_delegate_visible', {
              detail: { visible: true, item }
            }))
          }} className="min-h-fit h-fit py-2" type="solid">Delegate</Button>

        </div>
      default:
        return getKeyValue(item, columnKey);
    }
  };


  useEventListener('refresh_veComputeList' as string, ()=>{
    run()
  })
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
            return (
              <TableRow key={item?.token}>
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
export default UserTable