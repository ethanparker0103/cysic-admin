
import {
  Tabs, Tab
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import VerifierTable from "@/routes/pages/Dashboard/Leadingboard/Detail/verifier";
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
    name: "Exchange",
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
  // const { address } = useAccount()

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
          </div>
        </div>

        {tabs?.find((i) => i.name == activeTab)?.cmp?.()}
      </div>
      {/* </MainContainer> */}
    </>
  );
};

export default Detail;
