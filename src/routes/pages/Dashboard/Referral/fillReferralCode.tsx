import ConnectButton from "@/components/connectButton";
import DigitInputs from "@/components/DigitInputs";
import { getImageUrl } from "@/utils/tools";
import { useRequest } from "ahooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAccount from "@/hooks/useAccount";

const investors = [
    {
        name: 'polycain',
        img: getImageUrl('@/assets/images/investors/POLYCHAIN.png')
    },
    {
        name: 'hashkey',
        img: getImageUrl('@/assets/images/investors/HASHKEY.png')
    },
    {
        name: 'OKX',
        img: getImageUrl('@/assets/images/investors/OKX.png')
    },
    {
        name: 'abcde',
        img: getImageUrl('@/assets/images/investors/ABCDE.png')
    },
    {
        name: 'matrix',
        img: getImageUrl('@/assets/images/investors/MATRIX.png')
    },
    {
        name: 'web3',
        img: getImageUrl('@/assets/images/investors/WEB3.png')
    },
    {
        name: 'snz',
        img: getImageUrl('@/assets/images/investors/SNZ.png')
    },
    {
        name: 'bitdigital',
        img: getImageUrl('@/assets/images/investors/BITDIGITAL.png')
    },
    {
        name: 'idg',
        img: getImageUrl('@/assets/images/investors/IDG.png')
    },
    {
        name: 'coinswitch',
        img: getImageUrl('@/assets/images/investors/COINSWITCH.png')
    },
    {
        name: 'a&t',
        img: getImageUrl('@/assets/images/investors/A&T.png')
    },
]

const FillReferralCode = () => {
    const navigate = useNavigate()
    const { address }= useAccount()
    const [searchParams, setSearchhParams] = useSearchParams()
    const [tempParams, setTempParams] = useState<any>()
    const codeFromUrl = searchParams.get('code')
    const [value, setValue] = useState<string>('')

    const handleValueChange = (v) => {
        setValue(v)
    };

    useEffect(()=>{
        if(codeFromUrl){
            setTempParams(codeFromUrl)
            handleValueChange(codeFromUrl)
            setSearchhParams({})
        }
    }, [codeFromUrl])

    // 10.6 绑定邀请码
    useRequest(() => axios.put(`/api/v1/referral/bind/${value}/${address}`), {
        ready: !!value && value?.length == 5 && !!address,
        refreshDeps: [value, address],
        debounceWait: 300,
        onSuccess(e){
            toast.success('Bind SuccessFully')
            navigate('/dashboard/referral')
        },
        onError(e){
            toast.error(e?.message)
        }
    })

    return (
        <div className="flex flex-col gap-12 items-center pt-10">
            <div className="flex flex-col gap-20">
                <div className="text-[40px] font-[500] text-center">
                    ENTER YOUR <span className="text-gradient">INVITE CODE</span> TO JOIN
                </div>
                <div className="flex flex-col gap-8 items-center text-base w-fit mx-auto">
                    <DigitInputs n={5} value={value} onValueChange={handleValueChange} />
                    {
                        address ? null : <ConnectButton />
                    }
                    {/* {address ? <DigitInputs n={5} value={value} onValueChange={handleValueChange} /> : <ConnectButton />} */}
                    
                    <div className="w-full flex flex-col gap-4 items-center text-[#A3A3A3]">
                        <div className="text-sm flex items-center gap-2 w-full">
                            <div className="h-px bg-[#FFFFFF1F] w-full"/>
                            <span>OR</span>
                            <div className="h-px bg-[#FFFFFF1F] w-full"/>
                        </div>
                        <div>Already Joined?</div>
                        <div className="text-[#fff] cursor-pointer">Switch to another Address</div>

                        <div className="text-sm flex items-center cursor-pointer">
                            Read about cysic{" "}
                            <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.614 10.5647C10.9361 10.5647 11.1973 10.3035 11.1973 9.98138L11.1971 4.20654C11.1971 3.88666 10.9395 3.62646 10.6196 3.62325L4.78645 3.56476C4.4643 3.56153 4.20053 3.82006 4.19729 4.14221C4.19406 4.46436 4.4526 4.72813 4.77475 4.73137L9.21942 4.77594L4.01411 9.98124C3.78631 10.209 3.78631 10.5784 4.01411 10.8062C4.24192 11.034 4.61127 11.034 4.83907 10.8062L10.0305 5.6148L10.0306 9.98141C10.0306 10.3036 10.2918 10.5647 10.614 10.5647Z"
                                    fill="#A3A3A3"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-12 pt-6 items-center">
                <div className="flex items-center gap-3">
                    <svg width="121" height="1" viewBox="0 0 121 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.5" y1="0.5" x2="120.5" y2="0.5" stroke="url(#paint0_linear_1495_24239)" />
                        <defs>
                            <linearGradient id="paint0_linear_1495_24239" x1="0.5" y1="1.5" x2="120.5" y2="1.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00F0FF" stopOpacity="0" />
                                <stop offset="1" stopColor="#00F0FF" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="text-[40px] uppercase">Investors</div>
                    <svg className="rotate-180" width="121" height="1" viewBox="0 0 121 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.5" y1="0.5" x2="120.5" y2="0.5" stroke="url(#paint0_linear_1495_24239)" />
                        <defs>
                            <linearGradient id="paint0_linear_1495_24239" x1="0.5" y1="1.5" x2="120.5" y2="1.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00F0FF" stopOpacity="0" />
                                <stop offset="1" stopColor="#00F0FF" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-10 w-full max-w-[1200px] mx-auto">
                    {
                        investors.map((i,index)=>{
                            return <div key={i.name} className="w-[140px]">
                                <img className="w-full" src={i.img}/>
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
    );
};
export default FillReferralCode;
