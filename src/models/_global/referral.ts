
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const defaultInitState = {
  levelListObj: {},
  levelList: [],
  checkBind: false,
  code: undefined,
  overview: undefined,
  activatedUserList: undefined,
  twitterAuthConfig: undefined,
  discordAuthConfig: undefined,
  twitterBinded: undefined,
  discordBinded: undefined,
  firstCheckLoading: true


}

const persistFields: any = [];

const useReferral = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
        ...defaultInitState,
      setState: (newValues: any) => set((state: any) => ({ ...state, ...newValues })),
    }),
    {
      name: "referral",
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

export default useReferral;
