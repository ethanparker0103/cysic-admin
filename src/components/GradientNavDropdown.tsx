import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as NextUILink } from "@nextui-org/react";


interface NavItem {
    key: string;
    content: string;
    href?: string;
    children?: NavItem[];
    disabled?: boolean;
}

interface GradientNavDropdownProps {
    item: NavItem;
    className?: string;
}

export default function GradientNavDropdown({ item, className }: GradientNavDropdownProps) {
    const navigate = useNavigate();

    // 判断是否为外部链接
    const isExternalLink = (url?: string) => {
        return url?.startsWith('http://') || url?.startsWith('https://');
    };

    // 处理导航逻辑
    const handleNavigation = (url?: string) => {
        if (!url) return;
        
        if (isExternalLink(url)) {
            window.open(url, "_blank", "noopener,noreferrer");
        } else {
            navigate(url);
        }
    };

    // 如果没有子菜单且有链接，则直接创建一个链接按钮
    if (!item?.children || item?.children?.length == 0) {
        if (isExternalLink(item.href)) {
            // 外部链接使用NextUI Link
            return (
                <Button
                    as={NextUILink}
                    href={item.href}
                    variant="light"
                    className={cn("uppercase font-[400] !text-sub h-full rounded-none", className)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {item.content}
                </Button>
            );
        } else {
            // 内部链接使用React Router Link
            return (
                <Button
                    as={RouterLink}
                    to={item.href || "/"}
                    variant="light"
                    className={cn("uppercase font-[400] !text-sub h-full rounded-none", className)}
                >
                    {item.content}
                </Button>
            );
        }
    }

    const disabledKeys = item?.children?.filter((i: any)=>i.disabled).map(i=>i.key)

    // 有子菜单时创建下拉菜单
    return (
        <Dropdown classNames={{
            content: 'p-0 mt-6 bg-[transparent]',
        }}>
            <DropdownTrigger>
                <Button
                    variant="light"
                    className={cn("uppercase font-[400] text-sub h-full rounded-none", className)}
                >
                    {item.content}
                </Button>
            </DropdownTrigger>

            <DropdownMenu
                // disabledKeys={item?.children?.map(i=>i.disabled)}
                disabledKeys={disabledKeys}
                style={{
                    '--gradient-direction': '0deg',
                }}
                aria-label={`${item.content} submenu`}
                className="p-0 min-w-[180px] bg-[#090A09B2] backdrop-blur gradient-border-card rounded-lg overflow-hidden"
                variant="flat"
                itemClasses={{
                    base: "hover:!opacity-100 text-sub uppercase transition-colors hover-bright-gradient",
                }}
            >
                {item.children.map((child) => {
                    if (isExternalLink(child.href)) {
                        // 外部链接
                        return (
                            <DropdownItem
                                key={child.key}
                                className="py-6 px-4 text-sm text-center"
                                as={NextUILink}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {child.content}
                            </DropdownItem>
                        );
                    } else {
                        // 内部链接
                        return (
                            <DropdownItem
                                key={child.content}
                                className="py-6 px-4 text-sm text-center"
                                onPress={() =>  child.disabled ? null : handleNavigation(child.href)}
                            >
                                {child.content}
                            </DropdownItem>
                        );
                    }
                })}
            </DropdownMenu>
        </Dropdown>
    );
}