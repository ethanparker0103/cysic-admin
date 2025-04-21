import { useState, useEffect, useMemo } from "react";
import { X, ArrowLeft, ArrowRight, Check, AlertCircle } from "lucide-react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import useModalState from "@/hooks/useModalState";
import useUser from "@/models/user";
import Copy from "@/components/Copy";
import { erc20Abi, formatUnits, parseUnits } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { useWriteContract } from "@/hooks/useWriteContract";
import { purchaseChainId, USDC, purchaseNftContract, purchaseNftAbi } from "@/config";

// NFT 信息接口
interface NFTInfo {
    id: string;
    name: string;
    rewards: string;
    lock: string;
    price: string;
    supply: string;
    chip: string;
    computingPower: string;
    image?: string;
    tokenId: string;
}

// 优惠券类型
interface Voucher {
    code: string;
    discount: string;
}

// 模式选择选项
interface PurposeOption {
    id: string;
    title: string;
    description: string;
    selected?: boolean;
}

// 购买步骤枚举
enum PurchaseStep {
    DETAILS = 0,
    PURPOSE = 1,
    CONFIRMATION = 2
}

const PurchaseNftModal = () => {
    // 获取模态框状态
    const { visible, setVisible, data } = useModalState({
        eventName: "modal_purchase_nft_visible",
    });

    // 用户钱包信息
    const { address: userAddress } = useAccount();

    // 当前步骤
    const [currentStep, setCurrentStep] = useState<PurchaseStep>(PurchaseStep.DETAILS);

    // 错误消息
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [totalPriceWei, setTotalPriceWei] = useState<bigint>(BigInt(0));

    // NFT 数据
    const [nft, setNft] = useState<NFTInfo | null>(null);

    // 表单数据
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>({ code: "10% OFF", discount: "10%" });
    const [totalPrice, setTotalPrice] = useState<string>("0");

    // 用途选项
    const [purposeOptions, setPurposeOptions] = useState<PurposeOption[]>([
        {
            id: "zk",
            title: "CYSIC ZK",
            description: "Become a Cysic ZK Prover (free of staking) and start earning CYS/CGT now.",
            selected: true,
        },
        {
            id: "ai",
            title: "CYSIC AI",
            description: "Support Cysic AI and earn a share of future AI-generated rewards.",
        },
        {
            id: "mining",
            title: "CYSIC MINING",
            description: "Support Cysic Mining and get extra token rewards after miner launches.",
        }
    ]);

    // 邀请码
    const { inviteCode } = useUser();

    // 使用正确的自定义useWriteContract钩子
    const { writeContractAsync } = useWriteContract();

    // 使用useReadContracts获取余额和授权信息
    const { data: contractsData, isLoading: isContractsLoading, refetch: refetchContractsData } = useReadContracts({
        contracts: userAddress ? [
            {
                address: USDC[purchaseChainId] as `0x${string}`,
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [userAddress as `0x${string}`],
                chainId: purchaseChainId,
            },
            {
                address: USDC[purchaseChainId] as `0x${string}`,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [
                    userAddress as `0x${string}`,
                    purchaseNftContract[purchaseChainId] as `0x${string}`,
                ],
                chainId: purchaseChainId,
            },
        ] : [],
        query: {
            enabled: !!userAddress && visible,
        },
    });

    // 从contractsData中获取余额和授权信息
    const balance = contractsData?.[0]?.result as bigint || BigInt(0);
    const allowance = contractsData?.[1]?.result as bigint || BigInt(0);
    
    // 格式化的余额(用于显示)
    const formattedBalance = formatUnits(balance, 18); // USDC的小数位数

    // 使用useMemo计算是否需要授权和余额是否足够
    const { needApprove, hasInsufficientBalance } = useMemo(() => {
        // 如果没有用户地址或NFT数据，或者正在加载合约数据，返回默认值
        if (!userAddress || !nft || isContractsLoading) {
            return { needApprove: false, hasInsufficientBalance: false };
        }

        // 检查余额是否足够
        const insufficientBalance = balance < totalPriceWei;
        
        // 检查授权额度是否足够
        const needApproval = allowance < totalPriceWei;
        
        return { 
            needApprove: needApproval, 
            hasInsufficientBalance: insufficientBalance 
        };
    }, [userAddress, nft, isContractsLoading, balance, allowance, totalPriceWei]);

    // 在弹窗打开时初始化状态
    useEffect(() => {
        if (visible && data?.nft) {
            setNft(data.nft);
            setTotalPrice(data.nft.price);

            // 如果有指定的初始步骤
            if (data.step !== undefined) {
                setCurrentStep(data.step);
            } else {
                setCurrentStep(PurchaseStep.DETAILS);
            }
            
            // 清除错误消息
            setErrorMessage("");
        }
    }, [visible, data]);

    // 当余额不足时设置错误消息
    useEffect(() => {
        if (hasInsufficientBalance) {
            setErrorMessage(`Insufficient USDC balance. You have ${formattedBalance} USDC, but need ${totalPrice} USDC.`);
        } else {
            setErrorMessage("");
        }
    }, [hasInsufficientBalance, formattedBalance, totalPrice]);

    // 计算总价格
    useEffect(() => {
        if (!nft) return;

        // 简单实现，实际逻辑可能更复杂
        let price = parseFloat(nft.price) * quantity;
        if (selectedVoucher) {
            const discount = parseInt(selectedVoucher.discount);
            price = price * (1 - discount / 100);
        }
        const priceString = price.toFixed(0);
        setTotalPrice(priceString);
        
        // 转换为wei格式
        try {
            const newPriceWei = parseUnits(priceString, 6);
            setTotalPriceWei(newPriceWei);
        } catch (error) {
            console.error("Error parsing price:", error);
        }
    }, [quantity, selectedVoucher, nft]);

    // 处理授权操作
    const handleApprove = async () => {
        if (!userAddress || !nft) return;

        try {
            await writeContractAsync({
                address: USDC[purchaseChainId] as `0x${string}`,
                abi: erc20Abi,
                functionName: 'approve',
                args: [purchaseNftContract[purchaseChainId] as `0x${string}`, totalPriceWei],
                chainId: purchaseChainId,
            });

            // 授权成功后重新获取授权情况
            await refetchContractsData();
        } catch (error) {
            console.error("Approval error:", error);
            setErrorMessage(`Failed to approve USDC: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    // 处理购买操作
    const handlePurchase = async () => {
        if (!userAddress || !nft || !nft.id) return;

        try {
            const purposeData = '0x'

            await writeContractAsync({
                address: purchaseNftContract[purchaseChainId] as `0x${string}`,
                abi: purchaseNftAbi,
                functionName: 'userMint',
                args: [nft.id, quantity, purposeData],
                chainId: purchaseChainId,
            });

            // 购买成功，显示确认页面
            setCurrentStep(PurchaseStep.CONFIRMATION);
        } catch (error) {
            console.error("Purchase error:", error);
            setErrorMessage(`Failed to purchase NFT: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    // 选择用途
    const handlePurposeSelect = (id: string) => {
        setPurposeOptions(
            purposeOptions.map(option => ({
                ...option,
                selected: option.id === id
            }))
        );
    };

    // 继续购买
    const handleContinue = async () => {
        setErrorMessage("");
        
        if (currentStep === PurchaseStep.DETAILS) {
            // 进入第二步前重新检查余额和授权
            await refetchContractsData();
            setCurrentStep(PurchaseStep.PURPOSE);
        } else if (currentStep === PurchaseStep.PURPOSE) {
            // 根据是否需要授权执行不同操作
            if (needApprove) {
                await handleApprove();
            } else {
                await handlePurchase();
            }
        }
    };

    // 返回上一步
    const handleBack = () => {
        if (currentStep === PurchaseStep.PURPOSE) {
            setCurrentStep(PurchaseStep.DETAILS);
        }
    };

    // 关闭模态框并重置状态
    const handleClose = () => {
        setVisible(false);
        setTimeout(resetState, 300);
    };

    // 重置所有状态
    const resetState = () => {
        setCurrentStep(PurchaseStep.DETAILS);
        setQuantity(1);
        setSelectedVoucher({ code: "10% OFF", discount: "10%" });
        setPurposeOptions(purposeOptions.map(option => ({
            ...option,
            selected: option.id === "zk"
        })));
        setErrorMessage("");
    };

    // 获取当前步骤对应的标题
    const getModalTitle = () => {
        switch (currentStep) {
            case PurchaseStep.DETAILS:
                return "PURCHASE NFT";
            case PurchaseStep.PURPOSE:
                return "PLEASE SELECT YOUR PURPOSE";
            case PurchaseStep.CONFIRMATION:
                return "PURCHASE CONFIRMATION";
            default:
                return "PURCHASE NFT";
        }
    };

    // 获取按钮文本 - 极简版
    const getContinueButtonText = () => {
        if (currentStep === PurchaseStep.DETAILS) {
            return "CONTINUE TO PURCHASE";
        }
        
        return needApprove ? "APPROVE USDC" : "COMPLETE PURCHASE";
    };

    return (
        <Modal
            isOpen={visible}
            onClose={handleClose}
            title={getModalTitle()}
            className="max-w-4xl"
        >
            {nft ? (
                <>
                    {/* 错误消息展示 */}
                    {errorMessage && (
                        <div className="bg-red-900/20 border border-red-500 rounded-md p-3 mb-4 flex items-start">
                            <AlertCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                            <div className="text-red-300">{errorMessage}</div>
                        </div>
                    )}

                    {/* 第一步：NFT 详情 */}
                    {currentStep === PurchaseStep.DETAILS && (
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* 左侧图片和详细参数 */}
                            <div className="md:w-1/3">
                                <div className="w-full aspect-square bg-sub rounded-md mb-4">
                                    {nft.image && <img src={nft.image} alt={nft.name} className="w-full h-full object-cover rounded-md" />}
                                </div>
                                <div className="border-t border-gray-700 pt-4 mt-2">
                                    <h3 className="text-lg font-light mb-4">Detailed Parameters</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sub">Chip</span>
                                            <span className="text-white">{nft.chip}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sub">Computing Power</span>
                                            <span className="text-white">{nft.computingPower}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 右侧详情和购买选项 */}
                            <div className="md:w-2/3">
                                <h1 className="title text-4xl !font-[300] mb-4">{nft.name}</h1>

                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-sub">Supply</span>
                                    <span className="text-white">{nft.supply}</span>
                                </div>

                                <div className="mb-6">
                                    <div className="text-3xl text-white">{nft.rewards} <span className="text-sub">CYS</span></div>
                                    <div className="text-sub mt-1">{nft.lock}</div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sub mb-2">Quantity</label>
                                        <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
                                            <input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(Number(e.target.value))}
                                                min="1"
                                                className="bg-[#0E0E0E] text-white px-4 py-3 w-full focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sub mb-2">Voucher</label>
                                        <div className="bg-[#0E0E0E] border border-gray-700 rounded-md p-4 flex justify-between items-center">
                                            <span className="text-white">{selectedVoucher?.code || "No voucher"}</span>
                                            <span>▼</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-8 mb-6">
                                    <span className="text-xl text-sub">Total Price</span>
                                    <span className="text-3xl text-white">{totalPrice} USDC</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 第二步：选择用途 */}
                    {currentStep === PurchaseStep.PURPOSE && (
                        <div>
                            <button onClick={handleBack} className="flex items-center text-white mb-6">
                                <ArrowLeft size={20} className="mr-2" />
                                <span>Back</span>
                            </button>

                            <p className="text-sub mb-6">You will unlock additional benifits based on the category that you choose</p>

                            <div className="space-y-2 mb-6">
                                {purposeOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className={`border ${option.selected ? 'border-blue-500' : 'border-gray-700'} rounded-lg p-6 cursor-pointer`}
                                        onClick={() => handlePurposeSelect(option.id)}
                                    >
                                        <div className="flex items-center mb-1">
                                            <div className={`w-6 h-6 rounded-full border ${option.selected ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} flex items-center justify-center mr-3`}>
                                                {option.selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                            </div>
                                            <h3 className="!font-[300] text-base title">{option.title}</h3>
                                        </div>
                                        <p className="text-sm !font-[400] ml-9">{option.description}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 className="text-white mb-2">Summary</h3>
                            <div className="border-t border-gray-700 pt-2">
                                <div className="space-y-1 mb-6 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-sub">Price</span>
                                        <span className="text-white">{nft.price} USDC</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sub">Quantity</span>
                                        <span className="text-white">{quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sub">Voucher</span>
                                        <span className="text-white">{selectedVoucher?.discount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sub">Total Price</span>
                                        <span className="text-white">{totalPrice} USDC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 第三步：购买确认 */}
                    {currentStep === PurchaseStep.CONFIRMATION && (
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* 左侧图片 */}
                            <div className="md:w-1/3">
                                <div className="w-full aspect-square bg-sub rounded-md">
                                    {nft.image && <img src={nft.image} alt={nft.name} className="w-full h-full object-cover rounded-md" />}
                                </div>
                            </div>

                            {/* 右侧确认信息 */}
                            <div className="md:w-2/3 flex flex-col">
                                <h1 className="title text-4xl !font-[300] mb-2">{nft.name} x{quantity}</h1>
                                <h2 className="text-2xl text-white mb-8">Purchase Confirmed!</h2>

                                <div className="bg-[#0E0E0E] border border-gray-700 rounded-lg p-6 mb-6">
                                    <p className="text-sub text-center mb-2">Invite Code</p>
                                    <div className="flex justify-center items-center">
                                        <Copy value={inviteCode || ''} className="text-4xl text-white mr-3">{inviteCode}</Copy>
                                    </div>
                                </div>

                                <p className="text-sub text-center mb-8">*Valid for all services within Cysic Space</p>

                                <div className="text-center mb-8">
                                    <p className="text-white text-lg mb-2">
                                        At this moment, you have become a part of <span className="text-blue-400">Cysic ZK Prover</span>!
                                    </p>
                                    <p className="text-white">Your NFT has already started generating rewards for you!</p>
                                </div>

                                <Button
                                    type="light"
                                    className="flex items-center justify-center gap-2 w-full rounded-lg py-4"
                                >
                                    PLEASE CLICK HERE TO FURTHER EXPLORE CYSIC ZK
                                    <ArrowRight size={20} />
                                </Button>

                                <p className="text-center text-white mt-6">
                                    And you can always visit the <span className="text-blue-400">User Portal - Cysic ZK</span> to
                                    view all your NFTs and earning information.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 底部按钮 - 仅在第一步和第二步显示 */}
                    {(currentStep === PurchaseStep.DETAILS || currentStep === PurchaseStep.PURPOSE) && (
                        <div className="mt-8">
                            <Button
                                needLoading
                                type="light"
                                className="w-full py-4 rounded-lg text-base font-medium"
                                onClick={handleContinue}
                                disabled={hasInsufficientBalance}
                            >
                                {getContinueButtonText()}
                            </Button>
                            {userAddress && (
                                <div className="mt-4 flex justify-end items-center gap-2">
                                    <span className="text-sub">Your USDC Balance:</span>
                                    <span className={hasInsufficientBalance ? "text-red-500" : "text-white"}>
                                        {formattedBalance} USDC
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="p-4 text-center text-sub">
                    Loading NFT information...
                </div>
            )}
        </Modal>
    );
};

export default PurchaseNftModal;