import { useEventListener } from "ahooks"
import { useState } from "react"

interface ModalData {
    [key: string]: unknown;
    step?: string;
}

interface ModalEvent extends Event {
    detail?: {
        visible: boolean;
        [key: string]: unknown;
    };
}

const useModalState = ({eventName}: {eventName: string}) => {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState<ModalData | null>(null)
    
    useEventListener(eventName, (event: Event) => {
        const e = event as ModalEvent;
        if (e.detail) {
            const isVisible = !!e.detail.visible;
            setVisible(isVisible);
            
            // 如果事件包含额外数据，保存它
            if (typeof e.detail === 'object') {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { visible, ...restData } = e.detail;
                setData(Object.keys(restData).length > 0 ? restData as ModalData : null);
            }
        }
    })

    const dispatch = (detail = {}) => {
        const event = new CustomEvent(eventName, { detail });
        window.dispatchEvent(event);
    }

    return { visible, setVisible, dispatch, data }
}

export default useModalState