import { VisuallyHidden, useRadio } from "@nextui-org/react";
import GradientBorderCard from "@/components/GradientBorderCard";

const CustomRadio = (props: any) => {
    const {
      Component,
      children,
      description,
      getBaseProps,
      getWrapperProps,
      getInputProps,
      getLabelProps,
      getLabelWrapperProps,
      getControlProps,
    } = useRadio(props);
  
    return (
      <Component {...getBaseProps()}>
        <GradientBorderCard
          borderRadius={8}
          className="px-4 py-2 flex gap-1 items-center"
        >
          <>
            <VisuallyHidden>
              <input {...getInputProps()} />
            </VisuallyHidden>
            <span
              {...getWrapperProps()}
              className={
                "relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden border-solid border-medium box-border border-default rounded-full group-data-[hover-unselected=true]:bg-default-100 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background group-data-[selected=true]:border-default w-4 h-4 group-data-[pressed=true]:scale-95 transition-transform-colors motion-reduce:transition-none"
              }
            >
              <span {...getControlProps()}
              className="bg-gradient-to-b from-[#34FFE1] to-[#1F9987] z-10 opacity-0 scale-0 origin-center rounded-full group-data-[selected=true]:opacity-100 group-data-[selected=true]:scale-100 text-primary-foreground w-1.5 h-1.5 transition-transform-opacity motion-reduce:transition-none"
               />
            </span>
            <div {...getLabelWrapperProps()}>
              {children && <span {...getLabelProps()} >{children}</span>}
              {description && (
                <span className="text-small text-foreground opacity-70">
                  {description}
                </span>
              )}
            </div>
          </>
        </GradientBorderCard>
      </Component>
    );
  };
  
  export default CustomRadio