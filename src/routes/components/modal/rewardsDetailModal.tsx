import { useState, useEffect } from "react";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { getImageUrl } from "@/utils/tools";

// 阶段枚举
enum RewardPhase {
    PHASE_I = "PHASE I",
    PHASE_II = "PHASE II",
    PHASE_III = "PHASE III"
}

const RewardsDetailModal = () => {
    // 获取模态框状态
    const { visible, setVisible, data } = useModalState({
        eventName: "modal_rewards_detail_visible",
    });

    // 状态管理
    const [activePhase, setActivePhase] = useState<RewardPhase>(RewardPhase.PHASE_I);

    // 在弹窗打开时初始化状态
    useEffect(() => {
        if (visible && data?.phase) {
            switch (data.phase) {
                case "phase1":
                    setActivePhase(RewardPhase.PHASE_I);
                    break;
                case "phase2":
                    setActivePhase(RewardPhase.PHASE_II);
                    break;
                case "phase3":
                    setActivePhase(RewardPhase.PHASE_III);
                    break;
                default:
                    setActivePhase(RewardPhase.PHASE_I);
            }
        }
    }, [visible, data]);

    // 处理阶段切换
    const handlePhaseChange = (phase: RewardPhase) => {
        setActivePhase(phase);
    };

    // 关闭模态框
    const handleClose = () => {
        setVisible(false);
    };

    // 处理确认按钮点击
    const handleConfirm = () => {
        setVisible(false);
    };

    // 处理领取奖励
    const handleClaim = () => {
        console.log("Claiming rewards");
        // 这里添加领取奖励的逻辑
    };

    // 处理转换
    const handleConvert = (from: string, to: string) => {
        console.log(`Converting from ${from} to ${to}`);
        // 这里添加转换逻辑
    };

    // 处理解除质押
    const handleUnstake = () => {
        console.log("Unstaking CGT");
        // 这里添加解除质押逻辑
    };

    // 处理提取
    const handleWithdraw = () => {
        console.log("Withdrawing Reserved Amount");
        // 这里添加提取逻辑
    };

    // 渲染 Phase I 内容
    const renderPhaseI = () => (
        <div className="space-y-4">
            <div className="border border-[#333] rounded-lg px-6 py-4">
                <div className="flex justify-between items-center">
                    <span className="text-3xl title !font-[300]  uppercase">Total Points</span>
                    <span className="text-3xl title !font-[300] ">100,000</span>
                </div>
                <div className="flex justify-between items-center mt-4 gap-6 text-sm">
                    <div className="flex justify-between items-center flex-1">
                        <span className="text-sub">Activity</span>
                        <span>8200</span>
                    </div>
                    <div className="flex justify-between items-center flex-1">
                        <span className="text-sub">Staking</span>
                        <span>200</span>
                    </div>
                </div>
            </div>
            <Button
                type="light"
                className="w-full py-4 rounded-lg text-base font-[400] mt-4"
                onClick={handleConfirm}
            >
                CONFIRM
            </Button>
        </div>
    );

    // 渲染 Phase II 内容
    const renderPhaseII = () => (
        <div className="space-y-4">
            <div className="border border-[#333] rounded-lg px-6 py-4">
                <div className="flex justify-between items-center">
                    <span className="text-3xl title !font-[300] uppercase">Claimable</span>
                    <span className="text-3xl title !font-[300]">1,000</span>
                    <Button
                        type="light"
                        className="px-6 py-2 rounded-lg text-base font-[400]"
                        onClick={handleClaim}
                    >
                        CLAIM
                    </Button>
                </div>
            </div>

            <div className="border border-[#333] rounded-lg px-6 py-4">
                <div className="flex justify-between items-center border-b border-[#FFFFFF4D] pb-2">
                    <span className="text-3xl title !font-[300] uppercase">Total CYS</span>
                    <span className="text-3xl title !font-[300]">1,000</span>
                </div>
                <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                    <div className="flex justify-between items-center flex-1">
                        <span className="text-sub">Prover</span>
                        <span>200</span>
                    </div>
                    <div className="flex justify-between items-center flex-1">
                        <span className="text-sub">Verifier</span>
                        <span>200</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                    <div className="flex justify-between items-center flex-1">
                        <span className="text-sub">Activity</span>
                        <span>200</span>
                    </div>
                    <div className="flex justify-between items-center flex-1">
                        <span className="text-sub">Staking</span>
                        <span>200</span>
                    </div>
                </div>
            </div>

            <div className="border border-[#333] rounded-lg px-6 py-4">
                <div className="flex justify-between items-center border-b border-[#FFFFFF4D] pb-2">
                    <span className="text-3xl title !font-[300] uppercase">Total CGT</span>
                    <span className="text-3xl title !font-[300]">1,000</span>
                </div>
                <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                    <div className="flex justify-between items-center flex-1">
                        <span className="text-sub">Prover</span>
                        <span>200</span>
                    </div>
                    <div className="flex justify-between items-center flex-1">
                        <span className="text-sub">Verifier</span>
                        <span>200</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                    <div className="flex justify-between items-center flex-1">
                        <span className="text-sub">Activity</span>
                        <span>200</span>
                    </div>
                    <div className="flex justify-between items-center flex-1">
                        <span className="text-sub">Staking</span>
                        <span>200</span>
                    </div>
                </div>
            </div>

            <Button
                type="light"
                className="w-full py-4 rounded-lg text-base font-[400] mt-4"
                onClick={handleConfirm}
            >
                CONFIRM
            </Button>
        </div>
    );

    // 渲染 Phase III 内容
    const renderPhaseIII = () => (
        <div className="space-y-4">
            <div className="border border-[#333] rounded-lg px-6 py-4">
                <div className="flex justify-between items-center border-b border-[#FFFFFF4D] pb-2">
                    <span className="text-3xl title !font-[300] uppercase">Total CYS</span>
                    <span className="text-3xl title !font-[300]">1,000</span>
                </div>
                <div className="mt-2">
                    <div className="text-sub mb-2">Income</div>
                    <div className="flex justify-between items-center gap-6 text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Prover</span>
                            <span>200</span>
                        </div>
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Verifier</span>
                            <span>200</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Activity</span>
                            <span>200</span>
                        </div>
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Others</span>
                            <span>200</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-dashed border-[#333] my-4"></div>
                <div>
                    <div className="text-sub mb-2">Information</div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub flex-1">Convertable CYS - CGT</span>
                            <span className="flex-1 text-right mr-4">200</span>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <Button
                                type="text"
                                className=" text-sm flex items-center min-h-fit h-fit text-sub !p-0"
                                onClick={() => handleConvert("CYS", "CGT")}
                            >
                                CONVERT <span className="ml-1">→</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border border-[#333] rounded-lg px-6 py-4">
                <div className="flex justify-between items-center border-b border-[#FFFFFF4D] pb-2">
                    <span className="text-3xl title !font-[300] uppercase">Total CGT</span>
                    <span className="text-3xl title !font-[300]">1,000</span>
                </div>
                <div className="mt-2">
                    <div className="text-sub mb-2">Income</div>
                    <div className="flex justify-between items-center gap-6 text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Prover</span>
                            <span>200</span>
                        </div>
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Verifier</span>
                            <span>200</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Activity</span>
                            <span>200</span>
                        </div>
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Others</span>
                            <span>200</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-dashed border-[#333] my-4"></div>
                <div>
                    <div className="text-sub mb-1">Cost</div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex-1 flex justify-between items-center">
                            <span className="text-sub">Maintenance Fee</span>
                            <span>300</span>
                        </div>
                        <div className="flex-1" />
                    </div>
                </div>
                <div className="border-t border-dashed border-[#333] my-4"></div>
                <div>
                    <div className="text-sub mb-2">Information</div>
                    <div className="flex justify-between items-center mb-2 text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub flex-1">Convertable CGT - CYS</span>
                            <span className="flex-1 text-right mr-4">200</span>
                        </div>
                        <div className="flex-1 flex justify-end">
                        <Button
                            type="text"
                            className="text-sm flex items-center min-h-fit h-fit text-sub !p-0"
                            onClick={() => handleConvert("CGT", "CYS")}
                        >
                            CONVERT <span className="ml-1">→</span>
                        </Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-2 text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub flex-1">Staked Amount</span>
                            <span className="flex-1 text-right mr-4">10,000</span>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <Button
                                type="text"
                                className="text-sm flex items-center min-h-fit h-fit text-sub !p-0"
                            onClick={handleUnstake}
                        >
                            UNSTAKE <span className="ml-1">→</span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub flex-1">Reserved Amount</span>
                            <span className="flex-1 text-right mr-4">100</span>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <Button
                                type="text"
                                className="text-sm flex items-center min-h-fit h-fit text-sub !p-0"
                            onClick={handleWithdraw}
                        >
                            WITHDRAW <span className="ml-1">→</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                type="light"
                className="w-full py-4 rounded-lg text-base font-[400] mt-4"
                onClick={handleConfirm}
            >
                CONFIRM
            </Button>
        </div>
    );

    return (
        <Modal
            isOpen={visible}
            onClose={handleClose}
            title="REWARDS DETAILS"
            className="max-w-[720px]"
        >
            {/* 阶段标签页 */}
            <div className="flex justify-between mb-6 relative">
                <button
                    className={`uppercase text-center text-base w-1/3 py-4 ${activePhase === RewardPhase.PHASE_III ? "text-white" : "text-sub"
                        }`}
                    onClick={() => handlePhaseChange(RewardPhase.PHASE_III)}
                >
                    PHASE III
                </button>
                <button
                    className={`uppercase text-center text-base w-1/3 py-4 ${activePhase === RewardPhase.PHASE_II ? "text-white" : "text-sub"
                        }`}
                    onClick={() => handlePhaseChange(RewardPhase.PHASE_II)}
                >
                    PHASE II
                </button>
                <button
                    className={`uppercase text-center text-base w-1/3 py-4 ${activePhase === RewardPhase.PHASE_I ? "text-white" : "text-sub"
                        }`}
                    onClick={() => handlePhaseChange(RewardPhase.PHASE_I)}
                >
                    PHASE I
                </button>

                {/* 下划线指示器 */}
                <div className="absolute bottom-0 w-full h-[1px] bg-[#333]"></div>
                <div
                    className="absolute bottom-0 h-[2px] bg-white transition-all duration-300 w-1/3"
                    style={{
                        left: activePhase === RewardPhase.PHASE_III ? "0" :
                            activePhase === RewardPhase.PHASE_II ? "33.33%" : "66.66%"
                    }}
                ></div>
            </div>

            {/* 根据当前活跃标签页显示不同内容 */}
            {activePhase === RewardPhase.PHASE_I && renderPhaseI()}
            {activePhase === RewardPhase.PHASE_II && renderPhaseII()}
            {activePhase === RewardPhase.PHASE_III && renderPhaseIII()}
        </Modal>
    );
};

export default RewardsDetailModal;