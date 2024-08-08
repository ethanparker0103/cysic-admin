import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import VerifierDetail from "@/routes/pages/Dashboard/My/Detail";
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

  const verifierPoints = BigNumber(userInfo?.verifier_points || 0).toString() 
  const provePoints = BigNumber(userInfo?.provider_points || 0).toString()
  const totalPoints = BigNumber(verifierPoints).plus(provePoints).toString()


  const verifierTask = BigNumber(userInfo?.verifier_task_cnt || 0).toString() 
  const proveTask = BigNumber(userInfo?.provider_task_cnt || 0).toString()
  const totalTask = BigNumber(verifierTask).plus(proveTask).toString()

  const averageCompletion = BigNumber(userInfo?.avg_task_completion || 0).toString() 
  const averageRewards = BigNumber(userInfo?.avg_point || 0).toString() 
  return (
    <div className={isMobile ? "flex flex-col gap-3" :  "flex items-center gap-3"}>
      <MainCard>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-lg">
            <span className="font-[400]">Total Points</span>
            <span className="font-[600]">{format(totalPoints)}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
                <span className="text-[#A3A3A3] text-sm font-[400]">Verifier</span>
                <div className="text-[#fff] text-lg">{format(verifierPoints)}</div>
            </div>
            <div className="w-px h-8 bg-[#2B2B2B]" />
            <div className="flex flex-col gap-1">
                <span className="text-[#A3A3A3] text-sm font-[400]">Prover</span>
                <div className="text-[#fff] text-lg">{format(provePoints)}</div>
            </div>
          </div>
        </div>
      </MainCard>
      <MainCard>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-lg">
            <span className="font-[400]">My Task Completion</span>
            <span className="font-[600]">{format(totalTask)}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
                <span className="text-[#A3A3A3] text-sm font-[400]">Verifier</span>
                <div className="text-[#fff] text-lg">{format(verifierTask)}</div>
            </div>
            <div className="w-px h-8 bg-[#2B2B2B]" />
            <div className="flex flex-col gap-1">
                <span className="text-[#A3A3A3] text-sm font-[400]">Prover</span>
                <div className="text-[#fff] text-lg">{format(proveTask)}</div>
            </div>
          </div>
        </div>
      </MainCard>
      <MainCard>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-lg">
            <span className="font-[400]">Overview</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
                <span className="text-[#A3A3A3] text-sm font-[400]">Average Completion</span>
                <div className="text-[#fff] text-lg">{format(averageCompletion)}</div>
            </div>
            <div className="w-px h-8 bg-[#2B2B2B]" />
            <div className="flex flex-col gap-1">
                <span className="text-[#A3A3A3] text-sm font-[400]">Average Rewards</span>
                <div className="text-[#fff] text-lg">{format(averageRewards)}</div>
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
          <VerifierDetail />
        </div>
      </div>
    </MainContainer>
  );
};

export default Task;
