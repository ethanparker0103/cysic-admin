import Button from "@/components/Button";
import MainCard from "@/components/MainCard";
import ProgressIcon, { ENUM_ProgressStatus } from "@/components/Progess/icon";
import ProgressLabel from "@/components/Progess/label";
import useReferral from "@/models/_global/referral";
import Detail from "@/routes/pages/Dashboard/Referral/Detail";
import { Progress, Snippet, Tooltip } from "@nextui-org/react";
import BigNumber from "bignumber.js";

const Valid = () => {
    const { levelListMap, levelList, code, overview, activatedUserList } = useReferral()

    const currentLevel = overview?.currentLevel
    const currentLevelConfig = levelListMap?.[currentLevel]
    const nextLevelConfig = levelListMap?.[currentLevel + 1]

    const totalInviteValue = levelList?.reduce((prev: any, next: any) => {
        return BigNumber(prev).plus(next?.Require).toString()
    }, '0')
    const currentInviteValue = BigNumber(overview?.activateCnt).div(totalInviteValue).multipliedBy(100).toFixed(0, BigNumber.ROUND_DOWN)

    return <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
            <div className="flex gap-3">
                <MainCard>
                    <div className="flex flex-col gap-6 justify-between h-full">
                        <div className="flex justify-between flex-wrap">
                            <div className="flex flex-col">
                                <span className="text-lg font-[400]">Level {currentLevel}</span>
                                <span className="text-2xl font-bold">{currentLevelConfig?.Name}</span>
                            </div>
                            <div className="flex flex-col">
                                <Tooltip placement="bottom" closeDelay={0} disableAnimation content={<div className="flex flex-col gap-2 text-sm">
                                    <div className="text-[#A3A3A3]">My Points Desc</div>

                                    <div className="flex flex-col gap-1 text-[#fff]">
                                        <div className="flex items-center justify-between gap-2"><span className="text-[#A3A3A3]">Phase 1</span>&nbsp;<span>0</span></div>
                                        <div className="flex items-center justify-between gap-2"><span className="text-[#A3A3A3]">Phase 2</span>&nbsp;<span>0</span></div>
                                    </div>
                                </div>}>
                                    <span className="text-lg font-[400]">Rewards Points</span>
                                </Tooltip>
                                <span className="text-2xl font-bold self-end">{currentLevelConfig?.LevelUpRewardPoint}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-[400]">Pool Fee</span>
                                <span className="text-2xl font-bold self-end">{(currentLevelConfig?.PoolFee || 0) * 100}%</span>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2 rounded-[12px] bg-[#FFFFFF0D] py-2 px-4">
                            <div className="text-[#A3A3A3] text-base font-[600]">Next Level:</div>
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[#A3A3A3] text-base font-[400]">Reward</span>
                                    <span className="text-base font-[600]">{nextLevelConfig?.LevelUpRewardPoint || '-'} Points</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[#A3A3A3] text-base font-[400]">Pool Fee</span>
                                    <span className="text-base font-[600] self-end">{((nextLevelConfig?.PoolFee || 0) * 100) || '-'}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainCard>
                <MainCard>
                    <div className="flex flex-col gap-4">
                        <span className="text-lg font-[400] text-[#fff]">Invite your friends and get&nbsp;<span className="text-[#00F0FF]">15% of the points</span>&nbsp;your friends make.</span>
                        <div className="flex flex-col gap-2">
                            <span className="text-[#A3A3A3] text-base font-[500] leading-none">Your referral code:</span>
                            <Snippet classNames={{
                                base: 'bg-[#000]'
                            }} symbol="" variant="bordered">{code}</Snippet>
                        </div>
                        <Button type="gradient" className="!py-2 !min-h-fit !h-fit rounded-full">
                            <div className="flex items-center gap-2">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="26" height="26" rx="13" fill="black" />
                                    <path d="M14.2366 12.1258L19.0775 6.5H17.9303L13.728 11.3848L10.3716 6.5H6.5L11.5757 13.8856L6.5 19.7868H7.64725L12.0843 14.6274L15.6292 19.7868H19.5L14.2366 12.1266V12.1258ZM12.6669 13.9506L12.1526 13.2153L8.06 7.36369H9.8215L13.1235 12.0868L13.6378 12.8221L17.9303 18.9613H16.1687L12.6661 13.9514L12.6669 13.9506Z" fill="white" stroke="white" strokeWidth="0.3" />
                                </svg>
                                <span>Tweet for more points</span>
                            </div>
                        </Button>
                    </div>
                </MainCard>
            </div>
            <MainCard title="Upgrade progress">
                <>
                    <span className="absolute right-6 top-6 text-sm text-[#A3A3A3]">Current Invited: {overview?.activateCnt}</span>
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
                                return <div key={index} className="flex-1"><ProgressLabel status={currentLevel > i?.Level ? ENUM_ProgressStatus.finish : currentLevel == i?.Level ? ENUM_ProgressStatus.ongoing : ENUM_ProgressStatus.pending} >{i?.Name}</ProgressLabel></div>
                            })}
                            {levelList?.slice(-1)?.map((i: any, index: any) => {
                                return <div key={index} className=""><ProgressLabel status={currentLevel > i?.Level ? ENUM_ProgressStatus.finish : currentLevel == i?.Level ? ENUM_ProgressStatus.ongoing : ENUM_ProgressStatus.pending} >{i?.Name}</ProgressLabel></div>
                            })}
                        </div>

                        <div className="w-full absolute flex items-center top-3/4 -translate-y-1/2">
                            {levelList?.slice(0, -1)?.map((i: any, index: any) => {
                                return <div key={index} className="flex-1"><ProgressIcon status={currentLevel > i?.Level ? ENUM_ProgressStatus.finish : currentLevel == i?.Level ? ENUM_ProgressStatus.ongoing : ENUM_ProgressStatus.pending} /></div>
                            })}
                            {levelList?.slice(-1)?.map((i: any, index: any) => {
                                return <div key={index} className=""><ProgressIcon status={currentLevel > i?.Level ? ENUM_ProgressStatus.finish : currentLevel == i?.Level ? ENUM_ProgressStatus.ongoing : ENUM_ProgressStatus.pending} /></div>
                            })}
                        </div>

                        <div className="w-full absolute flex items-center top-1/2 -translate-y-3/4">
                            {levelList?.slice(0, -1)?.map((i: any, index: any) => {
                                return <div key={index} className="flex-1 text-sm text-[#A3A3A3] font-[500]">{i?.Require} Referrals</div>
                            })}
                            {levelList?.slice(-1)?.map((i: any, index: any) => {
                                return <div key={index} className="text-sm text-[#A3A3A3] font-[500]">{i?.Require} Referrals</div>
                            })}
                        </div>
                    </div>
                </>

            </MainCard>
        </div>

        <Detail />
    </div>
}

export default Valid