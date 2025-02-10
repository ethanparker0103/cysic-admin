import { Radio as NextUIRadio, cn, RadioProps } from "@nextui-org/react";

interface CustomRadioProps extends RadioProps {
    children?: React.ReactNode | undefined;
  }  

const Radio = (props: CustomRadioProps) => {
    const { children, classNames, ...otherProps } = props;

    return (
        <NextUIRadio
            {...otherProps}
            classNames={{
                ...classNames,
                base: cn(
                    "inline-flex max-w-none m-0 bg-[transparent] items-center justify-between",
                    "flex-row-reverse cursor-pointer rounded-lg gap-2 p-2 border-1 border-[#ffffff33]",
                    "data-[selected=true]:border-[#00F0FF]",
                    classNames?.base
                ),
                wrapper: cn(
                    "group-data-[selected=true]:border-[#00F0FF]",
                    classNames?.wrapper
                ),
                control: cn(
                    "group-data-[selected=true]:bg-[#00F0FF]",
                    classNames?.control
                )
                
            }}
        >
            {children}
        </NextUIRadio>
    );
};


export default Radio