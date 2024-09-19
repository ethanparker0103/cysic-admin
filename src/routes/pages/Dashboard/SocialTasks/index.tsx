import Button from "@/components/Button";
import { commonPageSize } from "@/config";
import usePagnation from "@/hooks/usePagnation";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import { getImageUrl } from "@/utils/tools";
import { Progress } from "@nextui-org/react";
import { useEventListener, useRequest } from "ahooks";
import axios from "axios";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

const TaskItem = ({ taskTypeId, finishedTaskIDs, row }: any) => {
    const { address } = useAccount()
    const handleClick = async (closeLoading?: any) => {
        try {
            const res: any = await axios.put(`/api/v1/socialTask/claim/${row?.ID}/${address}`)
            if (res?.code != '10000') {
                toast.error(res?.msg)
                return
            }
            toast.success('finished')
            dispatchEvent(new CustomEvent('refreshSocialTaskList', {
                detail: {
                    taskTypeId
                }
            }))
        } catch (e: any) {
            toast.error(e?.msg || e?.message || e?.toString())
        } finally {
            closeLoading?.()
        }
    }

    return <div className="flex items-center justify-between gap-12 w-full border border-[#213240] rounded-[16px] bg-[#10141A] py-4 px-6">
        <div className="flex gap-4 flex-[4]">
            <div>
                {finishedTaskIDs?.includes(row?.ID) ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1181_23464)">
                        <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12Z" fill="#18D16F" fillOpacity="0.25" />
                        <path d="M7 11.6356L10.9175 15.5L17 9.5" stroke="#18D16F" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1181_23464">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                    : <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.1321 18.2434H16.9305V16.228V16.1532C16.9305 16.0997 16.9305 16.0462 16.9285 15.9949V15.9841C16.9285 15.9627 16.9285 15.9435 16.9263 15.9221C16.8503 13.4552 14.2571 11.3093 12.2996 10.1091C14.2445 8.91737 16.8334 6.78861 16.9263 4.34103C16.9305 4.30893 16.9327 4.27685 16.9327 4.24261V1.75439H18.1342C18.6114 1.75439 19 1.36286 19 0.877193C19 0.393666 18.6136 0 18.1342 0H1.86579C1.38855 0 1 0.39153 1 0.877193C1 1.36072 1.38644 1.75439 1.86579 1.75439H2.99554V4.24261C2.99554 4.27685 2.99766 4.30893 3.00187 4.34103C3.09479 6.78861 5.89488 8.91737 7.83975 10.1112C5.89911 11.3029 3.09902 13.4253 3.00399 15.8686C2.99976 15.9072 2.99554 15.9456 2.99554 15.9841V18.2456H1.86579C1.38855 18.2456 1 18.6371 1 19.1228C1 19.6063 1.38644 20 1.86579 20H18.1321C18.6093 20 18.9979 19.6085 18.9979 19.1228C18.9979 18.6371 18.6114 18.2434 18.1321 18.2434Z" fill="#525252" />
                        <path d="M15.4091 18.1946C15.4091 18.6886 14.9961 19.0907 14.4839 19.0907H5.42526C4.91524 19.0907 4.5 18.6907 4.5 18.1946C4.5 17.7006 4.91298 17.2984 5.42526 17.2984H14.4839C14.9939 17.3006 15.4091 17.7006 15.4091 18.1946ZM9.95456 12.0723C10.4646 12.0723 10.8798 12.4722 10.8798 12.9685V14.7171C10.8798 15.2111 10.4668 15.6132 9.95456 15.6132C9.44453 15.6132 9.02933 15.2132 9.02933 14.7171V12.9662C9.03155 12.4722 9.44453 12.0723 9.95456 12.0723ZM9.95456 8.18164C10.4646 8.18164 10.8798 8.58164 10.8798 9.0778C10.8798 9.5718 10.4668 9.97393 9.95456 9.97393C9.44453 9.97393 9.02933 9.57394 9.02933 9.0778C9.03155 8.58164 9.44453 8.18164 9.95456 8.18164Z" fill="#D8D8D8" />
                    </svg>}
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <div className="text-[#fff] text-xl font-[700]">{row?.Name}</div>
                <div className="text-[#A3A3A3] text-xs">{row?.Desc}</div>
            </div>
        </div>

        <div className="leading-none text-[#00F0FF] flex items-end flex-1 justify-end">
            <span className="text-[32px] font-[700]">+{row?.Point || 0}</span>
            <span className="text-sm font-[400]">Points</span>
        </div>

        <div className="flex-1 flex justify-end"><Button needLoading onClick={handleClick} disabled={finishedTaskIDs?.includes(row?.ID) || row?.Status == 0} className="!text-[#000] gradient-bg">{
            finishedTaskIDs?.includes(row?.ID) ? 'Claimed' : 'Go'
        }</Button></div>
    </div>

}

