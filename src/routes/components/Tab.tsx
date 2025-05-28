import { ReactNode, useState } from 'react';
import { cn } from '@nextui-org/react';

export interface TabItem {
    key: string;
    label: string;
    content: ReactNode;
}

interface TabProps {
    items: TabItem[];
    defaultActiveKey?: string;
    tabClassName?: string;
    contentClassName?: string;
    renderMode?: 'mount' | 'hidden';
}

const Tab = ({
    items,
    defaultActiveKey,
    tabClassName,
    contentClassName,
    renderMode = 'mount'
}: TabProps) => {
    const [activeKey, setActiveKey] = useState(defaultActiveKey || items[0]?.key);

    return (
        <>
            <div className={cn('rounded-lg overflow-hidden border border-[#FFFFFF4D] grid', `grid-cols-${items.length}`, tabClassName)}>
                {items.map((item) => (
                    <button
                        key={item.key}
                        className={cn(
                            '[&:not(:last-child)]:border-r border-[#FFFFFF4D]',
                            'py-4 uppercase text-center text-base transition-colors',
                            activeKey === item.key
                                ? 'bg-white text-black'
                                : 'bg-[#1E1E1E] text-[#777]'
                        )}
                        onClick={() => setActiveKey(item.key)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {renderMode === 'mount' ? (
                items.map((item) => (
                    activeKey === item.key && (
                        <div key={item.key} className={cn(contentClassName, 'w-full')}>
                            {item.content}
                        </div>
                    )
                ))
            ) : (
                items.map((item) => (
                    <div
                        key={item.key}
                        className={cn(
                            'w-full',
                            contentClassName,
                            activeKey === item.key ? 'block' : 'hidden'
                        )}
                    >
                        {item.content}
                    </div>
                ))
            )}
        </>
    );
};

export default Tab;