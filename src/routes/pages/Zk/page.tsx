import Button from "@/components/Button";
import GradientBorderCard from "@/components/GradientBorderCard";
import { classes } from "@/config";
import SignInButton from "@/routes/components/SignInButton";
import { getImageUrl } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { isMobile } from "react-device-detect";

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
const investors1 = investors.slice(0, 6);
const investors2 = investors.slice(6);

const ZkLanding = () => {
    return (
        <>
            <div className="pt-12 flex flex-col items-center gap-6 relative z-[2] h-screen ">
                <div
                    className={cn("flex flex-col items-center", isMobile ? "gap-4" : "")}
                >
                    <span className="sub-title text-center">
                        Decentralized Prover and Verifier NetworK for ZK.
                    </span>
                    <span className="title title-lg !text-[#fff] text-center">
                        Cysic ZK
                    </span>
                </div>

                {/* <div className="min-h-[15rem]"><SignInButton className="backdrop-blur-sm mt-[8.25rem] mb-[4rem]" /></div> */}
            </div>

            {/* section-2 */}
            <div className="flex flex-col gap-6 items-center pb-16">
                <div className="flex flex-col items-center">
                    <span className={classes.subTitle}>Cysic Network</span>
                    <span className="title !font-[200] !text-[96px]">
                        Phase III Is Now Open
                    </span>
                </div>
                <span className={classes.subTitle}>
                    Instant proofs. Infinite Possibilities
                </span>

                <div className="flex gap-6">
                    <Button type="solid" className="backdrop-blur-sm !p-6 flex gap-4 flex items-center">
                        <span className="text-base">Join Testnet Phase III</span>
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button type="solid" className="backdrop-blur-sm !p-6 flex gap-4 flex items-center">
                        <span className="text-base">About Testnet</span>
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="bg-[#000]">
                <div
                    className={cn(
                        "w-full py-16 flex flex-col gap-2 items-center",
                        classes.container
                    )}
                >
                    <div className="!font-[200] !text-2xl title">
                        Cysic Network offers an&nbsp;
                        <span className="!font-[500] !text-2xl title">
                            all-in-one solution
                        </span>
                        &nbsp;for
                    </div>
                    <div
                        className="title !text-[32px] !font-[500]"
                        style={{
                            background:
                                "linear-gradient(253.59deg, #E8D7E0 37.6%, #9D47FF 97.1%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        zero-knowledge proof generation and verification.
                    </div>
                    <div className="!text-sm text-center">
                        By leveraging both powerful and modest hardware, <br />
                        participants can contribute to the protocol and earn rewards from
                        various ZK projects in return.
                    </div>
                </div>

                <div
                    className={cn("relative h-screen")}

                >
                    <div
                        className="absolute inset-0 size-full z-0"
                        style={{
                            backgroundImage: `url(${getImageUrl(
                                "@/assets/images/_global/zk_landing_bg_2.png"
                            )})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            filter: "hue-rotate(15deg) brightness(0.5)",
                        }}
                    />
                    <div className="relative z-1 size-full flex items-center justify-center gap-12">
                        <div className="flex flex-col gap-12">
                            <div className="flex flex-col">
                                <span className="title !text-[64px] !font-[500]">55,000+</span>
                                <span className={cn(classes.subTitle, "!text-base")}>
                                    Unique Wallet Addresses
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="title !text-[64px] !font-[500]">8M+</span>
                                <span className={cn(classes.subTitle, "!text-base")}>
                                    Network transactions
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="title !text-[64px] !font-[500]">100,000+</span>
                                <span className={cn(classes.subTitle, "!text-base")}>
                                    Reserved High-End Graphic Crads
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className={classes.subTitle}>Powerful ZK Prover</span>
                            <span className={classes.subTitle}>and Verifier Network for</span>
                            <span className="title !text-[64px] !font-light pt-1">
                                everyone
                            </span>
                        </div>
                    </div>
                </div>

                <div className={cn("w-screen title !text-[64px] !font-[500] py-2 text-[#000] bg-[#fff] whitespace-nowrap overflow-x-hidden")}>
                    The Most Decentralized ZKP COMPUTING NETWORK
                </div>

                <div className={cn("flex gap-6 py-16", classes.container)}>
                    <GradientBorderCard className="p-6 flex flex-col gap-16 flex-1 justify-between">
                        <div className="!tracking-widest sub-title !text-2xl !font-[400]">
                            Unmatched
                            <br />
                            Performance
                        </div>
                        <div className="text-base !font-[400]">
                            Cysic is revolutionizing the speed and scale of Zero-Knowledge
                            proofs, powered by cutting-edge hardware acceleration and an
                            expansive, global network of resources. ZK proofs are generated
                            and verified at lightning-fast speeds, unlocking new possibilities
                            for scalability and efficiency.
                        </div>
                    </GradientBorderCard>
                    <GradientBorderCard className="p-6 flex flex-col gap-16 flex-1 justify-between">
                        <div className="!tracking-widest sub-title !text-2xl !font-[400]">
                            Fully
                            <br />
                            Permissionless &
                            <br />
                            Inclusive
                        </div>
                        <div className="text-base !font-[400]">
                            Cysic breaks down barriers to participation. Whether you're a
                            project building on ZK technology, a prover, or a verifier, you
                            can seamlessly join the network. By contributing hardware,
                            deploying tasks, or validating proofs, anyone can be part of a
                            global movement that redefines the future of decentralized trust.
                        </div>
                    </GradientBorderCard>
                    <GradientBorderCard className="p-6 flex flex-col gap-16 flex-1 justify-between">
                        <div className="!tracking-widest sub-title !text-2xl !font-[400]">
                            Affordable, Scalable,
                            <br />
                            and Powerful for
                            <br />
                            Every User
                        </div>
                        <div className="text-base !font-[400]">
                            Cysic dramatically reduces the cost of generating and verifying ZK
                            proofs, making advanced cryptographic technology accessible to a
                            broader audience. the power of distributed computing is harnessed
                            efficiently, ensuring that both small and large contributors can
                            help drive innovation while enjoying the benefits of low-cost,
                            high-performance ZK solutions.
                        </div>
                    </GradientBorderCard>
                </div>

                <div
                    className={cn(
                        "py-16 flex flex-col gap-6 items-center",
                        classes.container
                    )}
                >
                    <div className="title !text-[64px] !font-light">
                        how cysic network works
                    </div>
                    <img
                        src={getImageUrl("@/assets/images/_global/zk_cysic_layer.png")}
                        className="w-full"
                    />
                </div>

                <div className="relative h-screen ">
                    <div
                        className="absolute brightness-50 inset-0 size-full z-0"
                        style={{
                            backgroundImage: `url(${getImageUrl(
                                "@/assets/images/_global/zk_landing_bg_3.png"
                            )})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}

                    />
                    <div className="relative z-1 size-full  flex flex-col items-center justify-center">
                        <span className={classes.subTitle}>Join Cysic Network </span>
                        <span className="title !text-[11.25rem] !font-[200]">Phase III</span>
                        <div className="flex gap-6">
                            <Button type="solid" className="backdrop-blur-sm !p-6 flex gap-4 flex items-center">
                                <span className="text-base">Join Testnet Phase III</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Button type="solid" className="backdrop-blur-sm !p-6 flex gap-4 flex items-center">
                                <span className="text-base">About Testnet</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="py-16 flex flex-col items-center gap-12 relative z-[2]">
                    <span className="title !font-light uppercase text-center !text-[4rem]">
                        investors
                    </span>
                    <div className="flex flex-wrap gap-10 justify-center">
                        <div className="flex flex-wrap gap-10 justify-center">
                            {investors1?.map((i) => {
                                return (
                                    <div className="min-w-12 h-8" key={i.name}>
                                        <img src={i.img} className="object-contain h-full" />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-wrap gap-10 justify-center w-full">
                            {investors2?.map((i) => {
                                return (
                                    <div className="min-w-12 h-8" key={i.name}>
                                        <img src={i.img} className="object-contain h-full" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ZkLanding;
