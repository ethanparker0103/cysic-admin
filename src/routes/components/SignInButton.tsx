import Button from "@/components/Button";
import { ArrowRight } from "lucide-react";
import { cn } from "@nextui-org/react";
import useAccount from "@/hooks/useAccount";
import { handleLoginPersonalMessage, handleSignIn } from "@/utils/tools";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { BIND_CHECK_PATHS } from "@/config";

interface SignInButtonProps {
  className?: string;
  customText?: string; // 可选的自定义文本
}

const SignInButton = ({ 
  className = "", 
  customText
}: SignInButtonProps) => {
  // 获取用户账户状态 - 使用新的多地址架构
  const { address, isSigned, isBinded, user } = useAccount();
  const location = useLocation();
  
  // 从当前活跃用户获取信息
  const isProfileCompleted = !!user?.name;
  
  // 检查当前页面是否需要绑定邀请码
  const isBindRequired = useMemo(() => {
    return BIND_CHECK_PATHS.some(path => location.pathname.includes(path));
  }, [location.pathname]);
  
  // 根据状态确定显示文本
  const buttonText = useMemo(() => {
    if (customText) return customText;
    
    if (!address) {
      return "Sign In";
    }
    
    if (!isSigned) {
      return "Sign Message";
    }
    
    // 在需要绑定的页面上，且未绑定时，才显示"Bind Invite Code"
    if (isBindRequired && !isBinded) {
      return "Bind Invite Code";
    }
    
    if (!isProfileCompleted) {
      return "Complete Profile";
    }
    
    return "Welcome";
  }, [address, isSigned, isBinded, isProfileCompleted, customText, isBindRequired]);
  
  // 触发登录弹窗事件或直接签名
  const handleClick = () => {
    if (!address) {
      // 未连接钱包
      handleSignIn();
    } else if (!isSigned) {
      // 已连接钱包但未签名 - 直接签名
      handleLoginPersonalMessage();
    } else if (isBindRequired && !isBinded) {
      // 在需要绑定的页面上，且未绑定，跳转到绑定流程
      handleSignIn();
    } else if (address && !isProfileCompleted) {
      // 已连接已绑定但资料未完善，直接进入资料填写步骤
      handleSignIn('profile');
    } else {
      // 其他情况使用默认流程
      handleSignIn('profile');
    }
  };
  
  return (
    <Button 
      type="solid" 
      className={cn(className)} 
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-[400] uppercase">{buttonText}</span>
        <ArrowRight width={12} height={12} />
      </div>
    </Button>
  );
};

export default SignInButton;