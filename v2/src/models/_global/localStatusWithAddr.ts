
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StatushMapItem {
  codeCreatedModalVisible: boolean
}

export const defaultInitState: {
  statusMap: null | {
    [addr: string]: StatushMapItem
  }
} = {
  statusMap: null
}

const persistFields: any = ['statusMap'];

const useLocalStatusWithAddr = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
      ...defaultInitState,
      reset: (newValues: any) => set((state: any) => (defaultInitState)),
      createAddress: (addr: any) => set((state: any) => {
        const params = {
          statusMap: {
            ...state.statusMap,
            [addr]: {
              codeCreatedModalVisible: false
            }
          }
        }

        return params
      }),

      updateAddress: (addr: any, status?: StatushMapItem) => set((state: any) => ({
        statusMap: {
          ...state.statusMap,
          [addr]: {
            ...state.statusMap?.[addr],
            ...status
          }
        }
      })),
      setState: (newValues: any) => set((state: any) => ({ ...state, ...newValues })),
    }),
    {
      name: "localStatusWithAddr",
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

export default useLocalStatusWithAddr;
