import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@arco-design/web-react/dist/css/arco.css";
import { cn, NextUIProvider } from "@nextui-org/react";
import Header from "@/routes/layout/global/header";
import Footer from "@/routes/layout/global/footer";
import SignInModal from "@/routes/components/modal/signInModal";
import useAccountBootstrap from "@/hooks/useAccountBootstrap";
import ReserveModal from "@/routes/components/modal/reserveModal";
import StakeModal from "@/routes/components/modal/stakeModal";
import StatusModal from "@/routes/components/modal/statusModal";
import PurchaseNftModal from "@/routes/components/modal/purchaseNftModal";
import useCosmosUpdate from "@/hooks/cosmos/useCosmosUpdate";
import RewardsDetailModal from "@/routes/components/modal/rewardsDetailModal";
import ConvertModal from "@/routes/components/modal/convertModal";
import ConvertHistoryModal from "@/routes/components/modal/convertHistoryModal";
import { isMobile } from "react-device-detect";
import LandingBackground from "@/components/LandingBackground";
import MultiplierModal from "@/routes/components/modal/multiplierModal";
import VoucherModal from "@/routes/components/modal/vocherModal";
import CheckKeplrModal from "@/routes/components/modal/checkKeplrModal";
import HowInviteWorkModal from "@/routes/components/modal/howInviteWorkModal";
import FaucetModal from "@/routes/components/modal/faucetModal";
import useBootstrap from "@/hooks/useBootstrap";
import PrivyAccountMismatchModal from "@/routes/components/modal/privyAccountMismatchModal";
import useScrollToTop from "@/hooks/useScrollToTop";

export default function App({ children }: { children: React.ReactNode }) {
    useAccountBootstrap();
    useCosmosUpdate()
    useBootstrap()
    useScrollToTop();

    return (
        <>
            <ToastContainer theme="dark" />

            <NextUIProvider>
                <>
                    <FaucetModal />
                    <PrivyAccountMismatchModal />
                    <VoucherModal />
                    <MultiplierModal />
                    <SignInModal />
                    <ReserveModal />
                    <StakeModal />
                    <StatusModal />
                    <PurchaseNftModal />
                    <RewardsDetailModal />
                    <ConvertModal />
                    <ConvertHistoryModal />
                    <CheckKeplrModal />
                    <HowInviteWorkModal />


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
