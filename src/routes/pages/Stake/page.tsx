import Button, { BtnType } from "@/components/Button";
import { getImageUrl, handleStakeModal, handleUnstakeModal } from "@/utils/tools";
import { Search, History } from "lucide-react";
import { useState } from "react";
import GradientBorderCard from "@/components/gradientBorderCard";
import CysicTable, { CysicTableColumn } from "@/components/Table";
import axios from "@/service";
import { useRequest } from "ahooks";

interface Validator {
  id: string;
  abbr: string;
  name: string;
  color: string;
  votingPower: string;
  votingPercentage: string;
  commissionRate: string;
}

interface ValidatorResponse {
  validatorName: string;
  stake?: {
    amount: string;
    symbol: string;
  };
  votingPower: {
    amount: string;
    symbol: string;
  };
  votingPowerPercent: string;
  commissionRate: string;
  apr?: string;
}

const StakePage = () => {
  const [stakeAmount, setStakeAmount] = useState("0");
  const [unstakeAmount, setUnstakeAmount] = useState("0");
  const [apr, setApr] = useState("0");
  const [rewardsAmount, setRewardsAmount] = useState("0");

  // 获取质押验证者列表
  const { data: stakeListData, loading: stakeLoading } = useRequest(
    () => axios.get('/api/v1/stake/list'),
    {
      onSuccess: (res) => {
        if (res?.data?.validatorList && res.data.validatorList.length > 0) {
          // 计算总质押金额和平均APR
          let totalStake = 0;
          let totalApr = 0;

          res.data.validatorList.forEach((validator: ValidatorResponse) => {
            if (validator.stake) {
              totalStake += parseFloat(validator.stake.amount);
            }
            if (validator.apr) {
              totalApr += parseFloat(validator.apr.replace('%', ''));
            }
          });

          // 设置状态
          setStakeAmount(totalStake.toLocaleString('en-US', { maximumFractionDigits: 2 }));
          setApr((totalApr / res.data.validatorList.length).toFixed(2));
        }
      }
    }
  );

  // 转换API数据为表格数据
  const transformValidators = (validatorList: ValidatorResponse[] = []): Validator[] => {
    return validatorList.map((v, index) => ({
      id: `validator-${index}`,
      abbr: v.validatorName.substring(0, 2).toUpperCase(),
      name: v.validatorName,
      color: index % 2 === 0 ? "bg-blue-500" : "bg-purple-500",
      votingPower: v.votingPower.amount,
      votingPercentage: v.votingPowerPercent.replace('%', ''),
      commissionRate: v.commissionRate.replace('%', '')
    }));
  };

  // 获取验证者数据
  const myValidators = stakeListData?.data?.validatorList
    ? transformValidators(stakeListData.data.validatorList)
    : [];

  // 获取活跃验证者列表
  const { data: activeListData, loading: activeLoading } = useRequest(
    () => axios.get('/api/v1/validator/activeList'),
    {
      onSuccess: (res) => {
        console.log('活跃验证者数据:', res?.data);
      }
    }
  );

  // 获取活跃验证者数据
  const activeValidators = activeListData?.data?.validatorList
    ? transformValidators(activeListData.data.validatorList)
    : [];

  // 判断用户是否已质押
  const hasStaked = myValidators.length > 0 && parseFloat(stakeAmount.replace(/,/g, '')) > 0;

  // 定义验证者表格列
  const myValidatorsColumns: CysicTableColumn<Validator>[] = [
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
      renderCell: (validator) => `${validator.commissionRate}%`
    },
    {
      key: "expectedAPR",
      label: "Expected APR",
      renderCell: () => <span className="text-sub">{apr}%</span>
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
  const activeValidatorsColumns: CysicTableColumn<Validator>[] = [
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
          className="h-screen absolute top-0 left-1/2 w-full object-cover"
          style={{
            filter: 'grayscale(0%)',
            transform: 'translate(-50%, 0%) scale(1)',
            transformOrigin: 'center ',
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

              {stakeLoading ? (
                <div className="text-center py-6">加载验证者数据中...</div>
              ) : (
                <CysicTable
                  data={myValidators}
                  columns={myValidatorsColumns}
                  keyExtractor={(validator) => validator.id}
                />
              )}
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
                <div className="w-full">
                  <p className="text-sub text-base mb-4">
                    Your currently don't stake to any validators. Start staking now to select from the list of active validators below.
                  </p>
                </div>
              </div>
            </div>
          </GradientBorderCard>
        )}

        {/* 活跃验证者列表 */}
        <GradientBorderCard
          className="mt-6"
          borderRadius={8}
        >
          <div className="w-full py-4 px-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="title text-xl uppercase !font-[300]">ACTIVE VALIDATORS</h2>
              <div className="relative w-[20rem] flex items-center">
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-2 bg-[#FFFFFF0D] text-white border border-[#FFFFFF33] rounded-lg focus:outline-none focus:border-white"
                  placeholder="Search"
                />
                <Search className="absolute left-4 text-[#FFFFFF99]" size={16} />
              </div>
            </div>

            {activeLoading ? (
              <div className="text-center py-6">加载活跃验证者数据中...</div>
            ) : (
              <CysicTable
                data={activeValidators}
                columns={activeValidatorsColumns}
                keyExtractor={(validator) => validator.id}
              />
            )}
          </div>
        </GradientBorderCard>
      </div>
    </div>
  );
};

export default StakePage;