import { useState, useEffect } from "react";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import { ArrowRight, Upload } from "lucide-react";
import DigitInputs from "@/components/DigitInputs";
import Button from "@/components/Button";
import Copy from "@/components/Copy";
import { shortStr } from "@/utils/tools";
import useUser from "@/models/user";
import { useAppKit } from "@reown/appkit/react";
import useAccount from "@/hooks/useAccount";
import axios from "@/service";

// 流程状态枚举
enum SignInStep {
    INVITE_CODE = 1, // 邀请码验证步骤
    USER_INFO = 2,   // 用户信息设置步骤
    COMPLETED = 3    // 完成状态
}

const SignInModal = () => {
    const { walletAddress, isConnectedOnly } = useAccount();
    const { open } = useAppKit();

    // 获取模态框状态，包括可能传入的步骤信息
    const { visible, setVisible, data } = useModalState({
        eventName: "modal_signin_visible",
    });

    // 用户状态管理
    const {
        verifyInviteCode,
        fetchUserInfo,
        registerUser,
        inviteCode: savedInviteCode,
        isRegistered,
        registrationComplete,
        name: savedName,
        avatarUrl: savedAvatarUrl
    } = useUser();

    // 控制当前步骤
    const [step, setStep] = useState<SignInStep>(SignInStep.INVITE_CODE);
    
    // 错误状态
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // 邀请码状态
    const [inviteCode, setInviteCode] = useState("");

    // 第二步表单数据
    const [formData, setFormData] = useState({
        logo: null as File | null,
        name: "",
        agreeTerms: false
    });

    // 在useEffect中检查是否有指定的步骤，并预填表单
    useEffect(() => {
        if (visible) {
            if (data?.step === 'profile' && walletAddress && isRegistered && !registrationComplete) {
                // 如果指定了'profile'步骤且用户状态允许，直接跳到第二步
                setStep(SignInStep.USER_INFO);
            }
            
            // 预填表单数据
            if (savedName) {
                setFormData(prev => ({...prev, name: savedName}));
            }
        }
    }, [visible, data, walletAddress, isRegistered, registrationComplete, savedName]);

    // 当已连接钱包且输入了完整邀请码时，自动尝试绑定
  useEffect(() => {
        if (visible && walletAddress && inviteCode.length === 5 && step === SignInStep.INVITE_CODE) {
            bindWalletWithCode();
        }
    }, [visible, walletAddress, inviteCode, step]);

    // 处理邀请码改变
    const handleCodeChange = (code: string) => {
        setInviteCode(code);
        setError(null);
    };

    // 连接钱包
    const handleConnectWallet = async () => {
        setError(null);
        setLoading(true);
        try {
            open();
        } catch (error) {
            console.error("Error opening wallet:", error);
            setError("Failed to open wallet connector");
        } finally {
            setLoading(false);
        }
    };

    // 验证邀请码
    const bindWalletWithCode = async () => {
        if (inviteCode.length !== 5) return;
        setLoading(true);
        setError(null);

        try {
            // 确保钱包地址可用
            if (!walletAddress) {
                throw new Error("Wallet address not available");
            }

            // 验证邀请码
            const isValid = await verifyInviteCode(inviteCode, walletAddress);

            if (isValid) {
                // 查询用户信息
                const userInfo = await fetchUserInfo(walletAddress);

                if (userInfo && userInfo.registrationComplete) {
                    setStep(SignInStep.COMPLETED);
                } else {
                    setStep(SignInStep.USER_INFO);
                }
            } else {
                setError("Invalid invite code or binding failed");
            }
        } catch (error) {
            console.error("Error connecting wallet or verifying:", error);
            setError("Error while connecting wallet or verifying code");
        } finally {
            setLoading(false);
        }
    };

    // 处理社交账号登录
    const handleSocialLogin = (provider: string) => {
        setLoading(true);
        setError(null);
        
        try {
            // 这里应该接入社交登录API
            console.log(`Login with ${provider}`);
            
            // TODO: 接入实际的社交登录API
            // const response = await axios.post(`/api/v1/social/bind/${provider.toLowerCase()}`);
            // if (response.data.code === 10000) {
            //     // 登录成功，获取用户信息
            //     if (walletAddress) {
            //         await fetchUserInfo(walletAddress);
            //     }
            //     setStep(SignInStep.COMPLETED);
            // }
            
            setError(`${provider} login not yet implemented`);
        } catch (error) {
            console.error(`Error logging in with ${provider}:`, error);
            setError(`${provider} login failed`);
        } finally {
            setLoading(false);
        }
    };

    // 上传头像图片到服务器
    const uploadLogo = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await axios.post('/api/v1/upload', formData);
            if (response?.data?.code === 10000) {
                return response.data.data; // 服务器返回的图片URL
            }
            throw new Error('Upload failed');
        } catch (error) {
            console.error('Failed to upload avatar', error);
            throw error;
        }
    };

    // 处理表单提交
    const handleSubmit = async () => {
        if (!formData.name || !formData.agreeTerms) {
            setError("Please enter your name and agree to the terms");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 准备要上传的数据
            let avatarUrl;
            if (formData.logo) {
                avatarUrl = await uploadLogo(formData.logo);
            }

            // 注册/更新用户信息
            if (walletAddress) {
                const userData = {
                    name: formData.name,
                    avatarUrl: avatarUrl,
                    address: walletAddress,
                    inviteCode: savedInviteCode || inviteCode,
                    registrationComplete: true
                };

                const success = await registerUser(userData);
                if (success) {
                    setStep(SignInStep.COMPLETED);

                    // 自动关闭
                    setTimeout(() => {
                        setVisible(false);
                        resetState();
                    }, 2000);
                } else {
                    setError("Failed to update profile. Please try again.");
                }
      } else {
                setError("Wallet connection required");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Error updating profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // 处理跳过
    const handleSkip = async () => {
        setVisible(false);
    };

    // 处理图片上传
    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if(file){
            setFormData({ ...formData, logo: file });
        }
    };

    // 关闭模态框并重置状态
    const handleClose = () => {
        setVisible(false);
        resetState();
    };

    // 重置所有状态
    const resetState = () => {
        setStep(SignInStep.INVITE_CODE);
        setInviteCode("");
        setFormData({
            logo: null,
            name: "",
            agreeTerms: false
        });
        setError(null);
        setLoading(false);
    };

    // 验证邀请码按钮处理
    const handleVerifyInviteCode = () => {
        if (inviteCode.length === 5) {
            bindWalletWithCode();
        } else {
            setError("Please enter a complete 5-digit invite code");
        }
    };

  return (
    <Modal
            isDismissable={false}
      isOpen={visible}
            onClose={handleClose}
            title="SIGN IN"
            className="max-w-[600px]"
        >
            {/* 错误提示 */}
            {error && (
                <div className="bg-red-900/20 border border-red-500 px-4 py-2 rounded mb-4 text-red-300">
                    {error}
              </div>
            )}
        
            {step === SignInStep.INVITE_CODE && (
                // 第一步: 输入邀请码
                <div className="flex flex-col items-center space-y-6">
                    <h2 className="text-2xl font-light tracking-wider text-center">
                        {isConnectedOnly
                            ? "ENTER YOUR INVITE CODE TO CONTINUE"
                            : "ENTER YOUR INVITE CODE"}
                    </h2>

                    {/* 如果已连接钱包但未绑定邀请码，显示当前钱包地址 */}
                    {isConnectedOnly && walletAddress && (
                        <div className="text-center text-sub mb-2">
                            <p>Wallet connected</p>
                            <Copy value={walletAddress}>
                                <span className="font-mono">{shortStr(walletAddress, 10)}</span>
                            </Copy>
                        </div>
                    )}

                    {/* 使用DigitInputs组件 */}
                    <div className="">
                        <DigitInputs
                            className="text-lg w-12 h-[3.875rem] rounded-md border-[#FFFFFFCC] gap-2"
                            n={5}
                            value={inviteCode}
                            onValueChange={handleCodeChange}
                        />
                    </div>

                    {/* "已经加入"提示 - 只在未连接钱包时显示 */}
                    {!isConnectedOnly && (
                        <div className="text-sub my-6">
                            or Already Joined?
                        </div>
                    )}

                    {/* 登录选项 - 根据钱包连接状态调整 */}
                    <div className="w-full space-y-2">
                        {!isConnectedOnly && (
                            <>
                                <Button
                                    type="solid"
                                    className="font-[400] w-full h-16 bg-transparent border border-gray-600 rounded-lg text-white hover:bg-gray-800 transition-colors"
                                    onClick={() => handleSocialLogin('Google')}
                                    needLoading
                                    loading={loading}
                                >
                                    GOOGLE ACCOUNT
                                </Button>

                                <Button
                                    type="solid"
                                    className="font-[400] w-full h-16 bg-transparent border border-gray-600 rounded-lg text-white hover:bg-gray-800 transition-colors"
                                    onClick={() => handleSocialLogin('X')}
                                    needLoading
                                    loading={loading}
                                >
                                    X ACCOUNT
                                </Button>
                            </>
                        )}

                        {/* 连接钱包或验证邀请码按钮 */}
                        {isConnectedOnly ? (
                            <Button
                                type="light"
                                className="font-[400] w-full h-16 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                                onClick={handleVerifyInviteCode}
                                needLoading
                                loading={loading}
                                disabled={inviteCode.length < 5}
                            >
                                VERIFY INVITE CODE
                            </Button>
                        ) : (
                            <Button
                                type="light"
                                className="font-[400] w-full h-16 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                                onClick={handleConnectWallet}
                                needLoading
                                loading={loading}
                            >
                                CONNECT WALLET
                            </Button>
                        )}
            </div>

                    {/* 关于Cysic链接 */}
                    <div className="flex items-center text-sub mt-4 cursor-pointer hover:text-white transition-colors">
                        Read about Cysic
                        <ArrowRight size={16} className="ml-2" />
              </div>
              </div>
            )}

            {step === SignInStep.USER_INFO && (
                // 第二步: 设置个人信息
                <div className="flex flex-col space-y-6">
                    {/* Logo上传 - 显示为必填但验证时不必填 */}
                    <div className="space-y-2">
                        <label className="text-sub flex items-center">
                            <span className="text-red-500 mr-1">*</span> Logo
                        </label>
                        <div className="w-[7.5rem] h-[7.5rem] border border-gray-600 rounded flex items-center justify-center cursor-pointer relative bg-[#181818] group">
                            {formData.logo ? (
                                <>
                                    <img
                                        src={URL.createObjectURL(formData.logo)}
                                        alt="Logo preview"
                                        className="w-full h-full object-cover rounded"
                                    />
                                    {/* 添加悬停时显示的"EDIT"层 */}
                                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:backdrop-brightness-50 group-hover:opacity-100 transition-opacity duration-200 rounded">
                                        <span className="text-white font-medium">EDIT</span>
              </div>
                                </>
                            ) : savedAvatarUrl ? (
                                <>
                                    <img
                                        src={savedAvatarUrl}
                                        alt="Saved logo"
                                        className="w-full h-full object-cover rounded"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:backdrop-brightness-50 group-hover:opacity-100 transition-opacity duration-200 rounded">
                                        <span className="text-white font-medium">EDIT</span>
            </div>
                                </>
                            ) : (
                                <Upload size={24} className="text-white" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
          </div>
        </div>

                    {/* 名称输入 */}
                    <div className="space-y-2">
                        <label className="text-sub flex items-center">
                            <span className="text-red-500 mr-1">*</span> Name
                        </label>
                        <input
                            type="text"
                            placeholder="ENTER YOUR NAME HERE"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-4 border border-gray-600 rounded bg-[#181818] text-white focus:border-white focus:outline-none"
                        />
                    </div>

                    {/* 条款同意 */}
                    <div className="flex items-start space-x-3 mt-4">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={formData.agreeTerms}
                            onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                            className="mt-1"
                        />
                        <label htmlFor="terms" className="text-gray-300 text-sm">
                            By signing up, you agree to the Terms of Use and confirm that you are not a U.S. person,
                            do not reside in the United States, and are not located in any restricted jurisdiction.
                        </label>
                    </div>

                    {/* 提交和跳过按钮 - 只验证名称和条款同意 */}
                    <div className="space-y-4 mt-6">
                        <Button
                            type="light"
                            className="w-full h-14 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            onClick={handleSubmit}
                            needLoading
                            loading={loading}
                            disabled={!formData.name || !formData.agreeTerms}
                        >
                            SUBMIT
                        </Button>

                        <Button
                            type="solid"
                            className="w-full h-14 bg-transparent border border-gray-600 text-white rounded hover:bg-gray-800 transition-colors"
                            onClick={handleSkip}
                            needLoading
                            loading={loading}
                        >
                            SKIP FOR NOW
                        </Button>
                    </div>

                    {/* 已连接钱包提示 */}
                    {walletAddress && (
                        <div className="flex items-center justify-center text-sub text-sm mt-4">
                            <Copy value={walletAddress}>
                                <span>Connected as {shortStr(walletAddress, 10)}</span>
                            </Copy>
                        </div>
                    )}
                </div>
            )}

            {/* {step === SignInStep.COMPLETED && (
                // 完成状态
                <div className="flex flex-col items-center justify-center py-10 space-y-6">
                    <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-light text-center">Sign In Complete!</h2>
                    <p className="text-sub text-center">
                        You have successfully signed in to Cysic
                    </p>
                    <Button
                        type="light"
                        className="mt-4"
                        onClick={handleClose}
                    >
                        CONTINUE
                    </Button>
      </div>
            )} */}
    </Modal>
  );
};

export default SignInModal;