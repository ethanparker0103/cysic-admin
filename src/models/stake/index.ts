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
  setState: (updates: Partial<StakeState>) => void;
  resetState: () => void;
}

const useStake = create<StakeState>()(
  immer((set) => ({
    stakeList: null,
    activeList: null,
    setState: (updates) => set((state) => {
      Object.assign(state, updates);
    }),
    resetState: () => set({ stakeList: null, activeList: null })
  }))
);

export default useStake;