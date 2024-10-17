import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import { commonPageSize } from "@/config";
import usePagnation from "@/hooks/usePagnation";
import { StakeTab } from "@/routes/pages/Dashboard/Stake/Modal/stake";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react"
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";

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

      return axios.get(`/api/v1/validator`, {
        params: {
          pageNum: page,
          pageSize: commonPageSize,
        },
      });
    },
    {
      refreshDeps: [address],
      onSuccess(res) {
        dispatchEvent(new CustomEvent('data_activeValidator', {
          detail: {
            list: res?.data?.list
          }
        }))
      }
    }
  );
  const rows = taskList?.data?.list || [];

  const columns = [
    {
      key: "name",
      label: "Validator",
    },
    {
      key: "my_stakes",
      label: "My Stakes",
    },
    {
      key: "voting_power",
      label: "Voting Power",
    },
    {
      key: "commission_rate",
      label: "Commission Rate",
    },
    {
      key: "expected_apr",
      label: "Expected APR",
    },
    {
      key: "action",
      label: "Action",
    }
  ];

  const renderCell = (item: any, columnKey: any) => {
    switch (columnKey) {
      case 'action':
        return <div className="flex items-center gap-2">
          <Button onClick={() => {
            dispatchEvent(new CustomEvent('modal_stake_visible', {
              detail: { visible: true, tab: StakeTab.stake, item, items: rows }
            }))
          }} className="min-h-fit h-fit py-2" type="solid">Stake</Button>
          <Button onClick={() => {
            dispatchEvent(new CustomEvent('modal_stake_visible', {
              detail: { visible: true, tab: StakeTab.unstake, item, items: rows }
            }))
          }} className="min-h-fit h-fit py-2" type="solid">Unstake</Button>
        </div>
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
            return (
              <TableRow key={item?.name}>
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