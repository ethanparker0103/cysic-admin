import Image from "@/components/Image";
import Pagination from "@/components/Pagination";
import { commonPageSize, TaskStatus } from "@/config";
import usePagnation from "@/hooks/usePagnation";
import { shortStr, getImageUrl } from "@/utils/tools";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react"
import axios from "axios";
import copy from "copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import toast from "react-simple-toasts";
import useAccount from "@/hooks/useAccount";


const VerifierTable = () => {
  const { t } = useTranslation();
  const { address } = useAccount()
  // const address = "0x098acAbdfC81EDc954388022AF2284aFAacFd526";

  const {
    data: taskList,
    totalPage,
    currentPage,
    setCurrentPage,
  } = usePagnation(
    (page: number) => {
      // return Promise.resolve(mock);

      return axios.get(`/api/v1/verifier/taskList/byAddr/${address}`, {
        params: {
          pageNum: page,
          pageSize: commonPageSize,
        },
      });
    },
    {
      ready: !!address,
      refreshDeps: [address],
    }
  );

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
    //   {
    //     key: "task_type",
    //     label: "taskType",
    //   },
    {
      key: "reward_amount",
      label: "Reward",
    },
    {
      key: "task_status",
      label: "Result",
    },
    {
      key: "action",
      label: "Detail",
    },
  ];

  const renderCell = (item: any, columnKey: any) => {
    switch (columnKey) {
      case "task_hash":
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
      case "task_type":
        return t("Verifier");
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
        const addrs = getKeyValue(item, "prover_addr_list")?.split(",");
        const ids = getKeyValue(item, columnKey)?.split(",");
        return (
          <div className="flex items-center gap-2">
            {ids?.map((i, index) => (
              <div className="flex items-center gap-1" key={index}>
                <Link to={`/dashboard/provider/${i}`}>
                  <span className="underline">
                    {shortStr(addrs[index], 12)}
                  </span>
                </Link>
                <svg
                  onClick={() => {
                    copy(addrs[index]);
                    toast("Copied");
                  }}
                  className="cursor-pointer"
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
          {(item) => (
            <TableRow key={item?.ID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
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