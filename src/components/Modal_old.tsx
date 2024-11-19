import { ReactNode, useEffect, useRef, useState } from "react"
import clsx from 'clsx'
import { createPortal } from "react-dom";

const Modal = ({ visible, children, onClose, modalClassName }: { visible: boolean, children?: ReactNode; onClose?: any, modalClassName?: string }) => {
    const [id, setId] = useState<any>()
    const ref = useRef<any>()

    useEffect(() => {
        setId(Math.random() * 1e18)
    }, [])

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                if (!ref.current) return;
                ref.current.checked = true
            }, 50)
        }
    }, [visible])

    const handleVisible = () => {
        if (!ref.current.checked) {
            onClose()
        }
    }
    return (

        visible ? createPortal(
            <>
                <input type="checkbox" id={`modal-trigger-${id}`} ref={ref} className="modal-toggle" onChange={handleVisible} />
                <div id={`modal-${id}`} className={clsx("modal !z-[50]")} role="dialog">
                    <div className={clsx("modal-box relative px-[0] py-[0] bg-[--base-800] shadow-[0px_0px_10px_0px_#00000033] !rounded-[8px] montserrat !min-w-fit border-[--base-300] border", modalClassName)}>
                        <div onClick={onClose} className="absolute top-[18px] right-[18px] cursor-pointer z-1"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1.49984L10.5002 0L5.99976 4.50011L1.49985 0L-0.000488281 1.49984L4.50002 6.00005L-0.000488281 10.5002L1.49985 12L5.99976 7.49989L10.5002 12L12 10.5002L7.5001 6.00005L12 1.49984Z" fill="black" />
                        </svg>
                        </div>
                        {children}
                    </div>
                    <label className="modal-backdrop backdrop-blur" htmlFor={`modal-trigger-${id}`}>Close</label>
                </div>
            </>, document.body
        ) : null

    )
}

export default Modal