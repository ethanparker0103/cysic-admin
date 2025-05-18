import { cn, Dropdown, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useRef, useState, useEffect } from "react";

const HoverDropdown = ({ trigger, children, className, classNames }: { trigger: React.ReactNode, children: React.ReactNode, className?: string, classNames?: any }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => setIsOpen(true);
    
    const handleMouseLeave = (e: React.MouseEvent) => {
        // 检查鼠标是否真的离开了整个下拉区域
        const relatedTarget = e.relatedTarget as Node;
        if (!dropdownRef.current?.contains(relatedTarget)) {
            setIsOpen(false);
        }
    };

    return (
        <div 
            ref={dropdownRef}
            onMouseLeave={handleMouseLeave} 
            className={cn(className, 'h-full flex items-center relative')} 
        >
            <Dropdown
                isOpen={isOpen}
                placement="bottom-end"
                classNames={{
                    content: cn('p-0 mt-6 bg-[transparent]', classNames?.content),
                    ...classNames
                }}>
                <DropdownTrigger onMouseEnter={handleMouseEnter}>
                    {trigger}
                </DropdownTrigger>

                {children}
            </Dropdown>
            
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-transparent z-[-1]" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}

export default HoverDropdown;