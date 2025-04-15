import Button from "@/components/Button";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import useUser from "@/models/_global/user";
import { mediasLink, openTwitterLink } from "@/config";
import { getImageUrl } from "@/utils/tools";
import useAccount from "@/hooks/useAccount";
import axios from "axios";
import { toast } from "react-toastify";
import { useEventListener } from "ahooks";
import { useState } from "react";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

const descList = [
  {
    title: "New Consensus Mechanism",
    desc: "The latest upgrade introduces a robust consensus mechanism designed to enhance scalability and security, ensuring that every transaction is validated with the utmost efficiency.",
  },
  {
    title: "Dual Token Model",
    desc: (
      <div>
        Introducing our new token model, $CYS and $CGT, built to optimize
        network incentives and governance.{" "}
        <span
          onClick={() => window.open(mediasLink.twitterWhitePaper, "_blank")}
          className="cursor-pointer text-[#00F0FF] underline"
        >
          Learn more
        </span>{" "}
        about how these two tokens work together to power the Cysic ecosystem.
      </div>
    ),
  },
  {
    title: "Referral Program Launch",
    desc: "Our referral program is getting a boost! Earn exclusive rewards by bringing more users into the Cysic Network and enjoy the benefits of community-driven growth.",
  },
];

const ReferralRewardModal = () => {
  const [nextLevel, setNextLevel] = useState<any>()
  const [currentInvites, setCurrentInvites] = useState('0')
  const { address } = useAccount();
  const { visible, setVisible } = useModalState({
    eventName: "modal_referral_reward_visible",
  });

  useEventListener('modal_referral_reward_visible' as any, (e: any)=>{
    setNextLevel(e?.detail?.nextLevel)
    setCurrentInvites(e?.detail?.currentInvites)
  })
  const handleClaim = async (closeLoading?: any) => {
    try {
      // /api/v1/myPage/:address/claimPhase1Reward
      const res = await axios.get(
        `/api/v1/myPage/${address}/claimPhase1Reward`
      );

      console.log("res", res);

      if (res?.data?.success) {
        toast.success("Submit Claim success");
      }
      setVisible(false);
    } catch (e) {
      console.log("e", e);
    } finally {
      closeLoading?.();
    }
  };
  return (
    <Modal
      isOpen={visible}
      onClose={() => setVisible(false)}
      className="[&_button]:z-[2] max-w-[558px] border border-[#FFFFFF33]"
    >
      <div className="flex flex-col">
        <div className="w-full">
          <img
            className="w-full"
            src={getImageUrl("@/assets/images/_global/present.png")}
          />
        </div>
        <div className={clsx("pt-6 pb-6 pt-10 flex flex-col gap-6", isMobile ? "" : "px-10")}>
          <div className="text-lg text-[#fff] font-[500] flex flex-col gap-2 leading-[1.5]">
            <div>
              🎉 You've unlocked +{currentInvites} referral invites bonus! Just invite {nextLevel?.Require} more
              friend(s) to level up and get {nextLevel?.LevelUpRewardPoint || '0'} $CGT.
            </div>
            <div>Share your invite code now and make it happen!</div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              className="rounded-full flex-1"
              type="solidGradient"
              onClick={() => setVisible(false)}
            >
              Claim it
            </Button>
            <Button
              className={clsx("rounded-full flex-1", isMobile ? "flex flex-nowrap" : "")}
              disabled={!address}
              onClick={openTwitterLink}
              type="gradient"
            >
              <img src={getImageUrl("@/assets/images/media/twitter_light.svg")} />
              <span>Tweet for more points</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReferralRewardModal;
