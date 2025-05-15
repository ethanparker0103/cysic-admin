import GradientBorderCard from "@/components/GradientBorderCard";
import useAccount from "@/hooks/useAccount";
import { getImageUrl } from "@/utils/tools";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

// 社交账户项组件
interface SocialAccountItemProps {
  icon: ReactNode;
  account: string;
  action?: ReactNode;
}

const SocialAccountItem = ({
  icon,
  account,
  action,
}: SocialAccountItemProps) => (
  <div className="flex justify-between items-center py-2 w-full">
    <div className="flex items-center justify-between gap-2 w-full">
      {icon}
      <span className="text-white">{account}</span>
    </div>
    {action}
  </div>
);

const showAllMedia = true;

const SocialAccount = () => {
  const { socialAccount } = useAccount();

  // 格式化社交账号
  const googleAccount = socialAccount?.google?.name || "";
  const xAccount = socialAccount?.x?.name || "";
  const discordAccount = socialAccount?.discord?.name || "";

  return (
    <GradientBorderCard borderRadius={8} className="h-full">
      <div className="py-4 px-6 w-full h-full">
        <div className="text-base !font-light uppercase mb-2">
          SOCIAL ACCOUNT
        </div>

        {(showAllMedia || googleAccount) && (
          <SocialAccountItem
            icon={
              <img src={getImageUrl("@/assets/images/icon/gmail.svg")} className="w-6 h-6" />
            }
            account={googleAccount ? googleAccount : "BIND GMAIL"}
            action={
              googleAccount ? null : (
                <ArrowRight size={12} className="text-sub ml-2" />
              )
            }
          />
        )}

        {(showAllMedia || xAccount) && (
          <SocialAccountItem
            icon={
              <img src={getImageUrl("@/assets/images/icon/x.svg")} className="w-6 h-6" />
            }
            account={xAccount ? `@${xAccount}` : "BIND X"}
            action={
              xAccount ? null : (
                <ArrowRight size={12} className="text-sub ml-2" />
              )
            }
          />
        )}

        {(showAllMedia || discordAccount) && (
          <SocialAccountItem
            icon={
              <img src={getImageUrl("@/assets/images/icon/discord.svg")} className="w-6 h-6" />
            }
            account={discordAccount ? discordAccount : "BIND DISCORD"}
            action={
              discordAccount ? null : (
                <ArrowRight size={12} className="text-sub ml-2" />
              )
            }
          />
        )}
      </div>
    </GradientBorderCard>
  );
};

export default SocialAccount;
