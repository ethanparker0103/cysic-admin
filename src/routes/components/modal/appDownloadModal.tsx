import Button from "@/components/Button";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import useUser from "@/models/_global/user";
import { downloadLink } from "@/config";
import { getImageUrl } from "@/utils/tools";
import { BrowserView, isMobile } from "react-device-detect";
import clsx from "clsx";

const features = [
  'Lightweight',
  'Easy setup',
  'Secure',
  'Synced across devices'
]


const DownloadAppModal = () => {
  const { visible, setVisible } = useModalState({ eventName: "modal_download_app_visible" });

  return (
    <Modal
      isOpen={visible}
      onClose={() => setVisible(false)}
      className="[&_button]:z-[2] max-w-[670px] border border-[#FFFFFF33]"
    >
      <div className={clsx("flex items-center", isMobile ? "px-10" : "pl-10")}>
        <div className="flex flex-col gap-5 flex-1 py-10">
          <div className="flex flex-col gap-3">
            <div className="Gemsbuck text-[25px] font-semibold text-gradient">TRY THE NEW CYSIC MOBILE APP FOR Android</div>
            <span className="text-sm font-semibold text-[#737373]">Verification Made Simple. Get it Now!</span>
          </div>
          <div className="bg-[#FFFFFF0D] rounded-[16px] p-4 flex flex-col gap-3">
            <div className="font-semibold text-[#fff]">RUN YOUR NODE WITH JUST A TAP</div>
            <div className="flex flex-wrap gap-y  -2">
              {features.map((item, index) => {
                return <div key={index} className="flex items-center gap-2 w-1/2">

                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.00033 12.8333C10.222 12.8333 12.8337 10.2217 12.8337 7C12.8337 3.77834 10.222 1.16666 7.00033 1.16666C3.77866 1.16666 1.16699 3.77834 1.16699 7C1.16699 10.2217 3.77866 12.8333 7.00033 12.8333ZM6.08188 9.5509L10.2938 5.98695L9.54022 5.09633L6.16883 7.94905L4.50647 6.20034L3.6609 7.00415L6.08188 9.5509Z" fill="#00F0FF" />
                  </svg>

                  <div className="flex-1 text-[#A1A1AA] text-sm">{item}</div>
                </div>
              })}

            </div>
          </div>
          <Button className="rounded-full" type="gradient" onClick={() => window.open(downloadLink.andorid, "_blank")}>
            <div className="flex items-center gap-2">
              <div className="rounded bg-[#FFFFFF26] border border-[#fff] p-2 rounded-full">
                <img
                  className="size-4"
                  src={getImageUrl("@/assets/images/_global/download.svg")}
                />
              </div>
              <span className="text-[#fff] font-semibold">APK Download</span>
            </div>
          </Button>
        </div>
        <BrowserView>
          <div className="w-[14.875rem] relaitve aspect-[286/356]">
            <img className=" aspect-[286/356] absolute w-[17.875rem] top-0 right-0" src={getImageUrl('@/assets/images/download/mobile_download_modal_bg.png')} />
          </div>
        </BrowserView>
      </div>
    </Modal>
  );
};

export default DownloadAppModal;
