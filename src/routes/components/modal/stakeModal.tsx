import { useState, useEffect } from "react";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import { ChevronDown, ChevronUp, Wallet } from "lucide-react";
import Button from "@/components/Button";
import { getImageUrl, showStatusModal } from "@/utils/tools";
import { Slider } from "@nextui-org/react";
import { StatusType } from "./statusModal"; // 导入状态类型枚举

// 操作类型枚举
enum StakeAction {
    STAKE = "STAKE",
    UNSTAKE = "UNSTAKE"
}

// 验证人选项卡
enum ValidatorTab {
    MY_VALIDATORS = "MY_VALIDATORS",
    OTHERS = "OTHERS"
}

// 验证人数据接口
interface IValidator {
    id: string;
    name: string;
    logo: string;
    shortName: string;
    apr: string;
}

// 自定义滚动条组件
const PercentageSlider = ({ value, onChange }: { value: number, onChange: (value: number) => void }) => {
    return (
        <div className="px-2 mt-4">
            <div className="relative pt-6 pb-10">
                <Slider
                    size="sm"
                    step={1}
                    minValue={0}
                    maxValue={100}
                    value={value}
                    onChange={(val) => onChange(val as number)}
                    classNames={{
                        base: "max-w-full",
                        track: "bg-[#333] h-2",
                        filler: "bg-gradient-to-r from-blue-400 to-cyan-400 h-2",
                        thumb: "bg-cyan-400 shadow-lg w-4 h-4 -top-1",
                        mark: "bg-[#666] data-[active=true]:bg-cyan-400",
                    }}
                    showSteps={false}
                    marks={[
                        { value: 0, label: "0%" },
                        { value: 25, label: "25%" },
                        { value: 50, label: "50%" },
                        { value: 75, label: "75%" },
                        { value: 100, label: "100%" },
                    ]}
                    renderThumb={(props) => (
                        <div
                            {...props}
                            className="group absolute h-4 w-4 rounded-full bg-cyan-400 cursor-pointer z-10"
                        />
                    )}
                />
                
         
            </div>
        </div>
    );
};

