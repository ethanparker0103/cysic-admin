import { ArrowRight, ExternalLink } from "lucide-react";
import GradientBorderCard from "@/components/GradientBorderCard";
import { ReactNode, useEffect } from "react";
import {
  formatReward,
  getImageUrl,
  handleConvertModal,
  handleMultiplierModal,
  handleSignIn,
  handleStakeModal,
  handleVoucherModal,
} from "@/utils/tools";
import Button from "@/components/Button";
import Copy from "@/components/Copy";
import { Link, useNavigate } from "react-router-dom";
import useUser from "@/models/user";
import useAccount from "@/hooks/useAccount";
import useCosmos from "@/models/_global/cosmos";
import { isMobile } from "react-device-detect";
import { cn, Divider } from "@nextui-org/react";
import { Multiplier } from "@/routes/components/Multiplier";
import SocialAccount from "@/routes/components/SocialAccount";
import Profile from "@/routes/components/Profile";
import InviteCard from "@/routes/components/InviteCard";

// 信息卡片组件
interface InfoCardProps {
  title: string;
  children: ReactNode;
  rightAction?: ReactNode;
  className?: string;
}

const InfoCard = ({
  title,
  children,
  rightAction,
  className = "",
}: InfoCardProps) => (
  <GradientBorderCard
    borderRadius={8}
    className={`h-full relative ${className}`}
  >
    <div className="h-full flex flex-col justify-between px-6 py-4 w-full gap-4">
      <div className="text-base !font-light uppercase font-medium ">
        {title}
      </div>
      <div className="flex-1 flex flex-col justify-between w-full gap-4">
        <div className="flex-1 flex items-center ">{children}</div>
        {rightAction && <div className="">{rightAction}</div>}
      </div>
    </div>
  </GradientBorderCard>
);

// 服务卡片组件
interface ServiceCardProps {
  title: string | ReactNode;
  imageSrc: string;
  onClick?: () => void;
}

const ServiceCard = ({ title, imageSrc, onClick }: ServiceCardProps) => (
  <GradientBorderCard borderRadius={8} className="overflow-hidden">
    <div
      className="group relative h-[10.625rem] w-full group cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* 背景图片 */}
      <img
        src={imageSrc}
        alt={title}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-500",
          isMobile
            ? ""
            : "group-hover:scale-105 group-hover:grayscale-0 grayscale"
        )}
      />

      {/* 叠加的半透明层 */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* content */}
      <div className="relative inset-0 flex flex-col h-full justify-between items-start p-4 z-10">
        <h3 className="title text-2xl !font-light">{title}</h3>
        <ArrowRight size={20} className="self-end text-white" />
      </div>
    </div>
  </GradientBorderCard>
);

// 社交账户项组件
interface SocialAccountItemProps {
  icon: ReactNode;
  account: string;
  action?: ReactNode;
}

const SocialAccountItem = ({
  icon,
  account,
  action,
}: SocialAccountItemProps) => (
  <div className="flex justify-between items-center py-2 w-full">
    <div className="flex items-center justify-between gap-2 w-full">
      {icon}
      <span className="text-white">{account}</span>
    </div>
    {action}
  </div>
);

