
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@arco-design/web-react/dist/css/arco.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/routes/layout/global/header";
import Footer from "@/routes/layout/global/footer";

export default function App({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ToastContainer theme="dark" />

            <NextUIProvider>
                <>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </>
            </NextUIProvider>
        </>
    );
}
