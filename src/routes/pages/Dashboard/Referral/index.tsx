import Button from "@/components/Button";
import Copy from "@/components/Copy";
import Input from "@/components/Input";
import MainCard from "@/components/MainCard";
import ProgressIcon, { ENUM_ProgressStatus } from "@/components/Progess/icon";
import ProgressLabel from "@/components/Progess/label";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import Detail from "@/routes/pages/Dashboard/Referral/Detail";
import { Progress } from "@nextui-org/react";
import { useRequest } from "ahooks";
import axios from "axios";
import clsx from "clsx";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useSearchParams } from "react-router-dom";
import simpleToast from "react-simple-toasts";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

const Referral = () => {
    const [forceSubmit, setForceSubmit] = useState(false)
    const [searchParams] = useSearchParams()
    const codeFromUrl = searchParams.get('code')

    useEffect(() => {
        if (codeFromUrl) {
            setBindCode(codeFromUrl)
        }
    }, [codeFromUrl])

    const { address } = useAccount()

    const { data, run } = useRequest(() => axios.get(`/api/v1/socialTask/referral/${address}`), {
        ready: !!address,
        refreshDeps: [address]
    })

    const { data: code } = useRequest(() => axios.post(`/api/v1/socialTask/referral/genCode/${address}`), {
        ready: !!address,
        refreshDeps: [address]
    })

    const referralCode = code?.data?.code
    const currentStatus = data?.data?.bind

    const [bindCode, setBindCode] = useState<string>()

    const handleBindCode = async (closeLoading?: any) => {
        try {
            if (!address) throw 'Invalid Address'
            const res: any = await axios.put(`/api/v1/socialTask/referral/bind/${bindCode}/${address}`)

            if (!res?.data?.bind) {
                toast.error('Failed')
                return
            }

            toast.success('Success')
            run?.()

        } catch (e: any) {
            toast.error(e?.msg || e?.message || e?.toString())
        } finally {
            closeLoading?.()
        }
    }
    return (
        <MainContainer title="Invite">
            <>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <MainCard>
                                <div className="flex flex-col gap-6 justify-between h-full">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-[400]">Level 1</span>
                                            <span className="text-2xl font-bold">Bronze</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-lg font-[400]">Pool Fee</span>
                                            <span className="text-2xl font-bold self-end">1%</span>
                                        </div>
                                    </div>
                                    <div className=" flex flex-col gap-2 rounded-[12px] bg-[#FFFFFF17] py-2 px-4">
                                        <div className="text-base font-[600]">Next Level:</div>
                                        <div className="flex justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-[400]">Reward</span>
                                                <span className="text-lg font-[600]">10,000 Points</span>
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-lg font-[400]">Pool Fee</span>
                                                <span className="text-lg font-[600] self-end">1%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </MainCard>
                            <MainCard>
                                <div className="flex flex-col gap-6 justify-between h-full">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-[400]">Invite Code</span>
                                            <Copy value="JOIEA"><span className="text-2xl font-bold">JOIEA</span></Copy>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-lg font-[400]">Pool Fee</span>
                                            <span className="text-2xl font-bold self-end">1%</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 cursor-pointer">
                                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.66667 5.59994C4.3445 5.59994 4.08333 5.8611 4.08333 6.18327C4.08333 6.50543 4.3445 6.7666 4.66667 6.7666H5.83333C6.1555 6.7666 6.41667 6.50543 6.41667 6.18327C6.41667 5.8611 6.1555 5.59994 5.83333 5.59994H4.66667Z" fill="white" fill-opacity="0.32" />
                                            <path d="M4.08333 8.5166C4.08333 8.19444 4.3445 7.93327 4.66667 7.93327H9.33333C9.6555 7.93327 9.91667 8.19444 9.91667 8.5166C9.91667 8.83877 9.6555 9.09994 9.33333 9.09994H4.66667C4.3445 9.09994 4.08333 8.83877 4.08333 8.5166Z" fill="white" fill-opacity="0.32" />
                                            <path d="M4.66667 10.2666C4.3445 10.2666 4.08333 10.5278 4.08333 10.8499C4.08333 11.1721 4.3445 11.4333 4.66667 11.4333H9.33333C9.6555 11.4333 9.91667 11.1721 9.91667 10.8499C9.91667 10.5278 9.6555 10.2666 9.33333 10.2666H4.66667Z" fill="white" fill-opacity="0.32" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.5 14.3499C11.4665 14.3499 12.25 13.5664 12.25 12.5999V5.54989C12.25 5.39518 12.1885 5.24681 12.0791 5.13741L8.62919 1.68746C8.51979 1.57806 8.37142 1.5166 8.21671 1.5166H3.5C2.5335 1.5166 1.75 2.3001 1.75 3.2666V12.5999C1.75 13.5664 2.5335 14.3499 3.5 14.3499H10.5ZM2.91667 3.2666V12.5999C2.91667 12.9221 3.17783 13.1833 3.5 13.1833H10.5C10.8222 13.1833 11.0833 12.9221 11.0833 12.5999V6.18327H8.16667C7.8445 6.18327 7.58333 5.9221 7.58333 5.59994V2.68327H3.5C3.17783 2.68327 2.91667 2.94444 2.91667 3.2666ZM8.75 5.0166H10.3084L8.75 3.45818V5.0166Z" fill="white" fillOpacity="0.32" />
                                        </svg>
                                        <span className="text-sm font-[400]">How Invites Work</span>
                                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.114 11.4981C10.4361 11.4981 10.6973 11.2369 10.6973 10.9147L10.6971 5.13989C10.6971 4.82001 10.4395 4.55981 10.1196 4.5566L4.28645 4.49811C3.9643 4.49488 3.70053 4.75341 3.69729 5.07556C3.69406 5.39771 3.9526 5.66148 4.27475 5.66471L8.71942 5.70929L3.51411 10.9146C3.28631 11.1424 3.28631 11.5117 3.51411 11.7395C3.74192 11.9674 4.11127 11.9674 4.33907 11.7395L9.53046 6.54815L9.5306 10.9148C9.53061 11.2369 9.79178 11.4981 10.114 11.4981Z" fill="white" />
                                        </svg>
                                    </div>

                                    <Button onClick={() => {
                                        copy('11')
                                        simpleToast("Copied");
                                    }}>Copy Invite link</Button>
                                </div>
                            </MainCard>
                        </div>
                        <MainCard title="Upgrade progress">
                            <div className="relative h-[12.5rem]">
                                <Progress
                                    size="md"
                                    radius="sm"
                                    classNames={{
                                        base: "absolute top-1/2 -translate-y-1/2",
                                        track: "drop-shadow-md border border-default",
                                        indicator: "bg-gradient-to-r from-[#9D47FF] to-[#00F0FF]",
                                        label: "tracking-wider font-medium text-default-600",
                                        value: "text-foreground/60",
                                    }}
                                    value={65}
                                />

                                <div className="w-full absolute flex items-center top-0 translate-y-1/2">
                                    <div className="flex-1"><ProgressLabel status={ENUM_ProgressStatus.finish} >Gold</ProgressLabel></div>
                                    <div className="flex-1"><ProgressLabel status={ENUM_ProgressStatus.finish} >Gold</ProgressLabel></div>
                                    <div className="flex-1"><ProgressLabel status={ENUM_ProgressStatus.ongoing} >Gold</ProgressLabel></div>
                                    <div className="flex-1"><ProgressLabel status={ENUM_ProgressStatus.pending} >Gold</ProgressLabel></div>
                                    <div className=""><ProgressLabel status={ENUM_ProgressStatus.pending} >Gold</ProgressLabel></div>
                                </div>

                                <div className="w-full absolute flex items-center top-1/2 -translate-y-1/2">
                                    <div className="flex-1"><ProgressIcon status={ENUM_ProgressStatus.finish} /></div>
                                    <div className="flex-1"><ProgressIcon status={ENUM_ProgressStatus.finish} /></div>
                                    <div className="flex-1"><ProgressIcon status={ENUM_ProgressStatus.ongoing} /></div>
                                    <div className="flex-1"><ProgressIcon status={ENUM_ProgressStatus.pending} /></div>
                                    <div className=""><ProgressIcon status={ENUM_ProgressStatus.pending} /></div>
                                </div>

                                <div className="w-full absolute flex items-center top-3/4 ">
                                    <div className="flex-1 text-sm text-center text-[#A3A3A3] font-[500]">10 Referrals</div>
                                    <div className="flex-1 text-sm text-center text-[#A3A3A3] font-[500]">10 Referrals</div>
                                    <div className="flex-1 text-sm text-center text-[#A3A3A3] font-[500]">10 Referrals</div>
                                    <div className="flex-1 text-sm text-center text-[#A3A3A3] font-[500]">10 Referrals</div>
                                </div>
                            </div>

                        </MainCard>
                    </div>

                    <Detail />
                </div>
            </>
        </MainContainer>
    );
};

export default Referral;
