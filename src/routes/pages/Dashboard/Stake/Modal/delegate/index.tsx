import Button from "@/components/Button"
import useModalState from "@/hooks/useModalState"
import { Modal, ModalContent, ModalBody, ModalHeader, Slider, Select, SelectItem } from "@nextui-org/react"
import React, { useState } from "react"
import { getImageUrl } from "@/utils/tools"
import Input from "@/components/Input"
import { cysicStCoin } from "@/config"
import BigNumber from "bignumber.js"

const selections = [{
    value: 'veAleo',
    icon: getImageUrl('@/assets/images/tokens/veAleo.svg'),
    name: 'veAleo'
}, {
    value: 'veScroll',
    icon: getImageUrl('@/assets/images/tokens/veScroll.svg'),
    name: 'veScroll'
},]

const maxAmount = 1000
const DelegateModal = () => {
    const { visible, setVisible }: any = useModalState({ eventName: 'modal_delegate_visible' })

    const [delegate, setDelegate] = useState<any>()
    const [delegateAmount, setDelegateAmount] = useState<any>()
    const [slider, setSlider] = useState<any>()
    return <Modal isOpen={visible} onOpenChange={setVisible}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader />
                    <ModalBody>
                        <div className="flex flex-col gap-8">

                            <div className="flex flex-col gap-4">

                                <div className="flex flex-col gap-2">
                                    <div className="text-[#A3A3A3]">Validator</div>
                                    <Select
                                        selectedKeys={[delegate]}
                                        onChange={(e) => setDelegate(e?.target?.value)}
                                        // className="bg-[#000]"
                                        classNames={{
                                            trigger: '!bg-[#000] h-12 rounded-[6px]'
                                        }}
                                        renderValue={(items) => {
                                            return items.map((item: any) => (
                                                React.cloneElement(item?.rendered)
                                            ));
                                        }}
                                    >
                                        {selections?.map((i) => (
                                            <SelectItem key={i?.value}>
                                                <div className="flex items-center gap-1">
                                                    <img src={i?.icon} /><span>{i?.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    {/* <Input className="!bg-[#000] [&>div]:gap-2 " disabled value="ABCDE" type="solid" prefix={<img className="size-7 rounded-full" src={getImageUrl('@/assets/images/tokens/cysic.svg')} />} /> */}
                                </div>


                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <div className="text-[#A3A3A3]">Amount</div>
                                        <div className="flex items-center gap-1 text-[#A3A3A3]">
                                            <div className="flex items-center gap-1">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 11C13 11.2652 13.1054 11.5196 13.2929 11.7071C13.4804 11.8946 13.7348 12 14 12C14.2652 12 14.5196 11.8946 14.7071 11.7071C14.8946 11.5196 15 11.2652 15 11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11Z" fill="currentColor" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 3C12.8978 3 13.2794 3.15804 13.5607 3.43934C13.842 3.72064 14 4.10218 14 4.5H5.5V5H16C16.5304 5 17.0391 5.21071 17.4142 5.58579C17.7893 5.96086 18 6.46957 18 7V15C18 15.5304 17.7893 16.0391 17.4142 16.4142C17.0391 16.7893 16.5304 17 16 17H4.182C3.89546 17 3.61172 16.9436 3.34698 16.8339C3.08225 16.7242 2.84171 16.5635 2.63909 16.3609C2.22989 15.9517 2 15.3967 2 14.818V4.5C2 4.66 2.026 4.776 2.074 4.86C2.02594 4.74602 2.00079 4.62369 2 4.5C2 3.671 3.171 3 4 3H12.5ZM14 9C13.4696 9 12.9609 9.21071 12.5858 9.58579C12.2107 9.96086 12 10.4696 12 11C12 11.5304 12.2107 12.0391 12.5858 12.4142C12.9609 12.7893 13.4696 13 14 13C14.5304 13 15.0391 12.7893 15.4142 12.4142C15.7893 12.0391 16 11.5304 16 11C16 10.4696 15.7893 9.96086 15.4142 9.58579C15.0391 9.21071 14.5304 9 14 9Z" fill="currentColor" />
                                                </svg>
                                                <span>Balance</span>
                                            </div>
                                            <div className="text-[#fff]">{maxAmount}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Input suffix={<Button onClick={() => setDelegateAmount(maxAmount)} type="solid" className="min-h-fit h-fit py-1 rounded-full ">
                                            <div className="text-[#00F0FF] text-sm font-[500]">Max</div>
                                        </Button>} className="!bg-[#000]" value={delegateAmount} onChange={setDelegateAmount} type="solid" />
                                        <Slider
                                            value={slider}
                                            onChange={(v) => { setSlider(v); setDelegateAmount(BigNumber(v).multipliedBy(maxAmount).toString()) }}
                                            classNames={{
                                                track: "!border-s-[#00F0FF]",
                                                filler: "bg-[#00F0FF]",
                                                thumb: "!size-4 !bg-[#fff] [&:after]:!size-3 [&:after]:!bg-[#00F0FF] [&:after]:shadow-[0_0_0_2px_#000_inset]"
                                            }}
                                            showTooltip
                                            step={0.01}
                                            formatOptions={{ style: "percent" }}
                                            maxValue={1}
                                            minValue={0}
                                            marks={[0, 0.25, 0.5, 0.75, 1].map(i => ({
                                                value: i,
                                                label: i * 100 + '%'
                                            }))}
                                            defaultValue={0}
                                            className="max-w-md"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#A3A3A3] max-w-[200px]">Approximate Computing Governance Value</span>
                                        <div className="flex items-center gap-1">
                                            <span>10,000 {cysicStCoin}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <Button className="w-full" type="gradient" onClick={onClose}>
                                Delegate
                            </Button>
                        </div>

                    </ModalBody>
                    {/* <ModalFooter>
                        <Button className="w-full" type="gradient" onClick={onClose}>
                            Stake
                        </Button>
                    </ModalFooter> */}
                </>
            )}
        </ModalContent>
    </Modal>
}

export default DelegateModal