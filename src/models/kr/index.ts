
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { systemApi, userApi, authUtils } from "@/routes/pages/Kr/krApi";

const persistFields: any = ["user", "tweetUnderReview", "systemSetting", "userOverview"];

interface IUser {
  id: string;
  name: string;
  twitterName?: string;
  avatarUrl?: string;
}

interface SystemSetting {
  enableInviteCode: boolean;
  [key: string]: any;
}

interface UserOverview {
  id: number;
  name: string;
  points: number;
  checkInDays: number;
  completedTasks: number;
  earnedStamps: number;
  twitterName?: string;
  avatarUrl?: string;
}

const defaultInitState = {
    user: {} as IUser,
    step: 1,
    tweetUnderReview: false,
    systemSetting: {} as SystemSetting,
    userOverview: {} as UserOverview,
    loading: false,
    error: null as string | null,
}

const useKrActivity = create(
  persist(
    (set: (arg0: (state: any) => any) => any, get: () => any) => ({
        ...defaultInitState,
        
        setState: (newValues: any) => set((state: any) => ({ ...state, ...newValues })),
        
        // 初始化系统设置
        initSystemSetting: async () => {
          try {
            set((state: any) => ({ ...state, loading: true, error: null }));
            const response = await systemApi.getSettings();

            if (response.code === '200') {
              set((state: any) => ({ ...state, systemSetting: response, loading: false }));
            } else {
              set((state: any) => ({ ...state, error: response.msg, loading: false }));
            }
          } catch (error) {
            set((state: any) => ({ ...state, error: 'Failed to load system settings', loading: false }));
          }
        },
        
        // 初始化用户概览
        initUserOverview: async () => {
          if (!authUtils.isAuthenticated()) return;
          
          try {
            set((state: any) => ({ ...state, loading: true, error: null }));
            const response = await userApi.getOverview();
            if (response.code === '200') {
              set((state: any) => ({ ...state, userOverview: response.data, loading: false }));
            } else {
              set((state: any) => ({ ...state, error: response.msg, loading: false }));
            }
          } catch (error) {
            set((state: any) => ({ ...state, error: 'Failed to load user overview', loading: false }));
          }
        },
        
        // 检查认证状态
        checkAuthStatus: () => {
          const isAuthenticated = authUtils.isAuthenticated();
          if (isAuthenticated) {
            // 如果已认证，获取用户概览
            get().initUserOverview();
          }
          return isAuthenticated;
        },
        
        // 清除所有状态
        clearAll: () => {
          authUtils.clearAuthToken();
          set(() => ({ ...defaultInitState }));
        },
    }),
    {
      name: "krActivity",
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

export default useKrActivity;
