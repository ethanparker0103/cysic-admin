import axios from "@/service";
import { useEventListener, useRequest } from "ahooks";
import useAccount from "./useAccount";
import useStake from "@/models/stake";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useModalState from "@/hooks/useModalState";
import { showStatusModal, sleep } from "@/utils/tools";
import { blockTime } from "@/config";
import { StatusType } from "@/routes/components/modal/statusModal";

export interface ValidatorResponse {
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

const useStakeList = () => {

    const { pathname } = useLocation()
    
    const { visible }: any = useModalState({
        eventName: "modal_stake_visible",
    });

    // 1. pathname == /stake && !visible 请求
    // 2. pathname != /stake && visible 请求

    const isStakePage = pathname == '/stake' || pathname == '/m/stake'

    const { setStakeAmount, setUnstakeAmount, setState, setQueryStakeListLoading, setQueryActiveListLoading } = useStake()
    const { isSigned, walletAddress } = useAccount();

    const stakeListValid = (isStakePage && !visible) || (!isStakePage && visible)
    const activeListValid = (isStakePage && !visible) || (!isStakePage && visible)


    const { run: runStakeList, loading: stakeLoading } = useRequest(
        () => {
            return Promise.allSettled([axios.get('/api/v1/stake/list'), axios.get('/api/v1/unstake/list')])
        },
        {
            ready: isSigned && !!walletAddress && stakeListValid,
            refreshDeps: [isSigned, walletAddress, stakeListValid],
            onSuccess: (res: any) => {
                const stakeRes = res[0]?.value
                const unstakeRes = res[1]?.value

                if (unstakeRes?.data?.validatorList && unstakeRes.data.validatorList.length > 0) {
                    const totalUnstakeAmount = unstakeRes.data.validatorList.reduce((acc: number, curr: any) => acc + parseFloat(curr.amount), 0)
                    setUnstakeAmount(totalUnstakeAmount)
                }

                setState({ stakeList: stakeRes });

                if (stakeRes?.data?.validatorList && stakeRes.data.validatorList.length > 0) {
                    // 计算总质押金额和平均APR
                    let totalStake = 0;

                    stakeRes.data.validatorList.forEach((validator: ValidatorResponse) => {
                        if (validator.stake) {
                            totalStake += parseFloat(validator.stake.amount);
                        }
                    });

                    // 设置状态
                    setStakeAmount(totalStake.toLocaleString('en-US', { maximumFractionDigits: 2 }));
                } else {
                    setStakeAmount("0");
                }
            }
        }
    );


    const { run: runActiveList, loading: activeListLoading } = useRequest(
        () => Promise.allSettled([axios.get('/api/v1/validator/activeList')]),
        {
            ready: activeListValid,
            refreshDeps: [activeListValid],
            onSuccess: (res: any) => {
                const activeListRes = res[0]?.value
                setState({ activeList: activeListRes });
            }
        }
    );

    useEventListener('refresh_stake_list', () => {
        sleep(blockTime.long).then(() => {
            runStakeList()
            runActiveList()
            dispatchEvent(new Event('refresh_cosmosBalance'))
        })
    })

    useEffect(() => {
        setQueryActiveListLoading(activeListLoading)
    }, [activeListLoading])

    useEffect(() => {
        setQueryStakeListLoading(stakeLoading)
    }, [stakeLoading])

}

export default useStakeList;