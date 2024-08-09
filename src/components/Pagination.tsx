import React from "react";
import { Pagination } from "@nextui-org/react";

export default ({
    className,
    total,
    disabled,
    showControls,
    currentPage,
    onChange,
    offset = 0
}: any) => {
    const handlePageChange = (e) => {
        onChange?.(e - offset);
    };

    if(!+total) return null;
    return (
        <Pagination
            classNames={{
                wrapper: 'gap-2',
                cursor: 'bg-[#00F0FF] text-[#000] min-w-6 aspect-square',
                item: 'bg-[#FFFFFF1F] min-w-6 aspect-square box-content',
            }}
            // size="sm"
            radius="sm"
            className={className}
            isDisabled={disabled}
            showControls={showControls}
            total={total}
            initialPage={1 - offset}
            onChange={handlePageChange}
            page={currentPage + offset}
        />
    );
};
