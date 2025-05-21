import Button from "@/components/Button";
import GradientBorderCard from "@/components/GradientBorderCard";
import { investors1, investors2 } from "@/config/investor";
import AdCard from "@/routes/components/AdCard";
import { JoinTestnetPhaseIIIButton, CysicHardwareStackButton, SeeWhatsComingButton } from "@/routes/components/JoinTestnetPhaseIIIButtonGroups";
import ScrollingText from "@/routes/components/ScrollingText";
import { academyConfigShowInHome, otherArticleShowInHome } from "@/routes/pages/Academy/config";
import { AcademyCard } from "@/routes/pages/Academy/page";
import { ecosystemProjectsShowInHome } from "@/routes/pages/Ecosystem/config";
import { EcosystemCard } from "@/routes/pages/Ecosystem/page";
import { getImageUrl } from "@/utils/tools";
import { cn, Divider } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { ReactNode, useRef } from "react";
import { isMobile } from "react-device-detect";
import { Link, useNavigate } from "react-router-dom";
import HorizontalScroll from "./HorizontalScroll";



const asSeenOnList = [
  {
    name: "TechCrunch",
    img: getImageUrl("@/assets/images/investors/tech_crunch.png"),
  },
  {
    name: "CoinDesk",
    img: getImageUrl("@/assets/images/investors/coindesk.png"),
  },
  {
    name: "The Block",
    img: getImageUrl("@/assets/images/investors/the_block.png"),
  },
  {
    name: "Yahoo",
    img: getImageUrl("@/assets/images/investors/yahoo.png"),
  },
  {
    name: "Decrypt",
    img: getImageUrl("@/assets/images/investors/decrypt.png"),
  },
];

const drawerCardList = [
  {
    className:
      "w-[62rem] top-0 z-1 bg-gradient-to-b from-[#0DA591] to-[#0DA59100] ",
    borderGradientFrom: "#44FF3E",
    title: "product layer",
    subTitle: (
      <>
        Where decentralized compute meets real-world impact.
      </>
    ),
    desc: [
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/zk_proof_market.svg")}
            className="size-12"
          />
        ),
        title: "ZK Proof Market",
      },
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/ai_interence.svg")}
            className="size-12"
          />
        ),
        title: "AI Interence/Training",
      },
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/ai_agent.svg")}
            className="size-12"
          />
        ),
        title: "Agent Platform",
      },
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/digital_compute.svg")}
            className="size-12"
          />
        ),
        title: "Digital Compute",
      },
    ],
  },
  {
    className:
      "w-[59rem] top-[5.625rem] z-[2] bg-gradient-to-b from-[#196DFF] to-[#196DFF00] ",
    borderGradientFrom: "#6AD8FF",
    title: "COMPUTE INFRASTRUCTURE LAYER",
    subTitle: (
      <>
        Hardware that power up the protocol.
      </>
    ),
    desc: [
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/zk.svg")}
            className="size-12"
          />
        ),
        title: "ZK ASIC",
      },
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/ai.svg")}
            className="size-12"
          />
        ),
        title: "GPU SERVER",
      },
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/mining.svg")}
            className="size-12"
          />
        ),
        title: "Mining RIG",
      },
    ],
  },
  {
    className:
      "w-[56rem] top-[11.25rem] z-[3] bg-gradient-to-b from-[#3C19FF] to-[#3C19FF00] ",
    borderGradientFrom: "#85BCFF",
    title: "EXECUTION LAYER",
    subTitle: (
      <>
        Logic that runs the system.
      </>
    ),
    desc: [
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/bridge.svg")}
            className="size-12"
          />
        ),
        title: "Bridge",
      },
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/voting.svg")}
            className="size-12"
          />
        ),
        title: "Voting",
      },
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/swapping.svg")}
            className="size-12"
          />
        ),
        title: "Swapping",
      },
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/smart_contracts.svg")}
            className="size-12"
          />
        ),
        title: "More Functions",
      },
    ],
  },
  {
    className:
      "w-[52rem] top-[16.875rem] z-[4] bg-gradient-to-b from-[#5B0995] to-[#5B099500] ",
    borderGradientFrom: "#D1A9FF",
    title: "CONSENSUS LAYER",
    subTitle: (
      <>
        CONSENSUS LAYER The foundation of trust.
      </>
    ),
    desc: [
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/cosmos_sdk.png")}
            className="size-12"
          />
        ),
        title: "Cosmos CDK Blockchain",
      },
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/validators.svg")}
            className="size-12"
          />
        ),
        title: "Validators",
      },
      {
        icon: (
          <img
            src={getImageUrl("@/assets/images/icon/miners.svg")}
            className="size-12"
          />
        ),
        title: "Miners",
      },
    ],
  },
];

