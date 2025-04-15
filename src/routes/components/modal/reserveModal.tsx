import { useState, useEffect } from "react";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import { ArrowRight, X } from "lucide-react";
import Button from "@/components/Button";
import { getImageUrl } from "@/utils/tools";

// 操作类型枚举
enum ReserveAction {
    RESERVE = "RESERVE",
    WITHDRAW = "WITHDRAW"
}

const ReserveModal = () => {
    // 获取模态框状态
    const { visible, setVisible, data } = useModalState({
        eventName: "modal_reserve_visible",
    });

    // 状态管理
    const [activeTab, setActiveTab] = useState<ReserveAction>(ReserveAction.RESERVE);
    const [amount, setAmount] = useState("");
    const [reservedAmount, setReservedAmount] = useState("1,000.00");
    const [withdrawAmount, setWithdrawAmount] = useState("1,000.00");
    const [estimatedArrivalTime, setEstimatedArrivalTime] = useState("Nov 12 2024 08:00");

    // 在弹窗打开时初始化状态
    useEffect(() => {
        if (visible) {
            // 如果有指定的初始选项卡
            if (data?.tab && (data.tab === "reserve" || data.tab === "withdraw")) {
                setActiveTab(data.tab === "reserve" ? ReserveAction.RESERVE : ReserveAction.WITHDRAW);
            }
            
            // 如果有指定的初始金额
            if (data?.amount) {
                setAmount(data.amount.toString());
            }
        }
    }, [visible, data]);

    // 处理Tab切换
    const handleTabChange = (tab: ReserveAction) => {
        setActiveTab(tab);
    };

    // 处理金额变更
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 仅允许数字和小数点
        const value = e.target.value.replace(/[^0-9.]/g, "");
        setAmount(value);
    };

    // 处理预留操作
    const handleReserve = async () => {
        try {
            // 这里添加实际的质押逻辑
            console.log(`Reserving ${amount} CGT`);
            
            // 模拟成功后更新预留金额
            setReservedAmount(amount);
            
            // 成功后可以切换到提款选项卡（可选）
            // setActiveTab(ReserveAction.WITHDRAW);
            
            // 或者直接关闭模态框
            setTimeout(() => {
                setVisible(false);
                resetState();
            }, 1000);
        } catch (error) {
            console.error("Error reserving:", error);
        }
    };

    // 处理提款操作
    const handleWithdraw = async () => {
        try {
            // 这里添加实际的提款逻辑
            console.log(`Withdrawing ${withdrawAmount} CGT`);
            
            // 模拟成功后关闭模态框
            setTimeout(() => {
                setVisible(false);
                resetState();
            }, 1000);
        } catch (error) {
            console.error("Error withdrawing:", error);
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
        // 保留其他状态以便下次打开时显示
    };

    return (
        <Modal
            isOpen={visible}
            onClose={handleClose}
            title="RESERVE"
            className="max-w-[600px]"
        >
            {/* 选项卡头部 */}
            <div className="grid grid-cols-2 rounded-lg overflow-hidden mb-6">
                <button
                    className={`py-4 uppercase text-center text-base ${
                        activeTab === ReserveAction.RESERVE
                            ? "bg-white text-black"
                            : "bg-[#1E1E1E] text-[#777]"
                    }`}
                    onClick={() => handleTabChange(ReserveAction.RESERVE)}
                >
                    RESERVE
                </button>
                <button
                    className={`py-4 uppercase text-center text-base ${
                        activeTab === ReserveAction.WITHDRAW
                            ? "bg-white text-black"
                            : "bg-[#1E1E1E] text-[#777]"
                    }`}
                    onClick={() => handleTabChange(ReserveAction.WITHDRAW)}
                >
                    WITHDRAW
                </button>
            </div>

            {/* 注意提示 - 仅在提款选项卡显示 */}
            {activeTab === ReserveAction.WITHDRAW && (
                <div className="mb-6 text-white">
                    Note: Reserving less than 100 CGT will deactivate your Verifier/Prover.
                </div>
            )}

            {/* 金额输入区域 */}
            <div className="bg-[#0E0E0E] border border-[#333] rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                    <div className="text-3xl title font-light !font-[300]">
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="1,234"
                            className="bg-transparent border-none outline-none w-full max-w-[200px] text-white"
                        />
                    </div>
                    <div className="text-base flex items-center bg-[#222] p-2 rounded-full">
                        <img 
                            src={getImageUrl('@/assets/images/tokens/CGT.svg')} 
                            alt="CGT" 
                            className="w-6 h-6 mr-2" 
                        />
                        <span className="title !font-[500] text-base ">CGT</span>
                    </div>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-[#777]">Amount</div>
                    <div className="text-white">
                        {activeTab === ReserveAction.RESERVE 
                            ? `Amount ${reservedAmount}`
                            : `Reserved Amount ${reservedAmount}`
                        }
                    </div>
                </div>
            </div>

            {/* 提款信息 - 仅在提款选项卡显示 */}
            {activeTab === ReserveAction.WITHDRAW && (
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[#777]">Withdraw Amount</span>
                        <span className="text-white">{withdrawAmount} CYS</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[#777]">Estimated arrival time</span>
                        <span className="text-white">{estimatedArrivalTime}</span>
                    </div>
                </div>
            )}

            {/* 操作按钮 */}
            <Button
                type="light"
                className="w-full py-4 rounded-lg text-base font-medium"
                onClick={activeTab === ReserveAction.RESERVE ? handleReserve : handleWithdraw}
                disabled={!amount}
            >
                {activeTab === ReserveAction.RESERVE ? "RESERVE" : "WITHDRAW"}
            </Button>
        </Modal>
    );
};

export default ReserveModal;