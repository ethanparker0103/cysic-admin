
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


const persistFields: any = ['refCode'];

const defaultInitState: any = {
  refCode: "",
};

const useRef = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
      ...defaultInitState,
      setRefCode: (refCode: string) => set((state: any) => ({ ...state, refCode })),
    }),
    {
      name: "ref",
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

export default useRef;
