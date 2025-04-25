import { useState, useEffect } from "react";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { getImageUrl, handleConvertHistoryModal } from "@/utils/tools";
import { Settings } from "lucide-react";
import Input from "@/components/Input";
import {
    cosmosFee,
    cosmosReservedValue,
    cysicBaseCoin,
    cysicStCoin,
    supTokens,
} from "@/config";
import useCosmos from "@/models/_global/cosmos";
import { useEventListener } from "ahooks";
import { MsgExchangeToGovToken, MsgExchangeToPlatformToken } from "@/utils/cysic-msg";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import { calculateTransactionFee, format, sleep } from "@/utils/tools";
import { checkKeplrWallet, signAndBroadcastDirect } from "@/utils/cosmos";

// 代币类型枚举
enum TokenType {
  CYS = "CYS",
  CGT = "CGT"
}

const ConvertModal = () => {
  const { balanceMap, connector, address } = useCosmos();
  const { visible, setVisible, data } = useModalState({
    eventName: "modal_convert_visible",
  });
  const { dispatch }: any = useModalState({
    eventName: "modal_slippage_visible",
  });

  // 状态管理
  const [fromToken, setFromToken] = useState<TokenType>(TokenType.CYS);
  const [toToken, setToToken] = useState<TokenType>(TokenType.CGT);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [rate, setRate] = useState<number>(1);
  const [maxSlippage, setMaxSlippage] = useState<number>(0.5);
  const [fee, setFee] = useState<number>(0.25);
  const [networkCost, setNetworkCost] = useState<number>(1.23);

  useEventListener("modal_convert_visible", (e: any) => {
    const eventFromToken = e?.detail?.fromToken;
    const eventToToken = e?.detail?.toToken;
    if (eventFromToken) {
      setFromToken(eventFromToken === "CYS" ? TokenType.CYS : TokenType.CGT);
    }
    if (eventToToken) {
      setToToken(eventToToken === "CYS" ? TokenType.CYS : TokenType.CGT);
    }
  });

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
        const formattedAmount = typeof data.amount === 'number' ? 
          data.amount.toLocaleString() : 
          parseFloat(data.amount).toLocaleString();
        setFromAmount(formattedAmount);
        calculateToAmount(parseFloat(data.amount));
      } else {
        // 重置金额
        setFromAmount("");
        setToAmount("");
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
  const handleConvert = async (closeLoading?: any) => {
    try {
      checkKeplrWallet();
      
      // 确保金额有效
      if (!fromAmount || parseFloat(fromAmount.replace(/,/g, "")) <= 0) {
        throw { message: "Please enter a valid amount" };
      }
      
      if (fromToken === TokenType.CYS) {
        await exchangeToGovToken(connector, address);
      } else {
        await exchangeToPlatformToken(connector, address);
      }
      setFromAmount('');
      setToAmount('');
    } catch (e: any) {
      console.log("error", e);
      toast.error(e?.message || e?.msg || e);
    } finally {
      await sleep(1000);
      dispatchEvent(new CustomEvent('refresh_cosmosBalance'));
      closeLoading?.();
    }
  };

  const exchangeToPlatformToken = async (client: any, address: string) => {
    const cleanAmount = fromAmount.replace(/,/g, "");
    const amount = {
      denom: "CGT",
      amount: BigNumber(cleanAmount).multipliedBy(1e18).toString(),
    };
    const msg = {
      typeUrl: MsgExchangeToPlatformToken.typeUrl,
      value: MsgExchangeToPlatformToken.encode(MsgExchangeToPlatformToken.fromPartial({
        sender: address,
        amount: amount.amount,
      })).finish(),
    };

    const result = await signAndBroadcastDirect(address, msg, cosmosFee, client);
    toast.success(`Submit Success at ${result?.transactionHash}`);
  };

  const exchangeToGovToken = async (client: any, address: string) => {
    const cleanAmount = fromAmount.replace(/,/g, "");
    
    if (
      BigNumber(balanceMap?.[cysicBaseCoin]?.hm_amount || 0)
        .minus(cleanAmount)
        .lt(cosmosReservedValue)
    ) {
      throw { message: `Reserved Balance < ${cosmosReservedValue}` };
    }
    
    // 构建交易参数
    const amount = {
      denom: "CYS",
      amount: BigNumber(cleanAmount).multipliedBy(1e18).toString(),
    };

    const msg: any = {
      typeUrl: MsgExchangeToGovToken.typeUrl,
      value: MsgExchangeToGovToken.encode(MsgExchangeToGovToken.fromPartial({
        sender: address,
        amount: amount.amount,
      })).finish(),
    };

    const result = await signAndBroadcastDirect(address, msg, cosmosFee, client);
    toast.success(`Submit Success at ${result?.transactionHash}`);
  };

  // 获取代币余额
  const getTokenBalance = (token: TokenType) => {
    const tokenKey = token === TokenType.CYS ? cysicBaseCoin : cysicStCoin;
    return format(balanceMap?.[tokenKey]?.hm_amount || 0, 3);
  };

  // 查看转换历史
  const handleViewHistory = () => {
    handleConvertHistoryModal();
  };

  // 调整滑点设置
  const handleSlippageAdjust = () => {
    dispatch({visible: true});
  };

  // 关闭模态框
  const handleClose = () => {
    setVisible(false);
  };

  // 获取代币图标
  const getTokenIcon = (token: TokenType) => {
    const tokenKey = token === TokenType.CYS ? cysicBaseCoin : cysicStCoin;
    return supTokens?.[tokenKey]?.icon || getImageUrl(`@/assets/images/tokens/${token}.svg`);
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
              src={getTokenIcon(fromToken)}
              alt={fromToken}
              className="w-6 h-6 mr-2"
            />
            <span className="text-base title !font-[500]">{fromToken}</span>
          </div>
        </div>
        <div className="flex justify-end mt-1 text-base text-[#A3A3A3] hover:text-[#00F0FF] cursor-pointer">
          <span onClick={() => {
            const balance = getTokenBalance(fromToken);
            setFromAmount(balance);
            calculateToAmount(parseFloat(balance.replace(/,/g, "")));
          }}>
            {getTokenBalance(fromToken)}
          </span>
        </div>
      </div>

      {/* 切换按钮 */}
      <div className="relative flex justify-center">
        <div 
          className="absolute -translate-y-1/2 w-12 h-12 bg-black border border-[#2B2B2B] rounded-full flex justify-center items-center cursor-pointer z-10"
          onClick={handleSwapTokens}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6011 13.399C16.4417 13.2396 16.2255 13.1501 16 13.1501C15.7746 13.1501 15.5584 13.2396 15.399 13.399L11.399 17.399C11.067 17.731 11.067 18.2692 11.399 18.6011C11.7309 18.9331 12.2691 18.9331 12.6011 18.6011L15.15 16.0522V26.0002C15.15 26.4696 15.5305 26.8502 16 26.8502C16.4694 26.8502 16.85 26.4696 16.85 26.0002V16.0521L19.399 18.6011C19.7309 18.9331 20.2691 18.9331 20.6011 18.6011C20.933 18.2692 20.933 17.731 20.6011 17.399L16.6011 13.399Z"
              fill="white"
            />
            <path
              d="M23.15 23.948L20.601 21.399C20.2691 21.067 19.7309 21.067 19.3989 21.399C19.067 21.7309 19.067 22.2691 19.3989 22.6011L23.3989 26.6011C23.7309 26.933 24.2691 26.933 24.601 26.6011L28.601 22.6011C28.933 22.2691 28.933 21.7309 28.601 21.399C28.2691 21.0671 27.7309 21.0671 27.3989 21.399L24.85 23.9479L24.85 14.0002C24.85 13.5307 24.4695 13.1502 24 13.1502C23.5306 13.1502 23.15 13.5307 23.15 14.0002L23.15 23.948Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* 转换区域 - To */}
      <div className="border border-[#333] rounded-lg p-4 mb-6">
        <div className="text-sub mb-2">To</div>
        <div className="flex justify-between items-center">
          <span className="text-3xl title !font-[300] text-white">{toAmount || "0.00"}</span>
          <div className="flex items-center bg-[#222] rounded-full px-4 py-2">
            <img
              src={getTokenIcon(toToken)}
              alt={toToken}
              className="w-6 h-6 mr-2"
            />
            <span className="text-base title !font-[500]">{toToken}</span>
          </div>
        </div>
        <div className="flex justify-end mt-1 text-base text-[#A3A3A3]">
          <span>{getTokenBalance(toToken)}</span>
        </div>
      </div>

      {/* 转换信息 */}
      <div className="space-y-2 mb-6">
        <span className="text-sub text-sm">1 {fromToken} = {rate} {toToken}</span>
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
          <span>{fromAmount ? toAmount : "0.00"} {toToken}</span>
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
            <span>{calculateTransactionFee()} CYS</span>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <Button
        type="light"
        needLoading
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