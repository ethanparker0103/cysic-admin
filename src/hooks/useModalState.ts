import { useEventListener } from "ahooks"
import { useState } from "react"

const useModalState = ({eventName}: any) => {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState(null)
    
    useEventListener(eventName, (e) => {
        setVisible(e?.detail?.visible)
        
        // 如果事件包含额外数据，保存它
        if (e?.detail && typeof e.detail === 'object') {
            const { visible, ...restData } = e.detail || {visible: false}
            setData(Object.keys(restData).length > 0 ? restData : null)
        }
    })

    const dispatch = (detail = {}) => dispatchEvent(new CustomEvent(eventName, {
        detail
    }))

    return { visible, setVisible, dispatch, data }
}

export default useModalState