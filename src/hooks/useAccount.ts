import { useAccount as useWagmiAccount } from 'wagmi';
import useUser from '@/models/user';
import { useMemo } from 'react';
import useCosmos from '@/models/_global/cosmos';

// 定义账户类型，区分不同的权限状态
export enum AccountStatus {
  NOT_CONNECTED = 'not_connected',     // 未连接钱包
  CONNECTED_ONLY = 'connected_only',   // 已连接钱包但未绑定邀请码
  REGISTERED = 'registered',           // 已注册（验证了邀请码）
  COMPLETED = 'completed'              // 完成注册（填写了个人信息）
}

/**
 * 扩展的账户钩子，添加了权限识别功能
 * @returns 扩展的账户信息与状态
 */
const useAccount = () => {
    // 获取原始钱包连接状态
    const wagmiAccount = useWagmiAccount();
    const { address: cosmosAddress } = useCosmos()
    
    // 获取用户状态
    const { 
      address: registeredAddress, 
      isRegistered, 
      registrationComplete,
      inviteCode: registeredInviteCode
    } = useUser();
    
    // 计算当前账户状态
    const status = useMemo(() => {
      // 未连接钱包
      if (!wagmiAccount.isConnected || !wagmiAccount.address) {
        return AccountStatus.NOT_CONNECTED;
      }
      
      // 检查当前连接的地址是否已注册
      const currentAddressIsRegistered = 
        isRegistered && registeredAddress === wagmiAccount.address;
      
      if (currentAddressIsRegistered) {
        // 检查是否完成注册流程
        return registrationComplete 
          ? AccountStatus.COMPLETED 
          : AccountStatus.REGISTERED;
      }
      
      // 已连接钱包但未绑定邀请码
      return AccountStatus.CONNECTED_ONLY;
    }, [
      wagmiAccount.isConnected, 
      wagmiAccount.address, 
      registeredAddress, 
      isRegistered, 
      registrationComplete
    ]);
    
    // 根据权限状态，决定暴露什么地址信息
    const authorizedAddress = useMemo(() => {
      // 如果状态至少是已注册，返回注册的地址
      if (status === AccountStatus.REGISTERED || status === AccountStatus.COMPLETED) {
        return registeredAddress;
      }
      
      // 只是连接但未注册，返回钱包当前地址
      if (status === AccountStatus.CONNECTED_ONLY) {
        return wagmiAccount.address;
      }
      
      // 未连接，返回undefined
      return undefined;
    }, [status, wagmiAccount.address, registeredAddress]);
    
    // 是否需要完成邀请码绑定
    const needBindInviteCode = useMemo(() => {
      return status === AccountStatus.CONNECTED_ONLY;
    }, [status]);
    
    return {
      // 原始的wagmi账户信息
      ...wagmiAccount,
      
      // 增强的状态信息
      status,
      
      // 标识各种权限状态
      isNotConnected: status === AccountStatus.NOT_CONNECTED,
      isConnectedOnly: status === AccountStatus.CONNECTED_ONLY,
      isRegistered: status === AccountStatus.REGISTERED || status === AccountStatus.COMPLETED,
      isProfileCompleted: status === AccountStatus.COMPLETED,
      
      // 邀请码绑定状态
      needBindInviteCode,
      registeredInviteCode,
      
      // 根据权限状态返回适当的地址
      address: authorizedAddress,
      
      // 保留原始钱包地址，用于特殊场景
      walletAddress: wagmiAccount.address,
      
      // 注册后的地址，只在已注册状态下有效
      registeredAddress: isRegistered ? registeredAddress : undefined,

      // cosmos
      cosmosAddress,
    };
};

export default useAccount;