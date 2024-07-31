import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import { getImageUrl } from "@/utils/tools";
import { useRequest } from "ahooks";
import axios from "axios";
import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import Chart from "@/routes/pages/Dashboard/components/chart";
import dayjs from "dayjs";
import TaskTable from "@/routes/pages/Dashboard/Task/table";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import clsx from "clsx";
import BigNumber from "bignumber.js";


const fmt = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0
}

BigNumber.config({ FORMAT: fmt })

const removeNegativeZero = (str: string)=>{
  return str?.split('.')?.[0]
}

const format = (value: string|number, defaultValue = undefined)=>{
  if(!value) return defaultValue
  return removeNegativeZero(BigNumber(value).toFormat())
}


const Hero = (props?: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_176_4165)">
      <mask
        id="mask0_176_4165"
        // style="mask-type :luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M24 0H0V24H24V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_176_4165)">
        <path
          d="M15.375 4.96875C15.375 6.83271 13.864 8.34375 12 8.34375C10.136 8.34375 8.625 6.83271 8.625 4.96875C8.625 3.10479 10.136 1.59375 12 1.59375C13.864 1.59375 15.375 3.10479 15.375 4.96875Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M19.0312 15.375C17.1674 15.375 15.6562 13.864 15.6562 12C15.6562 10.136 17.1674 8.625 19.0312 8.625C20.8951 8.625 22.4062 10.136 22.4062 12C22.4062 13.864 20.8951 15.375 19.0312 15.375Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M15.375 19.0312C15.375 20.8951 13.864 22.4062 12 22.4062C10.136 22.4062 8.625 20.8951 8.625 19.0312C8.625 17.1674 10.136 15.6562 12 15.6562C13.864 15.6562 15.375 17.1674 15.375 19.0312Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M4.96875 15.375C3.10479 15.375 1.59375 13.864 1.59375 12C1.59375 10.136 3.10479 8.625 4.96875 8.625C6.83271 8.625 8.34375 10.136 8.34375 12C8.34375 13.864 6.83271 15.375 4.96875 15.375Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_176_4165">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const getKey = (key, t) => {
  switch (key) {
    case "project_num":
      return "Project";
    case "provider_num":
      return "Prover";
    case "verifier_num":
      return "Verifier";
    case "project_num":
      return "Project";
    case "total_task":
      return "taskCount";
    case "running_task":
      return "taskInProgress";
    case "total_reward":
      return "totalPoints";
    default:
      return key;
  }
};

const MainCard = (props: any) => {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        isMobile ? "w-full px-5 py-4" : "h-[144px] flex-1 p-7",
        " flex flex-col gap-3 rounded-[24px] border border-[#192E33] shadow-[0px_4px_0px_0px_#000000]"
      )}
      style={{
        backgroundColor: "#10141a",
        // background: `url('/m/btn-bg.svg')`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "auto",
      }}
      {...props}
    >
      <div className="flex items-center gap-1 text-[#A3A3A3]">
        {/* <Hero className="size-4 text-[#A3A3A3]" /> */}
        <span className="text-[18px] text-[#fff]">
          {typeof props?.title == "string" ? t(props?.title) : props?.title}
        </span>
      </div>
      <div className="text-[24px] text-[#fff] font-bold">{props?.children}</div>
    </div>
  );
};

