import Button from "@/components/Button";
import { downloadLink } from "@/config";
import { getImageUrl } from "@/utils/tools";
import { useSessionStorageState } from "ahooks";
import { useState } from "react";

const AppDownloadNotify = () => {

    const [visible, setVisible] = useSessionStorageState<boolean | undefined>(
        'notify_b_r_app_download_message',
        {
            defaultValue: true,
        },
    );


    if (!visible) return null
    return <div className="z-[50] flex fixed bottom-3 right-3 bg-[#0B0C0F] overflow-hidden border rounded-[12px] border-[#00F0FF] pl-6">
        <div className="z-[2] right-2 top-2 absolute size-5 cursor-pointer" onClick={() => { setVisible(false) }}>
            <img className="size-5" src={getImageUrl('@/assets/images/_global/close.svg')} />
        </div>
        <div className="flex-1 flex flex-col gap-4 py-5 relative z-[2]">
            <div className="p-1 rounded-[6px] border border-[#00F0FF66] text-[#00F0FF] text-xs w-fit font-semibold">Download for free. Get the App!</div>
            <div className="flex flex-col gap-1 Montserrat text-xl font-bold">
                <span>11 CYS + 11 CGT Bonus</span>
                <span className="text-light-gradient">For The First 500 users</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-[#A1A1AA] text-xs">Cysic Verifier Android Mobile App</span>
                <Button className="!w-fit !min-h-fit h-10 rounded-full !bg-[#E5199F]" type="normal" onClick={() => {
                    dispatchEvent(new CustomEvent('modal_download_app_visible', { detail: { visible: true } }))
                }}>
                    <div className="flex items-center gap-2">
                        <div className="rounded bg-[#FFFFFF26] border border-[#fff] p-2 rounded-full">
                            <img
                                className="size-3"
                                src={getImageUrl("@/assets/images/_global/download.svg")}
                            />
                        </div>
                        <span className="text-[#fff] text-sm font-semibold">APK Download</span>
                    </div>
                </Button>
            </div>
            <div className="text-xs text-[#A1A1AA]">*Only User completes 1 verifier Task is eligible</div>
        </div>
        <div className="w-[12.25rem] aspect-[260/240] relative">
            <img src={getImageUrl('@/assets/images/download/cornor_b_r_download_bg.png')} className=" aspect-[260/240] min-w-[16.25rem] absolute right-0 top-0" />
        </div>
    </div>
}
export default AppDownloadNotify;