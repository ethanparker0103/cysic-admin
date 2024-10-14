import Button from "@/components/Button"
import Input from "@/components/Input"
import useModalState from "@/hooks/useModalState"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import clsx from "clsx"
import { useState } from "react"

const slippages = ['0.1', '0.5', '1.0']

const SlippageModal = () => {
    const [slippage, setSlippage] = useState(slippages[1])
    const { visible, setVisible }: any = useModalState({ eventName: 'modal_slippage_visible' })

    return <Modal isOpen={visible} onOpenChange={setVisible}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Slippage</ModalHeader>
                    <ModalBody>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span>Slippage</span>
                                <span>{slippage}%</span>
                            </div>

                            <div className="flex items-center text-sm font-[500] rounded-[8px] bg-[#FFFFFF0D] py-1 gap-1">
                                {slippages.map(i=>{
                                    return <div onClick={()=>{
                                        setSlippage(i)
                                    }} key={i} className={clsx("rounded-[8px] h-12 flex items-center justify-center cursor-pointer flex-1", +slippage == +i ? 'bg-[#ffffff19]' : '')}>
                                        {i}%
                                    </div>
                                })}

                                <Input className="flex-1" type="solid" value={slippage} onChange={setSlippage} placeholder="0.5" suffix="%"/>
                            </div>
                        </div>

                        
                    </ModalBody>
                    <ModalFooter>
                        <Button className="w-full" type="gradient" onClick={onClose}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
}

export default SlippageModal