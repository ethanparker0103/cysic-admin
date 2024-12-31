import { Modal as NextModal, ModalContent } from "@nextui-org/react"
import clsx from "clsx"

const Modal = ({ children, isOpen, onClose, className, classNames }: any) => {

    return <NextModal classNames={classNames} backdrop="blur" shadow="lg" isOpen={isOpen} onClose={onClose} className={clsx(className, 'bg-[#10141A]')}>
        <ModalContent>
            {children}
        </ModalContent>
    </NextModal>
}

export default Modal