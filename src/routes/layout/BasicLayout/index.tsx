import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@arco-design/web-react/dist/css/arco.css";
import { cn, NextUIProvider } from "@nextui-org/react";
import Header from "@/routes/layout/global/header";
import Footer from "@/routes/layout/global/footer";
import { isMobile } from "react-device-detect";
import LandingBackground from "@/components/LandingBackground";
import useScrollToTop from "@/hooks/useScrollToTop";
import usePathQuery from "@/hooks/usePathQuery";


export default function App({ children }: { children: React.ReactNode }) {
    useScrollToTop();
    usePathQuery();

    return (
        <>
            <ToastContainer theme="dark" />

            <NextUIProvider>
                <>
                    <div className={cn("relative", isMobile && "max-w-screen overflow-x-hidden")}>
                        <Header />
                        <LandingBackground>{children}</LandingBackground>
                    </div>
                    <Footer />
                </>
            </NextUIProvider>
        </>
    );
}
