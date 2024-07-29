import ComputilityTable from "@/routes/pages/Dashboard/Computility/table";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

const Computility = () => {
    return (
        <MainContainer title="Prover">
            <>
                <div className={clsx(isMobile ? "" : "p-4", "shadow-[0px_4px_0px_0px_#000000] border-[#000] border rounded-[14px]")}>
                    <ComputilityTable />
                </div>
            </>
        </MainContainer>
    );
};

export default Computility