// 自定义下拉框组件
const ValidatorDropdown = ({ 
    selectedValidator, 
    onSelect,
    isOpen,
    onOpenChange
}: { 
    selectedValidator: IValidator | null, 
    onSelect: (validator: IValidator) => void,
    isOpen: boolean,
    onOpenChange: (isOpen: boolean) => void
}) => {
    const [validatorTab, setValidatorTab] = useState<ValidatorTab>(ValidatorTab.MY_VALIDATORS);
    const [validators, setValidators] = useState<IValidator[]>([]);
    const [isLoadingValidators, setIsLoadingValidators] = useState(false);

    // 模拟验证人数据加载
    const fetchValidators = (tab: ValidatorTab) => {
        setIsLoadingValidators(true);
        
        // 模拟请求延迟
        setTimeout(() => {
            if (tab === ValidatorTab.MY_VALIDATORS) {
                // 假设我的验证人为空
                setValidators([]);
            } else {
                // 其他验证人有数据
                setValidators([
                    {
                        id: "1",
                        name: "TierSync",
                        logo: "TG",
                        shortName: "TG",
                        apr: "10.34%"
                    },
                    {
                        id: "2",
                        name: "PXerSync",
                        logo: "PX",
                        shortName: "PX",
                        apr: "10.34%"
                    }
                ]);
            }
            setIsLoadingValidators(false);
        }, 500);
    };

    // 初始加载
    useEffect(() => {
        if (isOpen) {
            fetchValidators(validatorTab);
        }
    }, [isOpen]);

    // 处理验证人Tab切换
    const handleValidatorTabChange = (tab: ValidatorTab) => {
        setValidatorTab(tab);
        fetchValidators(tab);
    };

    return (
        <div className="relative">
            <div 
                className="flex justify-between items-center bg-transparent border border-[#333] rounded-lg p-4 cursor-pointer"
                onClick={() => onOpenChange(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    {selectedValidator ? (
                        <>
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                {selectedValidator.shortName}
                            </div>
                            <span className="text-white">{selectedValidator.name}</span>
                        </>
                    ) : (
                        <span className="text-[#777]">ASDFGHJKL</span>
                    )}
                </div>
                <div>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-black border border-[#333] rounded-lg overflow-hidden">
                    <div className="p-4">
                        <h3 className="text-white text-xl mb-4">VALIDATOR</h3>
                        
                        {/* 验证人选项卡 */}
                        <div className="grid grid-cols-2 rounded-lg overflow-hidden mb-4">
                            <button
                                className={`py-3 uppercase text-center text-base ${
                                    validatorTab === ValidatorTab.MY_VALIDATORS
                                        ? "bg-white text-black"
                                        : "bg-[#1E1E1E] text-[#777]"
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation(); // 阻止事件冒泡
                                    handleValidatorTabChange(ValidatorTab.MY_VALIDATORS);
                                }}
                            >
                                MY VALIDATORS
                            </button>
                            <button
                                className={`py-3 uppercase text-center text-base ${
                                    validatorTab === ValidatorTab.OTHERS
                                        ? "bg-white text-black"
                                        : "bg-[#1E1E1E] text-[#777]"
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation(); // 阻止事件冒泡
                                    handleValidatorTabChange(ValidatorTab.OTHERS);
                                }}
                            >
                                OTHERS
                            </button>
                        </div>
                        
                        {/* 加载状态 */}
                        {isLoadingValidators ? (
                            <div className="text-center text-white py-8">
                                Loading validators...
                            </div>
                        ) : (
                            <>
                                {/* 验证人列表头部 - 仅在有数据时显示 */}
                                {validators.length > 0 && (
                                    <div className="flex justify-between items-center bg-[#111] p-3 rounded-md mb-2">
                                        <div className="text-white">Validator</div>
                                        <div className="text-white">Expected APR</div>
                                    </div>
                                )}
                                
                                {/* 验证人列表或空状态 */}
                                {validators.length > 0 ? (
                                    <div className="max-h-[200px] overflow-y-auto">
                                        {validators.map((validator) => (
                                            <div 
                                                key={validator.id}
                                                className="flex justify-between items-center p-3 cursor-pointer hover:bg-[#111] rounded-md"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // 阻止事件冒泡
                                                    onSelect(validator);
                                                }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-8 h-8 rounded-full ${validator.shortName === 'TG' ? 'bg-blue-500' : 'bg-purple-500'} flex items-center justify-center text-white`}>
                                                        {validator.shortName}
                                                    </div>
                                                    <span className="text-white">{validator.name}</span>
                                                </div>
                                                <div className="text-white">{validator.apr}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // 空状态显示
                                    <div className="text-center text-white py-10">
                                        My Validators not found
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    
                    <div className="flex justify-between items-center px-4 py-2 border-t border-[#333]">
                        <div className="text-[#777]">Unbonding period</div>
                        <div className="text-white">21 Days</div>
                    </div>
                </div>
            )}
        </div>
    );
};

const StakeModal = () => {
    // 获取模态框状态
    const { visible, setVisible, data }: any = useModalState({
        eventName: "modal_stake_visible",
    });

    // 状态管理
    const [activeTab, setActiveTab] = useState<StakeAction>(StakeAction.STAKE);
    const [selectedValidator, setSelectedValidator] = useState<IValidator | null>(null);
    const [showValidatorList, setShowValidatorList] = useState(false);
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState("1,000");
    const [stakePercentage, setStakePercentage] = useState(0);
    const [redemptionAmount, setRedemptionAmount] = useState("1,000.00 CYS");
    const [totalEarnings, setTotalEarnings] = useState("123.00 CYS");
    const [estimatedArrivalTime, setEstimatedArrivalTime] = useState("Nov 12, 2025 08:00");

    // 在弹窗打开时初始化状态
    useEffect(() => {
        if (visible) {
            // 如果有指定的初始选项卡
            if (data?.tab && (data.tab === "stake" || data.tab === "unstake")) {
                setActiveTab(data.tab === "stake" ? StakeAction.STAKE : StakeAction.UNSTAKE);
            }
            
            // 如果有指定的初始验证人
            if (data?.validator) {
                const mockValidators = [
                    {
                        id: "1",
                        name: "TierSync",
                        logo: "TG",
                        shortName: "TG",
                        apr: "10.34%"
                    },
                    {
                        id: "2",
                        name: "PXerSync",
                        logo: "PX",
                        shortName: "PX",
                        apr: "10.34%"
                    }
                ];
                const validator = mockValidators.find(v => v.id === data.validator);
                if (validator) {
                    setSelectedValidator(validator);
                }
            }
            
            // 如果有指定的初始金额
            if (data?.amount) {
                setAmount(data.amount.toString());
                calculatePercentage(data.amount.toString());
            }
        }
    }, [visible, data]);

    // 处理Tab切换
    const handleTabChange = (tab: StakeAction) => {
        setActiveTab(tab);
    };

    // 处理金额变更
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(value);
        calculatePercentage(value);
    };

    // 计算质押百分比
    const calculatePercentage = (amountStr: string) => {
        const cleanAmount = parseFloat(amountStr.replace(/,/g, "")) || 0;
        const cleanBalance = parseFloat(balance.replace(/,/g, "")) || 1;
        const percentage = Math.min(Math.max((cleanAmount / cleanBalance) * 100, 0), 100);
        setStakePercentage(percentage);
    };

    // 设置最大金额
    const handleSetMax = () => {
        setAmount(balance);
        setStakePercentage(100);
    };

    // 处理百分比选择
    const handlePercentageSelect = (value: number) => {
        setStakePercentage(value);
        const cleanBalance = parseFloat(balance.replace(/,/g, "")) || 0;
        const newAmount = (cleanBalance * (value / 100)).toFixed(2);
        setAmount(newAmount);
    };

    // 处理质押操作
    const handleStake = async () => {
        if (!selectedValidator) return;
        
        try {
            console.log(`Staking ${amount} CGT to ${selectedValidator.name}`);
            
            // 先显示加载状态
            showStatusModal({
                type: StatusType.LOADING,
                message: `Staking ${amount} CGT to ${selectedValidator.name}, Confirm this tx in your wallet`
            });
            
            // 模拟交易过程（实际场景中这里应该是真实的交易）
            setTimeout(() => {
                // 模拟交易成功
                const mockTxHash = "0x" + Math.random().toString(16).substr(2, 64);
                
                // 显示成功状态
                showStatusModal({
                    type: StatusType.SUCCESS,
                    title: "Transaction Submitted",
                    chainName: "CYSIC CHAIN",
                    txHash: mockTxHash
                });
                
                // 关闭质押模态框
                setVisible(false);
                resetState();
            }, 3000);
        } catch (error) {
            console.error("Error staking:", error);
            
            // 显示错误状态
            showStatusModal({
                type: StatusType.ERROR,
                title: "Transaction Failed",
                message: "The transaction was not processed correctly. Please try again.",
                onRetry: () => handleStake() // 重试时重新执行质押操作
            });
        }
    };

    // 处理取消质押操作
    const handleUnstake = async () => {
        if (!selectedValidator) return;
        
        try {
            console.log(`Unstaking ${amount} CGT from ${selectedValidator.name}`);
            
            // 先显示加载状态
            showStatusModal({
                type: StatusType.LOADING,
                message: `Unstaking ${amount} CGT from ${selectedValidator.name}, Confirm this tx in your wallet`
            });
            
            // 模拟交易过程
            setTimeout(() => {
                // 随机模拟成功或失败
                const isSuccess = Math.random() > 0.5;
                
                if (isSuccess) {
                    // 模拟交易成功
                    const mockTxHash = "0x" + Math.random().toString(16).substr(2, 64);
                    
                    // 显示成功状态
                    showStatusModal({
                        type: StatusType.SUCCESS,
                        title: "Unstake Successful",
                        chainName: "CYSIC CHAIN",
                        txHash: mockTxHash
                    });
                } else {
                    // 模拟用户取消签名
                    showStatusModal({
                        type: StatusType.ERROR,
                        title: "User Cancel Signature",
                        message: "You have cancelled the transaction signature.",
                        onRetry: () => handleUnstake() // 重试时重新执行取消质押操作
                    });
                }
                
                // 关闭质押模态框
                setVisible(false);
                resetState();
            }, 3000);
        } catch (error) {
            console.error("Error unstaking:", error);
            
            // 显示错误状态
            showStatusModal({
                type: StatusType.ERROR,
                title: "Transaction Failed",
                message: "The transaction was not processed correctly. Please try again.",
                onRetry: () => handleUnstake() // 重试时重新执行取消质押操作
            });
        }
    };

    // 关闭模态框并重置状态
    const handleClose = () => {
        setVisible(false);
        resetState();
    };

    // 重置所有状态
    const resetState = () => {
        setAmount("");
        setStakePercentage(0);
        setShowValidatorList(false);
        // 保留其他状态以便下次打开时显示
    };

    return (
        <Modal
            isOpen={visible}
            onClose={handleClose}
            title="STAKE"
            className="max-w-[600px]"
        >
            {/* 选项卡头部 */}
            <div className="grid grid-cols-2 rounded-lg overflow-hidden mb-6">
                <button
                    className={`py-4 uppercase text-center text-base ${
                        activeTab === StakeAction.STAKE
                            ? "bg-white text-black"
                            : "bg-[#1E1E1E] text-[#777]"
                    }`}
                    onClick={() => handleTabChange(StakeAction.STAKE)}
                >
                    STAKE
                </button>
                <button
                    className={`py-4 uppercase text-center text-base ${
                        activeTab === StakeAction.UNSTAKE
                            ? "bg-white text-black"
                            : "bg-[#1E1E1E] text-[#777]"
                    }`}
                    onClick={() => handleTabChange(StakeAction.UNSTAKE)}
                >
                    UNSTAKE
                </button>
            </div>

            {/* 代币选择 - 目前只有CGT */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-white text-base">Token</div>
                <div className="text-white text-base">CGT</div>
            </div>

            {/* 验证人选择 - 使用自定义下拉框组件 */}
            <div className="mb-4">
                <div className="text-white text-base mb-2">Validator</div>
                <ValidatorDropdown 
                    selectedValidator={selectedValidator}
                    onSelect={(validator) => {
                        setSelectedValidator(validator);
                        setShowValidatorList(false);
                    }}
                    isOpen={showValidatorList}
                    onOpenChange={setShowValidatorList}
                />
            </div>

            {activeTab === StakeAction.STAKE ? (
                <>
                    {/* 质押金额输入 */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-white">Staking Amount</div>
                            <div className="flex items-center text-white">
                                <Wallet size={16} className="mr-2" />
                                Balance: {balance}
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-transparent border border-[#333] rounded-lg p-4">
                            <input
                                type="text"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="ENTER"
                                className="bg-transparent border-none outline-none w-full text-white"
                            />
                            <button
                                className="bg-transparent border border-white rounded-full px-4 py-2 text-white"
                                onClick={handleSetMax}
                            >
                                MAX
                            </button>
                        </div>
                    </div>

                    {/* 质押百分比选择器 - 使用自定义滚动条组件 */}
                    <PercentageSlider 
                        value={stakePercentage}
                        onChange={handlePercentageSelect}
                    />

                    {/* 质押信息 */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                            <div className="text-[#777]">APR</div>
                            <div className="text-white">12.34%</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-[#777]">Voting Power</div>
                            <div className="text-white">5%</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-[#777]">Commission rate</div>
                            <div className="text-white">10%</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-[#777]">Unbonding period</div>
                            <div className="text-white">21 Days</div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* 取消质押金额输入 */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-white">Amount</div>
                            <div className="flex items-center text-white">
                                <Wallet size={16} className="mr-2" />
                                Amount to unstake: {balance}
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-transparent border border-[#333] rounded-lg p-4">
                            <input
                                type="text"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="0.00"
                                className="bg-transparent border-none outline-none w-full text-white"
                            />
                            <button
                                className="bg-transparent border border-white rounded-full px-4 py-2 text-white"
                                onClick={handleSetMax}
                            >
                                MAX
                            </button>
                        </div>
                    </div>

                    {/* 质押百分比选择器 - 使用自定义滚动条组件 */}
                    <PercentageSlider 
                        value={stakePercentage}
                        onChange={handlePercentageSelect}
                    />

                    {/* 取消质押信息 */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                            <div className="text-[#777]">Redemption Amount</div>
                            <div className="text-white">{redemptionAmount}</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-[#777]">Total Earnings</div>
                            <div className="text-white">{totalEarnings}</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-[#777]">Estimated Arrival Time</div>
                            <div className="text-white">{estimatedArrivalTime}</div>
                        </div>
                    </div>
                </>
            )}

            {/* 操作按钮 */}
            <Button
                type="light"
                className="w-full py-4 rounded-lg text-base"
                onClick={activeTab === StakeAction.STAKE ? handleStake : handleUnstake}
                disabled={!amount || !selectedValidator}
            >
                {activeTab === StakeAction.STAKE ? "STAKE" : "UNSTAKE"}
            </Button>
        </Modal>
    );
};

export default StakeModal;