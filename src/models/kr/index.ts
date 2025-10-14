

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const persistFields: any = ["user", "tweetUnderReview"];

interface IUser {
  id: string;
  name: string;
}

const defaultInitState = {
    user: {} as IUser,
    step: 1,
    tweetUnderReview: true,
}

const useKrActivity = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
        ...defaultInitState,
      setState: (newValues: any) => set((state: any) => ({ ...state, ...newValues })),
    }),
    {
      name: "krActivity",
      version: 1,
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

export default useKrActivity;
