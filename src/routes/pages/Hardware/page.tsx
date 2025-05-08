import Button from "@/components/Button";
import GradientBorderCard from "@/components/GradientBorderCard";
import { academyConfig } from "@/routes/pages/Academy/config";
import { getImageUrl } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { isMobile } from "react-device-detect";

const HardwarePage = () => {
    return (
        <>
            {/* section-1 */}
            <div className="pt-12 flex flex-col items-center gap-6 relative z-[2] h-screen">
                <div className="flex flex-col items-center gap-4">
                    <span
                        className={cn(
                            "title !font-[200] !text-[#fff] text-center",
                            isMobile ? "!text-[32px]" : "!text-[11.25rem]"
                        )}
                    >
                        Cysic
                        <br />
                        Hardware
                    </span>
                    <span className="sub-title text-center text-[24px] !font-[400]">
                        we build hardcore, play long-term, shape the future
                    </span>
                </div>
            </div>

            {/* section-2 */}
            <div className="w-full py-16 flex flex-col gap-2 items-center">
                <div className="!text-sm">
                    Our world-class engineering team, with deep roots in both cutting-edge
                    research and real-world deployments, is shaping the future of the zk
                    industry.{" "}
                </div>
                <div
                    className="title text-[32px] !font-[500]"
                    style={{
                        background:
                            "linear-gradient(253.59deg, #E8D7E0 37.6%, #9D47FF 97.1%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    by combining ASIC innovation & GPU acceleration
                </div>
                <div className="!text-sm">
                    we’re pushing the limits of what’s possible — and building for what
                    comes next.
                </div>
            </div>

            <div className="py-16 flex flex-col gap-12 items-center">
                <div className="title text-[64px] !font-[300]">
                    Technical Breakthroughs
                </div>
                <div className="flex flex-col gap-4">
                    {academyConfig.map((item) => (
                        <a key={item.title} href={item.href} target="_blank">
                            <GradientBorderCard className="px-6 py-4 flex justify-between cursor-pointer">
                                <div className="flex flex-col gap-1 flex-1">
                                    <span className="sub-title !text-[1.5rem]">{item.title}</span>
                                    <span className="sub-title !text-base min-h-6">
                                        {item.subTitle}
                                    </span>
                                </div>
                                <div className="px-4 self-center">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                            </GradientBorderCard>
                        </a>
                    ))}
                </div>
            </div>

            <div className="pt-12 w-full text-center">
                <div className="pb-12 title text-[96px] !font-[300]">Our Approach</div>
                <div className="text-center bg-[#fff] text-[#000] py-4 title text-[40px] !font-[500]">
                    001.Asic Solutions
                </div>
                <div className="py-16 flex gap-6 flex-wrap">
                    <div className="flex flex-col gap-4">
                        <div className="title text-[24px] !font-[300]">
                            Deep custom silicon for ultimate zk performance
                        </div>
                        <GradientBorderCard className="p-6 flex flex-col gap-6 items-start">
                            <div className="title text-[24px] !font-[500]">
                                Custom Proof Generation Chips
                            </div>
                            <div className="gap-6 flex flex-wrap">
                                <div className="p-4 rounded bg-[#FFFFFF0D] border title text-[24px] !font-[300]">
                                    Cysic C1 Chip
                                </div>
                                <div className="p-4 rounded bg-[#FFFFFF0D] border title text-[24px] !font-[300]">
                                    ZK Air
                                </div>
                                <div className="p-4 rounded bg-[#FFFFFF0D] border title text-[24px] !font-[300]">
                                    ZK Pro
                                </div>
                            </div>
                        </GradientBorderCard>
                        <GradientBorderCard className="p-6 flex flex-col gap-6 items-start">
                            <div className="title text-[24px] !font-[500]">
                                Hypercube IR Layer
                            </div>
                        </GradientBorderCard>
                    </div>
                    <div className="flex-1">
                        <GradientBorderCard className="p-6 flex flex-col gap-4 items-start">
                            <div className="title text-[24px] !font-[300] text-left">
                                Generate Zero-
                                <br />
                                Knowledge Proofs
                                <br /> in Real Time
                            </div>
                            <div className="text-base !font-[400] text-left">
                                We have designed the zkVM-based chip, the Cysic C1 chip, which
                                lays down the foundation of real-time ZK proof generation. Based
                                on this chip, we provide two hardware products, the portable ZK
                                Air and robust ZKPro. According to the current product road map
                                and design plans, these products are expected to be released in
                                2025.
                            </div>
                        </GradientBorderCard>
                    </div>
                </div>
            </div>

            <div className="pt-12 w-full pb-16">
                <div className="pb-12 text-[64px] !font-[300] title">
                    Get to know ASIC Chips
                </div>
                <div className="flex gap-6 flex-wrap items-stretch">
                    <GradientBorderCard className="p-6 flex-1 bg-[#000]">
                        <div
                            className="flex flex-col gap-4 "
                            style={{
                                background: `url(${getImageUrl(
                                    "@/assets/images/hardware/zk_chip.png"
                                )}) no-repeat center center / cover`,
                            }}
                        >
                            <div className="flex flex-col gap-2 max-w-[200px] h-[240px]">
                                <p className="uppercase title !text-[40px] !font-[300]">
                                    zk Chip
                                </p>
                                <span className="font-[400] text-base">
                                    The foundation of real-time ZKP generation is Cysic's
                                    zkVM-based chip, the Cysic C1 chip.
                                </span>
                            </div>
                            <div className="sub-title !text-[24px] font-[400]">
                                Key Features
                            </div>
                            <div className="text-base font-[400]">
                                Native Support for Common Prime Fields and Hash functions.
                            </div>
                            <div className="text-base font-[400]">
                                Ultra High Internal Memory Bandwidth.
                            </div>
                            <div className="text-base font-[400]">
                                Programmable for Both Expert and Novice Users.
                            </div>
                        </div>
                    </GradientBorderCard>
                    <GradientBorderCard className="p-6 flex-1 bg-[#000]">
                        <div
                            className="flex flex-col gap-4 "
                            style={{
                                background: `url(${getImageUrl(
                                    "@/assets/images/hardware/zk_air.png"
                                )}) no-repeat center center / cover`,
                            }}
                        >
                            <div className="flex flex-col gap-2 max-w-[200px] h-[240px]">
                                <p className="uppercase title !text-[40px] !font-[300]">
                                    zk Air
                                </p>
                                <span className="font-[400] text-base">
                                    Portable ZKP Accelerator.
                                </span>
                            </div>
                            <div className="sub-title !text-[24px] font-[400]">
                                Key Features
                            </div>
                            <div className="text-base font-[400]">
                                Comparable to an iPad charger.
                            </div>
                            <div className="text-base font-[400]">
                                Plug and Play Functionality.
                            </div>
                        </div>
                    </GradientBorderCard>
                    <GradientBorderCard className="p-6 flex-1 bg-[#000]">
                        <div
                            className="flex flex-col gap-4 "
                            style={{
                                background: `url(${getImageUrl(
                                    "@/assets/images/hardware/zk_pro.png"
                                )}) no-repeat center center / cover`,
                            }}
                        >
                            <div className="flex flex-col gap-2 max-w-[200px] h-[240px]">
                                <p className="uppercase title !text-[40px] !font-[300]">
                                    zk Pro
                                </p>
                                <span className="font-[400] text-base">
                                    Most Powerful ZKP
                                    <br />
                                    Most Powerful ZKP
                                </span>
                            </div>
                            <div className="sub-title !text-[24px] font-[400]">
                                Key Features
                            </div>
                            <div className="text-base font-[400]">
                                Game-changing combination of Cysic C1 silicon performance and
                                frontend acceleration extension for ZKP workflows.
                            </div>
                            <div className="text-base font-[400]">
                                Leading power efficiency design.
                            </div>
                            <div className="text-base font-[400]">
                                Advanced cooling system.
                            </div>
                        </div>
                    </GradientBorderCard>
                </div>
            </div>

            {/* secction-3 */}
            <div
                className="w-full h-screen bg-[#000] flex flex-col items-center justify-center gap-6"
                style={{
                    background: `url(${getImageUrl(
                        "@/assets/images/_global/zk_hardware_bg_2.png"
                    )}) no-repeat center center / cover`,
                }}
            >
                <div className="flex flex-col">
                    <div className=" sub-title !text-[20px] !font-[400]">
                        Parallelism. Precision. Proofs — reengineered.
                    </div>
                    <div className="title !text-[96px] !font-[300]">Hypercube IR</div>
                </div>
                <div className=" sub-title !text-[20px] !font-[400]">
                    Advanced circuit optimization at the hardware level
                </div>

                <Button
                    className="backdrop-blur-sm !p-6 text-white flex gap-2"
                    type="solid"
                >
                    <span>Read About HypercubE IR</span>
                    <ArrowRight className="w-3 h-3" />
                </Button>
            </div>
            <div className="py-16 flex gap-12">
                <div className="flex flex-col max-w-[46.5625rem]">
                    <span className="!text-[24px] !font-[200] title uppercase">
                        Cysic’s Hypercube Intermediate Representation (IR) is a{" "}
                        <span className="font-bold">custom-built optimization layer</span>{" "}
                        between
                    </span>
                    <span
                        className="!text-[32px] title !font-[200]"
                        style={{
                            background:
                                "linear-gradient(253.59deg, #E8D7E0 37.6%, #9D47FF 97.1%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        zk circuits and
                        <br />
                        hardware execution.
                    </span>

                    <span className="text-sm font-[400]">
                        a fundamental shift in how zk proofs get mapped to hardware, making
                        scalable zk computing truly possible.It restructures traditional zk
                         circuit logic into a high-dimensional, hypercube-style data flow,
                                   enabling parallel execution, better memory access patterns,
                        and reduced latency at the ASIC level.
                    </span>
                </div>
            </div>
        </>
  ); 
};

export default HardwarePage;
