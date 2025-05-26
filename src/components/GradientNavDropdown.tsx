// https://github.com/heroui-inc/heroui/issues/2269
import { DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as NextUILink } from "@nextui-org/react";
import HoverDropdown from "@/components/HoverDropdown";
import GradientBorderCard from "@/components/GradientBorderCard";
import { createPortal } from "react-dom";

interface NavItem {
    key: string;
    content: string;
    type?: string;
    href?: string;
    children?: NavItem[];
    disabled?: boolean;
}

interface GradientNavDropdownProps {
    item: NavItem;
    className?: string;
}

export default function GradientNavDropdown({
    item,
    className,
}: GradientNavDropdownProps) {
    const navigate = useNavigate();

    const isExternalLink = (url?: string) => {
        return url?.startsWith("http://") || url?.startsWith("https://");
    };

    const handleNavigation = (url?: string) => {
        if (!url) return;

        if (isExternalLink(url)) {
            window.open(url, "_blank", "noopener,noreferrer");
        } else {
            navigate(url);
        }
    };

    if (!item?.children || item?.children?.length == 0) {
        if (isExternalLink(item.href)) {
            return (
                <Button
                    as={NextUILink}
                    href={item.href}
                    variant="light"
                    className={cn(
                        "uppercase font-[400] !text-sub h-full rounded-none",
                        className
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {item.content}
                </Button>
            );
        } else {
            return (
                <Button
                    as={RouterLink}
                    to={item.href || "/"}
                    variant="light"
                    className={cn(
                        "uppercase font-[400] !text-sub h-full rounded-none",
                        className
                    )}
                >
                    {item.content}
                </Button>
            );
        }
    }

    const disabledKeys = item?.children
        ?.filter((i: any) => i.disabled)
        .map((i) => i.key);

    if (item?.type == "subNav") {
        return (
            <>
                <Button
                    as={item?.href ? RouterLink : "div"}
                    to={item?.href ? item.href : null}
                    variant="light"
                    className={cn(
                        "uppercase font-[400] text-sub w-full h-full rounded-none flex-1 max-w-[11.25rem]"
                    )}
                >
                    {item.content}
                </Button>
            </>
        );
    }

    return (
        <HoverDropdown
            placement="bottom-center"
            className={cn(className, "h-full ")}
            classNames={{
                content: "p-0 !pt-2 -mt-1 bg-[transparent]",
            }}
            trigger={
                <Button
                    as={item?.href ? RouterLink : "div"}
                    to={item?.href ? item.href : null}
                    variant="light"
                    className={cn(
                        "uppercase font-[400] text-sub w-full h-full rounded-none"
                    )}
                >
                    {item.content}
                </Button>
            }
        >
            <DropdownMenu
                disabledKeys={disabledKeys}
                style={{
                    "--gradient-direction": "0deg",
                }}
                aria-label={`${item.content} submenu`}
                className="p-0 min-w-[180px] bg-[#090A09B2] backdrop-blur gradient-border-card rounded-lg overflow-hidden"
                variant="flat"
                itemClasses={{
                    base: cn("hover:!opacity-100 text-sub uppercase transition-colors "),
                }}
            >
                {item.children.map((child) => {
                    if (isExternalLink(child.href)) {
                        return (
                            <DropdownItem
                                key={child.key}
                                className="py-6 px-4 text-sm text-center hover-bright-gradient"
                                onPress={() => handleNavigation(child.href)}
                            >
                                {child.content}
                            </DropdownItem>
                        );
                    } else {
                        return (
                            <DropdownItem
                                key={child.content}
                                className={cn(
                                    "py-6 px-4 text-sm text-center relative",
                                    !child?.disabled ? "hover-bright-gradient" : ""
                                )}
                                onPress={() =>
                                    child.disabled ? null : handleNavigation(child.href)
                                }
                            >
                                {child?.disabled ? (
                                    <div className="blur-[3px]">
                                        <span>{child.content}</span>
                                    </div>
                                ) : (
                                    child.content
                                )}
                            </DropdownItem>
                        );
                    }
                })}
            </DropdownMenu>
        </HoverDropdown>
    );
}
