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
        desc: <div className="flex flex-col gap-2 text-[#A1A1AA]">
            <span>Share your invite code with potential users to invite more people to join Cysic and earn additional rewards!</span>
            <span>Your invite code is <span className="text-[#00F0FF]">permanently valid</span> and can be shared with up to <span className="text-[#00F0FF]">1,000 users</span>.</span>
        </div>
    },
    {
        progress: 66.67,
        title: 'Unlock Rewards and Lower Fees by Leveling Up',
        img: getImageUrl('@/assets/images/howInviteWorks/step-2.png'),
        desc: <div className="flex flex-col gap-2 text-[#A1A1AA]">
            <span>Higher levels grant you one-time point rewards and lower pool fees. Leveling up depends on the number of activated users you've directly invited, with each level requiring a certain number.</span>
            <span>To become activated, <span className="text-[#00F0FF]">Verifiers</span> must complete <span className="text-[#00F0FF]">10</span> verification tasks, <span className="text-[#00F0FF]">Provers</span> need <span className="text-[#00F0FF]">3</span> proof tasks, and if they are both, the faster of the two will be counted. Only activated users are considered successful invitations.</span>
            <div className="text-[#A1A1AA] p-2 bg-[#FFFFFF0D]">You can check your current level, pool fee, and the number of activated users you've invited in the "My Level" section.</div>
        </div>
    },
    {
        progress: 100,
        title: 'Earn Instant Point Rebates from Your Team',
        img: getImageUrl('@/assets/images/howInviteWorks/step-3.png'),
        desc: <div className="flex flex-col gap-1">
            <span>After the people you invite and those they invite join Cysic, whenever they earn points, you’ll immediately receive <span className="text-[#00F0FF]">16%</span> of the points earned by your direct invites from being a Verifier/Prover and <span className="text-[#00F0FF]">8%</span> from their invites, regardless of whether they are activated users or not</span>
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
                                    <div>{i.title}</div>
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
