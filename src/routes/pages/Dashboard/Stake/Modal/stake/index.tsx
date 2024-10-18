import useModalState from "@/hooks/useModalState"
import Stake from "./stakeContent/stake"
import Unstake from "./stakeContent/unstake"
import { Modal, ModalContent, ModalBody, ModalFooter, Tabs, Tab, ModalHeader } from "@nextui-org/react"
import { useEventListener } from "ahooks"
import { useState } from "react"

export enum StakeTab {
    stake,
    unstake
}

const StakeModal = () => {
    const { visible, setVisible }: any = useModalState({ eventName: 'modal_stake_visible' })
    const [selected, setSelected] = useState<any>(StakeTab.stake);

    const [item, setItem] = useState()

    useEventListener('modal_stake_visible' as any, (e: any) => {

        if (e?.detail?.tab != undefined) {
            setSelected(e?.detail?.tab)
        }
        setItem(e?.detail?.item)
    })


    return <Modal isOpen={visible} onOpenChange={setVisible}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader />
                    <ModalBody>
                        <Tabs
                            fullWidth
                            size="md"
                            aria-label="stake modal"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                            classNames={{
                                tabContent: 'group-data-[selected=true]:text-[#000] group-data-[selected=true]:font-[600]',
                                cursor: 'bg-[#00F0FF]'
                            }}
                        >
                            <Tab key={StakeTab.stake} title="Stake">
                                <Stake item={item} />
                            </Tab>
                            <Tab key={StakeTab.unstake} title="Unstake">
                                <Unstake item={item} />
                            </Tab>
                        </Tabs>


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

export default StakeModal