import Button from "@/components/Button";
import MainCard from "@/components/MainCard";
import ProgressIcon, { ENUM_ProgressStatus } from "@/components/Progess/icon";
import ProgressLabel from "@/components/Progess/label";
import { checkBind, genCode } from "@/mock/referral";
import useReferral from "@/models/_global/referral";
import { mock } from "@/routes/pages/Dashboard/Referral";
import Detail from "@/routes/pages/Dashboard/Referral/Detail";
import { generateQueryString } from "@/utils/tools";
import { Progress, Snippet, Tooltip } from "@nextui-org/react";
import { useRequest } from "ahooks";
import axios from "axios";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import useAccount from "@/hooks/useAccount";
import { cysicStCoin, genTwitterLink, getReferralUrl, twitterLink } from "@/config";
import ReferralCodeCopy from "@/components/ReferralCodeCopy";
import useModalState from "@/hooks/useModalState";
import { useEffect, useMemo } from "react";

const Valid = () => {
    const { dispatch } = useModalState({ eventName: "modal_how_invite_work_visible" });
    const { address } = useAccount();
    const { levelListMap, levelList, code, overview, setState } = useReferral();

    console.log('overview', overview)

    // 10.4 获取当前地址基础信息
    useRequest(() => axios.get(`/api/v1/referral/${address}/overview`), {
        ready: !!address,
        refreshDeps: [address],
        onSuccess(e) {
            setState({
                overview: e?.data,
            });
        },
        onFinally() {
            if (!mock) return;
            setState({
                overview: overview?.data,
            });
        },
    });

    const currentLevel = overview?.currentLevel;
    const currentLevelConfig = levelListMap?.[currentLevel];
    const nextLevelConfig = levelListMap?.[currentLevel + 1];
    let totalPastActivateCnt = 0;

    const totalInviteValue = levelList?.reduce((prev: any, next: any) => {
        if (+next?.ID < currentLevel) {
            totalPastActivateCnt = totalPastActivateCnt + next?.Require
        }
        return BigNumber(prev).plus(next?.Require).toString();
    }, "0");

    const currentInviteValue = BigNumber(totalPastActivateCnt)
        .div(totalInviteValue)
        .multipliedBy(100)
        .toFixed(0, BigNumber.ROUND_DOWN);

    const currentInvites = BigNumber(totalPastActivateCnt).plus(overview?.activateCnt || '0').toString()

    const twitterLink = useMemo(() => {
        return genTwitterLink()
    }, [code])

    useEffect(() => {
        if (currentInvites && nextLevelConfig) {

            dispatchEvent(new CustomEvent("modal_referral_reward_visible", {
                detail: {
                    visible: true,
                    nextLevel: currentLevelConfig,
                    currentInvites
                }
            }))
        }
    }, [nextLevelConfig, currentInvites])
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                    <MainCard>
                        <div className="flex flex-col gap-6 justify-between h-full">
                            <div className="flex justify-between flex-wrap">
                                <div className="flex flex-col">
                                    <span className="text-lg font-[400]">
                                        Level {currentLevel}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <img className="size-8" src={currentLevelConfig?.Icon} />
                                        <span className="text-2xl font-bold text-[#00F0FF]">
                                            {currentLevelConfig?.Name}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-[400]">Pool Fee</span>
                                    <span className="text-2xl font-bold self-end">
                                        {(currentLevelConfig?.PoolFee || 0) * 100}%
                                    </span>
                                </div>
                            </div>
                            <div className=" flex flex-col gap-2 rounded-[12px] bg-[#FFFFFF0D] py-2 px-4">
                                <div className="text-[#fff] text-base font-[600]">
                                    Total Invite Rewards
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[#A3A3A3] text-base font-[400]">
                                            Referral Earnings
                                        </span>
                                        <span className="text-base font-[600]">
                                            {overview?.rebateReward || '-'}
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[#A3A3A3] text-base font-[400]">
                                            Upgrade Earnings
                                        </span>
                                        <span className="text-base font-[600] self-end">
                                            {overview?.levelUpReward || '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <div className="flex flex-col gap-4">
                            <span className="text-lg font-[400] text-[#fff]">
                                Invite your friends and earn&nbsp;
                                <span className="italic text-[#00F0FF] font-bold">15%</span>
                                &nbsp;of the Verifier/Prover Rewards your friends make.
                            </span>
                            <div className="flex flex-col gap-2">
                                <ReferralCodeCopy />
                            </div>
                            <a
                                className="w-full"
                                target="_blank"
                                href={twitterLink}
                            >
                                <Button
                                    type="gradient"
                                    className="w-full !py-2 !min-h-fit !h-fit rounded-full"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect width="26" height="26" rx="13" fill="black" />
                                            <path
                                                d="M14.2366 12.1258L19.0775 6.5H17.9303L13.728 11.3848L10.3716 6.5H6.5L11.5757 13.8856L6.5 19.7868H7.64725L12.0843 14.6274L15.6292 19.7868H19.5L14.2366 12.1266V12.1258ZM12.6669 13.9506L12.1526 13.2153L8.06 7.36369H9.8215L13.1235 12.0868L13.6378 12.8221L17.9303 18.9613H16.1687L12.6661 13.9514L12.6669 13.9506Z"
                                                fill="white"
                                                stroke="white"
                                                strokeWidth="0.3"
                                            />
                                        </svg>
                                        <span>Tweet for more points</span>
                                    </div>
                                </Button>
                            </a>
                        </div>
                    </MainCard>
                </div>
                <MainCard title={<div className="flex flex-col gap-2">
                    <span className="font-bold text-[#fff] text-2xl">Successful Invites</span>
                    <span className="font-[400] text-[#737373] text-xs">Make sure your team members have their account activated! See <span onClick={() => dispatch({ visible: true })} className="cursor-pointer underline">How Invite Works</span> for details.</span>
                </div>}>
                    <>
                        <div className="relative h-[10rem]">
                            <Progress
                                size="md"
                                radius="sm"
                                classNames={{
                                    base: "absolute top-3/4 -translate-y-1/2",
                                    track: "drop-shadow-md border border-default",
                                    indicator: "bg-gradient",
                                    label: "tracking-wider font-medium text-default-600",
                                    value: "text-foreground/60",
                                }}
                                value={+currentInviteValue}
                            />

                            <div className="w-full absolute flex items-center top-1/4 -translate-y-1/2">
                                {levelList?.slice(0, -1)?.map((i: any, index: any) => {
                                    const v = BigNumber(i?.Require)
                                        .div(totalInviteValue)
                                        .multipliedBy(100)
                                        .toFixed(0, BigNumber.ROUND_DOWN);
                                    const flex = "flex-[" + v + "] ";

                                    const required = levelList?.[index - 1]?.Require || 0
                                    return (
                                        <div
                                            key={index}
                                            style={{ flex: v }}
                                            className={clsx(
                                                flex,
                                                index != 0
                                                    ? "[&>div]:-translate-x-[calc(50%-24px)]"
                                                    : ""
                                            )}
                                        >
                                            <ProgressLabel
                                                status={
                                                    currentLevel > i?.Level
                                                        ? ENUM_ProgressStatus.finish
                                                        : currentLevel == i?.Level
                                                            ? ENUM_ProgressStatus.ongoing
                                                            : ENUM_ProgressStatus.pending
                                                }
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <Tooltip content={<div className="flex flex-col gap-1 text-sm">
                                                        <div className="flex items-center gap-1 ">
                                                            <span className="text-[#A1A1AA]">Reward</span>
                                                            <span className="text-[#fff]">{i?.LevelUpRewardPoint} {cysicStCoin}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 ">
                                                            <span className="text-[#A1A1AA]">Pool Fee</span>
                                                            <span className="text-[#fff]">{i?.PoolFee}%</span>
                                                        </div>
                                                    </div>}><span>{i?.Name}</span></Tooltip>
                                                    <div className="flex items-center gap-1">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clipPath="url(#clip0_2574_89101)">
                                                                <circle cx="10" cy="10" r="10" fill="white" fill-opacity="0.2" />
                                                                <circle cx="9.14328" cy="6.85714" r="2.85714" fill="white" />
                                                                <path d="M4 14.5146C4 12.4948 5.63736 10.8574 7.65714 10.8574H10.6286C12.6484 10.8574 14.2857 12.4948 14.2857 14.5146C14.2857 15.0195 13.8764 15.4289 13.3714 15.4289H4.91429C4.40934 15.4289 4 15.0195 4 14.5146Z" fill="white" />
                                                                <rect x="14.3125" y="6" width="0.875" height="3.5" rx="0.4375" fill="#00F0FF" />
                                                                <rect x="16.5" y="7.3125" width="0.875" height="3.5" rx="0.4375" transform="rotate(90 16.5 7.3125)" fill="#00F0FF" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_2574_89101">
                                                                    <rect width="20" height="20" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>

                                                        <span>{required}</span>
                                                    </div>
                                                </div>
                                            </ProgressLabel>
                                        </div>
                                    );
                                })}
                                {levelList?.slice(-1)?.map((i: any, index: any) => {
                                    const required = levelList?.slice(-2)?.[0]?.Require || 0
                                    return (
                                        <div key={index} className="w-12 ">
                                            <ProgressLabel
                                                status={
                                                    currentLevel > i?.Level
                                                        ? ENUM_ProgressStatus.finish
                                                        : currentLevel == i?.Level
                                                            ? ENUM_ProgressStatus.ongoing
                                                            : ENUM_ProgressStatus.pending
                                                }
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <Tooltip content={<div className="flex flex-col gap-1 text-sm">
                                                        <div className="flex items-center gap-1 ">
                                                            <span className="text-[#A1A1AA]">Reward</span>
                                                            <span className="text-[#fff]">{i?.LevelUpRewardPoint} {cysicStCoin}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 ">
                                                            <span className="text-[#A1A1AA]">Pool Fee</span>
                                                            <span className="text-[#fff]">{i?.PoolFee}%</span>
                                                        </div>
                                                    </div>}><span>{i?.Name}</span></Tooltip>
                                                    <div className="flex items-center gap-1">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clipPath="url(#clip0_2574_89101)">
                                                                <circle cx="10" cy="10" r="10" fill="white" fill-opacity="0.2" />
                                                                <circle cx="9.14328" cy="6.85714" r="2.85714" fill="white" />
                                                                <path d="M4 14.5146C4 12.4948 5.63736 10.8574 7.65714 10.8574H10.6286C12.6484 10.8574 14.2857 12.4948 14.2857 14.5146C14.2857 15.0195 13.8764 15.4289 13.3714 15.4289H4.91429C4.40934 15.4289 4 15.0195 4 14.5146Z" fill="white" />
                                                                <rect x="14.3125" y="6" width="0.875" height="3.5" rx="0.4375" fill="#00F0FF" />
                                                                <rect x="16.5" y="7.3125" width="0.875" height="3.5" rx="0.4375" transform="rotate(90 16.5 7.3125)" fill="#00F0FF" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_2574_89101">
                                                                    <rect width="20" height="20" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>

                                                        <span>{required}</span>
                                                    </div>
                                                </div>
                                            </ProgressLabel>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="w-full absolute flex items-center top-3/4 -translate-y-1/2">
                                {levelList?.slice(0, -1)?.map((i: any, index: any) => {
                                    const v = BigNumber(i?.Require)
                                        .div(totalInviteValue)
                                        .multipliedBy(100)
                                        .toFixed(0, BigNumber.ROUND_DOWN);
                                    const flex = "flex-[" + v + "] ";
                                    return (
                                        <div key={index} style={{ flex: v }} className={flex}>
                                            <img className="size-10" src={i?.Icon} />
                                        </div>
                                    );
                                })}
                                {levelList?.slice(-1)?.map((i: any, index: any) => {
                                    return (
                                        <div key={index} className="w-12">
                                            <img className="size-10" src={i?.Icon} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                </MainCard>
            </div>

            <Detail overview={overview} />
        </div>
    );
};

export default Valid;
