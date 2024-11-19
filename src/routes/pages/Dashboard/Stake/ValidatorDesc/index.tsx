const ValidatorDesc = () => {
  return (
    <div className="flex flex-col gap-6 border border-[#FFFFFF33] rounded-[16px]  p-8">
      <div className="flex items-center gap-3">
        <span className="text-lg font-[500]">Your Validators</span>
        {/* <span className="text-sm font-[400]">APR 15.97%</span> */}
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-[500]">
          ✨ Want to grow your assets? Start staking today!
        </div>
        <div className=" text-[#A3A3A3] text-sm font-[400]">
          Staking your assets with validators is a great way to earn rewards while helping to secure the network and gain voting power. Simply stake your <b>$CGT</b> to start earning <b>$CYS</b> as rewards. Getting started is easy—just select your preferred validator and begin staking!
        </div>
      </div>
    </div>
  );
};
export default ValidatorDesc;
