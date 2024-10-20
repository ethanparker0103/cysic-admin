
import useModalState from "@/hooks/useModalState"
import CosmosTransferToken from "@/routes/components/CosmosTransferToken"
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"

const CosmosTransferModal = () => {
    const { visible, setVisible } = useModalState('modal_cosmos_transfer_visible')

    return <Modal isOpen={visible} onClose={() => setVisible(false)}>
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Transfer</ModalHeader>
            <ModalBody>
                <CosmosTransferToken />
            </ModalBody>
        </ModalContent>

    </Modal>
}

export default CosmosTransferModal