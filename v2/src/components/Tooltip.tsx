import { Tooltip as NTooltip } from "@nextui-org/react";
import { useState } from "react";
import { isMobile } from "react-device-detect";

const Tooltip = ({ children, ...props }: any) => {
    const [isOpen, setIsOpen] = useState(false);


    if (isMobile) {

        return (
            <NTooltip {...props} isOpen={isOpen}>
                <div
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {children}
                </div>
            </NTooltip>
        );
    }

    return (<NTooltip {...props}>
        {children}
    </NTooltip>)
};

export default Tooltip;
