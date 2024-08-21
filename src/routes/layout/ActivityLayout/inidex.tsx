import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@arco-design/web-react/dist/css/arco.css";
import { NextUIProvider } from "@nextui-org/react";
import clsx from "clsx";
import { Suspense } from "react";
import { isMobile } from "react-device-detect";
import { Outlet } from "react-router-dom";
import Header from "@/routes/layout/ActivityLayout/header";

const ActivityLayout = () => {
    return <>
        <ToastContainer theme="dark" />

        <NextUIProvider>
            <Suspense>
                <div className={clsx("sticky top-0 w-full bg-[#000] Gemsbuck z-[3]", isMobile ? "px-3 py-4" : "py-6")}>
                    <div className="w-full max-w-[1240px] mx-auto">
                        <Header />
                    </div>
                </div>
                <>
                    <div className="bg-[#000]">
                        <Outlet />
                    </div>
                </>

            </Suspense>
        </NextUIProvider>

    </>
}

export default ActivityLayout