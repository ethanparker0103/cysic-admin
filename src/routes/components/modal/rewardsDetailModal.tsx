import { useState, useEffect } from "react";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { getImageUrl, handleConvertModal, handleReserveModal, handleStakeModal } from "@/utils/tools";
import { useRequest } from "ahooks";
import axios from "@/service";
import useAccount from "@/hooks/useAccount";
import { cn } from "@nextui-org/react";
import { isMobile } from "react-device-detect";

// 阶段枚举
enum RewardPhase {
    PHASE_I = "PHASE I",
    PHASE_II = "PHASE II",
    PHASE_III = "PHASE III"
}

const RewardsDetailModal = () => {
    const { isBinded } = useAccount()
    // 获取模态框状态
    const { visible, setVisible, data } = useModalState({
        eventName: "modal_rewards_detail_visible",
    });

    // 状态管理
    const [activePhase, setActivePhase] = useState<RewardPhase>(RewardPhase.PHASE_I);

    // 初始化时设置正确的阶段
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

    // 使用 useRequest 获取奖励数据
    const { data: phasesData, loading } = useRequest(
        async () => {
            const requests = [
                axios.get('/api/v1/zkTask/reward/phase1'),
                axios.get('/api/v1/zkTask/reward/phase2'),
                axios.get('/api/v1/zkTask/reward/phase3')
            ];
            
            const results = await Promise.allSettled(requests);
            
            return {
                phase1: results[0].status === 'fulfilled' ? results[0].value.data : null,
                phase2: results[1].status === 'fulfilled' ? results[1].value.data : null,
                phase3: results[2].status === 'fulfilled' ? results[2].value.data : null
            };
        },
        {
            refreshDeps: [visible, isBinded], // 仅当弹窗显示时刷新数据
            ready: visible && isBinded, // 仅当弹窗显示时才执行请求
        }
    );

    console.log('phasesData', phasesData)

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
    // const handleConvert = (from: string, to: string, amount?: string) => {
    //     console.log(`Converting from ${from} to ${to}`, amount);
    //     // 弹出转换弹窗
    //     const event = new CustomEvent("modal_convert_visible", {
    //         detail: {
    //             fromToken: from,
    //             toToken: to,
    //             amount
    //         }
    //     });
    //     dispatchEvent(event);
    // };

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
    const renderPhaseI = () => {
        const phase1 = phasesData?.phase1;
        
        if (loading || !phase1) {
            return <div className="text-center py-8">Loading...</div>;
        }
        
        const totalPoints = parseInt(phase1.activity) + parseInt(phase1.staking);
        
        return (
            <div className="space-y-4">
                <div className="border border-[#333] rounded-lg px-6 py-4">
                    <div className="flex justify-between items-center">
                        <span className={cn(" title !font-[300] uppercase", isMobile ? "!text-[18px]" : "text-3xl")}>Total Points</span>
                        <span className={cn(" title !font-[300]", isMobile ? "!text-[18px]" : "!text-3xl")}>{totalPoints.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4 gap-6 text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Activity</span>
                            <span>{parseInt(phase1.activity).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Staking</span>
                            <span>{parseInt(phase1.staking).toLocaleString()}</span>
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
        )
    };

    // 渲染 Phase II 内容
    const renderPhaseII = () => {
        const phase2 = phasesData?.phase2;
        
        if (loading || !phase2) {
            return <div className="text-center py-8">Loading...</div>;
        }
        
        return (
            <div className="space-y-4">
                <div className="border border-[#333] rounded-lg px-6 py-4">
                    <div className="flex justify-between items-center">
                        <span className={cn(" title !font-[300] uppercase", isMobile ? "!text-[18px]" : "text-3xl")}>Claimable</span>
                        <span className={cn(" title !font-[300]", isMobile ? "!text-[18px]" : "!text-3xl")}>{parseInt(phase2.claimable).toLocaleString()}</span>
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
                        <span className={cn(" title !font-[300] uppercase", isMobile ? "!text-[18px]" : "text-3xl")}>Total CYS</span>
                        <span className={cn(" title !font-[300]", isMobile ? "!text-[18px]" : "!text-3xl")}>{parseInt(phase2.cys.total).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Prover</span>
                            <span>{parseInt(phase2.cys.prover).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Verifier</span>
                            <span>{parseInt(phase2.cys.verifier).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Activity</span>
                            <span>{parseInt(phase2.cys.activity).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Staking</span>
                            <span>{parseInt(phase2.cys.staking).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="border border-[#333] rounded-lg px-6 py-4">
                    <div className="flex justify-between items-center border-b border-[#FFFFFF4D] pb-2">
                        <span className={cn(" title !font-[300] uppercase", isMobile ? "!text-[18px]" : "text-3xl")}>Total CGT</span>
                        <span className={cn(" title !font-[300]", isMobile ? "!text-[18px]" : "!text-3xl")}>{parseInt(phase2.cgt.total).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Prover</span>
                            <span>{parseInt(phase2.cgt.prover).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Verifier</span>
                            <span>{parseInt(phase2.cgt.verifier).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Activity</span>
                            <span>{parseInt(phase2.cgt.activity).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-sub">Staking</span>
                            <span>{parseInt(phase2.cgt.staking).toLocaleString()}</span>
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
    };

    // 渲染 Phase III 内容
    const renderPhaseIII = () => {
        const phase3 = phasesData?.phase3;
        
        if (loading || !phase3) {
            return <div className="text-center py-8">Loading...</div>;
        }
        
        return (
            <div className="space-y-4">
                <div className="border border-[#333] rounded-lg px-6 py-4">
                    <div className="flex justify-between items-center border-b border-[#FFFFFF4D] pb-2">
                        <span className={cn(" title !font-[300] uppercase", isMobile ? "!text-[18px]" : "text-3xl")}>Total CYS</span>
                        <span className={cn(" title !font-[300]", isMobile ? "!text-[18px]" : "!text-3xl")}>{parseInt(phase3?.cysIncomeDetail?.total).toLocaleString()}</span>
                    </div>
                    <div className="mt-2">
                        <div className="text-sub mb-2">Income</div>
                        <div className="flex justify-between items-center gap-6 text-sm">
                            <div className="flex justify-between items-center flex-1">
                                <span className="text-sub">Prover</span>
                                <span>{parseInt(phase3?.cysIncomeDetail?.income?.prover).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center flex-1">
                                <span className="text-sub">Verifier</span>
                                <span>{parseInt(phase3?.cysIncomeDetail?.income?.verifier).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                            <div className="flex justify-between items-center flex-1">
                                <span className="text-sub">Activity</span>
                                <span>{parseInt(phase3?.cysIncomeDetail?.income?.activity).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center flex-1">
                                <span className="text-sub">Others</span>
                                <span>{parseInt(phase3?.cysIncomeDetail?.income?.others).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-dashed border-[#333] my-4"></div>
                    <div>
                        <div className="text-sub mb-2">Information</div>
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex justify-between items-center flex-1">
                                <span className="text-sub flex-1">Convertable CYS - CGT</span>
                                <span className="flex-1 text-right mr-4">{parseInt(phase3?.cysIncomeDetail?.information?.convertable || "0").toLocaleString()}</span>
                            </div>
                            <div className="flex-1 flex justify-end">
                                <Button
                                    type="text"
                                    className=" text-sm flex items-center min-h-fit h-fit text-sub !p-0"
                                    onClick={() => handleConvertModal()}
                                >
                                    CONVERT <span className="ml-1">→</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border border-[#333] rounded-lg px-6 py-4">
                    <div className="flex justify-between items-center border-b border-[#FFFFFF4D] pb-2">
                        <span className={cn(" title !font-[300] uppercase", isMobile ? "!text-[18px]" : "text-3xl")}>Total CGT</span>
                        <span className={cn(" title !font-[300]", isMobile ? "!text-[18px]" : "!text-3xl")}>{parseInt(phase3?.cgtIncomeDetail?.total).toLocaleString()}</span>
                    </div>
                    <div className="mt-2">
                        <div className="text-sub mb-2">Income</div>
                        <div className="flex justify-between items-center gap-6 text-sm">
                            <div className="flex justify-between items-center flex-1">
                                <span className="text-sub">Prover</span>
                                <span>{parseInt(phase3?.cgtIncomeDetail?.income?.prover).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center flex-1">
                                <span className="text-sub">Verifier</span>
                                <span>{parseInt(phase3?.cgtIncomeDetail?.income?.verifier).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-2 gap-6 text-sm">
                            <div className="flex justify-between items-center flex-1">
                                <span className="text-sub">Activity</span>
                                <span>{parseInt(phase3?.cgtIncomeDetail?.income?.activity).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center flex-1">
                                <span className="text-sub">Others</span>
                                <span>{parseInt(phase3?.cgtIncomeDetail?.income?.others).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-dashed border-[#333] my-4"></div>
                    <div>
                        <div className="text-sub mb-1">Cost</div>
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex-1 flex justify-between items-center">
                                <span className="text-sub">Maintenance Fee</span>
                                <span>{parseInt(phase3?.cgtIncomeDetail?.cost?.maintenanceFee).toLocaleString()}</span>
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
                                <span className="flex-1 text-right mr-4">{parseInt(phase3?.cgtIncomeDetail?.information?.convertable || "0").toLocaleString()}</span>
                            </div>
                            <div className="flex-1 flex justify-end">
                                <Button
                                    type="text"
                                    className="text-sm flex items-center min-h-fit h-fit text-sub !p-0"
                                    onClick={() => handleConvertModal()}
                                >
                                    CONVERT <span className="ml-1">→</span>
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-2 text-sm">
                            <div className="flex justify-between items-center flex-1">
                                <span className="text-sub flex-1">Staked Amount</span>
                                <span className="flex-1 text-right mr-4">{parseInt(phase3?.cgtIncomeDetail?.information?.stakedAmount || "0").toLocaleString()}</span>
                            </div>
                            <div className="flex-1 flex justify-end">
                                <Button
                                    type="text"
                                    className="text-sm flex items-center min-h-fit h-fit text-sub !p-0"
                                    onClick={handleStakeModal}
                                >
                                    UNSTAKE <span className="ml-1">→</span>
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex justify-between items-center flex-1">
                                <span className="text-sub flex-1">Reserved Amount</span>
                                <span className="flex-1 text-right mr-4">{parseInt(phase3?.cgtIncomeDetail?.information?.reservedAmount || "0").toLocaleString()}</span>
                            </div>
                            <div className="flex-1 flex justify-end">
                                <Button
                                    type="text"
                                    className="text-sm flex items-center min-h-fit h-fit text-sub !p-0"
                                    onClick={handleReserveModal}
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
    };

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