import Button from '@/components/Button';
import { cn, Input } from "@nextui-org/react";
import Media from '@/components/Media';
import { useState } from 'react';
import { getImageUrl, shortStr } from '@/utils/tools';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '@/components/Modal';
import { ModalBody, ModalHeader } from "@nextui-org/react";
import useModalState from '@/hooks/useModalState';
import { isMobile } from 'react-device-detect';

interface IPhase2EndQuery {
    "address": string
    "phase1TaskPoints": string
    "phase1ActivityPoints": string
    "phase2Cys": string
    "phase2Cgt": string
    "phase2Referral": number
    "phase2TaskCompleted": number
    "phase2VeAleo": string
    "phase2VeScr": string
}

const investors = [
    {
        name: "polycain",
        img: getImageUrl("@/assets/images/investors/POLYCHAIN.png"),
    },
    {
        name: "hashkey",
        img: getImageUrl("@/assets/images/investors/HASHKEY.png"),
    },
    {
        name: "OKX",
        img: getImageUrl("@/assets/images/investors/OKX.png"),
    },
    {
        name: "web3",
        img: getImageUrl("@/assets/images/investors/WEB3.png"),
    },
    {
        name: "snz",
        img: getImageUrl("@/assets/images/investors/SNZ.png"),
    },
    {
        name: "bitdigital",
        img: getImageUrl("@/assets/images/investors/BITDIGITAL.png"),
    },
    {
        name: "idg",
        img: getImageUrl("@/assets/images/investors/IDG.png"),
    },
    {
        name: "coinswitch",
        img: getImageUrl("@/assets/images/investors/COINSWITCH.png"),
    },
    {
        name: "a&t",
        img: getImageUrl("@/assets/images/investors/A&T.png"),
    },
];

const Circle = ({ className }: { className?: string }) => <svg width="340" height="204" viewBox="0 0 340 204" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} >
    <g filter="url(#filter0_f_4288_74553)">
        <circle cx="300" cy="-4" r="100" fill="#2D6366" />
    </g>
    <defs>
        <filter id="filter0_f_4288_74553" x="0" y="-304" width="600" height="600" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_4288_74553" />
        </filter>
    </defs>
</svg>



