import Button from "@/components/Button";
import GradientBorderCard from "@/components/GradientBorderCard";
import useAccount from "@/hooks/useAccount";
import { getImageUrl } from "@/utils/tools";
import { usePrivy } from "@privy-io/react-auth";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

interface SocialAccountItemProps {
  icon: ReactNode;
  account?: string;
  action?: ReactNode;
}

const SocialAccountItem = ({
  icon,
  account,
  action,
}: SocialAccountItemProps) => (
  <div className="flex justify-between items-center w-full">
    <div className="flex items-center gap-2 flex-1 justify-between">
      {icon}
      {account ? <span className="text-white">{account}</span> : null}
    </div>
    {action}
  </div>
);

const showAllMedia = true;


const SocialAccount = () => {
  const { socialAccount } = useAccount();
  const { linkDiscord, linkGoogle, linkTwitter } = usePrivy();

  const handleLoginOrLink = async (type: string) => {
    try {
      if (type === 'google') {
        await linkGoogle()
      } else if (type === 'twitter') {
        await linkTwitter()
      } else if (type === 'discord') {
        await linkDiscord()
      }
    } catch (error: any) {
      console.error(error)
      if (error.message.includes('User must be authenticated before linking an account')) {
        toast.error('Please Connect your wallet first')
      } else {
        toast.error(error.message)
      }
    }
  }

  return (
    <GradientBorderCard borderRadius={8} className="h-full">
      <div className="py-4 px-6 w-full h-full flex flex-col gap-2">
        <div className="text-base !font-light uppercase mb-2">
          SOCIAL ACCOUNT
        </div>

        {showAllMedia && (
          <div className="flex flex-col gap-2 flex-1 justify-between">
            <SocialAccountItem
              icon={
                <img
                  src={getImageUrl("@/assets/images/icon/gmail.svg")}
                  className="w-6 h-6"
                />
              }
              account={socialAccount?.google?.name}
              action={
                !socialAccount?.google?.name && (
                  <Button
                    needLoading
                    type="text"
                    className="cursor-pointer flex items-center !p-0 min-h-fit justify-end"
                    onClick={() => handleLoginOrLink('google')}
                  >
                    BIND GMAIL
                    <ArrowRight size={12} className="text-sub ml-2" />
                  </Button>
                )
              }
            />

            <SocialAccountItem
              icon={
                <img
                  src={getImageUrl("@/assets/images/icon/x.svg")}
                  className="w-6 h-6"
                />
              }
              account={
                socialAccount?.x?.name ? `@${socialAccount.x.name}` : ""
              }
              action={
                !socialAccount?.x?.name && (
                  <Button
                    needLoading
                    type="text"
                    className="cursor-pointer flex items-center !p-0 min-h-fit justify-end"
                    onClick={() => handleLoginOrLink('twitter')}
                  >
                    BIND X
                    <ArrowRight size={12} className="text-sub ml-2" />
                  </Button>
                )
              }
            />

            <SocialAccountItem
              icon={
                <img
                  src={getImageUrl("@/assets/images/icon/discord.svg")}
                  className="w-6 h-6"
                />
              }
              account={socialAccount?.discord?.name}
              action={
                !socialAccount?.discord?.name && (
                  <Button
                    needLoading
                    type="text"
                    className="cursor-pointer flex items-center !p-0 min-h-fit justify-end"
                    onClick={() => handleLoginOrLink('discord')}
                  >
                    BIND DISCORD
                    <ArrowRight size={12} className="text-sub ml-2" />
                  </Button>
                )
              }
            />
          </div>
        )}
      </div>
    </GradientBorderCard>
  );
};

export default SocialAccount;
