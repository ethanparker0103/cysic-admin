import { getImageUrl } from "@/utils/tools";
import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useMatches, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@arco-design/web-react/dist/css/arco.css";
import ConnectButton from "@/components/connectButton";
import DoubleconfirmModal from "@/components/DoubleconfirmModal";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { dashboardNavs } from "@/routes/layout/DashboardLayout";
import { Navbar, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NextUIProvider } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Search from "@/routes/components/Search";

export default function App() {
    const { t } = useTranslation();
    const matches = useMatches();
    const navigate = useNavigate();
    const lastPathname = JSON.parse(JSON.stringify(matches))?.reverse()?.[0]
        ?.pathname;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const { setState } = useStatic()
    // const { address } = useAccount()

    // useEffect(()=>{
    //     setState(address)
    // }, [address])
    return (
        <>
            <ToastContainer theme="dark" />
            <DoubleconfirmModal />

            <NextUIProvider>
                <div className="bg-[#000] text-[#fff] h-screen overflow-hidden  bg-white flex">
                    <BrowserView
                        className="px-[5rem] flex flex-col gap-10 items-center justify-center flex-[4] relative"
                        style={{
                            background: `url(/bg.svg)`,
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}
                    >
                        <img
                            className="absolute z-1 top-[5rem] left-[5rem]"
                            src={getImageUrl("@/assets/images/_global/logo_content.svg")}
                        />
                        <div className="!text-[#fff] relative z-1 flex text-xl leading-none flex flex-col gap-10">
                            <div className="text-[66px] flex flex-col">
                                <div className="Gemsbuck text-[#FFF]">Cysic</div>
                                <div className="Gemsbuck text-[#FFFFFF99]">Network</div>
                            </div>

                            <div className="text-[#FFFFFF99] text-base">
                                Cysic is a real-time ZK Proof Generation Layer with
                                State-of-the-Art hardware and prover network. We are hyperscaling
                                the ZK revolution. Our aim is to deliver ZK Proofs in the fastest,
                                easiest, cheapest and most decentralised way.
                            </div>
                        </div>
                    </BrowserView>


                    <MobileView className="z-[100] bg-[#000] border-b border-[#FFFFFF1F] w-full fixed top-0 p-3 flex items-center justify-between">
                        <img
                            className="w-8"
                            src={getImageUrl("@/assets/images/_global/logo.svg")}
                        />
                        <div className="flex items-center gap-2">
                            <ConnectButton className="!py-0 !min-h-10 !h-10 [&>span]:!text-xs !px-4" />
                        </div>
                    </MobileView>

                    <div className="flex-[6] overflow-auto flex flex-col">
                        <BrowserView className="self-end py-2 px-2 pr-[5rem] flex items-center justify-end w-full gap-10">
                            {/* <div className="flex-1 pl-4 w-full"><Search /></div> */}
                            <ConnectButton />
                        </BrowserView>
                        <Suspense>
                            <div className={clsx(isMobile ? "pt-20 px-4 pb-10" : "pt-[2rem] pb-[4rem] px-[5rem] ", "flex flex-col items-center gap-[5rem]")}>
                                <Outlet />
                            </div>
                            
                        </Suspense>
                    </div>
                </div>
            </NextUIProvider>
        </>
    );
}
