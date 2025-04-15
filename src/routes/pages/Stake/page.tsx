import Button, { BtnType } from "@/components/Button";
import { getImageUrl, handleStakeModal, handleUnstakeModal } from "@/utils/tools";
import { Search, History } from "lucide-react";
import { useState } from "react";
import GradientBorderCard from "@/components/gradientBorderCard";
import CysicTable, { CysicTableColumn } from "@/components/Table";

const validators = [
  {
    id: "tierSync",
    abbr: "TS",
    name: "TierSync",
    color: "bg-blue-500",
    votingPower: "2345.93",
    votingPercentage: "9.87",
    commissionRate: "10.31",
  },
  {
    id: "pxerSync",
    abbr: "PX",
    name: "PXerSync",
    color: "bg-purple-500",
    votingPower: "2345.93",
    votingPercentage: "9.87",
    commissionRate: "10.31",
  },
];

const hasStaked = true;
const StakePage = () => {
  const [stakeAmount, setStakeAmount] = useState(hasStaked ? "1,234.56" : "0");
  const [unstakeAmount, setUnstakeAmount] = useState(hasStaked ? "100.45" : "0");
  const [apr, setApr] = useState(hasStaked ? "30.99" : "12.34");
  const [rewardsAmount, setRewardsAmount] = useState(hasStaked ? "9.00" : "0");
  
  // 定义验证者表格列
  const myValidatorsColumns: CysicTableColumn<typeof validators[0]>[] = [
    {
      key: "validator",
      label: "Validator",
      renderCell: (validator) => (
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${validator.color} flex items-center justify-center text-white`}>
            {validator.abbr}
          </div>
          <span>{validator.name}</span>
        </div>
      )
    },
    {
      key: "myStakes",
      label: "My Stakes",
      renderCell: (validator) => <>{validator.votingPower} <span className='text-sm text-sub'>CYS</span></>
    },
    {
      key: "votingPower",
      label: "Voting Power",
      renderCell: (validator) => (
        <div>
          <div>{validator.votingPower} <span className="text-sm text-sub">CYS</span></div>
          <div className="text-sm text-sub">{validator.votingPercentage}%</div>
        </div>
      )
    },
    {
      key: "commissionRate",
      label: "Commission Rate",
      renderCell: () => "10%"
    },
    {
      key: "expectedAPR",
      label: "Expected APR",
      renderCell: (validator) => <span className="text-sub">{validator.commissionRate}%</span>
    },
    {
      key: "action",
      label: "Action",
      renderCell: () => (
        <div className="flex gap-2">
          <Button
            onClick={handleStakeModal}
            type={BtnType.light}
            className="rounded-lg w-[6.5rem] py-3 text-sm"
          >
            STAKE
          </Button>
          <Button
            onClick={handleUnstakeModal}
            type={BtnType.solid}
            className="rounded-lg w-[6.5rem] py-3 text-sm"
          >
            UNSTAKE
          </Button>
        </div>
      )
    }
  ];

  // 活跃验证者表格列
  const activeValidatorsColumns: CysicTableColumn<typeof validators[0]>[] = [
    {
      key: "validator",
      label: "Validator",
      renderCell: (validator) => (
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${validator.color} flex items-center justify-center text-white`}>
            {validator.abbr}
          </div>
          <span>{validator.name}</span>
        </div>
      )
    },
    {
      key: "votingPower",
      label: "Voting Power",
      renderCell: (validator) => (
        <div>
          <div>{validator.votingPower} <span className="text-sm text-sub">CYS</span></div>
          <div className="text-sm text-sub">{validator.votingPercentage}%</div>
        </div>
      )
    },
    {
      key: "commissionRate",
      label: "Commission Rate",
      renderCell: (validator) => <span className="text-sub">{validator.commissionRate}%</span>
    },
    {
      key: "action",
      label: "Action",
      renderCell: () => (
        <Button
          onClick={handleStakeModal}
          type={BtnType.light}
          className="rounded-lg px-6 py-3 w-full text-base"
        >
          STAKE
        </Button>
      )
    }
  ];

  return (
    <div className="min-h-screen w-full pb-12 overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={getImageUrl('@/assets/images/_global/stake_landing_bg.png')}
          alt="Background"
          className="absolute top-1/2 left-1/2 w-full h-full object-cover"
          style={{
            filter: 'grayscale(0%)',
            transform: 'translate(-50%, -50%) scale(1)',
            transformOrigin: 'center 0%',
            objectPosition: '50% 50%'
          }}
        />
      </div>

      {/* 主标题 */}
      <div className="pt-12 flex flex-col items-center gap-6 relative z-[2]">
        <div className="flex flex-col items-center">
          <span className="title text-[4rem] !text-[#fff] text-center">STAKE CGTS</span>
        </div>
      </div>

      {/* 主要内容部分 */}
      <div className="container mx-auto px-4 md:px-8 mt-8 relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧 - 质押信息 */}
          <GradientBorderCard
            className="lg:col-span-3"
            borderRadius={8}
          >
            <div className="w-full py-4 px-6 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h2 className="title text-xl uppercase !font-[300]">STAKE CGTS</h2>
                <Button
                  onClick={handleStakeModal}
                  type={BtnType.light}
                  className="rounded-lg px-8 py-2 text-base"
                >
                  STAKE
                </Button>
              </div>

              <div className="grid grid-cols-3 ">
                <div className="col-span-1 border-r border-white pr-6">
                  <div className=" uppercase title text-base mb-2 !font-[300]">STAKING AMOUNT</div>
                  <div className="text-2xl text-right title !font-[400]">{stakeAmount} CGT</div>
                </div>
                <div className="col-span-1 border-r border-white px-6">
                  <div className=" uppercase title text-base mb-2 !font-[300]">UNSTAKING AMOUNT</div>
                  <div className="text-2xl text-right title !font-[400]">{unstakeAmount} CGT</div>
                </div>
                <div className="col-span-1 pl-4">
                  <div className=" uppercase title text-base mb-2 !font-[300]">APR</div>
                  <div className="text-2xl text-right title !font-[400]">{apr}%</div>
                </div>
              </div>
            </div>
          </GradientBorderCard>

          {/* 右侧 - 领取奖励 */}
          <GradientBorderCard
            borderRadius={8}
          >
            <div className="w-full py-4 px-6">
              <h2 className="title text-xl uppercase !font-[300] mb-4">CLAIM REWARDS</h2>
              <div className="text-2xl !font-[400] title mb-4 text-center text-right">{rewardsAmount} CYS</div>
              <Button
                type={BtnType.light}
                className="rounded-lg w-full py-3 text-base"
              >
                CLAIM ALL
              </Button>
            </div>
          </GradientBorderCard>
        </div>

        {/* 我的验证者 or 开始质押提示 */}
        {hasStaked ? (
          <GradientBorderCard
            className="mt-6"
            borderRadius={8}
          >
            <div className="w-full py-4 px-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="title text-xl uppercase">MY VALIDATORS</h2>
                <div className="flex items-center gap-2">
                  <History size={16} />
                  <span className="text-sm text-sub">Daily update at 2PM UTC</span>
                </div>
              </div>

              <CysicTable 
                data={validators} 
                columns={myValidatorsColumns}
                keyExtractor={(validator) => validator.id}
              />
            </div>
          </GradientBorderCard>
        ) : (
          <GradientBorderCard
            className="mt-6"
            borderRadius={8}
          >
            <div className="w-full py-4 px-6">
              <h2 className="title text-xl !font-[300] uppercase mb-2">YOUR VALIDATORS</h2>
              <div className="flex gap-2 items-start mb-3 ">
                <span className="text-yellow-400 text-lg">✨</span>
                <h3 className="text-xl !font-[400]">Wanna grow your assets? Start staking!</h3>
              </div>
              <p className="text-gray-300 text-sm !font-[400]">
                In Proof-of-Stake networks, staking your assets with validators is essential to earn voting power and securing the network. To start staking, first deposit or buy CYS to your address and click on Stake.
              </p>
            </div>
          </GradientBorderCard>
        )}

        {/* 活跃验证者表格 */}
        <GradientBorderCard
          className="mt-6"
          borderRadius={8}
        >
          <div className="w-full py-4 px-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="title text-xl uppercase !font-[300]">ACTIVE VALIDATORS</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="SEARCH VALIDATOR"
                  className="bg-black/50 border border-white/20 rounded-lg pl-4 pr-10 py-2 text-sm w-64 focus:outline-none focus:border-white/40"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60" size={16} />
              </div>
            </div>

            <CysicTable 
              data={validators} 
              columns={activeValidatorsColumns}
              keyExtractor={(validator) => validator.id}
            />
          </div>
        </GradientBorderCard>
      </div>
    </div>
  );
};

export default StakePage;