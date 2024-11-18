import Button from "@/components/Button";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import useUser from "@/models/_global/user";
import { mediasLink } from "@/config";
import { getImageUrl } from "@/utils/tools";
import useAccount from "@/hooks/useAccount";
import axios from "axios";
import { toast } from "react-toastify";

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

const Phase1RewardModal = () => {
  const { address } = useAccount();
  const { setState, profile } = useUser();
  const { visible, setVisible } = useModalState({
    eventName: "modal_phase_1_reward_visible",
  });

  const handleClaim = async (closeLoading?: any) => {
    try {
      // /api/v1/myPage/:address/claimPhase1Reward
      const res = await axios.get(
        `/api/v1/myPage/${address}/claimPhase1Reward`
      );

      console.log("res", res);

      if (res?.data?.success) {
        toast.success("Sumit Claim success");
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
      className="[&_button]:z-[2] max-w-fit border border-[#FFFFFF33]"
    >
      <div className="flex ">
        <div className="w-[17.5rem]">
          <img
            className="w-full"
            src={getImageUrl("@/assets/images/_global/reward.png")}
          />
        </div>
        <div className="max-w-[480px] py-10 pr-10 flex flex-col gap-10">
          <div className="flex flex-col gap-6 flex-1">
            <div className="Gemsbuck text-gradient text-[30px] font-[400]">
              YOUR EXCLUSIVE BONUS
            </div>
            <div className="text-lg text-[#fff] font-[500] flex flex-col gap-2 leading-[1.5]">
              <div>
                🎉 Well done, Cysor! Your support in running a verifier light
                node during Testnet Phase I has been vital to strengthening our
                network.{" "}
              </div>
              <div>
                Claim your $CGT bonus now and let’s step into the next phase!
              </div>
            </div>
          </div>

          <Button
            needLoading
            className="rounded-full"
            type="gradient"
            onClick={handleClaim}
          >
            Claim {profile?.[address]?.reward_amount} $
            {profile?.[address]?.reward_token}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Phase1RewardModal;
