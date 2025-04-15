import Button from "@/components/Button";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { useEventListener } from "ahooks";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const BasicDoubleconfirmModal = () => {
    const [renderElement, setRenderElement] = useState<any>();
    const callback = useRef<any>();
    const [visible, setVisible] = useState(false);

    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [btnText, setBtnText] = useState()

    useEventListener("basicDoubleconfirmModalVisible" as any, (e: any) => {
        setVisible(true);
        console.log(e.detail);
        callback.current = e?.detail?.callback;
        // renderCallback.current = e?.detail?.renderCallback
        setRenderElement(e?.detail?.renderElement);
        setTitle(e?.detail?.title)
        setDesc(e?.detail?.desc)
        setBtnText(e?.detail?.btnText)
    });


    useEventListener("basicDoubleconfirmModalClose" as any, (e: any) => {
        setVisible(false);
    });


    const onOpenChange = () => {
        setVisible(false);
        setRenderElement(null);
        callback.current = undefined;
    };

    const { t } = useTranslation()

    return (
        <Modal className="z-[99]" isOpen={visible} onClose={onOpenChange}>
            <ModalContent className="self-center w-[500px] max-h-[50vh] h-fit bg-[#17181A] text-sm border border-[#FFFFFF1F]">
                <ModalHeader className="!py-4 border-b border-[#2B2B2B] flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody className="!pt-4">
                    <div className="flex flex-col gap-6">
                        <div className="text-base text-[#fff]">{desc}</div>
                        {renderElement}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="gradient"
                        className="w-full"
                        needLoading onClick={(close: any) => callback?.current?.(close)}>{t(btnText || 'Confirm')}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default BasicDoubleconfirmModal;
