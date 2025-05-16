import { getImageUrl } from "@/utils/tools";
import { Tooltip } from "@nextui-org/react";
const DownloadQRCodeTooltip = ({ children }: { children: React.ReactNode }) => {
    return (
        <Tooltip
            closeDelay={0}
            disableAnimation
            classNames={{
                content: "bg-[#2A313B]",
            }}
            content={
                <div className="p-5 rounded-[12px] bg-[#2A313B] flex flex-col items-center gap-3">
                    <img
                        className="size-[10.25rem]"
                        src={getImageUrl(
                            "@/assets/images/tutorial/cysic_prover_app.png"
                        )}
                    />
                    <div className="text-sm">Scan to Download</div>
                </div>
            }
        >
            {children}
        </Tooltip>
    )
}

export default DownloadQRCodeTooltip;