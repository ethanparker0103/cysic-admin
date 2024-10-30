
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const defaultInitState = {
  profile: undefined
}

const persistFields: any = [''];

const useUser = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
      ...defaultInitState,
      createAddress: (addr: any, newState: any) => set((state: any) => {

        const params = {
          profile: {
            ...state.profile,
            [addr]: newState||{}
          }
        }


        console.log('params,', params)
        return params
      }),

      updateAddress: (addr: any, newState: any) => set((state: any) => ({
        authMapprofile: {
          ...state.profile,
          [addr]: {
            ...state.profile?.[addr],
            ...newState
          }
        }
      })),
      setState: (newValues: any) => set((state: any) => ({ ...state, ...newValues })),
    }),
    {
      name: "profile",
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

export default useUser;
