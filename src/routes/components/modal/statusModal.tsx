import { useState, useEffect } from "react";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Check, Loader2, AlertCircle } from "lucide-react";

// 状态类型枚举
export enum StatusType {
  SUCCESS = "success",
  LOADING = "loading",
  ERROR = "error"
}

export interface StatusModalProps {
  type?: StatusType;
  title?: string;
  message?: string;
  chainName?: string;
  txHash?: string;
  onClose?: () => void;
  onRetry?: () => void;
}

const StatusModal = () => {
  // 获取模态框状态
  const { visible, setVisible, data } = useModalState({
    eventName: "modal_status_visible",
  });

  // 状态管理
  const [status, setStatus] = useState<StatusType>(StatusType.LOADING);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chainName, setChainName] = useState<string>("XXX CHAIN");
  const [txHash, setTxHash] = useState<string>("");
  
  // 在弹窗打开时初始化状态
  useEffect(() => {
    if (visible && data) {
      setStatus(data.type || StatusType.LOADING);
      setTitle(data.title || getDefaultTitle(data.type));
      setMessage(data.message || "");
      setChainName(data.chainName || "XXX CHAIN");
      setTxHash(data.txHash || "");
    }
  }, [visible, data]);

  // 获取默认标题
  const getDefaultTitle = (type?: StatusType) => {
    switch (type) {
      case StatusType.SUCCESS:
        return "Transaction Submitted";
      case StatusType.LOADING:
        return "Waiting for signature";
      case StatusType.ERROR:
        return "User Cancel Signature";
      default:
        return "Waiting for signature";
    }
  };

  // 关闭模态框
  const handleClose = () => {
    setVisible(false);
    // 如果有自定义关闭回调，则执行
    if (data?.onClose) data.onClose();
  };

  // 重试
  const handleRetry = () => {
    // 如果有自定义重试回调，则执行
    if (data?.onRetry) {
      data.onRetry();
    }
    setVisible(false);
  };

  // 查看交易
  const handleViewOnChain = () => {
    if (!txHash) return;
    
    // 根据链名称确定区块浏览器URL
    let explorerUrl = "";
    switch (chainName?.toLowerCase()) {
      case "ethereum":
      case "eth":
        explorerUrl = `https://etherscan.io/tx/${txHash}`;
        break;
      case "bsc":
      case "binance":
        explorerUrl = `https://bscscan.com/tx/${txHash}`;
        break;
      // 可以添加更多链的区块浏览器
      default:
        explorerUrl = `https://explorer.example.com/tx/${txHash}`;
    }
    
    window.open(explorerUrl, "_blank");
  };

  // 渲染状态图标
  const renderStatusIcon = () => {
    switch (status) {
      case StatusType.SUCCESS:
        return (
          <div className="w-24 h-24 rounded-full bg-[#19FFE0] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(25,255,224,0.5)]">
            <Check className="w-12 h-12 text-black" strokeWidth={3} />
          </div>
        );
      case StatusType.LOADING:
        return (
          <div className="mb-6">
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          </div>
        );
      case StatusType.ERROR:
        return (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
            <AlertCircle className="w-12 h-12 text-black" strokeWidth={3} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={visible}
      onClose={handleClose}
      hideCloseButton={status === StatusType.LOADING}
      className="max-w-[600px]"
    >
      <div className="flex flex-col items-center justify-center py-12">
        {renderStatusIcon()}
        
        <h2 className="text-2xl font-light text-white text-center mb-4">{title}</h2>
        
        {message && (
          <p className="text-gray-300 text-center text-base mb-8">{message}</p>
        )}
        
        {status === StatusType.SUCCESS && txHash && (
          <Button
            type="light"
            className="w-full py-4 text-base font-normal"
            onClick={handleViewOnChain}
          >
            VIEW ON {chainName}
          </Button>
        )}
        
        {status === StatusType.ERROR && (
          <Button
            type="light"
            className="w-full py-4 text-base font-normal"
            onClick={handleRetry}
          >
            TRY AGAIN
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default StatusModal;