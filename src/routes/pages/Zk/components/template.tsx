import { cn } from "@nextui-org/react";
import { cloneElement } from "react";

export const DashboardDetailMainWrapper = ({
  title,
  detail,
  table,
  classNames
}: {
  title: string | React.ReactNode;
  detail: React.ReactElement;
  table?: React.ReactElement;
  classNames?: { detail?: string, table?: string };
}) => {
  return (
    <div
      className={cn(
        "mx-auto mb-auto relative z-10 pt-20 pb-16 w-full break-words lg"
      )}
    >
      <h1 className={cn("unbounded-36-400 font-light mb-12 text-center ")}>
        {title}
      </h1>

      <div className="flex flex-col gap-4 lg:gap-8">
        <>{cloneElement(detail, { className: cn(
            "px-4 py-4 lg:py-6 flex flex-col lg:flex-row gap-4 lg:gap-6",
            "[&>div]:flex-1 [&>div]:flex [&>div]:flex-col [&>div]:gap-4 lg:[&>div]:gap-2 ",
            classNames?.detail,
            detail.props.className
        ) })}</>

        {table && <>{cloneElement(table, { className: cn(
            "px-4 py-4 lg:py-6",
            classNames?.table
        ) })}</>}
      </div>
    </div>
  );
};
