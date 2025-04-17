import { useState, useEffect } from "react";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { getImageUrl, handleConvertHistoryModal } from "@/utils/tools";
import { Settings } from "lucide-react";

// 代币类型枚举
enum TokenType {
  CYS = "CYS",
  CGT = "CGT"
}

const ConvertModal = () => {
  // 获取模态框状态
  const { visible, setVisible, data } = useModalState({
    eventName: "modal_convert_visible",
  });

  // 状态管理
  const [fromToken, setFromToken] = useState<TokenType>(TokenType.CYS);
  const [toToken, setToToken] = useState<TokenType>(TokenType.CGT);
  const [fromAmount, setFromAmount] = useState<string>("1,000");
  const [toAmount, setToAmount] = useState<string>("1,234");
  const [rate, setRate] = useState<number>(1);
  const [maxSlippage, setMaxSlippage] = useState<number>(0.5);
  const [fee, setFee] = useState<number>(0.25);
  const [networkCost, setNetworkCost] = useState<number>(1.23);

  // 在弹窗打开时初始化状态
  useEffect(() => {
    if (visible) {
      // 如果有指定的初始代币
      if (data?.fromToken) {
        setFromToken(data.fromToken === "CYS" ? TokenType.CYS : TokenType.CGT);
        setToToken(data.fromToken === "CYS" ? TokenType.CGT : TokenType.CYS);
      }
      
      // 如果有指定的初始金额
      if (data?.amount) {
        setFromAmount(data.amount.toLocaleString());
        calculateToAmount(data.amount);
      }
    }
  }, [visible, data]);

  // 计算兑换金额
  const calculateToAmount = (amount: number) => {
    const convertedAmount = amount * rate;
    setToAmount(convertedAmount.toLocaleString());
  };

  // 处理金额变更
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 移除逗号，仅允许数字和小数点
    const rawValue = e.target.value.replace(/,/g, "");
    const value = rawValue.replace(/[^0-9.]/g, "");
    
    // 使用逗号格式化
    const formattedValue = Number(value).toLocaleString();
    setFromAmount(formattedValue === "NaN" ? "" : formattedValue);
    
    // 计算兑换金额
    if (value !== "" && !isNaN(Number(value))) {
      calculateToAmount(Number(value));
    } else {
      setToAmount("");
    }
  };

  // 切换代币方向
  const handleSwapTokens = () => {
    setFromToken(fromToken === TokenType.CYS ? TokenType.CGT : TokenType.CYS);
    setToToken(toToken === TokenType.CYS ? TokenType.CGT : TokenType.CYS);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // 处理转换操作
  const handleConvert = () => {
    console.log(`Converting ${fromAmount} ${fromToken} to ${toAmount} ${toToken}`);
    // 实际转换逻辑在这里
  };

  // 查看转换历史
  const handleViewHistory = () => {
    console.log("Opening convert history");
    // 跳转到历史页面或打开历史弹窗
    handleConvertHistoryModal()
  };

  // 调整滑点设置
  const handleSlippageAdjust = () => {
    console.log("Adjusting slippage settings");
    // 打开滑点设置弹窗
  };

  // 关闭模态框
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      isOpen={visible}
      onClose={handleClose}
      title="CONVERT"
      className="max-w-[600px]"
    >
      {/* 提示信息 */}
      <div className="mb-6 text-white">
        Only Rewards from the current Phase III is available to convert
      </div>

      {/* 转换区域 - From */}
      <div className="border border-[#333] rounded-lg p-4">
        <div className="text-sub mb-2">Convert</div>
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={fromAmount}
            onChange={handleFromAmountChange}
            className="bg-transparent border-none outline-none w-full max-w-[200px] text-3xl title !font-[300] text-white"
            placeholder="0.00"
          />
          <div className="flex items-center bg-[#222] rounded-full px-4 py-2">
            <img
              src={getImageUrl(`@/assets/images/tokens/${fromToken}.svg`)}
              alt={fromToken}
              className="w-6 h-6 mr-2"
            />
            <span className="text-base title !font-[500]">{fromToken}</span>
          </div>
        </div>
        <div className="flex justify-end mt-1 text-base">
          <span>1,000.00</span>
        </div>
      </div>

      {/* 切换按钮 */}
      <div className="relative flex justify-center">
        <div 
          className="absolute -translate-y-1/2 w-12 h-12 bg-white rounded-full flex justify-center items-center cursor-pointer z-10"
          onClick={handleSwapTokens}
        >
          <img 
            src={getImageUrl('@/assets/images/icon/toggle.svg')} 
            alt="swap" 
            className="w-6 h-6"
          />
        </div>

      </div>

      {/* 转换区域 - To */}
      <div className="border border-[#333] rounded-lg p-4 mb-6">
        <div className="text-sub mb-2">To</div>
        <div className="flex justify-between items-center">
          <span className="text-3xl title !font-[300] text-white">{toAmount}</span>
          <div className="flex items-center bg-[#222] rounded-full px-4 py-2">
            <img
              src={getImageUrl(`@/assets/images/tokens/${toToken}.svg`)}
              alt={toToken}
              className="w-6 h-6 mr-2"
            />
            <span className="text-base title !font-[500]">{toToken}</span>
          </div>
        </div>
        <div className="flex justify-end mt-1 text-base">
          <span>0.00</span>
        </div>
      </div>

      {/* 转换信息 */}
      <div className="space-y-2 mb-6">
          <span className="text-sub text-sm">1 {fromToken} = {rate} {fromToken}</span>
        <div className="flex justify-between items-center text-sm">
          <span className="text-sub">Max. slippage</span>
          <div className="flex items-center">
            <span>{maxSlippage}%</span>
            <button 
              className="ml-2 text-white" 
              onClick={handleSlippageAdjust}
            >
              <Settings size={16} />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-sub">Receive at least</span>
          <span>{rate} {toToken}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-sub">Fee({fee}%)</span>
          <span>${networkCost}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-sub">Network cost</span>
          <div className="flex items-center">
            <img 
              src={getImageUrl('@/assets/images/icon/flash.svg')} 
              alt="network" 
              className="w-4 h-4 mr-1"
            />
            <span>${networkCost}</span>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <Button
        type="light"
        className="w-full py-4 rounded-lg text-base font-medium mb-4"
        onClick={handleConvert}
      >
        CONVERT
      </Button>

      {/* 查看历史 */}
      <div className="flex justify-center">
        <Button
          type="text"
          className="text-white flex items-center"
          onClick={handleViewHistory}
        >
          CONVERT HISTORY <span className="ml-1">→</span>
        </Button>
      </div>
    </Modal>
  );
};

export default ConvertModal;