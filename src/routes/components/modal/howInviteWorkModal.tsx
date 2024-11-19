import Button from "@/components/Button";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import { ModalBody, ModalHeader, Progress } from "@nextui-org/react";
import useCosmos from "@/models/_global/cosmos";
import Input from "@/components/Input";
import { useState } from "react";
import { getImageUrl } from "@/utils/tools";
import BigNumber from "bignumber.js";

const descList = [
    {
        progress: 33.33,
        title: 'Invites Team Members to Cysic Network',
        img: getImageUrl('@/assets/images/howInviteWorks/step-1.png'),
        desc: <div className="flex flex-col gap-2 text-[#A1A1AA] leading-[1.5]">
            <span className="leading-[1.3]">Congratulations, you’re now the leader of your team! Share your invite code to grow the Cysic community and boost your rewards. </span>
            <span className="leading-[1.3]">Your code is <span className="text-[#00F0FF]">permanently valid</span> and can be shared with up to <span className="text-[#00F0FF]">300 users</span>.</span>
        </div>
    },
    {
        progress: 66.67,
        title: 'Unlock Bonus and Lower Pool Fees by Leveling Up',
        img: getImageUrl('@/assets/images/howInviteWorks/step-2.png'),
        desc: <div className="flex flex-col gap-2 text-[#A1A1AA] leading-[1.5]">
            <span className="leading-[1.3]">Higher levels grant you one-time rewards and reduced pool fees. Level up by inviting successfully activated users—each level requires a specific count of activated invites.</span>
            <span className="leading-[1.3]">To qualify as an activated and successful invite:</span>
            <ul>
                <li className="leading-[1.3] list-inside list-disc">Verifiers must complete 10 verification tasks.</li>
                <li className="leading-[1.3] list-inside list-disc">Provers must complete 3 proof tasks.</li>
                <li className="leading-[1.3] list-inside list-disc">For users with both roles, the faster task completion counts.</li>
            </ul>
            <div className="text-[#A1A1AA] leading-[1.5] p-2 bg-[#FFFFFF0D]">Only activated users count as successful invites.</div>
        </div>
    },
    {
        progress: 100,
        title: 'Earn Instant Referral Earnings from Your Team',
        img: getImageUrl('@/assets/images/howInviteWorks/step-3.png'),
        desc: <div className="flex flex-col gap-1 text-[#A1A1AA] leading-[1.5]">
            <span className="leading-[1.3]">After your invites join Cysic, you’ll receive 15% of their Verifier/Prover rewards, regardless of whether they are activated users.</span>
            <span className="leading-[1.3]">View your current level, bonus, pool fee, and successful invites in the "Referral" page.</span>
        </div>
    },
]

const HowInviteWorkModal = () => {
    const { visible, setVisible } = useModalState({eventName: "modal_how_invite_work_visible"});
    const { address } = useCosmos()
    const [activeIndex, setActiveIndex] = useState(0)


    const activeList = descList?.[activeIndex]
    return (
        <Modal
            isOpen={visible}
            onClose={() => setVisible(false)}
            className="[&_button]:z-[2] max-w-[480px] border border-[#FFFFFF33]"
        >
            <>
                <ModalHeader>How Invite Works</ModalHeader>
                <ModalBody className="pb-6">
                    <div className="flex flex-col gap-6">
                        <Progress size="sm" value={activeList.progress} classNames={{indicator: "bg-gradient",}}/>
                        {[activeList].map((i, index) => {
                            return <div key={index} className="flex flex-col gap-6">
                                <img src={i.img} />
                                <div className="flex flex-col gap-2">
                                    <div className="text-base font-[600]">{i.title}</div>
                                    {i.desc}
                                </div>
                            </div>
                        })}
                        <div className="flex items-center justify-between gap-4">
                            {activeIndex > 0 ? <Button type="solidGradient" className="flex-1" onClick={() => setActiveIndex(old => BigNumber.max(0, +old - 1).toNumber())}>Previous</Button> : null}
                            {activeIndex < (descList?.length - 1) ? <Button type="gradient" className="flex-1" onClick={() => setActiveIndex(old => BigNumber.min(+old + 1, descList?.length - 1).toNumber())}>Next</Button> : null}
                            {activeIndex == (descList?.length - 1) ? <Button type="gradient" className="flex-1" onClick={() => setVisible(false)}>OK</Button> : null}
                        </div>
                    </div>
                </ModalBody>

            </>
        </Modal>
    );
};

export default HowInviteWorkModal;
