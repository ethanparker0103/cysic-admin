import GradientBorderCard from "@/components/GradientBorderCard";
import useAccount from "@/hooks/useAccount";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

// 社交账户项组件
interface SocialAccountItemProps {
    icon: ReactNode;
    account: string;
    action?: ReactNode;
}

const SocialAccountItem = ({ icon, account, action }: SocialAccountItemProps) => (
    <div className="flex justify-between items-center py-2 w-full">
        <div className="flex items-center justify-between gap-2 w-full">
            {icon}
            <span className="text-white">{account}</span>
        </div>
        {action}
    </div>
);


const SocialAccount = () => {
    const { user } = useAccount()
    const { socialAccountList } = user || {};
    

    // 格式化社交账号
    const googleAccount = socialAccountList?.google?.name || "";
    const xAccount = socialAccountList?.x?.name || "";
    const discordAccount = socialAccountList?.discord?.name || "";
    
    return (
        <GradientBorderCard borderRadius={8} className="h-full">
        <div className="py-4 px-6 w-full h-full">
            <div className="text-base !font-light uppercase mb-2">SOCIAL ACCOUNT</div>

            {googleAccount && (
                <SocialAccountItem
                    icon={<span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">G</span>}
                    account={googleAccount}
                />
            )}

            {xAccount && (
                <SocialAccountItem
                    icon={<span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">X</span>}
                    account={`@${xAccount}`}
                />
            )}

            {discordAccount ? (
                <SocialAccountItem
                    icon={<span className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs text-white">D</span>}
                    account={discordAccount}
                    action={<ArrowRight size={12} className="text-sub ml-2" />}
                />
            ) : (
                <SocialAccountItem
                    icon={<span className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs text-white">D</span>}
                    account="BIND DISCORD"
                    action={<ArrowRight size={12} className="text-sub ml-2" />}
                />
            )}
        </div>
    </GradientBorderCard>
    )
}

export default SocialAccount;