
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const defaultInitState = {
  address: undefined
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
