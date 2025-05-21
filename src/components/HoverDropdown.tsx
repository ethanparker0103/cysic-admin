import { cn, Dropdown, DropdownTrigger } from "@nextui-org/react";
import { useRef, useState, useEffect } from "react";

const HoverDropdown = ({ trigger, children, className, classNames }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    // 鼠标是否在 trigger 区域
    const isInTrigger = useRef(false);
    // 鼠标是否在 dropdown 内容区域
    const isInContent = useRef(false);
  
    const enterDelay = 50;
    const leaveDelay = 100;
  
    const openDropdown = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsOpen(true), enterDelay);
    };
  
    const closeDropdown = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (!isInTrigger.current && !isInContent.current) {
          setIsOpen(false);
        }
      }, leaveDelay);
    };
  
    const onTriggerMouseEnter = () => {
      isInTrigger.current = true;
      openDropdown();
    };
    const onTriggerMouseLeave = () => {
      isInTrigger.current = false;
      closeDropdown();
    };
  
    const onContentMouseEnter = () => {
      isInContent.current = true;
      openDropdown();
    };
    const onContentMouseLeave = () => {
      isInContent.current = false;
      closeDropdown();
    };
  
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);
  
    return (
      <div className={cn(className, 'h-full flex items-center relative')}>
        <Dropdown
          isOpen={isOpen}
          placement="bottom-end"
          classNames={{
            content: cn('p-0 mt-6 bg-[transparent]', classNames?.content),
            ...classNames,
          }}
        >
          <DropdownTrigger
            onMouseEnter={onTriggerMouseEnter}
            onMouseLeave={onTriggerMouseLeave}
          >
            {trigger}
          </DropdownTrigger>
  
          <div onMouseEnter={onContentMouseEnter} onMouseLeave={onContentMouseLeave}>
            {children}
          </div>
        </Dropdown>
  
        {isOpen && (
          <div
            className="fixed inset-0 bg-transparent z-[1]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  };

export default HoverDropdown;