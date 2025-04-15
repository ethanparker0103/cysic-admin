import { useEffect } from 'react';
import useAccount from '@/hooks/useAccount';
import useUser from '@/models/user';

/**
 * 顶层账户权限查询Hook
 * 在应用启动时查询用户权限状态
 */
const useAccountBootstrap = () => {
  const { walletAddress } = useAccount();
  const { fetchUserInfo } = useUser();
  
  // 钱包地址变化时自动检查权限状态
  useEffect(() => {
    const checkUserStatus = async () => {
      if (!walletAddress) return;
      
      try {
        // 查询用户信息
        await fetchUserInfo(walletAddress);
        // 权限状态由useUser内部维护，无需在此处保存
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    };

    checkUserStatus();
  }, [walletAddress]);
  
  // 这个hook只负责初始化检查，不需要返回任何内容
  return null;
};

export default useAccountBootstrap;