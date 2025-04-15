import Button from "@/components/Button";
import { getImageUrl, handleSignIn } from "@/utils/tools";
import { ArrowRight } from "lucide-react";


const investors = [
    {
        name: "polycain",
        img: getImageUrl("@/assets/images/investors/POLYCHAIN.png"),
    },
    {
        name: "hashkey",
        img: getImageUrl("@/assets/images/investors/HASHKEY.png"),
    },
    {
        name: "OKX",
        img: getImageUrl("@/assets/images/investors/OKX.png"),
    },
    {
        name: "abcde",
        img: getImageUrl("@/assets/images/investors/ABCDE.png"),
    },
    {
        name: "matrix",
        img: getImageUrl("@/assets/images/investors/MATRIX.png"),
    },
    {
        name: "web3",
        img: getImageUrl("@/assets/images/investors/WEB3.png"),
    },
    {
        name: "snz",
        img: getImageUrl("@/assets/images/investors/SNZ.png"),
    },
    {
        name: "bitdigital",
        img: getImageUrl("@/assets/images/investors/BITDIGITAL.png"),
    },
    {
        name: "idg",
        img: getImageUrl("@/assets/images/investors/IDG.png"),
    },
    {
        name: "coinswitch",
        img: getImageUrl("@/assets/images/investors/COINSWITCH.png"),
    },
    {
        name: "a&t",
        img: getImageUrl("@/assets/images/investors/A&T.png"),
    },
];
const investors1 = investors.slice(0, 6)
const investors2 = investors.slice(6)

const ZkLanding = () => {
    return (
        <div className="min-h-screen w-full pb-12 overflow-hidden">

            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* 背景图片使用scale变换 */}
                <img
                    src={getImageUrl('@/assets/images/_global/zk_landing_bg.png')}
                    alt="Background"
                    className="absolute top-1/2 left-1/2 w-full h-full object-cover"
                    style={{
                        filter: 'grayscale(0%)',
                        transform: 'translate(-50%, -50%) scale(1.3)', // 使用scale放大图片
                        transformOrigin: 'center 0%',  // 确保从中心点缩放
                        objectPosition: '50% 50%'  // 调整图片在视窗中的位置
                    }}
                />
            </div>

            <div className="pt-12 flex flex-col items-center gap-6 relative z-[2]">
                <div className="flex flex-col items-center">
                    <span className="sub-title">Simple in Form, Infinite in Power.</span>
                    <span className="title text-[11.25rem] !text-[#fff] text-center">Cysic ZK</span>
                </div>


                <Button type="solid" className="backdrop-blur-sm mt-[8.25rem] mb-[4rem]" onClick={handleSignIn}>
                    <div className="flex items-center gap-2 " >
                        <span className="text-sm font-[400] uppercase">Sign In</span>
                        <ArrowRight width={12} height={12} />
                    </div>
                </Button>
            </div>

            <div className="mt-[40vh] flex flex-col items-center gap-12 relative z-[2]">
                <span className="title !font-[300] uppercase text-center text-[2.25rem]">investors</span>
                <div className="flex flex-wrap gap-10 justify-center">
                    <div className="flex flex-wrap gap-10 justify-center">
                        {
                            investors1?.map(i => {
                                return (
                                    <div className="min-w-12 h-8" key={i.name}>
                                        <img src={i.img} className="object-contain h-full" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-wrap gap-10 justify-center">
                        {
                            investors2?.map(i => {
                                return (
                                    <div className="min-w-12 h-8" key={i.name}>
                                        <img src={i.img} className="object-contain h-full" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZkLanding;