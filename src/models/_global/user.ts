import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SearchResult {
  Project: any;
  Provider: any;
  Verifier: any;
  WhitelistInfo: any;
}
interface ReferralOverview {
  Activated: boolean;
  ActivateTime: string;
  CurrentLevel: number;
  CurrentLevelInvite: number;
  LevelUpNeedInviteNum: number;
  LevelUpReward: string;
  RebateReward: string;
}
interface profile {
  inWhitelist: boolean;
  name: string;
  avatar: string;
  ethAddress: string;
  cosmosAddress: string;
  referralCode: string;
  searchResult: SearchResult;
  referralOverview: ReferralOverview;
}

export const defaultInitState: {
  profile: undefined | profile,
  phase2ModalStatus: boolean
} = {
  profile: undefined,
  phase2ModalStatus: true,
};

const persistFields: any = ["phase2ModalStatus"];

const useUser = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
      ...defaultInitState,
      createAddress: (addr: any, newState: any) =>
        set((state: any) => {
          const params = {
            profile: {
              ...state.profile,
              [addr]: newState || {},
            },
          };

          return params;
        }),

      updateAddress: (addr: any, newState: any) =>
        set((state: any) => ({
          authMapprofile: {
            ...state.profile,
            [addr]: {
              ...state.profile?.[addr],
              ...newState,
            },
          },
        })),
      setState: (newValues: any) =>
        set((state: any) => ({ ...state, ...newValues })),
    }),
    {
      name: "profile",
      version: 3,
      storage: createJSONStorage(() => localStorage),
      partialize: (state: { [x: string]: any }) => {
        const keys = Object.keys(state);
        return keys.reduce((prev, next) => {
          if (persistFields.includes(next)) {
            return { ...prev, [next]: state[next] };
          }
          return prev;
        }, {});
      },
    }
  )
);

export default useUser;
