import GradientBorderCard, { GradientDirection } from "@/components/GradientBorderCard";
import { Modal as NextModal, ModalContent, cn } from "@nextui-org/react"
import clsx from "clsx"
import { X } from "lucide-react"
import { useMemo } from "react";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    classNames?: any;
    hideCloseButton?: boolean;
    title?: string;
    maxHeight?: string;
    [key: string]: any;
}

const Modal = ({
    children,
    isOpen,
    onClose,
    className,
    classNames,
    hideCloseButton,
    title,
    maxHeight = "90vh",
    ...props
}: ModalProps) => {
    // 计算内容区域的最大高度（减去标题栏的64px高度）
    const contentMaxHeight = useMemo(() => {
        // 将maxHeight转换为数值，默认为像素单位
        const match = maxHeight.match(/^(\d+)(vh|px|rem|em|%)?$/);
        if (match) {
            const value = match[1];
            const unit = match[2] || 'px';
            // 减去标题栏高度(64px)和边框宽度(2px)
            return { maxHeight: `calc(${value}${unit} - 66px)` };
        }
        // 如果没有匹配成功，使用减去标题栏的计算
        return { maxHeight: `calc(${maxHeight} - 66px)` };
    }, [maxHeight]);

    return (
        <NextModal
            classNames={{
                backdrop: 'backdrop-blur-sm bg-black/60',
                base: 'border-0',
                wrapper: 'max-h-screen',
                body: 'p-0 overflow-hidden', // 添加overflow-hidden防止双滚动
                header: 'border-b border-gray-700',
                footer: 'border-t border-gray-700',
                closeButton: 'hidden',
                ...(classNames || {})
            }}
            backdrop="blur"
            shadow="lg"
            isOpen={isOpen}
            onClose={onClose}
            className={clsx('bg-[#090A09] text-white', className)}
            {...props}
        >
            <ModalContent style={{ maxHeight, overflow: 'hidden' }}> {/* 更改为overflow: 'hidden' */}
                <GradientBorderCard
                    innerClassName="w-full flex flex-col overflow-hidden" // 改为overflow-hidden
                    className="h-full"
                    direction={GradientDirection.BOTTOM_TO_TOP}
                >
                    {/* 标题栏 - 固定在顶部 */}
                    <div className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-700 flex-shrink-0">
                        <div className="text-xl font-light uppercase tracking-wider">
                            {title}
                        </div>
                        {!hideCloseButton && (
                            <button
                                onClick={onClose}
                                className="text-white hover:text-gray-300 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        )}
                    </div>

                    {/* 内容区域 - 只有这里可滚动 */}
                    <div 
                        className="p-6 w-full overflow-y-auto" 
                        style={contentMaxHeight} // 使用计算好的内容区最大高度
                    >
                        {children}
                    </div>
                </GradientBorderCard>
            </ModalContent>
        </NextModal>
    )
}

export default Modal    