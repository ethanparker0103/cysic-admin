import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Link } from "@nextui-org/react";

interface NavItem {
    content: string;
    href?: string;
    children?: NavItem[];
}

interface GradientNavDropdownProps {
    item: NavItem;
}

export default function GradientNavDropdown({ item }: GradientNavDropdownProps) {
    // 如果没有子菜单且有链接，则直接创建一个链接按钮
    if (!item?.children || item?.children?.length == 0) {
        return (
            <Button
                as={Link}
                href={item.href || "/"}
                variant="light"
                className="uppercase font-[400] !text-sub"
            >
                {item.content}
            </Button>
        );
    }

    // 有子菜单时创建下拉菜单
    return (
        <>

            <Dropdown classNames={{
                content: 'p-0 mt-6',
            }}>
                <DropdownTrigger>
                    <Button
                        variant="light"
                        className="uppercase font-[400] text-sub"
                    >
                        {item.content}
                    </Button>
                </DropdownTrigger>

                <DropdownMenu
                    aria-label={`${item.content} submenu`}
                    className="p-0 min-w-[180px] bg-[#090A09B2] backdrop-blur-md vertical-gradient-border rounded-lg overflow-hidden"
                    variant="flat"

                    itemClasses={{
                        base: "hover:!opacity-100 text-sub uppercase transition-colors hover-bright-gradient",
                    }}
                >
                    {item.children.map((child) => (
                        <DropdownItem
                            key={child.content}
                            className="py-2 px-4 text-sm"
                            as={Link}
                            href={child.href || "/"}
                        >
                            {child.content}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </>
    );
}