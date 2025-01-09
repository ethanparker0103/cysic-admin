import Button from "@/components/Button";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import useUser from "@/models/_global/user";
import { downloadLink, mediasLink } from "@/config";

const tutorialList = {
  android: [
    {
      title: "👉 Step 1: Install The APP",
      subTitle: 'Download the official Cysic Verifier App '
    },
    {
      title: "👉 Step 2: lmport Your Wallet",
      subTitle: 'Import your wallet seed phrase. Cysic does not store any seed phrases or private keys. Please ensure the security of your wallet information.',
    },
    {
      title: "👉 Step 3: Start Verifcation",
      subTitle: <div className="">
        Click the Start <span className="font-semibold">Verification button</span> on the main interface to begin the Verifier process. After starting verifier, Cysic App can switch to backstage operating. You can <span className="font-semibold">start</span> or <span className="font-semibold">stop</span> the verification work at any time.
      </div>,
    },
  ],
}


const DownloadAppModal = () => {
  const { setState } = useUser()
  const { visible, setVisible } = useModalState({ eventName: "modal_download_app_visible" });

  const handleClose = () => {
    setVisible(false)
    setState({ phase2ModalStatus: false })
  }

  return (
    <Modal
      isOpen={visible}
      onClose={() => setVisible(false)}
      className="[&_button]:z-[2] max-w-[580px] border border-[#FFFFFF33]"
    >
      <div className="flex flex-col">
        <div className="border-b border-[#2B2B2B] flex flex-col gap-2 px-6 py-4 text-lg text-[#fff]">
          CYSIC VERIFIER APP
        </div>
        <div className="p-6 flex flex-col gap-3 text-sm text-[#fff]">

          <div className="flex flex-col gap-6 flex-1">
            <div className="font-semibold">We are excited to announce that the Cysic Verifier Android App has been released. Testnet users can download it to start the Verifier verification work, and it can switch to background work without affecting phone usage.</div>
            {tutorialList?.["android"]?.map((i, index) => {
              return (
                <div key={index} className="flex flex-col gap-2">
                  <div className="font-[700] text-[#fff]">
                    {i?.title}
                  </div>
                  <div className="leading-[1.2] font-[400] text-[#D3D3D3]">
                    {i?.subTitle}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        <div className="px-6 pb-6 flex items-center gap-4 justify-between">
          <Button className="flex-1 rounded-full" type="colorGradient" onClick={()=>{}}>
            Google Play Coming soon
          </Button>
          <Button className="flex-1 rounded-full" type="gradient" onClick={() => window.open(downloadLink.andorid, '_blank')}>
            Apk Download
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadAppModal;
