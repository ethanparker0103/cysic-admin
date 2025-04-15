import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// 用户信息接口
export interface UserInfo {
  address?: string;
  name?: string;
  logo?: string;
  inviteCode?: string;
  isRegistered?: boolean;
  registrationComplete?: boolean;
}

export const defaultInitState: UserInfo = {
  address: undefined,
  name: undefined,
  logo: undefined,
  inviteCode: undefined,
  isRegistered: false,
  registrationComplete: false
}

// 需要持久化的字段
const persistFields: string[] = ['address', 'name', 'logo', 'inviteCode', 'isRegistered', 'registrationComplete'];

interface UserState extends UserInfo {
  setState: (newValues: Partial<UserInfo>) => void;
  setUserInfo: (info: UserInfo) => void;
  reset: () => void;
  
  // API相关方法
  verifyInviteCode: (code: string, address: string) => Promise<boolean>;
  fetchUserInfo: (address: string) => Promise<UserInfo | null>;
  registerUser: (userData: Partial<UserInfo>) => Promise<boolean>;
}

const useUser: any = create(
  persist(
    (set, get) => ({
      ...defaultInitState,
      
      // 更新状态
      setState: (newValues: Partial<UserInfo>) => set((state: UserInfo) => ({ ...state, ...newValues })),
      
      // 设置完整用户信息
      setUserInfo: (info: UserInfo) => set((state: UserInfo) => ({ ...state, ...info })),
      
      // 重置状态
      reset: () => set(defaultInitState),
      
      // 验证邀请码 (Mock API)
      verifyInviteCode: async (code: string, address: string) => {
        // 模拟API调用延迟

        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('verifyInviteCode', code, address)
        
        // 模拟验证逻辑 (任何5位数邀请码都有效)
        const isValid = code.length === 5;
        
        if (isValid) {
          // 更新状态
          set((state: UserInfo) => ({ 
            ...state, 
            inviteCode: code,
            address: address,
            isRegistered: true 
          }));
        }
        
        return isValid;
      },
      
      // 获取用户信息 (Mock API)
      fetchUserInfo: async (address: string) => {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log('fetchUserInfo', address)

        // 检查是否有此用户地址的记录
        const currentState = get();
        
        // 如果当前状态中已有此地址信息
        if (currentState.address === address && currentState.isRegistered) {
          return {
            address,
            name: currentState.name,
            logo: currentState.logo,
            inviteCode: currentState.inviteCode,
            isRegistered: true,
            registrationComplete: !!currentState.name // 如果有名字，则认为注册完成
          };
        }
        
        // 模拟没有找到用户信息
        return null;
      },
      
      // 注册/更新用户信息 (Mock API)
      registerUser: async (userData: Partial<UserInfo>) => {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // 更新用户状态
        set((state: UserInfo) => ({
          ...state,
          ...userData,
          registrationComplete: true
        }));
        
        return true;
      }
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
      partialize: (state: UserInfo) => {
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