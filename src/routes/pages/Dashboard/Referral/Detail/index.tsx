
import {
  Tabs, Tab
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import clsx from "clsx";
import UserTable from "@/routes/pages/Dashboard/Referral/Detail/table";

const mock = {
  msg: "success",
  code: 10000,
  data: {
    verifier: {
      // VerifierDetail
      ID: 1,
      CreatedAt: "2024-06-12T23:49:57.651305+08:00",
      UpdatedAt: "2024-06-12T23:49:57.651305+08:00",
      DeletedAt: null,
      name: "verifier0",
      domain: "http://www.verifier0.com",
      logo: "verifier0 logo",
      description: "verifier0, hdPath 60/3/0",
      verifier: "0xe780d4f127baecE34523e94AbC190E32B4AE4470",
      Status: 0,
    },
    taskList: [
      // 任务列表, 内容同6中的 taskList
      {
        ID: 1,
        CreatedAt: "2024-06-12T23:11:00.645143+08:00",
        UpdatedAt: "2024-06-13T00:07:00.484898+08:00",
        DeletedAt: null,
        project_worker: "0x0744eD18AF2559E404aEC794E227146708092284",
        task_hash: "some_valid_hash",
        prover_input_data: "dGVzdDEyMw==",
        reward_id: 1,
        latency: 10,
        proof_type: 1,
        task_status: 2,
        provider_ids: "1001,1002,1003", // 执行任务的Prover链上ID
        Reason: "",
        provider_id: 1003, // 验证的Prover链上ID
        prover: "0xe780d4f127baecE34523e94AbC190E32B4AE4470", // 验证的Proverprover 地址
        verifier_id: 2001, // Verifier链上ID
        verifier: "0xe780d4f127baecE34523e94AbC190E32B4AE4470", // Verifier地址
        verifier_pass: false, // Result  true: 验证通过, false:验证不通过
        commit_at: "0001-01-01T00:00:00Z", // Verifier Result提交时间, 只有时间不是0001-01-01的时候才有Verifier Result
      },
    ],
  },
};


const tabs = [
  {
    name: "Invited Users",
    cmp: () => (
      <UserTable
        key="userTable"
      // classNames={{ wrapper: "!border-0 !p-0" }}
      />
    ),
  },
];

const Detail = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<any>(tabs?.[0]?.name);
  return (
    <>
      {/* <MainContainer noRoute title="My Task List"> */}
      <div className="flex flex-col gap-6 shadow-[0px_4px_0px_0px_#000000] p-4 rounded-2xl border-[#FFFFFF33] border">
        <div className="flex items-center gap-4">
          {/* <div className="text-lg font-[600]">My Task List</div> */}

          <div className="flex items-center justify-between w-full">
            <Tabs
              classNames={{
                tabList: '!p-0',
                tab: "group-data-[selected=true]:border-none",
                cursor: "!bg-[transparent]",
                tabContent:
                  "group-data-[selected=true]:text-[#fff] group-data-[selected=true]:font-semibold text-lg",
              }}
              variant={"light"}
              aria-label="snapshot"
              onSelectionChange={(tab) => {
                const disabled = tabs?.find(i => i.name === tab)?.disabled
                if (disabled) return;
                setActiveTab(tab)
              }}
              selectedKey={activeTab}
            >
              {tabs.map((item) => (

                <Tab key={item.name} className={clsx(item?.disabled ? 'cursor-not-allowed' : '')} disabled={item?.disabled} title={t(item.name)} />
              ))}
            </Tabs>
            <div className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1366_4958)">
                  <path d="M7.81572 2.33627C9.1312 2.29332 10.4206 2.70962 11.4626 3.51371C12.5046 4.3178 13.2342 5.45953 13.5261 6.74291C13.8181 8.02629 13.6542 9.37128 13.0626 10.547C12.9385 10.7937 13.0378 11.0943 13.2845 11.2184C13.5312 11.3425 13.8318 11.2432 13.9559 10.9965C14.6519 9.61329 14.8447 8.03095 14.5012 6.52109C14.1577 5.01122 13.2994 3.66801 12.0735 2.72202C10.8476 1.77604 9.3307 1.28627 7.78309 1.33681C6.23548 1.38734 4.75372 1.97501 3.59217 2.99896C2.43062 4.0229 1.66172 5.41924 1.41746 6.9483C1.17321 8.47735 1.46883 10.0437 2.25358 11.3786C3.03833 12.7134 4.26326 13.7335 5.71811 14.2637C7.17297 14.7938 8.76699 14.801 10.2266 14.284C10.4869 14.1918 10.6231 13.906 10.5309 13.6458C10.4387 13.3855 10.153 13.2492 9.89268 13.3414C8.65204 13.7808 7.29712 13.7747 6.06049 13.3241C4.82387 12.8735 3.78268 12.0064 3.11564 10.8718C2.4486 9.73717 2.19732 8.40574 2.40494 7.10604C2.61256 5.80634 3.26612 4.61945 4.25344 3.7491C5.24076 2.87875 6.50025 2.37923 7.81572 2.33627Z" fill="#A3A3A3" />
                  <path d="M8.50065 5.16658C8.50065 4.89044 8.27679 4.66658 8.00065 4.66658C7.72451 4.66658 7.50065 4.89044 7.50065 5.16658V7.79281L5.31376 9.9797C5.1185 10.175 5.1185 10.4915 5.31376 10.6868C5.50903 10.8821 5.82561 10.8821 6.02087 10.6868L8.3542 8.35347C8.44797 8.2597 8.50065 8.13253 8.50065 7.99992V5.16658Z" fill="#A3A3A3" />
                </g>
                <defs>
                  <clipPath id="clip0_1366_4958">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span>Daily update at 2PM UTC</span>
            </div>
          </div>
        </div>

        {tabs?.find((i) => i.name == activeTab)?.cmp?.()}
      </div>
      {/* </MainContainer> */}
    </>
  );
};

export default Detail;
