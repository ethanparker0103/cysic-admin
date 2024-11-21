import Ad from "@/components/ad";
import Tutorial from "@/components/tutorial";
import VerifierStatus from "@/routes/pages/Dashboard/Verifier/VerifierStatus";
import VerifierTable from "@/routes/pages/Dashboard/Verifier/table";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

const Verifier = () => {

    return (
        <MainContainer title="Verifier">
            <>
                <Ad type="verifier"/>
                <VerifierStatus />
                <Tutorial />
                <div className={clsx(isMobile ? "" : "p-4", "shadow-[0px_4px_0px_0px_#000000] border-[#000] border rounded-[14px]")}>
                    <VerifierTable />
                </div>
            </>
        </MainContainer>
    );
};

export default Verifier