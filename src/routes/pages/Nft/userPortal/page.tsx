import { ArrowRight } from "lucide-react";
import GradientBorderCard from "@/components/GradientBorderCard";
import { ReactNode } from "react";
import {
  formatReward,
  getImageUrl,
} from "@/utils/tools";
import Copy from "@/components/Copy";
import { Link, useNavigate } from "react-router-dom";
import useAccount from "@/hooks/useAccount";
import useCosmos from "@/models/_global/cosmos";
import { isMobile } from "react-device-detect";
import { cn } from "@nextui-org/react";
import { Multiplier } from "@/routes/components/Multiplier";
import SocialAccount from "@/routes/components/SocialAccount";
import Profile from "@/routes/components/Profile";
import InviteCard from "@/routes/components/usePortal/cards/InviteCard";
import ZkBalanceCard from "@/routes/components/usePortal/cards/ZkBalanceCard";
import CysicBalance from "@/routes/components/usePortal/cards/CysicBalance";
import VoucherInfo from "@/routes/components/usePortal/cards/VoucherInfo";
import JoinZkPhase3 from "@/routes/components/JoinZkPhase3";
import AdCard from "@/routes/components/AdCard";


// 主要组件
const UserPortal = () => {
  const navigate = useNavigate();
  const { balanceMap } = useCosmos();

  const { user } = useAccount();
  const { inviteCode } = user || {};

  const cysReward = formatReward(balanceMap?.CYS?.hm_amount || "0", 2);
  const cgtReward = formatReward(balanceMap?.CGT?.hm_amount || "0", 2);

  return (
    <>
      {/* content */}
      <div className="container mx-auto relative z-10 pt-20 pb-16">
        {/* title */}
        <h1 className="title text-7xl md:text-[120px] !font-[200] mb-24 text-center">
          USER PORTAL
        </h1>

        {/* GENERAL 部分 */}
        <div className="mb-12">
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
              <ZkBalanceCard />
            </div>

            {/* balance / voucher */}
            <div className="flex-[4] min-w-[250px] flex flex-col gap-4">
                <CysicBalance />
                <VoucherInfo />
            </div>
          </div>
        </div>

        <div className="mb-12">
          {/* 乘数卡片 */}
          <Multiplier />
        </div>

        <div className="mb-12 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <Profile />
          </div>
          <div className="flex-1 min-w-[300px]">
            <SocialAccount />
          </div>
        </div>

        <div className="mb-12">
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
          to="/zk/invite"
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
              <AdCard
                title="CYSIC ZK"
                imageSrc={getImageUrl("@/assets/images/nft/preset1.png")}
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>

            <div className="flex-1 min-w-[300px]">
              <AdCard
                title={
                  <>
                    CYSIC AI
                    <br />
                    (COMING SOON)
                  </>
                }
                imageSrc={getImageUrl("@/assets/images/nft/preset2.png")}
                onClick={()=>null}
              />
            </div>

            <div className="flex-1 min-w-[300px]">
              <AdCard
                title={
                  <>
                    CYSIC MINING
                    <br />
                    (COMING SOON)
                  </>
                }
                imageSrc={getImageUrl("@/assets/images/nft/preset1.png")}
                onClick={()=>null}
              />
            </div>
          </div>
        </div>


        <JoinZkPhase3 className="pt-24 [&_.title]:!text-[6rem]" slogen="Join Cysic Network " />
      </div>


    </>
  );
};

export default UserPortal;
