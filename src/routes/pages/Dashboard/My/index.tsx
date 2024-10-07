import MainCard from "@/components/MainCard";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import Detail from "@/routes/pages/Dashboard/My/Detail";
import { Tab, Tabs } from "@nextui-org/react";

import { useRequest } from "ahooks";
import axios from "axios";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { useAccount } from "wagmi";

const removeNegativeZero = (str: string) => {
  return str?.split(".")?.[0];
};

const format = (value: string | number, defaultValue = undefined) => {
  if (!value) return defaultValue;
  return removeNegativeZero(BigNumber(value).toFormat());
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

  const social_task_points = BigNumber(userInfo?.social_task_points||0).toString()
  return (
    <div className={isMobile ? "flex flex-col gap-3" : "flex flex-col gap-3"}>
      <MainCard>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4">
            <Tabs key='light' variant='light' aria-label="phase" classNames={{
              base: 'w-full',
              tabList: '!p-0 text-[#A3A3A3] w-full',
              tab: 'bg-[#FFFFFF1F] py-2 h-fit',
              cursor: 'bg-gradient',
              tabContent: "group-data-[selected=true]:text-[#000]"
            }}>
              <Tab key="Phase1" title={<div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="18" height="18" rx="4" stroke="currentColor" stroke-width="2" />
                  <path d="M9.10326 5.31699C9.47008 4.57374 10.5299 4.57374 10.8967 5.31699L11.6776 6.89925C11.8233 7.1944 12.1049 7.39897 12.4306 7.44629L14.1767 7.70002C14.9969 7.81921 15.3244 8.82718 14.7309 9.40572L13.4674 10.6373C13.2317 10.8671 13.1242 11.1981 13.1798 11.5225L13.4781 13.2615C13.6182 14.0785 12.7608 14.7014 12.0271 14.3157L10.4653 13.4946C10.174 13.3415 9.82598 13.3415 9.53466 13.4946L7.97287 14.3157C7.23924 14.7014 6.38181 14.0785 6.52192 13.2615L6.82019 11.5225C6.87583 11.1981 6.76828 10.8671 6.5326 10.6373L5.26908 9.40571C4.67556 8.82718 5.00308 7.81921 5.8233 7.70002L7.56943 7.44629C7.89514 7.39897 8.17671 7.1944 8.32237 6.89925L9.10326 5.31699Z" fill="currentColor" />
                </svg>

                <span className="text-lg font-[500]">Phase 1</span></div>} />
              <Tab key="Phase2" title={<div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="18" height="18" rx="4" stroke="currentColor" stroke-width="2" />
                  <path d="M9.10326 5.31699C9.47008 4.57374 10.5299 4.57374 10.8967 5.31699L11.6776 6.89925C11.8233 7.1944 12.1049 7.39897 12.4306 7.44629L14.1767 7.70002C14.9969 7.81921 15.3244 8.82718 14.7309 9.40572L13.4674 10.6373C13.2317 10.8671 13.1242 11.1981 13.1798 11.5225L13.4781 13.2615C13.6182 14.0785 12.7608 14.7014 12.0271 14.3157L10.4653 13.4946C10.174 13.3415 9.82598 13.3415 9.53466 13.4946L7.97287 14.3157C7.23924 14.7014 6.38181 14.0785 6.52192 13.2615L6.82019 11.5225C6.87583 11.1981 6.76828 10.8671 6.5326 10.6373L5.26908 9.40571C4.67556 8.82718 5.00308 7.81921 5.8233 7.70002L7.56943 7.44629C7.89514 7.39897 8.17671 7.1944 8.32237 6.89925L9.10326 5.31699Z" fill="currentColor" />
                </svg>

                <span className="text-lg font-[500]">Phase 2</span></div>} />
            </Tabs>
          </div>
          <div className="flex flex-col gap-1 text-lg">
            <span className="font-[400]">Total Points</span>
            <span className="font-[600] text-[#00F0FF] text-[40px]">{format(totalPoints)}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-[#A3A3A3] text-base font-[500]">Activity Points</span>
              <div className="text-[#fff] text-base font-[500]">{format(verifier_points_verification)}</div>
            </div>

            <div className="flex flex-col">
              <span className="text-[#A3A3A3] text-base font-[500]">Verifier Points</span>
              <div className="text-[#fff] text-base font-[500]">{format(verifierPoints)}</div>
            </div>
            <div className="flex flex-col">
              <span className="text-[#A3A3A3] text-base font-[500]">Prover Points</span>
              <div className="text-[#fff] text-base font-[500]">{format(provePoints)}</div>
            </div>
            <div className="flex flex-col">
              <span className="text-[#A3A3A3] text-base font-[500]">Reward points</span>
              <div className="text-[#fff] text-base font-[500]">{format(verifier_points_verification)}</div>
            </div>

            <div className="flex flex-col gap-1 bg-[#FFFFFF0D] p-3 rounded-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-[#fff] text-base font-[500]">Social Task</span>
                <div className="text-[#fff] text-base font-[500]">{format(social_task_points)}</div>
              </div>

            </div>
            
          </div>
        </div>
      </MainCard>

      <div className="flex items-center gap-3">
        <MainCard>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 text-lg">
              <span className="font-[400]">My Task Completion</span>
              <span className="font-[600] text-[#00F0FF] text-[40px]">{format(totalTask)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#A3A3A3] text-base font-[500]">Prover</span>
                  <div className="text-[#fff] text-base font-[500]">{format(proveTask)}</div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#A3A3A3] text-base font-[500]">Verifier</span>
                  <div className="text-[#fff] text-base font-[500]">{format(verifierTask)}</div>
                </div>
              </div>
            </div>
          </div>
        </MainCard>
        <MainCard>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-lg">
              <span className="font-[400]">Overview</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 flex flex-col gap-2 bg-[#FFFFFF0D] p-3 rounded-[12px]">
                <div className="text-base font-[500]">Average Completion Verifier</div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A3A3A3] text-sm font-[500]">Verification</span>
                  <div className="text-[#fff] text-sm font-[500]">{format(avg_task_completion)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A3A3A3] text-sm font-[500]">Activity</span>
                  <div className="text-[#fff] text-sm font-[500]">{format(avg_point_activity)}</div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2 bg-[#FFFFFF0D] p-3 rounded-[12px]">
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
