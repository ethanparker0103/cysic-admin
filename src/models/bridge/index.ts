
import { cysicChain } from "@/config";
import { arbitrumSepolia } from "viem/chains";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const defaultInitState = {
  fromChainId: arbitrumSepolia.id,
  toChainId: cysicChain.id,
  fromTokenAddress: '0x078d8d0464c80eb985bf9b0613d06f9753d38f5c',
  toTokenAddress: undefined,
  bridgeDir: 0,
}

const persistFields: any = [];

const useBridge = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
        ...defaultInitState,
      setState: (newValues: any) => set((state: any) => ({ ...state, ...newValues })),
    }),
    {
      name: "bridge",
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

export default useBridge;
