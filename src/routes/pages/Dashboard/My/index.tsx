import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import Detail from "@/routes/pages/Dashboard/My/Detail";

import { useRequest } from "ahooks";
import axios from "axios";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";

const removeNegativeZero = (str: string) => {
  return str?.split(".")?.[0];
};

const format = (value: string | number, defaultValue = undefined) => {
  if (!value) return defaultValue;
  return removeNegativeZero(BigNumber(value).toFormat());
};

const MainCard = (props: any) => {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        isMobile ? "w-full px-5 py-4" : "min-h-[152px] flex-1 px-6 py-6",
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

// {
//     "avg_point": "255",
//     "avg_task_completion": "2",
//     "provider_points": "0",
//     "provider_task_cnt": 0,
//     "verifier_points": "0",
//     "verifier_task_cnt": 0
// }
const Overview = () => {
  const { address } = useAccount();
  // const address = '0x098acAbdfC81EDc954388022AF2284aFAacFd526'
  const [userInfo, setUserInfo] = useState<any>({});

  useRequest(
    async () => {
      if (!address) return;
      const res = await axios(`/api/v1/myPage/${address}/overview`);
      return res;
    },
    {
      ready: !!address,
      refreshDeps: [address],
      onSuccess(e) {
        console.log("eee", e?.data);
        setUserInfo(e?.data);
      },
    }
  );


  const verifier_points_activity = BigNumber(userInfo?.verifier_points_activity || 0).toString()
  const verifier_points_verification = BigNumber(userInfo?.verifier_points_verification || 0).toString()
  const verifierPoints = BigNumber(verifier_points_activity || 0).plus(verifier_points_verification || 0).toString()
  const provePoints = BigNumber(userInfo?.provider_points || 0).toString()
  const totalPoints = BigNumber(verifierPoints).plus(provePoints).toString()


  const verifierTask = BigNumber(userInfo?.verifier_task_cnt || 0).toString()
  const proveTask = BigNumber(userInfo?.provider_task_cnt || 0).toString()
  const totalTask = BigNumber(verifierTask).plus(proveTask).toString()

  const avg_point_verification = BigNumber(userInfo?.avg_point_verification || 0).toString()
  const avg_point_activity = BigNumber(userInfo?.avg_point_activity || 0).toString()

  const avg_task_completion = BigNumber(userInfo?.avg_task_completion || 0).toString()
  return (
    <div className={isMobile ? "flex flex-col gap-3" : "flex items-center gap-3"}>
      <MainCard>
        <div className="flex flex-col gap-6 min-h-[250px]">
          <div className="flex flex-col gap-1 text-lg">
            <span className="font-[400]">Total Points</span>
            <span className="font-[600] text-[#00F0FF] text-[40px]">{format(totalPoints)}</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 bg-[#FFFFFF0D] p-3 rounded-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-[#fff] text-base font-[500]">Prover</span>
                <div className="text-[#fff] text-base font-[500]">{format(provePoints)}</div>
              </div>

            </div>
            <div className="flex flex-col gap-1 bg-[#FFFFFF0D] p-3 rounded-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-[#fff] text-base font-[500]">Verifier</span>
                <div className="text-[#fff] text-base font-[500]">{format(verifierPoints)}</div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#A3A3A3] text-sm font-[500]">Verification</span>
                <div className="text-[#A3A3A3] text-sm font-[500]">{format(verifier_points_verification)}</div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#A3A3A3] text-sm font-[500]">Activity</span>
                <div className="text-[#A3A3A3] text-sm font-[500]">{format(verifier_points_activity)}</div>
              </div>

            </div>
          </div>
        </div>
      </MainCard>
      <MainCard>
        <div className="flex flex-col gap-6 min-h-[250px]">
          <div className="flex flex-col gap-1 text-lg">
            <span className="font-[400]">My Task Completion</span>
            <span className="font-[600] text-[#00F0FF] text-[40px]">{format(totalTask)}</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 bg-[#FFFFFF0D] px-3 py-6 rounded-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-[#fff] text-base font-[500]">Prover</span>
                <div className="text-[#fff] text-base font-[500]">{format(proveTask)}</div>
              </div>
            </div>
            <div className="flex flex-col gap-1 bg-[#FFFFFF0D] px-3 py-6 rounded-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-[#fff] text-base font-[500]">Verifier</span>
                <div className="text-[#fff] text-base font-[500]">{format(verifierTask)}</div>
              </div>
            </div>
          </div>
        </div>
      </MainCard>
      <MainCard>
        <div className="flex flex-col gap-4 min-h-[250px]">
          <div className="flex items-center gap-2 text-lg">
            <span className="font-[400]">Overview</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 bg-[#FFFFFF0D] p-3 rounded-[12px]">
              <div className="text-base font-[500]">Average Completion Verifier</div>
              <div className="flex items-center justify-between">
                <span className="text-[#A3A3A3] text-sm font-[500]">Verification</span>
                <div className="text-[#fff] text-sm font-[500]">{format(avg_task_completion)}</div>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-[#FFFFFF0D] p-3 rounded-[12px]">
              <div className="text-base font-[500]">Average Rewards Verifier</div>
              <div className="flex items-center justify-between">
                <span className="text-[#A3A3A3] text-sm font-[500]">Verification</span>
                <div className="text-[#fff] text-sm font-[500]">{format(avg_point_verification)}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A3A3A3] text-sm font-[500]">Activity</span>
                <div className="text-[#fff] text-sm font-[500]">{format(avg_point_activity)}</div>
              </div>
            </div>
          </div>
        </div>
      </MainCard>
    </div>
  );
};

const Task = () => {
  return (
    <MainContainer title="My Page">
      <div className="flex flex-col gap-8">
        <Overview />
        <div
          className={clsx(
            isMobile ? "" : "",
            "shadow-[0px_4px_0px_0px_#000000] border-[#000] border rounded-[14px]"
          )}
        >
          {/* only verifier so far */}
          <Detail />
        </div>
      </div>
    </MainContainer>
  );
};

export default Task;