// 主要组件
const UserPortal = () => {
  const navigate = useNavigate();
  const { balanceMap } = useCosmos();

  const { user } = useAccount();
  const {
    name,
    avatarUrl,
    inviteCode,
    balance,
    rewardList = [],
    socialAccountList,
    voucherCnt = 0, // 添加代金券数量
    nftCnt = 0, // 添加NFT数量
  } = user || {};

  // 格式化CYS和CGT余额
  // const cysReward = rewardList?.find(item => item.symbol === "CYS")?.amount || "0";
  // const cgtReward = rewardList?.find(item => item.symbol === "CGT")?.amount || "0";

  const cysReward = formatReward(balanceMap?.CYS?.hm_amount || "0", 2);
  const cgtReward = formatReward(balanceMap?.CGT?.hm_amount || "0", 2);

  // 格式化社交账号
  const googleAccount = socialAccountList?.google?.name || "";
  const xAccount = socialAccountList?.x?.name || "";
  const discordAccount = socialAccountList?.discord?.name || "";

  const handleEditName = () => {
    handleSignIn("profile");
  };

  return (
    <>
      {/* content */}
      <div className="container mx-auto relative z-10 pt-20 pb-16">
        {/* title */}
        <h1 className="title text-7xl md:text-[120px] !font-[200] mb-24 text-center">
          USER PORTAL
        </h1>

        {/* GENERAL 部分 */}
        <div className="mb-4">
          <h2
            className={cn(
              "title !font-light uppercase mb-12 text-center",
              isMobile ? "!text-2xl" : "text-4xl"
            )}
          >
            GENERAL
          </h2>

          <div className="flex flex-wrap gap-4">
            {/* total rewards */}
            <div className="flex-[5] min-w-[250px]">
              <GradientBorderCard borderRadius={8} className="h-full">
                <div className="py-4 px-6 w-full h-full">
                  <div className="flex justify-between items-center mb-4">
                    <div
                      className={cn(
                        "text-base !font-light title",
                        isMobile ? "!text-base" : ""
                      )}
                    >
                      TOTAL REWARDS
                    </div>
                    <Link
                      to="/zk/serviceHub"
                      className="flex items-center text-sub text-sm hover:text-white"
                    >
                      DETAILS <ArrowRight size={12} className="ml-1" />
                    </Link>
                  </div>

                  <div
                    className={cn(
                      "flex justify-between",
                      isMobile ? "flex-col" : "flex-col"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-end justify-end gap-6 border-white py-2"
                      )}
                    >
                      <div className="title !text-3xl !font-light">
                        {cysReward} CYS
                      </div>
                      <Button
                        onClick={handleConvertModal}
                        type="light"
                        className={cn(
                          "min-w-fit self-end text-base py-2 px-3 rounded-md",
                          isMobile ? "w-full" : "w-[8.125rem]"
                        )}
                      >
                        CONVERT
                      </Button>
                    </div>

                    <Divider className="bg-[#FFF] my-6" />

                    <div className="flex items-end justify-end gap-6 py-2">
                      <div className="title !text-3xl !font-light">
                        {cgtReward} CGT
                      </div>
                      <Button
                        onClick={handleStakeModal}
                        type="light"
                        className={cn(
                          "min-w-fit self-end text-base py-2 px-3 rounded-md",
                          isMobile ? "w-full" : "w-[8.125rem]"
                        )}
                      >
                        STAKE
                      </Button>
                    </div>
                  </div>
                </div>
              </GradientBorderCard>
            </div>

            {/* balance / voucher */}
            <div className="flex-[4] min-w-[250px] flex flex-col gap-4">
              <GradientBorderCard borderRadius={8} className="h-full">
                <div className="py-4 px-6 w-full h-full">
                  <div className="flex justify-between items-center mb-4">
                    <div
                      className={cn(
                        "text-base !font-light title",
                        isMobile ? "!text-base" : ""
                      )}
                    >
                      CYSIC BALANCE
                    </div>
                    <div className="flex items-center gap-6">
                      <Link
                        to="/zk/serviceHub"
                        className="flex items-center text-sub text-sm hover:text-white"
                      >
                        BRIDGE <ArrowRight size={12} className="ml-1" />
                      </Link>
                      <Link
                        to="/zk/serviceHub"
                        className="flex items-center text-sub text-sm hover:text-white"
                      >
                        HISTORY <ArrowRight size={12} className="ml-1" />
                      </Link>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "flex justify-between",
                      isMobile ? "flex-col" : "flex-col"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-end justify-end gap-6 border-white py-2"
                      )}
                    >
                      <div className="title !text-3xl !font-light">
                        {cysReward} CYS
                      </div>
                    </div>
                  </div>
                </div>
              </GradientBorderCard>
              <GradientBorderCard borderRadius={8} className="h-full">
                <div className="py-4 px-6 w-full h-full">
                  <div className="flex justify-between items-center mb-4">
                    <div
                      className={cn(
                        "text-base !font-light title",
                        isMobile ? "!text-base" : ""
                      )}
                    >
                      VOCHER
                    </div>
                    <div className="flex items-center gap-6">
                      <div
                        onClick={() => handleVoucherModal()}
                        className="flex items-center text-sub text-sm hover:text-white"
                      >
                        VIEW ALL <ArrowRight size={12} className="ml-1" />
                      </div>
                      <Link
                        to="/nft/socialTask"
                        className="flex items-center text-sub text-sm hover:text-white"
                      >
                        SOCIAL TASKS <ArrowRight size={12} className="ml-1" />
                      </Link>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "flex justify-between",
                      isMobile ? "flex-col" : "flex-col"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-end justify-end gap-6 border-white py-2"
                      )}
                    >
                      <div className="title !text-3xl !font-light">
                        {cysReward}
                      </div>
                    </div>
                  </div>
                </div>
              </GradientBorderCard>
            </div>
          </div>
        </div>

        <div className="mb-4">
          {/* 乘数卡片 */}
          <Multiplier />
        </div>

        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <Profile />
          </div>
          <div className="flex-1 min-w-[300px]">
            <SocialAccount />
          </div>
        </div>

        <div className="my-12">
          <h2
            className={cn(
              "title !font-light uppercase mb-12 text-center",
              isMobile ? "!text-2xl" : "text-4xl"
            )}
          >
            INVITE
          </h2>

          <div className="flex flex-wrap gap-4">
            <div className="flex-[2]">
              <InviteCard />
            </div>
            <div className="flex-1">
              <GradientBorderCard
                borderRadius={8}
                className="flex-[4] w-full h-full"
              >
                <div className="w-full px-6 py-4 h-full flex flex-col gap-4">
                  <div className="uppercase !text-base title !font-light">
                    rebate rate
                  </div>
                  <div className="flex items-center gap-2 self-end">
                    <Copy
                      value={inviteCode}
                      className="!text-2xl title !font-light"
                    >
                      {inviteCode || "-"}
                    </Copy>
                  </div>
                </div>
              </GradientBorderCard>
            </div>
            <div className="flex-1">
              <GradientBorderCard
                borderRadius={8}
                className="flex-[4] w-full h-full"
              >
                <div className="w-full px-6 py-4 h-full flex flex-col gap-4">
                  <div className="uppercase !text-base title !font-light">
                    Invite level{" "}
                  </div>
                  <div className="flex items-center gap-2 self-end">
                    <Copy
                      value={inviteCode}
                      className="!text-2xl title !font-light"
                    >
                      {inviteCode || "-"}
                    </Copy>
                  </div>
                </div>
              </GradientBorderCard>
            </div>
            <div className="flex-1" />
          </div>
        </div>

        <Link
          className="title !text-[24px] !font-[300] !text-[#00F0FF] flex items-center justify-center mb-12"
          to="/zk/serviceHub"
        >
          check invites details →
        </Link>

        {/* SERVICE HUB 部分 */}
        <div>
          <h2 className="title !text-4xl !font-light uppercase mb-12 text-center">
            SERVICE HUB
          </h2>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <ServiceCard
                title="CYSIC ZK"
                imageSrc={getImageUrl("@/assets/images/nft/preset1.png")}
                onClick={() => {
                  navigate("/zk/serviceHub");
                }}
              />
            </div>

            <div className="flex-1 min-w-[300px]">
              <ServiceCard
                title={
                  <>
                    CYSIC AI
                    <br />
                    (COMING SOON)
                  </>
                }
                imageSrc={getImageUrl("@/assets/images/nft/preset2.png")}
                onClick={() => {
                  navigate("/ai");
                }}
              />
            </div>

            <div className="flex-1 min-w-[300px]">
              <ServiceCard
                title={
                  <>
                    CYSIC MINING
                    <br />
                    (COMING SOON)
                  </>
                }
                imageSrc={getImageUrl("@/assets/images/nft/preset1.png")}
                onClick={() => {
                  navigate("/stake");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPortal;