const Phase2Finalize = () => {
    const { visible, setVisible } = useModalState({ eventName: "modal_phase2query_visible" });
    const [searchValue, setSearchValue] = useState('')

    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState<boolean | undefined>(undefined)
    const [emailError, setEmailError] = useState('')

    const [phase2EndQuery, setPhase2EndQuery] = useState<IPhase2EndQuery | undefined>(undefined)

    const handleSearch = async () => {
        if (!searchValue) return;
        try {
            const res: { data: IPhase2EndQuery } = await axios.get('/api/v1/phase2End/query', {
                params: {
                    address: searchValue,
                }
            })

            setPhase2EndQuery(res?.data)
            dispatchEvent(new CustomEvent('modal_phase2query_visible', { detail: { visible: true } }))
        } catch (e: any) {
            toast.error(e?.response?.data?.msg || e?.message)
        }
    }

    const handleSubscribe = async () => {
        if (!email && !emailError) return;
        try {
            await axios.post('/api/v1/phase2End/subscribe', {
                email: email,
            })
            toast.success('Thank you for your subscribe')
        } catch (e: any) {
            console.log(e)
            toast.error(e?.response?.data?.msg || e?.message)
        }

    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (email && email.length > 2 && !emailRegex.test(email)) {
            setIsEmailValid(false);
            setEmailError('Please enter a valid email address');
            return 'Please enter a valid email address';
        }

        setIsEmailValid(true);
        setEmailError('');
        return true;
    }

    return (<>

        <div className="Montserrat text-[#fff] flex flex-col items-center justify-center mt-10 mb-10">
            <div className="brightness-[0.1] w-screen h-screen bg-[url(/src/assets/images/phase2Finalize/bg.png)] bg-no-repeat bg-cover top-0 left-0 right-0 bottom-0 fixed" />


            <div className='px-3 flex flex-col gap-8 relative z-[1]'>
                <div className='flex flex-col gap-4'>
                    <h1 className={cn(isMobile ? 'flex-col text-[30px] ' : 'flex-row text-[44px] ', ' flex items-center font-[500]')}>
                        <span className='Gemsbuck'>Phase II</span>
                        {isMobile ? null : <>&nbsp;</>}
                        <span className='Gemsbuck text-gradient'>Has Concluded.</span>
                    </h1>

                    <h3 className='max-w-[42rem] text-[#A1A1AA] text-[20px] Montserrat text-center'>
                        190,887 Cysors powered the Genesis Node and we have now snapshot all Phase II data.
                    </h3>
                </div>


                <div className='max-w-[45rem] '>

                    <Input
                        placeholder="Enter your reward address to check your previous rewards"
                        value={searchValue}
                        onValueChange={setSearchValue}
                        classNames={{
                            input: "flex-1 !pl-3 !pr-5 !py-[1.125rem]",
                            innerWrapper: cn(isMobile ? 'flex-col' : 'flex-row', "bg-[#000] Montserrat"),
                            inputWrapper: ['!rounded-[12px] overflow-hidden !h-fit !p-0 border border-[#00F0FF]']
                        }}
                        endContent={<Button needLoading onClick={handleSearch} className={cn(isMobile ? 'w-[98%] mx-1 my-1' : 'mx-1', "Gemsbuck cursor-pointer !h-fit bg-gradient text-[20px] font-[500] px-10")} >Search </Button>} />
                </div>
            </div>


            <div className='px-3 w-full flex justify-center'>
                <div className={cn(isMobile ? 'justify-center  mt-[2rem] px-2' : 'justify-between  mt-[4.5rem]', 'w-full backdrop-blur-md overflow-hidden border-[#213240] border rounded-[20px] relative z-[1] py-6 max-w-[63.75rem] bg-[#21324066] relative flex ')}>


                    {isMobile ? null : <Circle className='blur-[20px] -translate-y-1/2 rotate-90 rounded-full size-[13rem] ' />}



                    <div className='self-center flex flex-col gap-6 items-center w-full'>
                        <div className='flex flex-col gap-4 items-center text-center'>
                            <span className={cn(isMobile ? 'text-[16px]' : 'text-[24px]', 'Montserrat text-[#fff]  font-[500]')}>Join us in Phase III, coming in Q2 2025</span>
                            <span className='Montserrat text-[#A1A1AA] text-[16px] font-[400]'>Subscribe to receive news & updates.</span>
                        </div>


                        <div className='flex flex-col w-full'>
                            <Input
                                errorMessage={emailError}
                                isInvalid={!!emailError}
                                validate={validateEmail}
                                placeholder="Email Address"
                                value={email}
                                onValueChange={setEmail}
                                classNames={{
                                    input: "flex-1 !pl-3 !pr-5 !py-[1.125rem]",
                                    innerWrapper: "bg-[#000]",
                                    inputWrapper: ['!rounded-[12px] overflow-hidden !h-fit !p-0 border border-[#ffffff23]']
                                }}
                                endContent={<Button needLoading onClick={handleSubscribe} className="hover:bg-[#15171D] mr-1 cursor-pointer !h-fit !bg-[#15171D] px-5 text-[#fff]" >Subscribe </Button>} />
                            {/* {(!email || email.length <= 2) ? (<div className='h-6' />) : null} */}
                        </div>
                    </div>

                    {isMobile ? null : <Circle className='blur-[20px] -translate-y-1/2 translate-x-1/4 rotate-180 rounded-full size-[13rem] ' />}
                </div>
            </div>


            <div className='px-3 mt-8 flex flex-col gap-10 relative z-[1]'>
                <div><Media className='[&_svg]:!w-[48px] [&_svg]:!h-[48px] gap-8' /> </div>


                <div className={cn(
                    "flex flex-wrap justify-center items-center mx-auto max-width-[1200px] px-10 gap-12 opacity-40",
                )}>
                    {investors.map((i) => {
                        return (
                            <div key={i.name} className={cn(isMobile ? "h-[20px]" : "h-[24px]")}>
                                <img className="object-contain h-full" src={i.img} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        <Modal
            isOpen={visible}
            onClose={() => setVisible(false)}
            className="[&_button]:z-[2] max-w-[400px] border border-[#FFFFFF33]"
        >
            <>
                <ModalHeader>Previous Rewards</ModalHeader>
                <ModalBody>
                    <div className='flex flex-col gap-5 Montserrat'>
                        <div className='flex flex-col gap-2 text-center'>
                            <div className='text-[#fff] font-[500]'>{shortStr(phase2EndQuery?.address || '', 10)}</div>
                            <div className='max-w-[352px] text-[#737373] font-[400]'>Thanks for contributing to our previous testnets. All the rewards received are as follows:</div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className="flex flex-col gap-2">
                                <span className='Montserrat text-[#fff] text-sm  font-[400]'>Phase II</span>

                                <div className='flex flex-col gap-3 border-gradient p-4 rounded-[12px] bg-[#0B0C0F]'>
                                    <div className='flex items-start justify-between'>
                                        <div className='font-[400] text-[#A1A1AA]'>CYS</div>
                                        <div className='font-[500] text-[#fff]'>{phase2EndQuery?.phase2Cys}</div>
                                    </div>
                                    <div className='flex items-start justify-between'>
                                        <div className='font-[400] text-[#A1A1AA]'>CGT</div>
                                        <div className='font-[500] text-[#fff]'>{phase2EndQuery?.phase2Cgt}</div>
                                    </div>
                                    <div className='flex items-start justify-between'>
                                        <div className='font-[400] text-[#A1A1AA]'>Referrals</div>
                                        <div className='font-[500] text-[#fff]'>{phase2EndQuery?.phase2Referral}</div>
                                    </div>
                                    <div className='flex items-start justify-between'>
                                        <div className='font-[400] text-[#A1A1AA]'>Tasks completed</div>
                                        <div className='font-[500] text-[#fff]'>{phase2EndQuery?.phase2TaskCompleted}</div>
                                    </div>
                                    <div className='flex items-start justify-between'>
                                        <div className='font-[400] text-[#A1A1AA]'>veToken</div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex items-center gap-1 justify-end'>
                                                <div className='font-[500] text-[#fff]'>{phase2EndQuery?.phase2VeAleo}</div>
                                                <div className='text-[#A1A1AA]'>veAleo</div>
                                            </div>
                                            <div className='flex items-center gap-1 justify-end'>
                                                <div className='font-[500] text-[#fff]'>{phase2EndQuery?.phase2VeScr}</div>
                                                <div className='text-[#A1A1AA]'>veScroll</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className='Montserrat text-[#fff] text-sm  font-[400]'>Phase I</span>

                                <div className='flex flex-col gap-3 border-gradient p-4 rounded-[12px] bg-[#0B0C0F]'>
                                    <div className='flex items-start justify-between'>
                                        <div className='font-[400] text-[#A1A1AA]'>Task Points</div>
                                        <div className='font-[500] text-[#fff]'>{phase2EndQuery?.phase1TaskPoints}</div>
                                    </div>
                                    <div className='flex items-start justify-between'>
                                        <div className='font-[400] text-[#A1A1AA]'>Activity Points</div>
                                        <div className='font-[500] text-[#fff]'>{phase2EndQuery?.phase1ActivityPoints}</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <Button needLoading onClick={() => setVisible(false)} className="mb-4 Gemsbuck cursor-pointer !h-fit bg-gradient font-[500]" >Stay tuned for Phase III</Button>
                    </div>
                </ModalBody>

            </>
        </Modal>

    </>)
}

export default Phase2Finalize;