// 钱包签名登录示例
// 这个文件展示了两种登录模式的使用方法

import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/tabs';
import { authApi } from '@/routes/pages/Admin/adminApi';

export const WalletSignExample = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // 手动输入模式的状态
  const [manualForm, setManualForm] = useState({
    address: '',
    signature: '',
  });
  
  // 钱包连接模式的状态
  const [walletAddress, setWalletAddress] = useState('');

  // 检查钱包是否可用
  const isWalletAvailable = () => {
    return typeof window !== 'undefined' && window.ethereum;
  };

  // 连接钱包并获取地址
  const connectWallet = async () => {
    if (!isWalletAvailable()) {
      setMessage('请安装 MetaMask 钱包');
      return null;
    }

    try {
      const accounts = await window.ethereum!.request({
        method: 'eth_requestAccounts',
      });
      setWalletAddress(accounts[0]);
      setMessage(`钱包连接成功: ${accounts[0]}`);
      return accounts[0];
    } catch (error) {
      console.error('连接钱包失败:', error);
      setMessage('连接钱包失败');
      return null;
    }
  };

  // 签名钱包地址
  const signAddress = async (address: string) => {
    if (!isWalletAvailable()) {
      throw new Error('钱包不可用');
    }

    try {
      const signature = await window.ethereum!.request({
        method: 'personal_sign',
        params: [address, address], // 签名自己的地址
      }) as unknown as string;
      return signature;
    } catch (error: unknown) {
      if ((error as { code?: number })?.code === 4001) {
        throw new Error('用户拒绝了签名请求');
      }
      throw new Error('签名失败');
    }
  };

  // 钱包登录流程
  const handleWalletLogin = async () => {
    try {
      setLoading(true);
      setMessage('');

      // 1. 连接钱包
      const address = await connectWallet();
      if (!address) return;

      // 2. 签名地址
      const signature = await signAddress(address);
      setMessage(`签名成功: ${signature.slice(0, 20)}...`);

      // 3. 调用登录接口
      const response = await authApi.login(address, signature);
      
      if (response.code === '200') {
        setMessage(`钱包登录成功! 用户ID: ${response.userId}`);
      } else {
        setMessage(`登录失败: ${response.msg}`);
      }
    } catch (error) {
      setMessage(`错误: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 手动输入登录
  const handleManualLogin = async () => {
    try {
      setLoading(true);
      setMessage('');

      if (!manualForm.address || !manualForm.signature) {
        setMessage('请输入钱包地址和签名');
        return;
      }

      const response = await authApi.login(manualForm.address, manualForm.signature);
      
      if (response.code === '200') {
        setMessage(`手动登录成功! 用户ID: ${response.userId}`);
      } else {
        setMessage(`登录失败: ${response.msg}`);
      }
    } catch (error) {
      setMessage(`错误: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">钱包签名登录示例</h3>
      
      <Tabs aria-label="登录方式" className="w-full">
        {/* 钱包登录模式 */}
        <Tab key="wallet" title="钱包登录">
          <div className="space-y-4 py-4">
            <Button
              color="primary"
              onClick={connectWallet}
              isLoading={loading}
              isDisabled={!isWalletAvailable()}
              className="w-full"
            >
              {isWalletAvailable() ? '连接钱包' : '请安装 MetaMask'}
            </Button>

            {walletAddress && (
              <Input
                label="钱包地址"
                value={walletAddress}
                readOnly
                className="font-mono text-sm"
              />
            )}

            <Button
              color="success"
              onClick={handleWalletLogin}
              isLoading={loading}
              isDisabled={!walletAddress}
              className="w-full"
            >
              签名并登录
            </Button>
          </div>
        </Tab>

        {/* 手动输入模式 */}
        <Tab key="manual" title="手动输入">
          <div className="space-y-4 py-4">
            <Input
              label="钱包地址"
              placeholder="请输入钱包地址"
              value={manualForm.address}
              onChange={(e) => setManualForm(prev => ({ 
                ...prev, 
                address: e.target.value 
              }))}
              className="font-mono text-sm"
            />

            <Input
              label="签名结果"
              placeholder="请输入签名结果"
              value={manualForm.signature}
              onChange={(e) => setManualForm(prev => ({ 
                ...prev, 
                signature: e.target.value 
              }))}
              className="font-mono text-sm"
            />

            <Button
              color="primary"
              onClick={handleManualLogin}
              isLoading={loading}
              isDisabled={!manualForm.address || !manualForm.signature}
              className="w-full"
            >
              登录
            </Button>
          </div>
        </Tab>
      </Tabs>

      {message && (
        <div className="p-3 bg-gray-100 rounded-md text-sm">
          {message}
        </div>
      )}

      <div className="text-xs text-gray-500">
        <p>• 钱包登录：自动连接钱包并签名</p>
        <p>• 手动输入：适用于离线环境</p>
        <p>• 签名内容：钱包地址本身</p>
        <p>• 确保钱包地址在管理员列表中</p>
      </div>
    </div>
  );
};

// 扩展 Window 接口
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: string[] }) => Promise<string[]>;
      isMetaMask?: boolean;
    };
  }
}
