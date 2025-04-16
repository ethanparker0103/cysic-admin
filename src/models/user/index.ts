import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "@/service";

// 用户信息接口 - 使用与API一致的字段名
export interface UserInfo {
  address?: string;  // 钱包地址（前端维护）
  name?: string;
  avatarUrl?: string;  // 与API保持一致
  inviteCode?: string;
  isRegistered?: boolean;  // 前端状态标识
  registrationComplete?: boolean;  // 前端状态标识
  balance?: {
    amount: string;
    symbol: string;
  };
  rewardList?: Array<{
    amount: string;
    symbol: string;
  }>;
  socialAccountList?: {
    google?: {name: string} | null;
    x?: {name: string} | null;
    discord?: {name: string} | null;
  };
}

export const defaultInitState: UserInfo = {
  address: undefined,
  name: undefined,
  avatarUrl: undefined,
  inviteCode: undefined,
  isRegistered: false,
  registrationComplete: false
}

// 需要持久化的字段
const persistFields: string[] = ['address', 'name', 'avatarUrl', 'inviteCode', 'isRegistered', 'registrationComplete'];

interface UserState extends UserInfo {
  setState: (newValues: Partial<UserInfo>) => void;
  setUserInfo: (info: UserInfo) => void;
  reset: () => void;
  
  // API相关方法
  verifyInviteCode: (code: string, address: string) => Promise<boolean>;
  fetchUserInfo: (address: string) => Promise<UserInfo | null>;
  registerUser: (userData: Partial<UserInfo>) => Promise<boolean>;
}

const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      ...defaultInitState,
      
      // 更新状态
      setState: (newValues: Partial<UserInfo>) => set((state) => ({ ...state, ...newValues })),
      
      // 设置完整用户信息
      setUserInfo: (info: UserInfo) => set((state) => ({ ...state, ...info })),
      
      // 重置状态
      reset: () => set(defaultInitState),
      
      // 验证邀请码 - 实际API调用
      verifyInviteCode: async (code: string, address: string) => {
        try {
          const data: any = await axios.post('/api/v1/referral/bind', { code });
          
          if (data.code === 10000) {
            // 绑定成功，更新状态
            set((state) => ({
              ...state,
              inviteCode: code,
              address: address,
              isRegistered: true
            }));
                        
            return true;
          }
          return false;
        } catch (error) {
          console.error("绑定邀请码失败", error);
          return false;
        }
      },
      
      // 获取用户信息 - 实际API调用
      fetchUserInfo: async (address: string) => {
        try {
          // 获取用户概览信息
          const data: any = await axios.get('/api/v1/user/overview');
          
          if (data.code === 10000) {
            const userInfo = data.data;
            
            // 用户已注册，更新状态
            const updatedInfo = {
              ...userInfo,
              address,
              isRegistered: true,
              registrationComplete: !!userInfo.name
            };
            
            set((state) => ({ ...state, ...updatedInfo }));
            
            return updatedInfo;
          }
          
          return null;
        } catch (error) {
          console.error("获取用户信息失败", error);
          
          // 如果API返回错误，可能是用户未注册
          // 这里我们只记录地址，保持其他状态为未注册
          set((state) => ({
            ...state,
            address,
            isRegistered: false,
            registrationComplete: false
          }));
          
          return {
            address,
            isRegistered: false,
            registrationComplete: false
          };
        }
      },
      
      // 用户注册/更新资料 - 实际API调用
      registerUser: async (userData: Partial<UserInfo>) => {
        try {
          // 准备API请求数据
          const apiData: Record<string, string | undefined> = {};
          
          // 仅当有值时添加到请求数据
          if (userData.name) apiData.name = userData.name;
          if (userData.avatarUrl) apiData.avatarUrl = userData.avatarUrl;
          
          // 调用API更新资料
          const { data } = await axios.post('/api/v1/user/updateProfile', apiData);
          
          if (data.code === 10000) {
            // 准备要更新的状态字段
            const updatedState: Partial<UserInfo> = {};
            
            // 只更新提供的字段
            if (userData.name) updatedState.name = userData.name;
            if (userData.avatarUrl) updatedState.avatarUrl = userData.avatarUrl;
            if (userData.address) updatedState.address = userData.address;
            if (userData.inviteCode) updatedState.inviteCode = userData.inviteCode;
            
            // 如果明确设置了registrationComplete，使用它
            if (userData.registrationComplete !== undefined) {
              updatedState.registrationComplete = userData.registrationComplete;
            } else {
              // 否则，如果有名称，认为注册完成
              updatedState.registrationComplete = !!userData.name || get().registrationComplete;
            }
            
            // 更新用户状态
            set((state) => ({
              ...state,
              ...updatedState,
              isRegistered: true // 总是将用户标记为已注册
            }));
            
            // 更新成功后，获取完整用户信息以保持状态一致
            try {
              const userState = get();
              if (typeof userState.fetchUserInfo === 'function' && userState.address) {
                await userState.fetchUserInfo(userState.address);
              }
            } catch (error) {
              console.error("更新资料后获取用户信息失败", error);
            }
            
            return true;
          }
          
          return false;
        } catch (error) {
          console.error("更新用户资料失败", error);
          return false;
        }
      }
    }) as unknown as UserState,
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => 
            persistFields.includes(key)
          )
        );
      },
    },
  ),
);

export default useUser;