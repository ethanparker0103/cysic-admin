import Button from "@/components/Button";
import { ArrowRight } from "lucide-react";
import { cn } from "@nextui-org/react";
import useAccount from "@/hooks/useAccount";
import { handleSignIn } from "@/utils/tools";

interface SignInButtonProps {
  className?: string;
  customText?: string; // 可选的自定义文本
}

const SignInButton = ({ 
  className = "", 
  customText
}: SignInButtonProps) => {
  // 获取用户账户状态
  const { address, isConnectedOnly, needBindInviteCode, isRegistered, isProfileCompleted } = useAccount();
  
  // 根据状态确定显示文本
  const buttonText = customText || getButtonText(address, needBindInviteCode, isRegistered, isProfileCompleted);
  
  // 触发登录弹窗事件 - 与ConnectInfo组件一致
  const handleClick = () => {
    if (address && !needBindInviteCode && !isProfileCompleted) {
      // 如果已连接已绑定但资料未完善，直接进入资料填写步骤
      handleSignIn('profile');
    } else {
      // 其他情况使用默认流程
      handleSignIn();
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

// 根据用户状态确定按钮文本
function getButtonText(
  address?: string, 
  needBindInviteCode?: boolean,
  isRegistered?: boolean,
  isProfileCompleted?: boolean
): string {
  if (!address) {
    return "Sign In";
  }
  
  if (needBindInviteCode) {
    return "Bind Invite Code";
  }
  
  if (isRegistered && !isProfileCompleted) {
    return "Complete Profile";
  }
  
  return "Sign In";
}

export default SignInButton;