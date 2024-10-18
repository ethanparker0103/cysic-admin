
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const defaultInitState = {
  activeValidator: undefined,
  myValidators: undefined,
  stake_amount: undefined, 
  un_stake_amount: undefined
}

const persistFields: any = [];

const useValidator = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
        ...defaultInitState,
      setState: (newValues: any) => set((state: any) => ({ ...state, ...newValues })),
    }),
    {
      name: "validator",
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

export default useValidator;
