import clsx from "clsx";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

const MainCard = (props: any) => {
    const { t } = useTranslation();
    return (
        <div
            className={clsx(
                isMobile ? "w-full px-5 py-4" : "min-h-[152px] flex-1 px-6 py-6",
                "relative flex flex-col gap-3 rounded-[24px] border border-[#192E33] shadow-[0px_4px_0px_0px_#000000]"
            )}
            style={{
                backgroundColor: "#10141a",
                // background: `url('/m/btn-bg.svg')`,
                // backgroundRepeat: "no-repeat",
                // backgroundSize: "auto",
            }}
            {...props}
        >
            {props?.title ? <div className="flex items-center gap-1 text-[#A3A3A3]">
                {/* <Hero className="size-4 text-[#A3A3A3]" /> */}
                <span className="text-[18px] text-[#fff]">
                    {typeof props?.title == "string" ? t(props?.title) : props?.title}
                </span>
            </div> : null}
            <div className={clsx("text-[24px] text-[#fff] font-bold h-full", props?.className)}>{props?.children}</div>
        </div>
    );
};

export default MainCard