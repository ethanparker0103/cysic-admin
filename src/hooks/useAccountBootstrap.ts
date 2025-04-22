import { useEffect } from 'react';
import useAccount from '@/hooks/useAccount';
import useUser from '@/models/user';
import useStatic from '@/models/_global';
import { config } from '@/config/privyProvider';
import { watchAccount } from 'wagmi/actions';

/**
 * 顶层账户权限查询Hook
 * 在应用启动时查询用户权限状态
 */
const useAccountBootstrap = () => {
  const { walletAddress } = useAccount();
  const { fetchUserInfo, reset } = useUser();

  const unwatch = watchAccount(config, {
    onChange(account: any) {
      console.log('Account changed!', account)
      if (walletAddress && account?.toLowerCase() != walletAddress?.toLowerCase()) {
        reset()
      }
    },
  })

  useEffect(() => {
    if (walletAddress) {
      useStatic.getState().setAddress(walletAddress);
    }
  }, [walletAddress])

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

    return () => {
      unwatch()
    }
  }, [walletAddress]);

  // 这个hook只负责初始化检查，不需要返回任何内容
  return null;
};

export default useAccountBootstrap;