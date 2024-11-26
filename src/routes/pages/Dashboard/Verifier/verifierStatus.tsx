import useAccount from "@/hooks/useAccount";
import useUser from "@/models/_global/user";
import clsx from "clsx";

const Status = ({ suc }: any) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-1",
        suc == undefined
          ? "text-[#4e4e4e]"
          : suc
          ? "text-[#11D473]"
          : "text-[#FF401A]"
      )}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6" cy="6" r="6" fill="currentColor" fillOpacity="0.2" />
        <circle cx="6" cy="6" r="3" fill="currentColor" />
      </svg>
      <span className="text-sm font-[400]">
        {suc == undefined ? "Pending" : suc ? "Active" : "Inactive"}
      </span>
    </div>
  );
};

const VerifierStatus = () => {
  const { address } = useAccount();
  const { profile } = useUser();

  const scrollProverStatus = profile?.[address as string]
    ? !!profile?.[address as string]?.verifier?.find((i: any) => i?.ID)
    : undefined;

  return (
    <div className="flex flex-col gap-4 p-8 rounded-[16px] border border-[rgba(255,255,255,0.2)]">
      <div className="flex items-center gap-6">
        <div className="text-lg text-[#fff]">Verifier Status</div>
        <Status suc={scrollProverStatus} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-base font-[500]">
            ✨ Run your Verifier Node and start earning Testnet Token $CYS and
            $CGT!
          </span>
          <span className="text-[#A3A3A3] text-sm">
            Once your node is running, it works seamlessly in the background—no
            manual actions required. Just{" "}
            <span className="text-[#00F0FF]">
              ensure your node stays active
            </span>{" "}
            to automatically receive tasks. When your node successfully
            completes a task as one of the top 6 verifiers, your $CYS and $CGT
            rewards will be credited directly to 'My Page'.
          </span>
          <span className="text-[#A3A3A3] text-sm">
            If you have any questions, find us in our{" "}
            <span className="text-[#00F0FF]">discord channel</span> for
            support—we're{" "}
            <a
              className="!underline !text-[#00F0FF]"
              href="https://discord.com/channels/1127954093990760539/1308397379954671696"
              target="_blank"
            >
              here
            </a>{" "}
            to help!
          </span>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default VerifierStatus;
