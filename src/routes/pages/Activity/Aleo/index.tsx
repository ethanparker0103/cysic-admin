import { SearchIcon } from "@/routes/components/Search";
import { getImageUrl } from "@/utils/tools";
import { Button, Input } from "@nextui-org/react";
import { useRequest } from "ahooks";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useSignMessage } from "wagmi";

const mock = {
    "cysic_address": "0xf761f43501ebfb391cd9d8b8d798f7bf48468d73",
    "aleo_address": "Example `personal_sign` message1",
    "signature": "0x75c5cdc34600ea73dc74bcffb14e126ddd1aaab8bcfdbd2f7173561e8a02c3a518d1eefc038109c99b9919838ddcccdeb22f6b8eccbace5ae39548e1bd59077d1b"
}

const Aleo = () => {
    const { signMessageAsync } = useSignMessage()
    const { address } = useAccount()
    const [value, setValue] = useState('')
    const [focus, setFocus] = useState(false)
    const handleFocus = () => {
        setFocus(true)
    }
    const handleBlur = () => {
        setFocus(false)
    }

    const { runAsync } = useRequest((params: any) => {
        // return mock1;
        return axios.post("/api/v1/check_aleo_whitelist", {
            ...params,
        });
    }, {
        manual: true,
        onSuccess(e) {
            const res = e?.data?.verify_result
            if (res == 0) {
                toast.success('Success')
            }
            if (res == 1) {
                toast.error('Invalid Signature')
            }
            if (res == 2) {
                toast.error('Invalid Address')
            }
            if (res == 3) {
                toast.error('Reject')
            }
        }
    });

    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        try {
            if (!value || !address) return;
            setLoading(true)
            const signature = await signMessageAsync({ message: value })

            await runAsync({
                cysic_address: address,
                aleo_address: value,
                signature
            })
        } catch (e: any) {
            toast.error(e?.message)
        } finally {
            setLoading(false)
        }

    }


    return (
        <>
            <style>
                {`
            .linear-content {
                background-image: linear-gradient(83.04deg, #6D428E 5.44%, #54F2FF 54.92%);
                color: transparent;
                -webkit-background-clip: text;
            }

            .gradient{
                background: linear-gradient(83.04deg, #6D428E 5.44%, #54F2FF 54.92%);
            }
            
            `}
            </style>

            <div className="relative" style={{ height: "calc(100vh - 88px)" }}>
                <div className="flex flex-col gap-[3.5rem] relative z-[2] pt-14">
                    <div className="flex flex-col gap-3 items-center">
                        <div className="flex items-center gap-4 text-[64px] font-[400]">
                            <div className="linear-content uppercase Gemsbuck">Cysic</div>
                            <div className="uppercase Gemsbuck">bind</div>
                        </div>
                        <div className="Gemsbuck text-[20px] font-[400] text-[#A1A1AA]">
                            Claim Cysic Whitelist Exclusive Reduced Pool Rate
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 max-w-[800px] mx-auto w-full">
                        <div className="text-lg font-[400] text-[#fff]">
                            Enter a Aleo address to bind
                        </div>
                        <div className={clsx("flex border border-[transparent] rounded-[12px] overflow-hidden", focus ? 'border-[#00F0FF]' : '')}>
                            <Input
                                value={value}
                                onValueChange={setValue}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                classNames={{
                                    input: "flex-1 !pl-3 !pr-5 !py-[1.125rem]",
                                    innerWrapper: "bg-transparent",
                                    inputWrapper: ['!rounded-[12px] overflow-hidden !h-fit !p-0 focus:border-[#00F0FF] border border-[transparent]']
                                }}
                                placeholder="Enter Aleo address (aleo1... format)"
                                endContent={<Button isLoading={loading} className=" cursor-pointer !h-fit gradient " onClick={handleClick} disabled={!value || !address}>
                                    <div className="!px-5 !py-[1.125rem] text-[20px] font-[500] text-[#000] Gemsbuck">Sign With Wallet</div>
                                </Button>}
                                startContent={
                                    <div className="pl-5">
                                        <SearchIcon className="text-[#FFFFFF73] mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                                    </div>

                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 z-[0]">
                    <img src={getImageUrl("@/assets/images/activity/bg.png")} />
                </div>
            </div>
        </>
    );
};
export default Aleo;
