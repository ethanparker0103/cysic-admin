import { getReferralUrl } from "@/config";
import useAccount from "@/hooks/useAccount";
import useReferral from "@/models/_global/referral";
import useUser from "@/models/_global/user";
import { Snippet } from "@nextui-org/react";
import clsx from "clsx";

const ReferralCodeCopy = ({ className }: any) => {
  const { code } = useReferral();

  const { address } = useAccount()
  const { profile } = useUser()
  const isPhase1Whitelist = profile?.[address as string]?.isPhase1Whitelist
  console.log('profile_', isPhase1Whitelist)

  

  return (
    <Snippet
      classNames={{
        base: "bg-[#000]",
      }}
      symbol=""
      codeString={getReferralUrl()}
      variant="bordered"
      className={clsx("!gap-0 [&_pre]:w-full", className)}
    >
      <div className="w-full flex items-center justify-between gap-4">
        <span>Referral Code</span>
        <span>{code}</span>
      </div>
    </Snippet>
  );
};

export default ReferralCodeCopy;