const DrawerCard = ({
  borderGradientFrom,
  title,
  subTitle,
  className,
  children,
  index,
}: {
  borderGradientFrom: string;
  title: string | React.ReactNode;
  subTitle: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  index: number;
}) => {
  return (
    <GradientBorderCard
      gradientTo="rgba(255, 255, 255, 0)"
      gradientFrom={borderGradientFrom}
      direction="180deg"
      className={cn(
        "p-6 flex flex-col items-center text-center gap-4 transition-all duration-300",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <h1 className="unbounded text-white text-xl font-medium">{title}</h1>
        <h2 className="teacher normal-case text-white text-base font-normal">
          {subTitle}
        </h2>
      </div>
      <div className="flex flex-wrap gap-4 w-full">{children}</div>
    </GradientBorderCard>
  );
};

const DrawCardList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <style>{`
        .cards-container[data-hover="0"] .card-layer:nth-child(2),
        .cards-container[data-hover="0"] .card-layer:nth-child(3),
        .cards-container[data-hover="0"] .card-layer:nth-child(4){
          transform: translate(-50%, 60%);
        }

        .cards-container[data-hover="1"] .card-layer:nth-child(3), 
        .cards-container[data-hover="1"] .card-layer:nth-child(4)
        {
          transform: translate(-50%, 60%);
        }

        .cards-container[data-hover="2"] .card-layer:nth-child(4)
        {
          transform: translate(-50%, 60%);
        }


        `}</style>

      <div
        ref={containerRef}
        className="relative w-full hover-group cards-container h-[40rem]"
        onMouseLeave={() => {
          containerRef.current?.removeAttribute("data-hover");
        }}
      >
        {drawerCardList.map((i, index) => {
          return (
            <div
              data-card-index={index}
              key={i.title}
              className={cn(
                "card-layer absolute w-full flex justify-center left-1/2 -translate-x-1/2 translate-y-0 backdrop-blur-sm rounded-lg transition-all duration-300",
                i?.className
              )}
              onMouseEnter={() => {
                containerRef.current?.setAttribute(
                  "data-hover",
                  index.toString()
                );
              }}
            >
              <DrawerCard
                borderGradientFrom={i.borderGradientFrom}
                title={i.title}
                subTitle={i.subTitle}
                index={index}
              >
                <>
                  {i.desc.map((j) => {
                    return (
                      <div
                        className="flex-1 flex flex-col items-center gap-4"
                        key={j.title}
                      >
                        {j.icon}
                        <span className="teachers normal-case text-xl font-normal text-white">
                          {j.title}
                        </span>
                      </div>
                    );
                  })}
                </>
              </DrawerCard>
            </div>
          );
        })}
      </div>
    </>
  );
};

