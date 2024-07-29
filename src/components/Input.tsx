import clsx from "clsx";
import { useMemo } from "react";

const Input = ({
  disabled,
  children,
  placeholder,
  className,
  value,
  onChange,
  suffix,
  prefix,
  type,
  onFocus,
  onBlur
}: any) => {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange?.(value);
  };

  const classNameWithType = useMemo(() => {
    switch (type) {
      case 'normal':
        return ''
      case 'solid':
        return 'input-bordered'
      case 'text':
        return 'border-none'
      default:
        return '';
    }
  }, [type])

  return (
    <div
      className={clsx(
        "input flex flex-col justify-center gap-2.5 bg-[transparent] !outline-none rounded-2.5 focus:!border-[#21E9FA] focus-within:!border-[#21E9FA]",
        "focus-within:shadow-[0px_4px_10px_3px_#0000001C]",
        className,
        classNameWithType
      )}
    >
      <div className="flex items-center">
        {prefix || null}
        <input
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value || ""}
          onChange={handleChange}
          type="text"
          className="grow w-full"
        />
        {suffix || null}
      </div>

      {children}
    </div>
  );
};

export default Input;