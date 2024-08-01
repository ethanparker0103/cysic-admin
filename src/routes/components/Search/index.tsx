import Spinner from "@/components/spinner";
import { Input } from "@nextui-org/input";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig({
    className: 'w-fit px-4 py-2 rounded-none scale-90', theme: 'dark', position: 'top-center' });

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
            const res = await axios(`/api/v1/verifier/byReward/${addr}`)
            const id = res?.data?.ID
            if(id){
                navigate(`/dashboard/verifier/${id}`)
            }
        } catch (e: any) {
            console.log('error', e)
            toast(
                <div className="flex items-center gap-1">
                    <CloseIcon className="size-4"/>
                    <span>{e?.msg || e?.message}</span>
                </div>
            )
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="w-[25rem]">
            <Input
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
                        "bg-[#FFFFFF1F]",
                        "dark:bg-[#FFFFFF1F]",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focus=true]:bg-default-200/50",
                        "dark:group-data-[focus=true]:bg-default/60",
                        "!cursor-text",
                    ],
                }}
                placeholder="Search Verifier By Reward Address"
                endContent={
                    loading ? (<Spinner />) : (<div className="cursor-pointer" onClick={handleSearch}>
                        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    </div>)

                }
            />
        </div>
    );
};

export default Search;
