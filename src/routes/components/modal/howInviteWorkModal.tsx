import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { handleHowInviteWorkModal } from "@/utils/tools";
import { enableSocialTask } from "@/config";

const steps = [
  {
    buttonText: "Next",
    content: (
      <>
        1. Invite Code and Levels<br/><br/>
        Your Cysic Network Invite Code and account work seamlessly across all Cysic services—including Cysic ZK, Cysic AI, and the upcoming Cysic Mining.<br/><br/>
        There are 5 Invite Levels. As you successfully invite more users, your level increases and unlocks exclusive rewards—such as higher Rebate Rates, enhanced Multipliers, and more.<br/><br/>
        ⚠️ A user must complete all Basic Tasks in the {enableSocialTask ? <Link onClick={()=>handleHowInviteWorkModal(false)} to={'/socialTask'} className="!text-[#19FFE0] !underline">Social Tasks</Link> : <span className="!text-[#19FFE0] !underline">Social Tasks(Coming Soon)</span>} to count as a Successful Invite.
      </>
    ),
  },
  {
    buttonText: "Previous",
    content: (
      <>
      2. Rebate Rewards<br/><br/>
      Rebate Rewards = (NFT purchase by direct invitee × your Rebate Rate) + (NFT purchase by indirect invitee × fixed 2%)<br/><br/>
      Your invite performance earns you token rewards based on the NFT purchases made by your invitees.<br/><br/>
      You can boost your Rebate Rate by completing tasks—visit the {enableSocialTask ? <Link onClick={()=>handleHowInviteWorkModal(false)} to={'/socialTask'} className="!text-[#19FFE0] !underline">Social Tasks page</Link> : <span className="!text-[#19FFE0] !underline">Social Tasks page(Coming Soon)</span>} to learn how.
      </>
    )
  }
];

const HowInviteWorkModal = () => {
  // 获取模态框状态
  const { visible, setVisible, data } = useModalState({
    eventName: "modal_how_invite_work_visible",
  });

  const [step, setStep] = useState(0);

  const handleClose = () => {
    setVisible(false);
    setStep(0);
  };

  const handleSwitchStep = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <Modal
      isOpen={visible}
      onClose={handleClose}
      className="max-w-[600px]"
      title="How invite work"
    >
      <div className="flex flex-col gap-6">
        <p>{steps[step].content}</p>
        <Button type="light" onClick={handleSwitchStep} className="py-6">
          {steps[step].buttonText}
        </Button>
      </div>
    </Modal>
  );
};

export default HowInviteWorkModal;
