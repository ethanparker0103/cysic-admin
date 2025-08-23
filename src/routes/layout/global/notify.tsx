import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { cn } from "@nextui-org/react";
import { useLocalStorageState } from "ahooks";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Notify = ({ className }: any) => {
    // const nav = useNavigate()
    // const { pathname } = useLocation();
    const [state, setState] = useLocalStorageState("nft-notify", {
        defaultValue: "0",
        listenStorageChange: true,
    });

    // const [modalState, setModalState] = useLocalStorageState("nft-notify-modal", {
    //     defaultValue: "0",
    //     listenStorageChange: true,
    // });


    // const [visible, setVisible] = useState(true)
    // const handleClose = () => {
    //     setModalState((old) => String(Number(old || "0") + 1));
    //     setVisible(false)
    // }

    // const handleClick = ()=>{
    //     handleClose()
    //     window.open("https://cube.cysicfoundation.org/cubeSale#purchase")
    // }
    return <>

        {/* {(Number(modalState) > 0) ? null : <Modal
            isDismissable
            isOpen={visible}
            onClose={handleClose}
            title=""
            className="max-w-[1100px]"
        >
            <div className="px-12 py-6 flex flex-col gap-6 items-center text-center">
                <video className="aspect-square w-[300px] bg-sub" muted loop autoPlay>
                    <source src="/nft-media/Tier5_Tesseract.mp4" />
                </video>
                <div className="unbounded-48-200">cysic nft is now live!</div>
                <div className="teachers-20-400 !normal-case">Cysic NFTs offer exclusive access to 2.5% of the total $CYS supply - with 20% unlocked instantly at TGE</div>
                <Button onClick={handleClick} type="light" className="w-[200px] h-[4.1875rem] p-0 teachers-16-400">purchase now</Button>
            </div>
        </Modal>
        } */}


        {(Number(state) > 99) ? null : (
            <>
                <a
                    href="https://cube.cysicfoundation.org/claimPortal"
                    target="_blank"
                    // onClick={() => {
                    //     setState((old) => String(Number(old || "0") + 1));
                    // }}
                >
                    <div
                        className={cn(
                            "mt-0 py-4 teachers-16-700 text-center bg-gradient-to-r from-[#19FFE0] to-[#7480F5] text-black",
                            className
                        )}
                    >
                        Cysic ComputeFi Cube is live, check your allowlist eligibility now!
                    </div>
                </a>
            </>
        )}
    </>
};