
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WalletConnectRecord {
    [addr: string]: string // 0/1/2/3...
}

const persistFields: any = ['record'];
const defaultInitState = {
    record: {} as WalletConnectRecord
};

const useWalletConnectRecord = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
      ...defaultInitState,
      setRecord: (address: string, record: any) => set((state: any) => ({record: { ...state.record, [address]: record } })),
    }),
    {
      name: "walletConnectRecord",
      version: 2,
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

export default useWalletConnectRecord;
