import clsx from "clsx";
import { cloneElement, useEffect, useMemo, useRef } from "react";

const Select = ({
    modal,
    dropdownClassName,
    containerClassName,
    className,
    suffix,
    disabled,
    value,
    onChange,
    select,
    selectValueClassName,
    optionClassName,
    optionItemClassName,
    activeClassName,
    onClick,
}: any) => {
    const ref = useRef<any>(null)
    const activeSelection = useMemo(() => select?.find((i) => i.value === value), [select, value]);
    const optionsRef = useRef<any>(null)

    const handleChange = (v, item) => {
        onChange?.(v, item);
        // @ts-ignore
        document?.activeElement?.blur?.()
    };

    useEffect(() => {
        if (!value && select?.[0]) {
            handleChange?.(select?.[0]?.value, select?.[0]);
        }
    }, [value, select])

    return (
        <div className={clsx("dropdown dropdown-end !no-animation text-[--secGray-900] ", containerClassName)} >
            <div
                onClick={onClick}
                ref={ref}
                tabIndex={disabled ? undefined : 0}
                role="button"
                className={clsx(
                    "btn justify-between w-max !bg-[#0000000D] whitespace-nowrap flex-nowrap !shadow-none text-[--secGray-900] ",
                    className
                )}
            >
                <div className="flex flex-1 items-center gap-2.5 justify-start">
                    {activeSelection?.prefix || null}
                    <span className={clsx("text-4 font-[400] text-[inherit]", selectValueClassName)}>
                        {activeSelection?.text}
                    </span>
                </div>
                {suffix || null}
            </div>
            {
                modal ? cloneElement(modal, {
                    onChange: handleChange,
                    tokenList: select,
                    // activeToken: activeSelection,
                    value: value,
                }) : (<ul
                    ref={optionsRef}
                    tabIndex={0}
                    className={clsx(
                        "overflow-auto dropdown-content w-full !bg-[inherit] z-[1] menu p-0 shadow bg-base-100 rounded-[6px]",
                        dropdownClassName
                    )}
                >
                    <div className="overflow-auto">
                        {select?.map((i, index) => {
                            return (
                                <li
                                    className={clsx("w-full hover:!bg-[inherit] !bg-[transparent]", optionClassName, { [activeClassName]: i?.value === activeSelection?.value })}
                                    onClick={() => handleChange(i?.value, i)}
                                    key={index}
                                >
                                    <a className={clsx("flex items-center justify-between h-full", optionItemClassName)}>
                                        <div className="flex items-center gap-[5px]">
                                            {i?.prefix || null}
                                            <span className="text-[12px] font-[400] text-[inherit]">{i?.text}</span>
                                        </div>
                                        {i?.desc ? <span className="text-[12px] font-[400] text-[inherit]">{i?.desc}</span> : null}
                                    </a>
                                </li>
                            );
                        })}
                    </div>

                </ul>)
            }

        </div>
    );
};

export default Select;