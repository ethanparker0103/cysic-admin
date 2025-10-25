
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { systemApi, userApi, taskApi, authUtils } from "@/routes/pages/Kr/krApi";

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

interface Task {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  taskType: string;
  RewardPoints: number;
  RewardStampId: number;
  startAt: number;
  endAt: number;
  forceLocked: boolean;
  currentStatus: number; // 0: 未完成, 1: 待审核, 2: 待领取, 3: 已完成
  taskResult: string;
  createdAt: number;
  updatedAt: number;
  inviteTaskConfig?: {
    requestInviteNum: number;
  };
  postTwitterTaskConfig?: {
    content: string;
  };
  quizTaskConfig?: {
    quiz: string;
    answer: string;
  };
  quoteTwitterTaskConfig?: {
    content: string;
  };
}

const defaultInitState = {
    user: {} as IUser,
    step: 1,
    tweetUnderReview: false,
    systemSetting: {} as SystemSetting,
    userOverview: {} as UserOverview,
    taskList: [] as Task[],
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
            console.log('getOverview', response);
            if (response.code === '200') {
              // 将用户信息写入user字段
              const userData = {
                id: response.data.id.toString(),
                name: response.data.name,
                twitterName: response.data.twitterName,
                avatarUrl: response.data.avatarUrl,
              };
              set((state: any) => ({ 
                ...state, 
                user: userData,
                userOverview: response.data, 
                loading: false 
              }));
            } else {
              set((state: any) => ({ ...state, error: response.msg, loading: false }));
            }
          } catch (error) {
            set((state: any) => ({ ...state, error: 'Failed to load user overview', loading: false }));
          }
        },
        
        // 初始化任务列表
        initTaskList: async () => {
          if (!authUtils.isAuthenticated()) return;
          
          try {
            set((state: any) => ({ ...state, loading: true, error: null }));
            const response = await taskApi.getTaskList();
            if (response.code === '200') {
              set((state: any) => ({ ...state, taskList: response.list, loading: false }));
            } else {
              set((state: any) => ({ ...state, error: response.msg, loading: false }));
            }
          } catch (error) {
            set((state: any) => ({ ...state, error: 'Failed to load task list', loading: false }));
          }
        },
        
        // 检查认证状态
        checkAuthStatus: () => {
          const isAuthenticated = authUtils.isAuthenticated();
          if (isAuthenticated) {
            // 如果已认证，获取用户概览和任务列表
            get().initUserOverview();
            get().initTaskList();
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