const mock1 = {
  msg: "success",
  code: 10000,
  data: {
    project_num: 0, // 项目方总数
    provider_num: 0, // 算力方总数
    verifier_num: 0, // 验证者总数
    total_task: 0, // 任务总数
    running_task: 0, // 正在执行任务数量
    total_reward: 0, // 任务总奖励金额(USDT)  最多6位小数
  },
};
const mock2 = {
  msg: "success",
  code: 10000,
  data: new Array(16)?.fill(1)?.map((i, index) => {
    return {
      // date: "2024-06-12", // 日期
      date: dayjs().subtract(index, "day").format("YYYY-MM-DD"),
      new_task_cnt: Math.floor(Math.random() * 100 + 1), // 新建任务数量
      finish_task_cnt: Math.floor(Math.random() * 100 + 1), // 完成任务数量
    };
  }),
};
const Dashboard = () => {
  const { t } = useTranslation();
  const { data: overviewData } = useRequest(() => {
    // return mock1;
    return axios.get("/api/v1/dashboard/overview");
  });
  const { data: dailyTaskSummaryData } = useRequest(() => {
    // return mock2;
    return axios.get("/api/v1/dashboard/dailyTaskSummary");
  });

  const overview: any = overviewData?.data || mock1?.data;
  const overview1: any = {
    project_num: format(overviewData?.data?.project_num),
    provider_num: format(overviewData?.data?.provider_num),
    // verifier_num: overviewData?.data?.verifier_num ? `${overviewData?.data?.approved_verifier_num} / ${overviewData?.data?.verifier_num}` : undefined,

    verifier_num: {
      Running: format(overviewData?.data?.approved_verifier_num),
      Applied: format(overviewData?.data?.verifier_num),
    },

    // approved_project_num: overviewData?.data?.approved_project_num,
    // approved_provider_num: overviewData?.data?.approved_provider_num,
    // approved_verifier_num: overviewData?.data?.approved_verifier_num,
  };
  const overview2: any = {
    total_task: format(overviewData?.data?.total_task),
    running_task: format(overviewData?.data?.running_task),
    total_reward: overviewData?.data?.total_reward ? <div className="flex items-baseline gap-1"><span>{format(overviewData?.data?.total_reward)}</span> <span className="text-sm font-[500] text-[#A3A3A3]">{t('Points')}</span></div> : undefined,
  };

  // const tabs = [
  //     {
  //         name: "Project",
  //         cmp: () => <ProjectTable />,
  //     },
  //     {
  //         name: "Prover",
  //         cmp: () => <ComputilityTable />,
  //     },
  //     {
  //         name: "Verifier",
  //         cmp: () => <VerifierTable />,
  //     },
  // ];

  const tabs = [
    {
      name: "all",
      cmp: () => (
        <TaskTable
          key="all"
          status={0}
          classNames={{ wrapper: "!border-0 !p-0" }}
        />
      ),
    },
    {
      name: "inProgress",
      cmp: () => (
        <TaskTable
          key="inProgress"
          status={1}
          classNames={{ wrapper: "!border-0 !p-0" }}
        />
      ),
    },
    {
      name: "finished",
      cmp: () => (
        <TaskTable
          key="finished"
          status={2}
          classNames={{ wrapper: "!border-0 !p-0" }}
        />
      ),
    },
  ];

  const hasData = !!dailyTaskSummaryData?.data?.length;
  const chartData = hasData ? dailyTaskSummaryData?.data : mock2?.data;

  const [activeTab, setActiveTab] = useState<any>(tabs?.[0]?.name);

  return (
    <MainContainer title="Dashboard">
      <>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            {Object.entries(overview1)?.map(([key, value]: any, index) => {
              return (
                <MainCard key={index} title={getKey(key, t)}>
                  {typeof value == "string"
                    ? value
                    : <div className="flex items-center gap-8">
                      {
                        Object.entries(value || {})?.map(([key, value]: any, index) => {
                          return (
                            <div className={clsx("flex flex-col gap-1", index != 0 ? 'pl-8 border-l border-solid border-[#2B2B2B]' : '')} key={index}>
                              <span className="font-[500] text-sm text-[#A3A3A3]">{t(key)}</span>
                              <span className="text-[24px] text-[#fff]">{value}</span>
                            </div>
                          );
                        })
                      }
                      </div>}
                </MainCard>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 flex-wrap">
            {Object.entries(overview2)?.map(([key, value]: any, index) => {
              return (
                <MainCard key={index} title={getKey(key, t)}>
                  {value}
                </MainCard>
              );
            })}
          </div>
        </div>

        {/* chart */}
        <div className="bg-[#0000000A] flex flex-col gap-8 p-8 border border-[#FFFFFF33] rounded-[24px] shadow-[0px_4px_0px_0px_#000000]">
          <div className="flex items-center gap-2">
            <img
              className="size-6"
              src={getImageUrl("@/assets/images/dashboard/analytics.svg")}
            />
            <span className="text-[20px] font-semibold">
              {t("taskAnalytics")}
            </span>
          </div>

          <div className="h-[280px]">
            <Chart row={chartData} hasData={hasData} />
          </div>
        </div>

        {/* snapshot */}
        <div
          className={clsx(
            isMobile ? "py-6 px-4 gap-4" : "p-8 gap-6",
            "flex flex-col border border-[#FFFFFF33] rounded-[24px] shadow-[0px_4px_0px_0px_#000000]"
          )}
        >
          <Tabs
            classNames={{
              tab: "group-data-[selected=true]:border-none",
              cursor: "!bg-[transparent]",
              tabContent:
                "group-data-[selected=true]:text-[#fff] group-data-[selected=true]:font-semibold",
            }}
            variant={"light"}
            aria-label="snapshot"
            onSelectionChange={setActiveTab}
            selectedKey={activeTab}
          >
            {tabs.map((item) => (
              <Tab key={item.name} title={t(item.name)} />
            ))}
          </Tabs>

          {tabs?.find((i) => i.name == activeTab)?.cmp()}
        </div>
      </>
    </MainContainer>
  );
};

export default Dashboard;
