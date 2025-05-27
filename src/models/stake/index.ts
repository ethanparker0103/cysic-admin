import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

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

interface StakeListResponse {
  validatorList: ValidatorResponse[];
}

interface StakeState {
  stakeList: {
    data?: {
      validatorList: ValidatorResponse[];
    };
  } | null;
  activeList: {
    data?: {
      validatorList: ValidatorResponse[];
    };
  } | null;
  stakeAmount: string;
  unstakeAmount: string;
  queryStakeListLoading: boolean;
  queryActiveListLoading: boolean;
  setStakeAmount: (amount: string) => void;
  setUnstakeAmount: (amount: string) => void;
  setQueryStakeListLoading: (loading: boolean) => void;
  setQueryActiveListLoading: (loading: boolean) => void;
  setState: (updates: Partial<StakeState>) => void;
  resetState: () => void;
}

const useStake = create<StakeState>()(
  immer((set) => ({
    stakeList: null,
    activeList: null,
    stakeAmount: "0",
    unstakeAmount: "0",
    queryStakeListLoading: false,
    queryActiveListLoading: false,
    setState: (updates) => set((state) => {
      Object.assign(state, updates);
    }),
    setStakeAmount: (amount: string) => set({ stakeAmount: amount }),
    setUnstakeAmount: (amount: string) => set({ unstakeAmount: amount }),
    setQueryStakeListLoading: (loading: boolean) => set({ queryStakeListLoading: loading }),
    setQueryActiveListLoading: (loading: boolean) => set({ queryActiveListLoading: loading }),
    resetState: () => set({ stakeList: null, activeList: null })
  }))
);

export default useStake;