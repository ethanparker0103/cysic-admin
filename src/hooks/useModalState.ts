import { useEventListener } from "ahooks"
import { useState } from "react"

const useModalState = ({eventName}: any)=>{
    const [visible, setVisible] = useState(false)
    useEventListener(eventName, (e)=>{
        setVisible(e?.detail?.visible)
    })

    const dispatch = (detail = {}) => dispatchEvent(new CustomEvent(eventName, {
        detail
    }))

    return {visible, setVisible, dispatch}
}

export default useModalState