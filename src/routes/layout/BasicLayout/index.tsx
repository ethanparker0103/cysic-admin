
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@arco-design/web-react/dist/css/arco.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/routes/layout/global/header";
import Footer from "@/routes/layout/global/footer";
import SignInModal from "@/routes/components/modal/signInModal";
import useAccountBootstrap from "@/hooks/useAccountBootstrap";
import ReserveModal from "@/routes/components/modal/reserveModal";
import StakeModal from "@/routes/components/modal/stakeModal";
import StatusModal from "@/routes/components/modal/statusModal";
import PurchaseNftModal from "@/routes/components/modal/purchaseNftModal";
import useCosmosUpdate from "@/hooks/cosmos/useCosmosUpdate";
import useCosmos from "@/models/_global/cosmos";
import RewardsDetailModal from "@/routes/components/modal/rewardsDetailModal";
import ConvertModal from "@/routes/components/modal/convertModal";
import ConvertHistoryModal from "@/routes/components/modal/convertHistoryModal";

export default function App({ children }: { children: React.ReactNode }) {
    useAccountBootstrap();
    useCosmosUpdate()

    const { balanceMap } = useCosmos()
    console.log('balanceMap', balanceMap)
    return (
        <>
            <ToastContainer theme="dark" />

            <NextUIProvider>
                <>
                    <SignInModal />
                    <ReserveModal />
                    <StakeModal />
                    <StatusModal />
                    <PurchaseNftModal />
                    <RewardsDetailModal />
                    <ConvertModal />
                    <ConvertHistoryModal />


                    <div className="relative">
                        <Header />
                        <main>{children}</main>
                    </div>
                    <Footer />
                </>
            </NextUIProvider>
        </>
    );
}
