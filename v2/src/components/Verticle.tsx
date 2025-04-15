import clsx from "clsx";

const Verticle = ({ title, desc, className }: any) => {
    return (
        <div className={clsx("flex flex-col gap-1", className)}>
            <span className="text-[#A3A3A3] text-sm font-[400]">{title}</span>
            <span className="text-[#fff] text-base font-[500]">{desc}</span>
        </div>
    );
};

export default Verticle