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

const DoubleconfirmModal = () => {
    const [renderElement, setRenderElement] = useState<any>();
    const callback = useRef<any>();
    const [visible, setVisible] = useState(false);
    useEventListener("doubleConfirmModalVisible" as any, (e: any) => {
        setVisible(true);
        callback.current = e?.detail?.callback;
        // renderCallback.current = e?.detail?.renderCallback
        setRenderElement(e?.detail?.renderCallback);
    });


    useEventListener("doubleConfirmModalClose" as any, (e: any) => {
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
                <ModalHeader className="!py-4 border-b border-[#2B2B2B] flex flex-col gap-1">{t('doubleConfirmAddr')}</ModalHeader>
                <ModalBody className="!pt-4">
                    <div className="flex flex-col gap-6">
                        <div>{t('doubleConfirmDesc')}</div>
                        {renderElement}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="w-full gradient-bg"
                        needLoading onClick={(close: any) => callback?.current?.(close)}>{t('Confirm')}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DoubleconfirmModal;
