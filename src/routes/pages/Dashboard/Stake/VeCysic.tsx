import Button from "@/components/Button"
import useCosmosBalance from "@/hooks/cosmos/useCosmosBalance"
import useModalState from "@/hooks/useModalState"
import useCosmos from "@/models/_global/cosmos"
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer"
import ActiveValidatorDetail from "@/routes/pages/Dashboard/Stake/ActiveValidatorDetail"
import StakeModal from "@/routes/pages/Dashboard/Stake/Modal/stake"
import MyValidatorDetail from "@/routes/pages/Dashboard/Stake/MyValidatorDetail"
import ValidatorDesc from "@/routes/pages/Dashboard/Stake/ValidatorDesc"
import { getImageUrl } from "@/utils/tools"

const token = 'veCysic'

const VeCysic = () => {
    const { balanceMap } = useCosmos()
    const { dispatch }: any = useModalState({ eventName: 'modal_stake_visible' })

    return <MainContainer title="Stake veCYSIC">
        <>
            <div className="flex items-center gap-4 flex-wrap">
                <div className="gap-10 min-h-[8.375rem] flex-1 flex justify-between px-6 py-8 rounded-[16px] bg-sub-gradient border border-[#192E33] relative">
                    <div className="flex flex-col gap-4 justify-between">
                        <img className="size-10" src={getImageUrl('@/assets/images/stake/lock.svg')}/>
                        <div className="flex flex-col gap-2 text-[#A3A3A3] text-sm">
                            <span className="">Staking Amount</span>
                            <div className="flex gap-1 items-center">
                                <span className="text-[24px] text-[#fff]">0</span>
                                <span className="">{token}</span>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col gap-4 justify-between">
                        <img className="size-10" src={getImageUrl('@/assets/images/stake/wallet.svg')}/>
                        <div className="flex flex-col gap-2 text-[#A3A3A3] text-sm">
                            <span className="">Unstaking Amount</span>
                            <div className="flex gap-1 items-center">
                                <span className="text-[24px] text-[#fff]">0</span>
                                <span className="">{token}</span>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col gap-4 justify-between">
                        <img className="size-10" src={getImageUrl('@/assets/images/stake/star.svg')}/>
                        <div className="flex flex-col gap-2 text-[#A3A3A3] text-sm">
                            <span className="">APR</span>
                            <div className="flex gap-2 items-center">
                                <span className="text-[24px] text-[#fff] font-[600]">12.34%</span>
                                <Button type="dark" className="h-[1.75rem] min-h-fit" onClick={()=>dispatch({visible: true})}>
                                    <span className="text-sm text-[#00F0FF]">Stake</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="min-h-[8.375rem] flex-1 flex justify-between px-6 py-8 rounded-[16px] bg-sub-gradient gradient-sub-border relative">
                    <div className="flex flex-col gap-6 justify-between">
                        <div className="flex flex-col gap-2 text-[#A3A3A3] text-sm">
                            <span className="">Claim Rewards</span>
                            <div className="flex gap-1">
                                <span className="text-[#fff] text-[24px]">0</span>
                                <span>{token}</span>
                            </div>
                        </div>
                        <Button type="dark" className="h-[1.75rem] min-h-fit"><span className="text-sm text-[#00F0FF]">Claim All</span></Button>
                    </div>

                    <div className="size-[7.75rem]">
                        <img className="w-full" src={getImageUrl('@/assets/images/stake/token-s.png')}/>
                    </div>

                </div>
            </div>

            <ValidatorDesc />

            <MyValidatorDetail />
            <ActiveValidatorDetail />

            <StakeModal />
        </>
    </MainContainer>
}

export default VeCysic