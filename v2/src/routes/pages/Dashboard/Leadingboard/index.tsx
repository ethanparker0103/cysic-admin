import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import Detail from "@/routes/pages/Dashboard/Leadingboard/Detail";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

const Leadingboard = () => {
    return (
        <MainContainer title="Leader board">
            <>
                <div className={clsx(isMobile ? "" : "p-4", "shadow-[0px_4px_0px_0px_#000000] border-[#000] border rounded-[14px]")}>
                    <Detail />
                </div>
            </>
        </MainContainer>
    );
};

export default Leadingboard;
