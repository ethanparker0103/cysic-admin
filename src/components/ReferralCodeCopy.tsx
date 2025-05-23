import { getReferralUrl } from "@/config";
import useReferral from "@/models/_global/referral";
import { Snippet } from "@nextui-org/react";
import clsx from "clsx";

const ReferralCodeCopy = ({ className }: any) => {
  const { code } = useReferral();  

  return (
    <Snippet
      classNames={{
        base: "bg-black",
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
