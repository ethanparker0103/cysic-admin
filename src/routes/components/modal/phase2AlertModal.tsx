import Button from "@/components/Button";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import useUser from "@/models/_global/user";
import { mediasLink } from "@/config";

const descList = [
  {
    title: "New Consensus Mechanism",
    desc: "The latest upgrade introduces a robust consensus mechanism designed to enhance scalability and security, ensuring that every transaction is validated with the utmost efficiency.",
  },
  {
    title: "Dual Token Model",
    desc: (
      <div >
        Introducing our new token model, $CYS and $CGT, built to optimize
        network incentives and governance. <span onClick={()=>window.open(mediasLink.twitterWhitePaper, '_blank')} className="cursor-pointer text-[#00F0FF] underline">Learn more</span> about how
        these two tokens work together to power the Cysic ecosystem.
      </div>
    ),
  },
  {
    title: "Referral Program Launch",
    desc: "Our referral program is getting a boost! Earn exclusive rewards by bringing more users into the Cysic Network and enjoy the benefits of community-driven growth.",
  },
];

const Phase2DescModal = () => {
  const { setState } = useUser()
  const { visible, setVisible } = useModalState({eventName: "modal_phase_2_desc_visible"});

  const handleClose = ()=>{
    setVisible(false)
    setState({phase2ModalStatus: false})
  }

  return (
    <Modal
      isOpen={visible}
      onClose={() => setVisible(false)}
      className="[&_button]:z-[2] max-w-[580px] border border-[#FFFFFF33]"
    >
      <div className="flex flex-col">
        <div className="border-b border-[#2B2B2B] flex flex-col gap-2">
          <div className="  pt-4 px-6 text-gradient text-[40px] font-[400]">
            Cysic Phase II
          </div>
          <div className="pb-4 px-6 text-[#737373] text-lg font-[500]">
            Latest Updates!
          </div>
        </div>
        <div className="p-6 flex flex-col gap-3 text-sm text-[#fff]">
          <div>
            Hi there!
            <br />
            We're excited to share some key updates as we move forward with
            Phase II of the Cysic Network:
          </div>
          <div className="flex flex-col gap-2">
            {descList?.map((i, index)=>{
                return <div key={index} className="flex flex-col gap-1 bg-[#FFFFFF0D] rounded-[16px] py-2 px-4">
                    <div className="text-base font-bold">{i.title}</div>
                    <div className="text-[#A1A1AA]">{i.desc}</div>
                </div>
            })}
        </div>
          <div className="text-[#D3D3D3]">
            Get ready for more exciting developments ahead! Remember, invite
            your friends to boost your reward ✨
          </div>
        </div>

        <div className="px-6 pb-6 flex items-center gap-4 justify-between">
          <Button className="flex-1" type="solidGradient" onClick={handleClose}>
            Got it
          </Button>
          <Button className="flex-1" type="gradient" onClick={()=>window.open(mediasLink.twitterWhitePaper, '_blank')}>
            Learn More
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Phase2DescModal;
