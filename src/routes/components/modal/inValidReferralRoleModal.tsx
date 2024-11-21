import Button from "@/components/Button";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import useUser from "@/models/_global/user";
import { getImageUrl } from "@/utils/tools";
import useAccount from "@/hooks/useAccount";
import useReferral from "@/models/_global/referral";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InValidReferralRoleModal = () => {
    const { address } = useAccount()
    const { profile } = useUser()
    const { code } = useReferral()


    const minStakeAmount = +profile?.[address as string]?.minStakeAmount || 0
    const isPhase1Whitelist = profile?.[address as string]?.isPhase1Whitelist
    const ifInvalid = profile && !isPhase1Whitelist && !code

    useEffect(() => {
        if (ifInvalid) {
            setVisible(true)
        }
    }, [ifInvalid])

    const { visible, setVisible } = useModalState({
        eventName: "modal_invalid_referral_role_visible",
    });

    const navigate = useNavigate()



    return (
        <Modal
            isOpen={visible}
            onClose={() => { }}
            className="[&_button.absolute]:hidden max-w-[558px] border border-[#FFFFFF33]"
        >
            <div className="flex flex-col">
                <div className="w-full">
                    <img
                        className="w-full"
                        src={getImageUrl("@/assets/images/_global/present.png")}
                    />
                </div>
                <div className="pt-6 pb-6 pt-10 px-10 flex flex-col gap-6">
                    <div className="text-base text-[#fff] font-[500] flex flex-col gap-2">
                        <div className="leading-[1.3]">
                            🎉 You're being invited to Cysic Network! It all begins with our Genesis Node holders. Whether invited directly or through their network, you're in and ready to run as a verifier and prover, sharing 15% of your rewards with the referrer who brought you into this exclusive journey.
                        </div>
                        <div className="leading-[1.3]">Want to get your own referral code? <span className="text-[#00F0FF]">Stake {minStakeAmount} $CGT</span> - Earn $CGT by running our node!</div>
                        <div className="leading-[1.3] text-sm text-[#A1A1AA]">*Staking limits may change as the network grows.</div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            className="rounded-full flex-1"
                            type="solidGradient"
                            onClick={() => navigate('/dashboard/verifier')}
                        >
                            Become a Verifier
                        </Button>
                        <Button
                            className="rounded-full flex-1"
                            onClick={() => navigate('/dashboard/prover')}
                            type="gradient"
                        >
                            Become a Prover
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default InValidReferralRoleModal;