const TaskList = ({ finishedTaskIDs, row }: any) => {
    const { data, totalPage, currentPage, setCurrentPage, run } = usePagnation(
        (page: number) => {
            // return Promise.resolve(mock);

            return axios.get(`/api/v1/socialTask/list/${row?.ID}`, {
                params: {
                    pageNum: page,
                    pageSize: commonPageSize
                }
            });
        },
        {
            ready: !!row?.ID,
            refreshDeps: [row?.ID],
            onSuccess(e: any) {
                dispatchEvent(new CustomEvent('totalTaskAmount', {
                    detail: {
                        amount: e?.data?.total
                    }
                }))
            }
        }
    );


    useEventListener('refreshSocialTaskList', (e: any) => {
        if (row?.ID == e?.detail?.taskTypeId) {
            run()
        }
    })

    return <div className="flex flex-col gap-4">
        {data?.data?.list?.map((i: any, index: any) => {
            return <TaskItem taskTypeId={row?.ID} finishedTaskIDs={finishedTaskIDs} row={i} key={index} />
        })}
    </div>
}

const SocialTasks = () => {
    const { address } = useAccount()

    const { data } = useRequest(() => {
        return axios.get(`/api/v1/socialTask/types`)
    })

    const { data: finishedData, run: finishedRun } = useRequest(() => {
        return axios.get(`/api/v1/socialTask/address/finished/${address}`)
    }, {
        ready: !!address,
        refreshDeps: [address]
    })


    const finishedTask = finishedData?.data?.list || []
    const finishedTaskIDs = finishedTask?.map((i: any) => i?.ID)
    const taskList = data?.data?.list
    const [totalTaskAmount, setTotalTaskAmount] = useState(0)

    useEventListener('totalTaskAmount', (e: any) => {
        setTotalTaskAmount(old => +old + e?.detail?.amount)
    })

    const progress = BigNumber(finishedTask?.length).div(totalTaskAmount || 0).multipliedBy(100).toNumber()

    useEventListener('refreshSocialTaskList', () => {
        finishedRun()
    })

    return (
        <>
            <style>
                {`
            .socialTask-bg {
                background: url(${getImageUrl('@/assets/images/socialTask/bg.png')}) no-repeat;
            }
            
            `}

            </style>
            <MainContainer title="Social Tasks">
                <>
                    <div className={clsx(isMobile ? "" : "p-4", "Gemsbuck flex flex-col gap-4 shadow-[0px_4px_0px_0px_#000000]")}>
                        <div className="socialTask-bg  min-h-[15rem] !bg-contain py-12 px-8">
                            <div className="max-w-[19.625rem] flex flex-col gap-8">
                                <div className="flex flex-col gap-4">
                                    <div className="Gemsbuck text-xl text-center">You need to complete <span className="text-[#00F0FF]">{totalTaskAmount}</span> your UXProfile</div>
                                    <div className="Gemsbuck text-base flex items-end gap-2 leading-none justify-center  ">
                                        <span>Come on!</span>
                                        <span className="text-[28px] text-[#00F0FF]">{finishedTask?.length}/{totalTaskAmount}</span>
                                        <span>profiles completed</span>
                                    </div>
                                </div>
                                <Progress aria-label="Loading..." value={progress} className="max-w-md" />
                            </div>
                        </div>
                        <div className="Gemsbuck flex flex-col gap-8">
                            {taskList?.map((i: any, index: any) => {
                                return <div key={index} className="flex flex-col gap-4">
                                    <div className="text-[24px] font-[700] uppercase">{i?.Name}</div>
                                    <TaskList finishedTaskIDs={finishedTaskIDs} row={i} />
                                </div>
                            })}
                        </div>

                    </div>
                </>
            </MainContainer>
        </>
    );
};

export default SocialTasks;
