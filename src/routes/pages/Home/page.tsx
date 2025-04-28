import Button from "@/components/Button";
import { getImageUrl } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { isMobile } from "react-device-detect";

const Home = () => {
  return (
    <div className={cn(
      " h-screen flex flex-col justify-between items-center",
      isMobile ? 'max-h-[70rem]' : 'max-h-[70rem] min-h-[960px]'
    )}>

      <div className="pt-10 flex flex-col items-center gap-6 relative z-[2]">
        <div className="flex flex-col items-center">
          <span className="sub-title">Introducing</span>
          <span className={cn("title !text-[#fff] text-center title-lg", isMobile && "py-4")}>ComputeFi</span>
          <span className="desc text-center">At Cysic, you can rent computing power by purchasing compute NFTs and put it to use to earn rewards.</span>
        </div>


        <Button type="solid" className="backdrop-blur-sm">
          <div className="flex items-center gap-2 ">
            <span className="text-sm font-[400]">learn more about ComputeFi and Digital Box</span>
            <ArrowRight width={16} height={16} />
          </div>
        </Button>
      </div>

      <div className={cn("flex flex-col items-center gap-6 relative z-[2]", isMobile ? "pb-0" : "pb-[10rem]")}>
        <img src={getImageUrl('@/assets/images/logo/cysic_light.svg')} className="w-[9.625rem]" />
        <span className={cn("title font-[400] uppercase text-center text-md")}>Digital Harvester</span>
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