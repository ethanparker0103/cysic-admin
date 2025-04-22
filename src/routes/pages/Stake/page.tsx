// @ts-nocheck

import Button, { BtnType } from "@/components/Button";
import { getImageUrl, handleStakeModal, handleUnstakeModal } from "@/utils/tools";
import { Search, History } from "lucide-react";
import { useState } from "react";
import GradientBorderCard from "@/components/GradientBorderCard";
import CysicTable, { CysicTableColumn } from "@/components/Table";
import axios from "@/service";
import { useRequest } from "ahooks";
import useCosmos from "@/models/_global/cosmos";
import useStake from "@/models/stake"; // 引入stake store
import { blockTime, cosmosFee } from "@/config";

import {
  GasPrice,
  QueryClient,
  setupDistributionExtension,
} from "@cosmjs/stargate";
import * as tx_1 from "cosmjs-types/cosmos/distribution/v1beta1/tx"
import {
  checkKeplrWallet,
  checkkTx,
  signAndBroadcastDirect,
} from "@/utils/cosmos";
import BigNumber from "bignumber.js";
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

const sliceFormat = (value: string, decimal: number = 18) => {
  if (value.length <= decimal) return value;

  const decimalPosition = value.length - decimal; // 小数点前 18 位

  const formattedValue =
    value.slice(0, decimalPosition) + "." + value.slice(decimalPosition);
  return formattedValue;
};


const StakePage = () => {
  const { balanceMap } = useCosmos()
  const { setState, stakeList, activeList } = useStake(); // 使用stake store

  const unstakeAmount = balanceMap?.CGT?.hm_amount || 0
  const [stakeAmount, setStakeAmount] = useState("0");
  const [apr, setApr] = useState("0");
  const [rewardsAmount, setRewardsAmount] = useState("0");

  // 获取质押验证者列表
  const { data: stakeListData, loading: stakeLoading } = useRequest(
    () => axios.get('/api/v1/stake/list'),
    {
      onSuccess: (res) => {
        // 存储原始响应到store
        setState({ stakeList: res });

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

  // 获取验证者数据 - 优先使用store中的数据
  const myValidators = (stakeList?.data?.validatorList || stakeListData?.data?.validatorList)
    ? transformValidators(stakeList?.data?.validatorList || stakeListData?.data?.validatorList)
    : [];

  // 获取活跃验证者列表
  const { data: activeListData, loading: activeLoading } = useRequest(
    () => axios.get('/api/v1/validator/activeList'),
    {
      onSuccess: (res) => {
        // 存储原始响应到store
        setState({ activeList: res });
        console.log('活跃验证者数据:', res?.data);
      }
    }
  );

  // 获取活跃验证者数据 - 优先使用store中的数据
  const activeValidators = (activeList?.data?.validatorList || activeListData?.data?.validatorList)
    ? transformValidators(activeList?.data?.validatorList || activeListData?.data?.validatorList)
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
      renderCell: (validator) => <>{validator.votingPower} <span className='text-sm text-sub'>CGT</span></>
    },
    {
      key: "votingPower",
      label: "Voting Power",
      renderCell: (validator) => (
        <div>
          <div>{validator.votingPower} <span className="text-sm text-sub">CGT</span></div>
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
      renderCell: (validator) => (
        <div className="flex gap-2">
          <Button
            onClick={() => handleStakeModal({ validator: validator.name })}
            type={BtnType.light}
            className="rounded-lg w-[6.5rem] py-3 text-sm"
          >
            STAKE
          </Button>
          <Button
            onClick={() => handleUnstakeModal({ validator: validator.name })}
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
          <div>{validator.votingPower} <span className="text-sm text-sub">CGT</span></div>
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
      renderCell: (validator) => (
        <Button
          onClick={() => handleStakeModal({ validator: validator.name })}
          type={BtnType.light}
          className="rounded-lg px-6 py-3 w-full text-base"
        >
          STAKE
        </Button>
      )
    }
  ];


  const { address, connector } = useCosmos()
  const handleClaim = async (closeLoading?: any) => {
    try {
      checkKeplrWallet();
      // const result = await connector?.withdrawRewards(params.delegatorAddress, params.validatorAddress, cosmosFee, 'claim reawrds')
      // toast.success(`Submit Success at ${result?.transactionHash}`)

      const queryClient = QueryClient.withExtensions(
        connector.getQueryClient(),
        setupDistributionExtension
      );
      const result = await queryClient.distribution.delegatorValidators(
        address
      );
      console.log("Delegator's Validators:", result);
      const withdrawMsgs = [];
      for (const validator of result.validators) {
        const withdrawMsg = {
          typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
          value: tx_1.MsgWithdrawDelegatorReward.encode(
            tx_1.MsgWithdrawDelegatorReward.fromPartial({
              delegatorAddress: address,
              // TODO 
              validatorAddress: address,
            })
          ).finish(),
        };
        withdrawMsgs.push(withdrawMsg);
      }

      const result2 = await signAndBroadcastDirect(
        address,
        withdrawMsgs,
        { ...cosmosFee, gas: (+cosmosFee.gas * 1.5).toString() },
        connector
      );

      await checkkTx(connector, result2?.transactionHash);

      // onClose?.()
    } catch (e: any) {
      console.log("error", e);
    }
  };



  const queryRewards = async () => {
    const queryClient = QueryClient.withExtensions(
      connector.getQueryClient(),
      setupDistributionExtension
    );
    const result_ = await queryClient.distribution.delegationTotalRewards(
      address
    );

    const result = {
      rewards: result_.rewards.map((reward) => {
        return {
          validatorAddress: reward.validatorAddress,
          reward: reward.reward.map((r) => ({
            denom: r.denom,
            amount: sliceFormat(r.amount, 18),
            amount_hm: BigNumber(sliceFormat(r.amount, 18))
              .div(1e18)
              .toString(),
          })),
        };
      }),
      total: result_.total.map((t) => ({
        denom: t.denom,
        amount: sliceFormat(t.amount, 18),
      })),
    };

    // setRewardsAmount({
    //   stakeRewardsMap: result?.rewards?.reduce((prev: any, next: any) => {
    //     if (!prev?.[next?.validatorAddress]) {
    //       prev[next?.validatorAddress] = {};
    //     }
    //     prev[next?.validatorAddress] = next;

    //     return prev;
    //   }, {}),
    // });

    const res = result?.total
      ?.reduce((prev, next) => {
        return BigNumber(next?.amount).plus(prev);
      }, BigNumber(0))
      .div(1e18)
      .toString();

    setRewardsAmount(res)
    return res
  };

  useRequest(
    () => queryRewards(),
    {
      ready: !!address && !!connector,
      refreshDeps: [address, connector],
      pollingInterval: blockTime.long,
      onError(e) {
        console.log("error", e);
      },
    }
  );

  return (
    <div className="min-h-screen w-full pb-12 overflow-hidden ">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0 overflow-hidden ">
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
              <div className="text-2xl !font-[400] title mb-4 text-center text-right">{rewardsAmount} CGT</div>
              <Button
                needLoading
                onClick={handleClaim}
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