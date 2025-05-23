import clsx from "clsx";

const Toggle = ({ className, checked, onChange }: any) => {
  const handleChange = () => {
    onChange?.(!checked);
  };
  return (
    <input
      type="checkbox"
      className={clsx(
        "toggle !text-white [--tglbg:--by-100] bg-white hover:bg-white ",
        className,
        {
            'border-[--by-100] [--tglbg:--by-100]': checked,
            'border-[--secGray-400] [--tglbg:--secGray-400]': !checked
        }
      )}
      checked={checked}
      onClick={handleChange}
    />
  );
};

export default Toggle;
