import { cn } from "@nextui-org/react";
import clsx from "clsx";
import { ReactNode, useMemo, useState } from "react";

const resetDisabled =
  "disabled:![--tw-text-opacity:1] disabled:![--tw-bg-opacity:1] !opacity-100";

export enum BtnType {
  solidGradient = "solidGradient",
  gradient = "gradient",
  colorGradient = "colorGradient",
  normal = "normal",
  solid = "solid",
  dark = "dark",
  light = "light",
  text = "text",
}
const Button = ({
  children,
  className,
  type,
  onClick,
  disabled,
  loading,
  style = {},
  needLoading = true,
  id,
}: {
  children: ReactNode;
  className?: string;
  type?: BtnType | string;
  onClick?: any;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  needLoading?: boolean;
  id?: string;
}) => {
  const [interalLoading, setInternalLoading] = useState(false);
  const _loading = interalLoading || loading;
  const classNameWithType = useMemo(() => {
    switch (type) {
      case BtnType.colorGradient:
        return "gradient-color bg-[#1D2127] border-[#FFFFFF1F] border";
      case BtnType.solidGradient:
        return "gradient-border text-white hover:!border-[transparent]";
      case BtnType.gradient:
        return "bg-gradient border-none !text-white";
      case BtnType.dark:
        return "bg-[#FFFFFF12] border-none text-white ";
      case BtnType.light:
        return cn(
          resetDisabled,
          `disabled:bg-[#FFFFFF80] disabled:text-[#00000080]`,
          `bg-white border border-[transparent] text-black hover:!opacity-80`
        );
      case BtnType.solid:
        return "!bg-[transparent] border rounded-md !border-white text-white";
      case BtnType.text:
      default:
        return "!backdrop-blur-none !bg-[transparent] !border-none text-white";
    }
  }, [type]);

  return (
    <button
      id={id}
      style={style}
      disabled={disabled || _loading}
      onClick={async () => {
        try {
          if (needLoading) {
            setInternalLoading(true);
          }
          await onClick?.(() => setInternalLoading(false));
        } finally {
          setInternalLoading(false);
        }
      }}
      className={clsx(
        className,
        classNameWithType,
        "px-4 py-2 backdrop-blur-sm rounded !font-[400]",
        disabled
          ? "pointer-events-none opacity-50 disabled:[--tw-text-opacity:0.5] disabled:[--tw-bg-opacity:0.5]"
          : ""
      )}
    >
      {_loading ? <span className="loading loading-sm" /> : children}
    </button>
  );
};

export default Button;
