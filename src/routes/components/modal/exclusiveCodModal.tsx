import Button from "@/components/Button";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import useUser from "@/models/_global/user";
import { blockTime, mediasLink, openTwitterLink } from "@/config";
import { getImageUrl, sleep } from "@/utils/tools";
import useAccount from "@/hooks/useAccount";
import axios from "axios";
import { useEffect } from "react";
import ReferralCodeCopy from "@/components/ReferralCodeCopy";
import { useLocalStorageState, useRequest } from "ahooks";
import useReferral from "@/models/_global/referral";

const ExclusiveCodModal = () => {
  const [storage, setStorage] = useLocalStorageState('codeCreatedModalVisible', {
    defaultValue: false
  })

  const { setState: setReferralState } = useReferral()
  const { address } = useAccount();
  // const { setState, profile } = useUser();
  const { visible, setVisible } = useModalState({
    eventName: "modal_exclusive_code_visible",
  });


  useEffect(()=>{
    if(!storage){
      setVisible(true)
    }
  }, [storage])

  useRequest(()=>{
    return axios.get(
      `/api/v1/referral/${address}/code`
    );

  }, {
    async onSuccess(e){
      const isPhase1Whitelist = e?.data?.isPhase1Whitelist
      const code = e?.data?.code
      if(code && !isPhase1Whitelist){
        setReferralState({code: code})
        setStorage(true)
        await sleep(100)
        setVisible(true)
      }
    },
    ready: address&&!storage,
    refreshDeps: [address, storage],
    pollingInterval: blockTime.long
  })
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
              YOUR EXCLUSIVE CODE
            </div>
            <div className="text-lg text-[#fff] font-[500] flex flex-col gap-2 leading-[1.5]">
              <div>
                🎉 Awesome job, Cysor! Your support in running a node during Testnet Phase II is powering up our network and making it stronger than ever.
              </div>
              <div>
                You've unlock your exclusive Referral Code! Get ready to share your invite.
              </div>
            </div>
          </div>

          
          <div className="flex items-center gap-4">
            <ReferralCodeCopy className="rounded-full flex-1" />
            <Button
              className="rounded-full flex-1 flex items-center"
              disabled={!address}
              onClick={openTwitterLink}
              type="gradient"
            >
              <img src={getImageUrl("@/assets/images/media/twitter_light.svg")} />
              <span className="flex-1">Tweet for more points</span>
            </Button>
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default ExclusiveCodModal;
