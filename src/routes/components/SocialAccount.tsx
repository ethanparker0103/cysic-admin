import GradientBorderCard from "@/components/GradientBorderCard";
import useAccount from "@/hooks/useAccount";
import { getImageUrl } from "@/utils/tools";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

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
  <div className="flex justify-between items-center py-2 w-full">
    <div className="flex items-center gap-2">
      {icon}
      {account ? <span className="text-white">{account}</span> : null}
    </div>
    {action}
  </div>
);

const showAllMedia = true;

// Utility to generate a PKCE code challenge (for simplicity using a constant or integrate a proper PKCE lib)
const generateCodeChallenge = (): string => {
  // In production, implement PKCE generation: generate random code_verifier and derive code_challenge via SHA256
  return "challenge_placeholder";
};

const SocialAccount = () => {
  const { socialAccount } = useAccount();

  const oauthConfig: Record<string, any> = {
    google: {
      url: "https://accounts.google.com/o/oauth2/v2/auth",
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirectUri: `${window.location.origin}/auth/callback/google`,
      responseType: "code",
      scope: ["openid", "profile", "email"].join(" "),
      extraParams: { access_type: "offline", prompt: "consent" },
    },
    x: {
      url: "https://x.com/i/oauth2/authorize",
      clientId: import.meta.env.VITE_TWITTER_CLIENT_ID,
      redirectUri: `${window.location.origin}/auth/callback/x`,
      responseType: "code",
      scope: ["tweet.read", "users.read", "offline.access"].join(" "),
      // PKCE params
      extraParams: {
        code_challenge: generateCodeChallenge(),
        code_challenge_method: "plain",
      },
    },
    discord: {
      url: "https://discord.com/api/oauth2/authorize",
      clientId: import.meta.env.VITE_DISCORD_CLIENT_ID,
      redirectUri: `${window.location.origin}/auth/callback/discord`,
      responseType: "code",
      scope: ["identify", "email"].join(" "),
    },
  };

  const handleOAuthRedirect = (provider: string) => {
    const config = oauthConfig[provider];
    if (!config) return;

    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: config.responseType,
      scope: config.scope,
      state: provider, // implement robust state for CSRF protection
      ...config.extraParams,
    });

    window.open(
      `${config.url}?${params.toString()}`,
      "_blank",
      "width=500,height=600,scrollbars=yes"
    );
  };

  return (
    <GradientBorderCard borderRadius={8} className="h-full">
      <div className="py-4 px-6 w-full h-full">
        <div className="text-base !font-light uppercase mb-2">
          SOCIAL ACCOUNT
        </div>

        {showAllMedia && (
          <>
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
                  <div
                    className="cursor-pointer flex items-center"
                    onClick={() => handleOAuthRedirect("google")}
                  >
                    BIND GMAIL
                    <ArrowRight size={12} className="text-sub ml-2" />
                  </div>
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
                  <div
                    className="cursor-pointer flex items-center"
                    onClick={() => handleOAuthRedirect("x")}
                  >
                    BIND X
                    <ArrowRight size={12} className="text-sub ml-2" />
                  </div>
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
                  <div
                    className="cursor-pointer flex items-center"
                    onClick={() => handleOAuthRedirect("discord")}
                  >
                    BIND DISCORD
                    <ArrowRight size={12} className="text-sub ml-2" />
                  </div>
                )
              }
            />
          </>
        )}
      </div>
    </GradientBorderCard>
  );
};

export default SocialAccount;
