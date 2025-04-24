import { useEffect, useMemo, useRef } from 'react';
import useUser from '@/models/user';
import useStatic from '@/models/_global';
import { config } from '@/config/privyProvider';
import { watchAccount } from 'wagmi/actions';
import { useEventListener } from 'ahooks';
import { useSignMessage } from '@/hooks/useSignMessage';
import { BIND_CHECK_PATHS, loginSignContent } from '@/config';
import useAccount from '@/hooks/useAccount';
import { useLocation } from 'react-router-dom';

/**
 * 账户状态初始化Hook
 * 只处理基础的钱包连接、切换和签名
 */
const useAccountBootstrap = () => {
  const { address, isSigned, isRegistered, isBinded  } = useAccount()
  const { signMessageAsync } = useSignMessage();
  const userStore = useUser();
  const { setAddress } = useStatic();
  const location = useLocation();
  // 检查当前路径是否需要绑定邀请码
  const needsBindCheck = useMemo(() => {
    const path = location.pathname;
    // 使用 includes 检查路径是否包含特定字符串
    return BIND_CHECK_PATHS.some(checkPath => path.includes(checkPath));
  }, [location.pathname]);

  // 当进入需要检查绑定状态的页面时，查询绑定状态
  useEffect(() => {
    if (address && isSigned && needsBindCheck && !isBinded) {
      // 只在状态未知时查询绑定状态
      userStore.checkBindStatus(address).catch(console.error);
    }
  }, [address, isSigned, needsBindCheck, isBinded]);

  console.log('address, isSigned, needsBindCheck, isBinded', address, isSigned, needsBindCheck, isBinded)

  // 跟踪上一个钱包地址
  const lastWalletAddress = useRef<string | null>(null);


  // 监听登录签名请求
  useEventListener('login_personal_message', async () => {
    if (!address) return;

    try {
      // 执行签名
      const signature = await signMessageAsync(loginSignContent);

      // 保存签名结果
      userStore.setSignature(address, signature as string);

      // 签名后获取用户基础信息
      userStore.fetchUserInfo(address).catch(console.error);
    } catch (error) {
      console.error("签名失败", error);
    }
  });

  // 清理函数
  useEffect(() => {
    if (!address) return;

    setAddress(address);
    userStore.setActiveAddress(address);

    const unwatch = watchAccount(config, {
      onChange(account: any) {

        const newAddress = account?.address;
        if (newAddress !== lastWalletAddress.current) {
          if (newAddress) {
            // 连接了新钱包地址
            setAddress(newAddress);
            userStore.setActiveAddress(newAddress);
          } else {
            // 断开了钱包连接
            userStore.setActiveAddress(undefined);
          }

          lastWalletAddress.current = newAddress;
        }
      },
    });

    return () => {
      unwatch();
    };
  }, [address]);

  return null;
};

export default useAccountBootstrap;