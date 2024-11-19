import { getImageUrl } from "@/utils/tools";

const Ad = ({ type }: { type: string }) => {
  switch (type) {
    case "verifier":
      return (
        <div className="bg-[#913FEF33] py-6 px-8 relative h-[11.5rem] rounded-[20px] overflow-hidden">
          <div className="flex flex-col gap-3 max-w-[32.5rem] leading-[1.2] justify-between h-full">
            <div className="leading-[1.2] Gemsbuck uppercase text-[32px] font-bold">
              Become a <span className="text-gradient Gemsbuck">Verifier</span>{" "}
              <br/> to earn $CYS and $CGT
            </div>
            <div className="leading-[1.2] text-[#A1A1AA] text-sm font-[300]">
              Run a lightweight node to support proof verification,
              strengthening the network's security and scalability
            </div>
          </div>
          <img
            className="scale-[1.2] absolute h-full top-0 right-0"
            src={getImageUrl("@/assets/images/about/bg.png")}
          />
        </div>
      );
    case "prover":
      return (
        <div className="bg-[#913FEF33] py-6 px-8 relative h-[15rem] rounded-[20px] overflow-hidden">
          <div className="flex flex-col gap-3 max-w-[32.5rem] leading-[1.2] justify-between h-full">
            <div className="leading-[1.2] Gemsbuck uppercase text-[32px] font-bold">
              Become a <span className="text-gradient Gemsbuck">Prover</span> to
              earn $CYS, $CGT ANd VeCompute
            </div>
            <div className="leading-[1.2] text-[#A1A1AA] text-sm font-[300]">
              Contribute Your Computational Power to Support ZK Proofs and Earn
              Rewards
            </div>
            <div className="leading-[1.2] text-[#737373] text-sm font-[300]">
              *Certain hardware specifications are required for becoming a
              prover.
            </div>
          </div>
          <img
            className="scale-[1.2] absolute h-full top-0 right-0"
            src={getImageUrl("@/assets/images/about/bg.png")}
          />
        </div>
      );
    default:
      return (
        <div className="bg-[#913FEF33] py-6 px-8 relative h-[11.5rem] rounded-[20px] overflow-hidden">
          <div className="flex flex-col gap-3 max-w-[32.5rem] leading-[1.2] justify-between h-full">
            <div className="leading-[1.2] Gemsbuck uppercase text-[32px] font-bold">
              Maximize your{" "}
              <span className="text-gradient Gemsbuck">reward</span> with Cysic
              Network Triple Reward System
            </div>
            <div className="leading-[1.2] text-[#A1A1AA] text-sm font-[300]">
              Our unique reward structure lets you contribute computational
              power and earn in three ways
            </div>
          </div>
          <img
            className="scale-[1.2] absolute h-full top-0 right-0"
            src={getImageUrl("@/assets/images/about/bg.png")}
          />
        </div>
      );
  }
};

export default Ad;
