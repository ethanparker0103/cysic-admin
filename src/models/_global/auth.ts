
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthMapItem {
  auth: string;
  address: string;
  valid: boolean | undefined
}

export const defaultInitState: {
  currentAddr: string;
  authMap: null | {
    [addr: string]: AuthMapItem
  }
} = {
  currentAddr: '',
  authMap: null
}

const persistFields: any = ['authMap'];

const useAuth = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
      ...defaultInitState,
      reset: (newValues: any) => set((state: any) => (defaultInitState)),
      createAddress: (addr: any) => set((state: any) => {

        const params = {
          authMap: {
            ...state.authMap,
            [addr]: {
              auth: '',
              address: addr,
              valid: undefined
            }
          }
        }

        return params
      }),

      updateAddress: (addr: any, status?: AuthMapItem) => set((state: any) => ({
        authMap: {
          ...state.authMap,
          [addr]: {
            ...state.authMap?.[addr],
            ...status
          }
        }
      })),
      setState: (newValues: any) => set((state: any) => ({ ...state, ...newValues })),
    }),
    {
      name: "auth",
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

export default useAuth;