const navScreenList = [
  {
    background:
      "bg-[url('@/assets/images/_global/zk_ecosystem_bg.png')] bg-cover bg-center brightness-[0.2]",
    subTitle: "Decentralized Prover and Verifier NetworK for ZK",
    title: "Cysic Network",
    slogen: (
      <div className="text-center">
        <div className="font-light text-xl text-center unbounded">
          <span className="unbounded font-medium text-xl">
            all-in-one solution
          </span>
          &nbsp;for
        </div>
        <p className="font-medium text-2xl text-gradient unbounded">
          zero-knowledge proof generation and verification.
        </p>
      </div>
    ),
    action: (
      <div className="flex items-center gap-6">
        <Button type="solid" className="backdrop-blur-sm teacher py-6 px-8">
          <div className="flex items-center gap-2 ">
            <span>About Cysic Netowork</span>
            <ArrowRight width={16} height={16} />
          </div>
        </Button>
        <JoinTestnetPhaseIIIButton />
      </div>
    ),
  },
  {
    background:
      "bg-[url('@/assets/images/_global/zk_hardware_bg.png')] bg-cover bg-center",
    subTitle: "we build hardcore, play long-term, shape the future",
    title: "Cysic Hardware",
    slogen: (
      <div className="text-center">
        <div className="font-light text-xl text-center unbounded">
          Purpose-built hardware and GPUs optimized
        </div>
        <p className="font-medium text-2xl text-gradient unbounded">
          for ZK acceleration and beyond.
        </p>
      </div>
    ),
    action: (
      <Link to="/hardware" className="flex items-center gap-6">
        <Button type="solid" className="backdrop-blur-sm teacher py-6 px-8">
          <div className="flex items-center gap-2 ">
            <span>About Cysic Hardware</span>
            <ArrowRight width={16} height={16} />
          </div>
        </Button>
      </Link>
    ),
  },
  {
    background:
      "bg-[url('@/assets/images/_global/ai_landing_bg.png')] bg-cover bg-center brightness-[0.2]",
    subTitle: "Built to power agents and AI workflows at scale",
    title: "Cysic AI",
    slogen: (
      <div className="text-center">
        <p className="font-normal text-xl text-center unbounded">
          low-cost, high-performance
        </p>
        <p className="font-medium text-2xl text-gradient unbounded">
          for ZK acceleration and beyond.
        </p>
        <p className="font-light text-xl text-center unbounded">
          with seamless API access.
        </p>
      </div>
    ),
    action: (
      <Button
        type="light"
        disabled
        className="py-2 px-4 unbounded font-medium !bg-white !text-black !opacity-100"
      >
        coming soon
      </Button>
    ),
  },
  {
    background:
      "bg-[url('@/assets/images/_global/socialTask_landing_bg.png')] bg-cover bg-center green-landing",
    subTitle: "compute power as liquid, yield-bearing assets",
    title: "Digital Compute",
    slogen: (
      <div className="text-center">
        <p className="font-light text-xl text-center unbounded">
          Unlocking the value of compute
        </p>
        <p className="font-medium text-2xl text-gradient unbounded text-center w-full">
          as capital.
        </p>
      </div>
    ),
    action: (
      <Button
        type="light"
        disabled
        className="py-2 px-4 unbounded font-medium !bg-white !text-black !opacity-100"
      >
        coming soon
      </Button>
    ),
  },
];

