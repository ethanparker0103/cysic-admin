import { useAccount as useWagmiAccount } from 'wagmi';
import useUser from '@/models/user';
import useCosmos from '@/models/_global/cosmos';

/**
 * 扩展的账户钩子，支持多地址和状态管理
 * @returns 扩展的账户信息与状态
 */
const useAccount = () => {
  // 获取原始钱包连接状态
  const wagmiAccount = useWagmiAccount();
  const { address: cosmosAddress } = useCosmos();

  // 直接获取用户状态，而不是通过方法
  const userStore = useUser();
  const { activeAddress, addressMap, setState, setActiveAddress, getUserByAddress } = userStore;
  
  // 获取当前活跃用户信息
  const activeUser = activeAddress ? addressMap[activeAddress] : undefined;
  
  // 提取当前活跃用户相关状态
  const {
    address,
    signature,
    isSigned,
    isRegistered,
    isBinded,
    name,
    avatarUrl,
    inviteCode,
    balance,
    rewardList,
    socialAccountList,
    nftCnt,
    voucherCnt,
  } = activeUser || {};

  // 是否需要绑定邀请码 - 已签名但未注册
  const needBindInviteCode = !!isSigned && !isRegistered;
  
  // 是否已完成个人资料填写
  const hasCompleteProfile = !!name && !!avatarUrl;

  // 返回对象
  return {
    // 原始的wagmi账户信息
    ...wagmiAccount,
    
    // 钱包地址
    walletAddress: wagmiAccount.address,
    
    // 用户基本状态
    address: wagmiAccount.address,              // 当前连接的钱包地址
    activeAddress,                              // 当前活跃地址
    
    // 核心状态（简化后）
    isSigned: !!isSigned,                       // 是否已签名
    isRegistered: !!isRegistered,               // 是否已注册
    isBinded: !!isBinded,                       // 是否已绑定
    hasCompleteProfile,                         // 是否已完善资料
    signature,                                  // 签名内容
    needBindInviteCode,                         // 是否需要绑定邀请码
    
    // 个人信息
    name,
    avatarUrl,
    inviteCode,
    balance,
    rewardList,
    socialAccountList,
    nftCnt,
    voucherCnt,
    
    // 宇宙地址
    cosmosAddress,
    
    // 多地址支持 - 直接访问状态
    allAddresses: Object.keys(addressMap),      // 使用Object.keys直接获取地址列表
    addressMap,                                 // 暴露整个地址映射供需要时使用
    
    // 操作方法
    setActiveAddress,                           // 设置活跃地址
    getUserByAddress,                           // 获取特定地址的用户信息
    updateUserState: setState,                  // 更新用户状态
    
    // 当前用户对象，便于直接访问
    user: activeUser,
  };
};

export default useAccount;