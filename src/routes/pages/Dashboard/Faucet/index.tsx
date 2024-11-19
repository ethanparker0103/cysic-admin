import Button from "@/components/Button"
import Input from "@/components/Input"
import useCosmos from "@/models/_global/cosmos"
import { getImageUrl } from "@/utils/tools"
import { useRequest } from "ahooks"
import axios from "axios"
import { toast } from "react-toastify"

const Faucet = () => {
    const { address } = useCosmos()
    const { run: handleClaim, loading } = useRequest(() => address ? axios.get(`/api/v1/myPage/faucet/${address}`) : Promise.reject(null), { manual: true, 
        onSuccess(){
            toast.success('Success!')
        },
        onError(e: any){
            toast.error(e?.msg || e?.message || 'Failed!')
        }
     })
    return <div className="flex flex-col items-center gap-8 py-8">

        <img src={getImageUrl('@/assets/images/_global/logo_content.svg')} />
        <div className="max-w-[480px] mx-auto px-10 py-8 flex flex-col gap-10 rounded-[20px] border border-[#FFFFFF1F] bg-[#000]">

            <div className="flex flex-col gap-2">
                <span className="text-[24px] text-[#fff] font-bold">Claim Cysic Gas per 24 Hours</span>
                <span className="text-[#A3A3A3]">Cysic gas per 24 hours</span>
                <div className="py-6 text-[#A3A3A3] text-sm flex items-center justify-center gap-1">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1500_28453)">
                            <path d="M8.31572 2.33633C9.6312 2.29338 10.9206 2.70968 11.9626 3.51377C13.0046 4.31786 13.7342 5.45959 14.0261 6.74297C14.3181 8.02636 14.1542 9.37135 13.5626 10.5471C13.4385 10.7937 13.5378 11.0943 13.7845 11.2185C14.0312 11.3426 14.3318 11.2432 14.4559 10.9966C15.1519 9.61335 15.3447 8.03101 15.0012 6.52115C14.6577 5.01128 13.7994 3.66807 12.5735 2.72209C11.3476 1.7761 9.8307 1.28633 8.28309 1.33687C6.73548 1.3874 5.25372 1.97508 4.09217 2.99902C2.93062 4.02296 2.16172 5.4193 1.91746 6.94836C1.67321 8.47741 1.96883 10.0438 2.75358 11.3787C3.53833 12.7135 4.76326 13.7336 6.21811 14.2637C7.67297 14.7939 9.26699 14.8011 10.7266 14.2841C10.9869 14.1919 11.1231 13.9061 11.0309 13.6458C10.9387 13.3855 10.653 13.2493 10.3927 13.3415C9.15204 13.7809 7.79712 13.7748 6.56049 13.3242C5.32387 12.8735 4.28268 12.0065 3.61564 10.8719C2.9486 9.73723 2.69732 8.4058 2.90494 7.1061C3.11256 5.80641 3.76612 4.61951 4.75344 3.74916C5.74076 2.87881 7.00025 2.37929 8.31572 2.33633Z" fill="#A3A3A3" />
                            <path d="M9.00065 5.16665C9.00065 4.8905 8.77679 4.66665 8.50065 4.66665C8.22451 4.66665 8.00065 4.8905 8.00065 5.16665V7.79287L5.81376 9.97976C5.6185 10.175 5.6185 10.4916 5.81376 10.6869C6.00903 10.8821 6.32561 10.8821 6.52087 10.6869L8.8542 8.35353C8.94797 8.25976 9.00065 8.13259 9.00065 7.99998V5.16665Z" fill="#A3A3A3" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1500_28453">
                                <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                            </clipPath>
                        </defs>
                    </svg>

                    <span>Daily update at 2PM UTC</span></div>

                <div>
                    <span className="text-[#9C9C9C]">Wallet Address</span>
                    <Input type="solid" className="text-[#626365]" disabled value={address || '-'} />
                </div>

            </div>
            <Button loading={loading} onClick={handleClaim}>Claim</Button>
        </div>
    </div>
}
export default Faucet