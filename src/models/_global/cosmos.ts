
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const defaultInitState = {
  address: undefined,
  client: undefined,
  chainId: undefined,
  connector: undefined,
  isConnected: false,
  isConnecting: false,
  hasConnectedWithKeplr: false,

  balanceMap: undefined,
  depositMap: undefined,
  exchangeableMap: undefined,

  stakeMap: undefined,
  unmatchedAddressWithEVM: undefined,
}

const persistFields: any = ['hasConnectedWithKeplr'];

const useCosmos = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
      ...defaultInitState,
      setState: (newValues: any) => set((state: any) => ({ ...state, ...newValues })),
      init: () => set(() => (defaultInitState)),
    }),
    {
      name: "cosmos",
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

export default useCosmos;
