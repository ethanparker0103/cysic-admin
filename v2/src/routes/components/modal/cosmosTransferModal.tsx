
import Modal from "@/components/Modal"
import useModalState from "@/hooks/useModalState"
import CosmosTransferToken from "@/routes/components/CosmosTransferToken"
import { ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"

const CosmosTransferModal = () => {
    const { visible, setVisible } = useModalState({eventName: 'modal_cosmos_transfer_visible'})

    return <Modal isOpen={visible} onClose={() => setVisible(false)}>
            <ModalHeader className="flex flex-col gap-1">Transfer</ModalHeader>
            <ModalBody>
                <CosmosTransferToken />
            </ModalBody>
    </Modal>
}

export default CosmosTransferModal