import Button from "@/components/Button"
import { getReferralUrl, twitterLink } from "@/config";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer"
import { getImageUrl } from "@/utils/tools"
import clsx from "clsx"
import { ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const Card = ({ className, children }: any) => {
    return <div className={clsx("bg-[url(@/assets/images/card/bg.svg)] bg-cover", className)}>{children}</div>
}

const About = () => {
    const navigate = useNavigate()

    return <>
        <MainContainer className="gap-8" title={<div className="uppercase">Start <span className="text-gradient">earning</span> in 3 steps</div>}>
            <div className="flex gap-4">
                <Card className="flex-1 min-w-[354px] flex flex-col gap-6 py-10 px-6 rounded-[20px]">
                    <div className="text-[48px] text-gradient font-[400]">01</div>
                    <div className="flex flex-col gap-6">
                        <div className="text-[20px] font-bold">Genesis Code Access</div>
                        <div className="flex flex-col gap-1 text-[#D3D3D3] text-sm font-[400]">
                            <span>Genesis Node holders can now connect your wallet to explore Phase II and start earning your reward! </span>
                            <span>Looking for an invite code? Join our community to find and share yours!</span>
                        </div>
                    </div>
                    <Button onClick={() => window.open('https://discord.com/invite/cysic', '_blank')} type="solidGradient"><img src={getImageUrl('@/assets/images/media/discord.svg')} />Join Discord</Button>
                    <div className="text-sm text-[#737373] font-[400]">*Phase I whitelist holders can directly access Phase II for their early contributions!</div>
                </Card>
                <Card className="flex-1 min-w-[354px] flex flex-col gap-6 py-10 px-6 rounded-[20px]">
                    <div className="text-[48px] text-gradient font-[400]">02</div>
                    <div className="flex flex-col gap-6">
                        <div className="text-[20px] font-bold">Run Genesis Node</div>
                        <div className="flex flex-col gap-1 text-[#D3D3D3] text-sm font-[400]">
                            <span>Operate your Genesis Node as a Verifier or Prover to earn $CYS, $CGT, and VeCompute (VeScroll and VeAleo) tokens by contributing compute power.</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button onClick={() => navigate('/dashboard/verifier')} type="solidGradient">Become a Verifier<ArrowRight size={16} /></Button>
                        <Button onClick={() => navigate('/dashboard/prover')} type="solidGradient">Become a Prover<ArrowRight size={16} /></Button>
                    </div>
                    <div className="text-sm text-[#737373] font-[400]">*Certain hardware specifications are required for becoming a verifier or prover.</div>
                </Card>
                <Card className="flex-1 min-w-[354px] flex flex-col gap-6 py-10 px-6 rounded-[20px]">
                    <div className="text-[48px] text-gradient font-[400]">03</div>
                    <div className="flex flex-col gap-6">
                        <div className="text-[20px] font-bold">Earn</div>
                        <div className="flex flex-col gap-1 text-[#D3D3D3] text-sm font-[400]">
                            <span>Keep Genesis Node Running in the Background to Earn</span>
                            <span>Boost your reward by the referral program!</span>
                        </div>
                    </div>
                    <Button onClick={() => {
                        const link = twitterLink + `&url=${getReferralUrl()}`
                        window.open(link, '_blank')
                    }} type="solidGradient"><img src={getImageUrl('@/assets/images/media/twitter.svg')} />Tweet for more points</Button>
                    <div className="text-sm text-[#737373] font-[400]">*Phase I whitelist holders can directly access Phase II for their early contributions!</div>
                </Card>
            </div>

            <div className="bg-[#913FEF33] py-6 px-8 relative h-[12.5rem] rounded-[20px] overflow-hidden">
                <div className="flex flex-col gap-3 max-w-[32.5rem]">
                    <div className="Gemsbuck uppercase text-[32px] font-bold">Maximize your <span className="text-gradient">reward</span> with Cysic Network Triple Reward System</div>
                    <div className="text-[#A1A1AA] text-sm font-[300]">Our unique reward structure lets you contribute computational power and earn in three ways</div>
                </div>
                <img className="scale-[1.2] absolute h-full top-0 right-0" src={getImageUrl('@/assets/images/about/bg.png')} />
            </div>

            <div className="flex items-stretch gap-2">
                <div className="gradient-border rounded-[20px] flex-1">
                    <Card className="flex-1 flex flex-col gap-4 py-8 px-6 h-full">
                        <div className="text-[20px] font-bold text-[#fff]">Keep Your Node Active</div>
                        <img className="self-center w-full" src={getImageUrl('@/assets/images/about/item-1.png')} />
                        <div className="flex flex-col gap-2 text-sm text-[#D3D3D3]">
                            <span>Simply keep your Verifier Node running to earn $CYS and $CGT tokens by contributing to the verification for Cysic Network. </span>
                            <span>Running Prover Node to earn VeCompute tokens (VeScroll/VeAleo) by ZKPs generation for projects.</span>
                        </div>
                    </Card>
                </div>


                <div className="min-w-12 flex items-center justify-center gradient-border p-3 rounded-full self-center">
                    <ArrowRight size={20} />
                </div>

                <div className="gradient-border rounded-[20px] flex-1">
                    <Card className="flex-1 flex flex-col gap-4 py-8 px-6 h-full">
                        <div className="text-[20px] font-bold text-[#fff]">Stake and Delegate</div>
                        <img className="self-center w-full" src={getImageUrl('@/assets/images/about/item-2.png')} />
                        <div className="flex flex-col gap-2 text-sm text-[#D3D3D3]">
                            <span>Stake $CGT to earn $CYS rewards.</span>
                            <span>If you are a prover, you can also delegate your VeCompute tokens (VeScroll/VeAleo) to get rewards. </span>
                        </div>

                        <div className="text-[#00F0FF] text-xs font-[400] flex-1 items-end flex">*Read more on our Whitepaper.</div>
                    </Card>
                </div>

                <div className="min-w-12 flex items-center justify-center gradient-border p-3 rounded-full self-center">
                    <ArrowRight size={20} />
                </div>

                <div className="gradient-border rounded-[20px] flex-1">
                    <Card className="flex-1 flex flex-col gap-4 py-8 px-6 h-full">
                        <div className="text-[20px] font-bold text-[#fff]">Boost with Referrals</div>
                        <img className="self-center w-full" src={getImageUrl('@/assets/images/about/item-3.png')} />
                        <div className="flex flex-col gap-2 text-sm text-[#D3D3D3]">
                            <span>Simply keep your Verifier Node running to earn $CYS and $CGT tokens by contributing to the verification for Cysic Network. </span>
                            <span>Running Prover Node to earn VeCompute tokens (VeScroll/VeAleo) by ZKPs generation for projects.</span>
                        </div>

                        <div className="text-[#00F0FF] text-xs font-[400] flex-1 items-end flex">*Read more on our Whitepaper.</div>
                    </Card>
                </div>

            </div>

        </MainContainer>
    </>
}
export default About