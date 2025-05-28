
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const defaultInitState = {
  stakeTaskList: [],
  baseTaskList: [],
  loading: false
}

const persistFields: any = [];

const useTasksInMultiplierModal = create(
  persist(
    (set: (arg0: (state: any) => any) => any) => ({
      ...defaultInitState,
      setState: (newValues: any) => set((state: any) => ({ ...state, ...newValues })),
      setStakeTaskList: (taskList: any) => set((state: any) => ({ ...state, stakeTaskList: taskList })),
      setBaseTaskList: (taskList: any) => set((state: any) => ({ ...state, baseTaskList: taskList })),
      setLoading: (loading: boolean) => set((state: any) => ({ ...state, loading })),
    }),
    {
      name: "tasksInMultiplierModal",
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

export default useTasksInMultiplierModal;
