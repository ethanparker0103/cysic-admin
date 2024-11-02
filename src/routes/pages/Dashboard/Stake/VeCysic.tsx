import Button from "@/components/Button";
import { blockTime, cosmosFee, cysicBaseCoin, cysicStCoin } from "@/config";
import useModalState from "@/hooks/useModalState";
import useCosmos from "@/models/_global/cosmos";
import useValidator from "@/models/_global/validator";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import ActiveValidatorDetail from "@/routes/pages/Dashboard/Stake/ActiveValidatorDetail";
import StakeModal, {
  StakeTab,
} from "@/routes/pages/Dashboard/Stake/Modal/stake";
import MyValidatorDetail from "@/routes/pages/Dashboard/Stake/MyValidatorDetail";
import ValidatorDesc from "@/routes/pages/Dashboard/Stake/ValidatorDesc";
import { format, getImageUrl, sleep } from "@/utils/tools";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import { GasPrice, QueryClient, setupDistributionExtension } from "@cosmjs/stargate";
import * as tx_1 from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import { useRequest } from "ahooks";
import { checkKeplrWallet, checkkTx, signAndBroadcastDirect } from "@/utils/cosmos";
import { useEffect } from "react";

const sliceFormat = (value: string, decimal: number = 18) => {
  if (value.length <= decimal) return value

  const decimalPosition = value.length - decimal; // 小数点前 18 位

  const formattedValue =
    value.slice(0, decimalPosition) + "." + value.slice(decimalPosition);
  return formattedValue;
};

const token = cysicStCoin;

const VeCysic = () => {
  const { address, connector, stakeMap } = useCosmos();
  const { dispatch }: any = useModalState({ eventName: "modal_stake_visible" });
  const { myValidators, un_stake_amount, total_apr } = useValidator();

  const queryRewards = async () => {

    const queryClient = QueryClient.withExtensions(
      connector.getQueryClient(),
      setupDistributionExtension
    );
    const result_ = await queryClient.distribution.delegationTotalRewards(
      address
    );

    const result = {
      rewards: result_.rewards.map(reward => {
        return {
          validatorAddress: reward.validatorAddress,
          reward: reward.reward.map(r => ({
            denom: r.denom,
            amount: sliceFormat(r.amount, 18)
          }))
        };
      }),
      total: result_.total.map(t => ({
        denom: t.denom,
        amount: sliceFormat(t.amount, 18)
      }))
    };

    // return {
    //   ...result,
    //   total: result?.total
    //   ?.reduce((prev, next) => {
    //     return BigNumber(next?.amount).plus(prev);
    //   }, BigNumber(0))
    //   .div(1e18)
    //   .toString()
    // };

    return result?.total
      ?.reduce((prev, next) => {
        return BigNumber(next?.amount).plus(prev);
      }, BigNumber(0))
      .div(1e18)
      .toString()
  };

  const { data: totalRewards, run: queryRewardsRun } = useRequest(() => queryRewards(), {
    ready: !!address && !!connector,
    refreshDeps: [address, connector],
    pollingInterval: blockTime.long,
    onError(e) {
      console.log("error", e);
    },
  });

  useEffect(() => {
    console.log('totalRewards refresh', totalRewards)
  }, [totalRewards])

  // withdrawRewards
  const handleClaim = async (closeLoading?: any) => {
    try {
      checkKeplrWallet()
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
          value: tx_1.MsgWithdrawDelegatorReward.encode(tx_1.MsgWithdrawDelegatorReward.fromPartial({
            delegatorAddress: address,
            validatorAddress: validator,
          })).finish(),
        };
        withdrawMsgs.push(withdrawMsg);
      }

      const result2 = await signAndBroadcastDirect(address, withdrawMsgs, { ...cosmosFee, gas: (+cosmosFee.gas * 1.5).toString() }, connector)

      await checkkTx(connector, result2?.transactionHash);

      // onClose?.()
    } catch (e: any) {
      console.log("error", e);
      toast.error(e?.shortMessage || e?.message || e?.msg || e);
    } finally {
      await sleep(blockTime.short);
      queryRewardsRun();
      dispatchEvent(new CustomEvent("refresh_cosmosBalance"));
      dispatchEvent(new CustomEvent("refresh_validatorList"));
      closeLoading?.();
    }
  };

  return (
    <MainContainer title="Stake CGT">
      <>
        <div className="flex items-stretch gap-4 flex-wrap">
          <div className="flex-1 gap-10 min-h-[8.375rem] flex-1 flex justify-between px-6 py-8 rounded-[16px] bg-sub-gradient border border-[#192E33] relative">
            <div className="flex-1 flex flex-col gap-4 justify-between">
              <img
                className="size-10"
                src={getImageUrl("@/assets/images/stake/lock.svg")}
              />
              <div className="flex flex-col gap-2 text-[#A3A3A3] text-sm">
                <span className="">Staking Amount</span>
                <div className="flex gap-1 items-end">
                  <span className="text-[24px] text-[#fff]">
                    {stakeMap?.[cysicStCoin]?.hm_amount || 0}
                  </span>
                  <span className="">{token}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 justify-between">
              <img
                className="size-10"
                src={getImageUrl("@/assets/images/stake/wallet.svg")}
              />
              <div className="flex flex-col gap-2 text-[#A3A3A3] text-sm">
                <span className="">Unstaking Amount</span>
                <div className="flex gap-1 items-end">
                  <span className="text-[24px] text-[#fff]">
                    {un_stake_amount || 0}
                  </span>
                  <span className="">{token}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 justify-between">
              <img
                className="size-10"
                src={getImageUrl("@/assets/images/stake/star.svg")}
              />
              <div className="flex flex-col gap-2 text-[#A3A3A3] text-sm">
                <span className="">APR</span>
                <div className="flex gap-2 items-center">
                  <span className="text-[24px] text-[#fff] font-[600]">{total_apr}%</span>
                  <Button
                    type="dark"
                    className="h-[1.75rem] min-h-fit"
                    onClick={() => {
                      dispatch({ visible: true, tab: StakeTab.stake })
                    }}
                  >
                    <span className="text-sm text-[#00F0FF]">Stake</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-[8.375rem] flex-1 flex justify-between px-6 py-8 rounded-[16px] bg-sub-gradient gradient-sub-border relative">
            <div className="flex flex-col gap-6 justify-between">
              <div className="flex flex-col gap-2 text-[#A3A3A3] text-sm">
                <span className="">Claim Rewards</span>
                <div className="flex gap-1">
                  <span className="text-[#fff] text-[24px]">
                    {+totalRewards ? format(totalRewards as string, 3) : '-'}
                  </span>
                  <span className="self-end">{cysicBaseCoin}</span>
                </div>
              </div>
              <Button
                type="dark"
                className="h-[1.75rem] min-h-fit"
                needLoading
                onClick={handleClaim}
              >
                <span className="text-sm text-[#00F0FF]">Claim All</span>
              </Button>
            </div>

            <div className="size-[7.75rem]">
              <img
                className="w-full"
                src={getImageUrl("@/assets/images/stake/token-s.png")}
              />
            </div>
          </div>
        </div>

        {myValidators?.length == 0 ? <ValidatorDesc /> : <MyValidatorDetail />}

        <ActiveValidatorDetail />

        <StakeModal />
      </>
    </MainContainer>
  );
};

export default VeCysic;
