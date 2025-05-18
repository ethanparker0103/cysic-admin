import { cn, Dropdown, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useRef, useState, useEffect } from "react";

const HoverDropdown = ({ trigger, children, className, classNames }: { trigger: React.ReactNode, children: React.ReactNode, className?: string, classNames?: any }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // 设置延迟阈值（毫秒）
    const enterDelay = 50; // 进入延迟
    const leaveDelay = 100; // 离开延迟

    const handleMouseEnter = () => {
        // 清除任何可能存在的离开定时器
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        
        // 设置进入延迟
        timeoutRef.current = setTimeout(() => {
            setIsOpen(true);
        }, enterDelay);
    };
    
    const handleMouseLeave = (e: React.MouseEvent) => {
        // 检查鼠标是否真的离开了整个下拉区域
        const relatedTarget = e.relatedTarget as Node;
        if (!dropdownRef.current?.contains(relatedTarget)) {
            // 清除任何可能存在的进入定时器
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            
            // 设置离开延迟
            timeoutRef.current = setTimeout(() => {
                setIsOpen(false);
            }, leaveDelay);
        }
    };

    // 组件卸载时清理定时器
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

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
                    className="fixed inset-0 bg-transparent z-[1]" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}

export default HoverDropdown;