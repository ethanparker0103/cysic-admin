
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export interface IProofType {
  id: number,
  name: string,
  logo: string,
  jumpURL: string
}

export interface IReferralLevel {
  id: number,
  level: number,
  name: string,
  needInviteCnt: number,
  reward: {
    symbol: string,
    amount: string
  },
  poolFee: string
}

export interface IMultiplierLevel {
  id: number,
  level: number,
  name: string,
  rate: string,
  nextLevelRequire: number
}

export interface IStaticState {
  proofTypeList: IProofType[],
  referralLevelList: IReferralLevel[],
  multiplierLevelList: IMultiplierLevel[],
  faucetAmount: string
}


export const defaultInitState = {
  address: undefined,

  proofTypeList: [],
  referralLevelList: [],
  multiplierLevelList: [],
  faucetAmount: "0"
}

const persistFields: any = ['address'];

const useStatic = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
      ...defaultInitState,
      setState: (newValues: any) => set((state: any) => ({ ...state, ...newValues })),
      setAddress: (address: string) => set((state: any) => ({ ...state, address })),
    }),
    {
      name: "static",
      storage: createJSONStorage(() => localStorage),
      partialize: (state: { [x: string]: any; }) => {
        const keys = Object.keys(state);
        return keys.reduce((prev, next) => {
          if (persistFields.includes(next)) {
            return { ...prev, [next]: state[next] };
          }
          return prev;
        }, {});
      },
    },
  ),
);

export default useStatic;
