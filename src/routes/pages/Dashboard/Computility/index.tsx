import { IconArrowDown } from "@/components/Icon";
import MainCard from "@/components/MainCard";
import ComputilityTable from "@/routes/pages/Dashboard/Computility/table";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import { getImageUrl } from "@/utils/tools";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

const Status = ({ className }: any) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...className}>
    <circle cx="6" cy="6" r="6" fill="currentColor" fillOpacity="0.2" />
    <circle cx="6" cy="6" r="3" fill="currentColor" />
</svg>

const StatusWithText = ({ status }: { status: undefined | boolean }) => {
    switch (status?.toString?.()) {
        case 'true':
            return <div className="flex items-center gap-1 text-[#11D473]">
                <Status className="" />
                <span>Prover Active</span>
            </div>
        case 'false':
            return <div className="flex items-center gap-1 text-[#FF401A]">
                <Status className="" />
                <span>Prover Inactive</span>
            </div>
        default:
            return <div className="flex items-center gap-1 text-[#A3A3A3]">
            <Status className="" />
            <span>-</span>
        </div>
    }
}


const Computility = () => {
    return (
        <MainContainer title="Prover">
            <>
                {/* <div className="flex gap-4">

                    <MainCard >
                        <div className="relative h-full">
                            <div className="flex flex-col gap-6 justify-between h-full">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-1">
                                        <img className="size-7" src={getImageUrl('@/assets/images/tokens/veScroll.svg')} />
                                        <span className="text-[24px] font-[500]">Scroll Prover</span>
                                    </div>
                                    <span className="text-sm text-[#A3A3A3] font-[400]">For Scroll Prover, please first click here to register on the Cysic Network as a Prover. Then, please click here and follow these steps to complete the Prover test. *Scroll Provers need to fully complete these two steps to unlock subsequent rewards.</span>

                                </div>

                                <a href="/"><div className="text-sm flex justify-end items-center gap-1 font-[400]"><span>Become a Scroll Prover</span> <IconArrowDown className="-rotate-90" /></div></a>
                            </div>

                            <div className="text-sm font-[400] flex items-center gap-4 absolute top-0 right-0">
                                <div className="flex items-center gap-1 text-[#fff]">
                                    <Status className="" />
                                    <span>已注册</span>
                                </div>

                                <StatusWithText status/>
                            </div>
                        </div>
                    </MainCard>


                    <MainCard >
                        <div className="relative h-full">
                            <div className="flex flex-col gap-6 justify-between h-full">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-1">
                                        <img className="size-7" src={getImageUrl('@/assets/images/tokens/veAleo.svg')} />
                                        <span className="text-[24px] font-[500]">Aleo Prover</span>
                                    </div>
                                    <span className="text-sm text-[#A3A3A3] font-[400]">For Aleo Prover, please click here and follow these steps to complete the Prover test. Make sure to click here to register on the Cysic Network as a Prover to unlock more rewards. *Aleo Provers who are already running but have not yet registered on the Cysic Network will receive the same rewards, and after fully registering, more CYS rewards will be unlocked.</span>

                                </div>

                                <a href="/"><div className="text-sm flex justify-end items-center gap-1 font-[400]"><span>Become a Aleo Prover</span> <IconArrowDown className="-rotate-90" /></div></a>
                            </div>

                            <div className="text-sm font-[400] flex items-center gap-4 absolute top-0 right-0">
                                <div className="flex items-center gap-1 text-[#fff]">
                                    <Status className="" />
                                    <span>已注册</span>
                                </div>

                                <StatusWithText status={false}/>
                            </div>
                        </div>
                    </MainCard>
                </div> */}
                <div className={clsx(isMobile ? "" : "p-4", "shadow-[0px_4px_0px_0px_#000000] border-[#000] border rounded-[14px]")}>
                    <ComputilityTable />
                </div>
            </>
        </MainContainer>
    );
};

export default Computility