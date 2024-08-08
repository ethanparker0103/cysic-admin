import Image from "@/components/Image";
import Spinner from "@/components/spinner";
import { getImageUrl } from "@/utils/tools";
import { Input } from "@nextui-org/input";
import { useDebounce, useDebounceEffect } from "ahooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

const formatArray = (v: any) => {
    return Array.isArray(v) ? v : [v]
}

toastConfig({
    className: 'w-fit px-4 py-2 rounded-none scale-90', theme: 'dark', position: 'top-center'
});

const CloseIcon = (props: any) => {
    return <svg width="512" height="512" stroke="currentColor" fill="rgba(255,0,0)" strokeWidth="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422s-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256s17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path><path d="M360 330.9L330.9 360 256 285.1 181.1 360 152 330.9l74.9-74.9-74.9-74.9 29.1-29.1 74.9 74.9 74.9-74.9 29.1 29.1-74.9 74.9z"></path></svg>
}

export const SearchIcon = (props: any) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
    >
        <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
        <path
            d="M22 22L20 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
    </svg>
);

const Search = () => {
    const [searchContainerVisible_, setSearchContainerVisible] = useState(false)
    const [searchInfo, setSearchInfo] = useState<any>({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [addr, setAddr] = useState<string>('')
    const handleKeyUp = (e: any) => {
        const isEnter = e?.keyCode == 13
        if (isEnter) {
            handleSearch()
        }
    }
    const handleSearch = async () => {
        if (!addr || loading) return;
        try {
            setLoading(true)
            const res = await axios(`/api/v1/dashboard/queryByReward/${addr}`)
            console.log('res', res?.data)
            const data = res?.data;

            const project = formatArray(data?.project)?.filter(i => i?.worker)
            const provider = formatArray(data?.provider)?.filter(i => i?.prover)
            const verifier = formatArray(data?.verifier)?.filter(i => i?.verifier)

            setSearchInfo({
                project,
                provider,
                verifier
            })

            // const id = res?.data?.ID
            // if(id){
            //     navigate(`/dashboard/verifier/${id}`)
            // }
        } catch (e: any) {
            console.log('error', e)
            toast(
                <div className="flex items-center gap-1">
                    <CloseIcon className="size-4" />
                    <span>{e?.msg || e?.message}</span>
                </div>
            )
        } finally {
            setLoading(false)
        }

    };

    const searchContainerVisible = useDebounce(searchContainerVisible_, {
        wait: 300
    })
    const debouncedAddr = useDebounce(addr, {
        wait: 300
    })
    useEffect(() => {
        if (debouncedAddr) {
            handleSearch()
        }
    }, [debouncedAddr])

    return (
        <div className="max-w-[32rem] flex-1 relative">
            <Input
                onFocus={() => setSearchContainerVisible(true)}
                onBlur={() => setSearchContainerVisible(false)}
                value={addr}
                onValueChange={setAddr}
                onKeyUp={handleKeyUp}
                radius="sm"
                classNames={{
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "border border-[#FFFFFF33]",
                        "bg-[#FFFFFF0D]",
                        "dark:bg-[#FFFFFF0D]",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focus=true]:border-[#00F0FF]",
                        "dark:group-data-[focus=true]:border-[#00F0FF]",
                        "!cursor-text",
                    ],
                }}
                placeholder="Search Verifier By Reward Address"
                startContent={
                    loading ? (<Spinner />) : (<div className="cursor-pointer" onClick={handleSearch}>
                        <SearchIcon className="text-[#FFFFFF73] mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    </div>)

                }
            />
            {
                searchContainerVisible ? <div className="overflow-auto p-4 absolute top-10 w-full h-[50vh] bg-[#10141A] rounded-b-[8px] flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        <div className="text-xs text-[#fff]">Prover</div>
                        <div>{searchInfo?.provider?.length ? (<div>
                            {searchInfo?.provider?.map((i, index) => {
                                return <div className="flex items-center justify-between cursor-pointer" key={index}  onClick={()=>{
                                    navigate(`/dashboard/provider/${i?.ID}`)
                                    setAddr('')
                                }}>
                                    <div className="flex items-center gap-2" >
                                        <Image
                                            className="size-5 rounded-full"
                                            src={i?.logo}
                                        />
                                        <div className="flex flex-col gap-1">
                                            <div className="text-sm">{i?.name}</div>
                                            <div className="text-xs">{i?.prover}</div>
                                        </div>
                                    </div>
                                    <Image
                                        className="size-3"
                                        src={getImageUrl("@/assets/images/dashboard/share.svg")}
                                    />
                                </div>
                            })}
                        </div>) : (<span className="text-sm text-[#A3A3A3]">No Data</span> )}</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-xs text-[#fff]">Verifier</div>
                        <div>{searchInfo?.verifier?.length ? (<div>
                            {searchInfo?.verifier?.map((i, index) => {
                                return <div className="flex items-center justify-between cursor-pointer" key={index} onClick={()=>{
                                    navigate(`/dashboard/verifier/${i?.ID}`)
                                    setAddr('')
                                }}>
                                    <div className="flex items-center gap-2" >
                                        <Image
                                            className="size-5 rounded-full"
                                            src={i?.logo}
                                        />
                                        <div className="flex flex-col gap-1">
                                            <div className="text-sm">{i?.name}</div>
                                            <div className="text-xs">{i?.verifier}</div>
                                        </div>
                                    </div>
                                    <Image
                                        className="size-3"
                                        src={getImageUrl("@/assets/images/dashboard/share.svg")}
                                    />
                                </div>
                            })}
                        </div>) : (<span className="text-sm text-[#A3A3A3]">No Data</span>)}</div>
                    </div>
                </div> : null
            }
        </div>
    );
};

export default Search;
