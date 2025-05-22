import GradientBorderCard from "@/components/GradientBorderCard";
import { classes } from "@/config";
import { investors1, investors2 } from "@/config/investor";
import InViewFlip from "@/routes/components/InViewFlip";
import JoinZkPhase3 from "@/routes/components/JoinZkPhase3";
import ScrollingText from "@/routes/components/ScrollingText";
import { getImageUrl } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { isMobile } from "react-device-detect";




const ZkLanding = () => {
  return (
    <>
      <div className="pt-12 flex flex-col items-center gap-6 relative z-[2] h-screen max-h-screen">
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
      <JoinZkPhase3
        className="[&_.title]:!text-[6rem] pb-16"
        slogen="Cysic Network "
        title="Phase III Is Now Open"
        subTitle="Instant proofs. Infinite Possibilities"
      />

      <div className="bg-[#000]">
        <div
          className={cn(
            "w-full py-16 flex flex-col gap-2 items-center",
            "main-container"
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

        <div className={cn("relative h-screen")}>
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
            <div className="flex flex-col gap-12 w-[24.8rem]">
              <div className="flex flex-col">
                <span className="title !text-[64px] !font-[500] flex items-center">
                  <InViewFlip number="55" className="unbounded text-[64px] font-medium" />,000+
                </span>
                <span className={cn(classes.subTitle, "!text-base")}>
                  Unique Wallet Addresses
                </span>
              </div>
              <div className="flex flex-col">
                <span className="title !text-[64px] !font-[500] flex items-center">
                  <InViewFlip number="8" className="unbounded text-[64px] font-medium" />M+
                </span>
                <span className={cn(classes.subTitle, "!text-base")}>
                  Network transactions
                </span>
              </div>
              <div className="flex flex-col">
                <span className="title !text-[64px] !font-[500] flex items-center">
                  <InViewFlip number="100" className="unbounded text-[64px] font-medium" />,000+
                </span>
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

        <ScrollingText
          duration={20}
          direction="left"
          className="py-2 w-screen bg-white"
          textClassName="title !text-[64px] !font-[500] text-[#000]"
        >
          THE MOST DECENTRALIZED ZKP COMPUTING NETWORK.
        </ScrollingText>

        <div className={cn("flex gap-6 py-16 main-container")}>
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
            "main-container"
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
          <JoinZkPhase3 slogen="Join Cysic Network " title="Phase III" />
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
