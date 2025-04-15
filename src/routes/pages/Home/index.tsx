import Button from "@/components/Button";
import { getImageUrl } from "@/utils/tools";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full pb-12">
      <div
        className="absolute -top-[0px] left-0 right-0 h-[15.625rem] pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
        }}
      ></div>


      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ filter: 'grayscale(100%)', backgroundImage: `url(${getImageUrl('@/assets/images/_global/home_landing_bg.png')})` }}
      />

      <div className="pt-12 flex flex-col items-center gap-6 relative z-[2]">
        <div className="flex flex-col items-center">
          <span className="sub-title">Introducing</span>
          <span className="title text-[11.25rem] !text-[#fff] text-center">ComputeFi</span>
          <span className="desc">At Cysic, you can rent computing power by purchasing compute NFTs and put it to use to earn rewards.</span>
        </div>


        <Button type="solid" className="backdrop-blur-sm">
          <div className="flex items-center gap-2 ">
            <span className="text-sm font-[400]">learn more about ComputeFi and Digital Box</span>
            <ArrowRight width={16} height={16} />
          </div>
        </Button>
      </div>

      <div className="mt-[40vh] flex flex-col items-center gap-6 relative z-[2]">
        <img src={getImageUrl('@/assets/images/logo/cysic_light.svg')} className="w-[9.625rem]" />
        <span className="title font-[400] uppercase text-[6rem] text-center">Digital Harvester</span>
        <div className="text-sub text-center text-sm">
          You can obtain the corresponding computing power by purchasing a Cysic Digital Harvester.<br/>
          The Harvester is universally compatible across the Cysic Space, including Cysic AI, Cysic ZK, and Cysic Mining.<br/>
          Please note that different Harvester have varying computing power requirements.
        </div>
      </div>
    </div>
  );
};

export default Home;