const otherScreenList = [
  {
    subTitle: "Growing with the Builders in the industry",
    title: "ecosystem",
    slogen: (
      <Link to="/ecosystem">
        <Button type="solid" className="backdrop-blur-sm teacher py-6 px-8">
          <div className="flex items-center gap-2 ">
            <span>Explore Cysic Partners</span>
            <ArrowRight width={16} height={16} />
          </div>
        </Button>
      </Link>
    ),
    action: (
      <div className="flex flex-wrap gap-4 main-container">
        {ecosystemProjectsShowInHome.map((project) => {
          return <EcosystemCard key={project.projectName} project={project} />;
        })}
      </div>
    ),
  },
  {
    background:
      "bg-[url('@/assets/images/_global/zk_academy_bg.png')] bg-cover bg-center brightness-[0.4]",
    subTitle: "learn with cysic",
    title: "cysic academy",
    slogen: (
      <Link to="/academy">
        <Button type="solid" className="backdrop-blur-sm teacher py-6 px-8">
          <div className="flex items-center gap-2 ">
            <span>View All Articles</span>
            <ArrowRight width={16} height={16} />
          </div>
        </Button>
      </Link>
    ),
    action: (
      <div className="flex flex-wrap gap-4 main-container w-full">
        {academyConfigShowInHome.map((item) => {
          return <AcademyCard key={item.title} item={item} />;
        })}
      </div>
    ),
  },
  {
    title: "investors",
    action: (
      <div className="mt-10 flex flex-wrap gap-10 justify-center">
        <div className="flex flex-wrap gap-10 justify-center">
          {investors1?.map((i) => {
            return (
              <div className="min-w-12 h-8" key={i.name}>
                <img
                  src={i.img}
                  className="object-contain h-full"
                  alt={i.name}
                />
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-10 justify-center">
          {investors2?.map((i) => {
            return (
              <div className="min-w-12 h-8" key={i.name}>
                <img
                  src={i.img}
                  className="object-contain h-full"
                  alt={i.name}
                />
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
]

const ScreenNavCard = ({
  background,
  subTitle,
  title,
  slogen,
  action,
  className,
}: {
  background?: string;
  subTitle?: string;
  title: string;
  slogen?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "min-h-screen relative w-full flex flex-col items-center justify-center",
        className
      )}
    >
      <div className={cn("absolute inset-0 -z-[1]", background)} />
      {subTitle ? (
        <span className="teacher tracking-[0.3em] text-2xl text-center">{subTitle}</span>
      ) : null}
      <span className="mt-2 unbounded text-[6rem] font-light text-center">{title}</span>
      {slogen ? <div className="mt-6">{slogen}</div> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={cn(
          " h-screen flex flex-col justify-between items-center main-container",
          isMobile ? "max-h-[70rem]" : "max-h-[70rem] min-h-[960px]"
        )}
      >
        <div className="pt-10 flex flex-col items-center gap-6 relative z-[2]">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "title !text-[#fff] text-center title-md-2",
                isMobile && "py-4"
              )}
            >
              The Compute Layer of a
              <br />
              Verifiable Future.
            </span>
            <span className="sub-title font-normal mt-6 desc text-center">
              World's first vertically integrated compute layer
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap mx-auto text-base">
            <JoinTestnetPhaseIIIButton />
            <CysicHardwareStackButton />
            <SeeWhatsComingButton />
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col items-center gap-12 relative z-[2]",
            isMobile ? "pb-0" : "pb-[10rem] -mb-[6rem]"
          )}
        >
          <span
            className={cn(
              isMobile ? "" : "!text-[4rem]",
              "title font-[400] uppercase text-center text-md"
            )}
          >
            Backed by Industry Leaders
          </span>

          <div className="flex flex-wrap items-center gap-12">
            <img
              src={getImageUrl("@/assets/images/investors/polychain.svg")}
              className="h-[5.5rem]"
            />
            <img
              src={getImageUrl("@/assets/images/investors/okx.svg")}
              className="h-[5.5rem]"
            />
            <img
              src={getImageUrl("@/assets/images/investors/hashkey.svg")}
              className="h-[5.5rem]"
            />
          </div>
        </div>
      </div>

      <div className="w-full px-12 py-16 bg-white text-center text-2xl unbounded font-light text-[#090A09]">
        From silicon to protocol, Cysic is building
        <br />
        the full-stack infrastructure for
        <br />
        <span className="unbounded text-gradient font-medium">
          trustless, scalable
        </span>
        , and{" "}
        <span className="unbounded text-gradient font-medium">
          monetizable computation.
        </span>
      </div>

      <div className="min-h-screen w-full main-container flex flex-col items-center gap-12 py-16">
        <div className="text-center">
          <div className="teacher text-2xl ">What we are</div>
          <div className="unbounded text-[6rem] font-extralight">Building</div>
        </div>

        <DrawCardList />
      </div>

      <div className="main-container py-16 flex gap-12 w-full">
        <div className="flex flex-col gap-6 flex-1">
          <div className="unbounded font-medium text-[2.5rem] text-center">
            LIVE NOW
          </div>
          <div className="flex flex-col gap-4">
            <AdCard
              title="Cysic Network"
              desc="Verifiable compute network"
              imageSrc={getImageUrl("@/assets/images/nft/preset3.png")}
              onClick={() => {
                navigate("/zk");
              }}
            />
            <AdCard
              title="Cysic hardware"
              desc="ZK accelerators & beyond"
              imageSrc={getImageUrl("@/assets/images/nft/preset4.png")}
              onClick={() => {
                navigate("/hardware");
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 flex-1">
          <div className="unbounded font-medium text-[2.5rem] text-center">
            coming soon
          </div>
          <div className="flex flex-col gap-4">
            <AdCard
              title="Cysic AI"
              desc="Low-cost AI infra for custom models"
              imageSrc={getImageUrl("@/assets/images/nft/preset1.png")}
            />
            <AdCard
              title="Cysic digital mining"
              desc="Compute-backed digital assets"
              imageSrc={getImageUrl("@/assets/images/nft/preset2.png")}
            />
          </div>
        </div>
      </div>

      <HorizontalScroll>
        {navScreenList.map((i) => {
          return (
            <ScreenNavCard
              background={i.background}
              subTitle={i.subTitle}
              title={i.title}
              slogen={i.slogen}
              action={i.action}
            />
          );
        })}
      </HorizontalScroll>

      {
        otherScreenList.map((i) => {
          return (
            <ScreenNavCard
              background={i.background}
              subTitle={i.subTitle}
              title={i.title}
              slogen={i.slogen}
              action={i.action}
            />
          );
        })}


      <div className="w-full">
        <div className="relative h-12 bg-gradient-to-r from-[#19FFE0] to-[#009C87]">
          <ScrollingText isBackground direction="right"><div className="h-full w-full bg-[url('@/assets/images/icon/arrow_right.svg')] bg-repeat-x bg-[3rem]" /></ScrollingText>
        </div>
        <div className="bg-white text-black py-6 text-center unbounded text-[2rem] font-[200]">
          Cysic Raises <span className="unbounded text-[2rem] font-[300]">$12M in Pre-A Round</span> <br />
          To Advance the ZK Revolution

        </div>
        <div className="h-12 bg-gradient-to-r from-[#3500E5] to-[#BCA7FF]">
          <ScrollingText isBackground direction="right"><div className="h-full w-full bg-[url('@/assets/images/icon/arrow_right.svg')] bg-repeat-x bg-[3rem]" /></ScrollingText>
        </div>
      </div>

      <ScreenNavCard
        title="As seen on"
        className="py-10"
        action={
          <div className="flex flex-col gap-4 main-container py-10">
            <div className="flex flex-wrap gap-y-12">
              {otherArticleShowInHome.map(i => (
                <a href={i.href} target="_blank" className="w-[33%] px-6 h-auto flex justify-center items-center " key={i.title} >
                  <GradientBorderCard className="h-full flex flex-col max-w-[20.625rem] ">
                    <>
                      <div className="py-2 px-24 mx-auto">
                        <img src={i.media.img} alt={i.media.name} className="h-12 object-contain" />
                      </div>
                      <Divider />
                      <div className="flex flex-col justify-between py-4 flex-1 gap-10">
                        <div className="px-6 text-lg teacher tracking-widest flex-1">
                          {i.title}
                        </div>

                        <div className="self-end px-6">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>


                    </>
                  </GradientBorderCard>
                </a>
              ))}
            </div>
            
            {/* <div className="mt-10 main-container w-full flex items-center gap-[3.25rem]">
              {asSeenOnList.map((i) => {
                return (
                  <div className="h-12 flex-1" key={i.name}>
                    <img
                      src={i.img}
                      className="object-contain h-full"
                      alt={i.name}
                    />
                  </div>
                );
              })}
            </div> */}

            {/* {
              otherArticleShowInHome.map(item => {
                return <AcademyCard key={item.title} item={item} />;
              })
            } */}

          </div>
        }
      />
    </>
  );
};

export default Home;
