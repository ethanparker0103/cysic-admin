import MainCard from "@/components/MainCard";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import Assets from "@/routes/pages/Dashboard/My/components/assets";
import Detail from "@/routes/pages/Dashboard/My/Detail";
import AssetsDetail from "@/routes/pages/Dashboard/My/components/assets/Detail";
import { Tab, Tabs } from "@nextui-org/react";

import { useRequest } from "ahooks";
import axios from "axios";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

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
  // const { address } = useAccount();
  // const address = '0x098acAbdfC81EDc954388022AF2284aFAacFd526'
  // const [userInfo, setUserInfo] = useState<any>({});


  // const verifier_points_activity = BigNumber(userInfo?.verifier_points_activity || 0).toString()
  // const verifier_points_verification = BigNumber(userInfo?.verifier_points_verification || 0).toString()
  // const verifierPoints = BigNumber(verifier_points_activity || 0).plus(verifier_points_verification || 0).toString()
  // const provePoints = BigNumber(userInfo?.provider_points || 0).toString()
  // const totalPoints = BigNumber(verifierPoints).plus(provePoints).toString()


  // const verifierTask = BigNumber(userInfo?.verifier_task_cnt || 0).toString()
  // const proveTask = BigNumber(userInfo?.provider_task_cnt || 0).toString()
  // const totalTask = BigNumber(verifierTask).plus(proveTask).toString()

  // const avg_point_verification = BigNumber(userInfo?.avg_point_verification || 0).toString()
  // const avg_point_activity = BigNumber(userInfo?.avg_point_activity || 0).toString()

  // const avg_task_completion = BigNumber(userInfo?.avg_task_completion || 0).toString()

  // const social_task_points = BigNumber(userInfo?.social_task_points || 0).toString()
  return (
    <div className={isMobile ? "flex flex-col gap-3" : "flex flex-col gap-3"}>

      <div className="flex flex-col gap-2">
        <Assets />
      </div>


      {/* <div className="flex items-stretch gap-3">
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
      </div> */}
    </div>
  );
};

const Task = () => {
  const navigate = useNavigate()

  return (
    <MainContainer title="My Page">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">

          <div className="self-end cursor-pointer flex items-center gap-1 text-[#A3A3A3] hover:text-[#00F0FF]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="11" height="11" rx="2.5" stroke="currentColor" />
              <path d="M5.37229 2.77189C5.62905 2.25162 6.37095 2.25162 6.62772 2.77189L7.15965 3.8497C7.26161 4.0563 7.45871 4.1995 7.6867 4.23263L8.87614 4.40547C9.4503 4.4889 9.67955 5.19448 9.26409 5.59945L8.40341 6.43841C8.23843 6.59923 8.16314 6.83093 8.20209 7.058L8.40527 8.24263C8.50335 8.81447 7.90314 9.25054 7.3896 8.98056L6.32574 8.42125C6.12181 8.31404 5.87819 8.31404 5.67426 8.42125L4.6104 8.98056C4.09686 9.25054 3.49665 8.81447 3.59473 8.24263L3.79791 7.058C3.83686 6.83093 3.76157 6.59923 3.59659 6.43841L2.73591 5.59945C2.32045 5.19448 2.54971 4.4889 3.12386 4.40547L4.3133 4.23263C4.54129 4.1995 4.73839 4.0563 4.84035 3.8497L5.37229 2.77189Z" fill="currentColor" />
            </svg>

            <span onClick={()=>{
              navigate('/dashboard/my/phase1')
            }}>Check Phase 1</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.5593 12.0741C11.9275 12.0741 12.226 11.7756 12.226 11.4074L12.2257 4.80756C12.2257 4.44198 11.9313 4.14461 11.5658 4.14095L4.8993 4.0741C4.53113 4.0704 4.22968 4.36587 4.22598 4.73404C4.22229 5.10221 4.51776 5.40367 4.88593 5.40736L9.96555 5.4583L4.01663 11.4072C3.75628 11.6676 3.75628 12.0897 4.01663 12.35C4.27698 12.6104 4.69909 12.6104 4.95944 12.35L10.8925 6.417L10.8926 11.4074C10.8926 11.7756 11.1911 12.0741 11.5593 12.0741Z" fill="currentColor" />
            </svg>

          </div>

          <Overview />
        </div>


        <AssetsDetail />
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
