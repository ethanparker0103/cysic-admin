import Button from "@/components/Button";
import Verticle from "@/components/Verticle";
import { cysicBaseCoin, cysicStCoin } from "@/config";
import useModalState from "@/hooks/useModalState";
import useCosmos from "@/models/_global/cosmos";
import { getImageUrl } from "@/utils/tools";


const Assets = () => {
  const { balanceMap, connector } = useCosmos();
  const { dispatch }: any = useModalState({
    eventName: "modal_exchange_visible",
  });

  console.log('balanceMap', balanceMap)

  return (
    <>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="min-h-[8.375rem] flex-1 flex flex-col gap-6 p-6 rounded-[16px] bg-sub-gradient border border-[#192E33] ">
          <div className="flex items-center justify-between relative">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img src={getImageUrl('@/assets/images/tokens/CYS.svg')}/>
                <span className="text-2xl text-[#A3A3A3]">
                  {cysicBaseCoin}
                </span>
              </div>
              <div className="flex-1 text-[40px] font-bold text-[#00F0FF]">
                {balanceMap?.[cysicBaseCoin]?.hm_amount || '-'}
              </div>
            </div>
            <Button
              className="relative z-[2]"
              type="dark"
              onClick={() => dispatch({ visible: true })}
            >
              <div className="flex items-center gap-1">
                <span>Exchange</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.33325 16.6917C9.65933 16.6917 10.9311 16.1649 11.8688 15.2272C12.8065 14.2895 13.3333 13.0178 13.3333 11.6917C13.3333 10.3656 12.8065 9.09383 11.8688 8.15615C10.9311 7.21847 9.65933 6.69168 8.33325 6.69168C7.00717 6.69168 5.7354 7.21847 4.79772 8.15615C3.86004 9.09383 3.33325 10.3656 3.33325 11.6917C3.33325 13.0178 3.86004 14.2895 4.79772 15.2272C5.7354 16.1649 7.00717 16.6917 8.33325 16.6917ZM8.33325 10.025L6.66659 11.6917L8.33325 13.3583L9.99992 11.6917L8.33325 10.025Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.9524 10.8942C15.4385 10.5396 15.8421 10.084 16.1354 9.55869C16.4287 9.03334 16.6047 8.45071 16.6513 7.85085C16.698 7.251 16.6142 6.64816 16.4057 6.08378C16.1972 5.51939 15.8689 5.00686 15.4435 4.58142C15.0181 4.15598 14.5055 3.82772 13.9411 3.61922C13.3768 3.41072 12.7739 3.32692 12.1741 3.37358C11.5742 3.42024 10.9916 3.59626 10.4662 3.88954C9.94088 4.18281 9.48528 4.58638 9.13075 5.0725C10.6126 5.25156 11.9916 5.92249 13.047 6.97793C14.1024 8.03337 14.7734 9.41233 14.9524 10.8942ZM15.6749 16.4833L17.1083 17.9167L16.2249 18.8L13.7541 16.33C13.6292 16.205 13.559 16.0355 13.559 15.8587C13.559 15.682 13.6292 15.5125 13.7541 15.3875L16.2249 12.9167L17.1083 13.8L15.6749 15.2333H19.1666V16.4833H15.6749ZM4.32492 4.81667L2.89159 6.25L3.77492 7.13333L6.24575 4.66333C6.37068 4.53832 6.44086 4.36882 6.44086 4.19208C6.44086 4.01535 6.37068 3.84584 6.24575 3.72083L3.77492 1.25L2.89159 2.13333L4.32492 3.56667H0.833252V4.81667H4.32492Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Button>
            <img
              className="opacity-30 z-0 absolute top-1/2 -translate-y-1/2 right-2 size-[7.625rem]"
              src={getImageUrl("@/assets/images/assets/token.png")}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Verticle
              className="w-[calc(50%-0.5rem)]"
              title="Activity CYS"
              desc={"1,000"}
            />
            <Verticle
              className="w-[calc(50%-0.5rem)]"
              title="Prover CYS"
              desc={"1,000"}
            />
            <Verticle
              className="w-[calc(50%-0.5rem)]"
              title="Verifier CYS"
              desc={"1,000"}
            />
            <Verticle
              className="w-[calc(50%-0.5rem)]"
              title="Reward CYS"
              desc={"1,000"}
            />
          </div>
        </div>

        <div className="min-h-[8.375rem] flex-1 flex flex-col gap-6 p-6 rounded-[16px] bg-sub-gradient border border-[#192E33] ">
          <div className="flex items-center justify-between relative">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img src={getImageUrl('@/assets/images/tokens/CGT.svg')}/>
                <span className="text-2xl text-[#A3A3A3]">{cysicStCoin}</span>
              </div>
              <div className="flex-1 text-[40px] font-bold text-[#fff]">
                {balanceMap?.[cysicStCoin]?.hm_amount || "-"}
              </div>
            </div>
            <Button
              className="relative z-[2]"
              type="dark"
              onClick={() => dispatch({ visible: true })}
            >
              <div className="flex items-center gap-1">
                <span>Exchange</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.33325 16.6917C9.65933 16.6917 10.9311 16.1649 11.8688 15.2272C12.8065 14.2895 13.3333 13.0178 13.3333 11.6917C13.3333 10.3656 12.8065 9.09383 11.8688 8.15615C10.9311 7.21847 9.65933 6.69168 8.33325 6.69168C7.00717 6.69168 5.7354 7.21847 4.79772 8.15615C3.86004 9.09383 3.33325 10.3656 3.33325 11.6917C3.33325 13.0178 3.86004 14.2895 4.79772 15.2272C5.7354 16.1649 7.00717 16.6917 8.33325 16.6917ZM8.33325 10.025L6.66659 11.6917L8.33325 13.3583L9.99992 11.6917L8.33325 10.025Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.9524 10.8942C15.4385 10.5396 15.8421 10.084 16.1354 9.55869C16.4287 9.03334 16.6047 8.45071 16.6513 7.85085C16.698 7.251 16.6142 6.64816 16.4057 6.08378C16.1972 5.51939 15.8689 5.00686 15.4435 4.58142C15.0181 4.15598 14.5055 3.82772 13.9411 3.61922C13.3768 3.41072 12.7739 3.32692 12.1741 3.37358C11.5742 3.42024 10.9916 3.59626 10.4662 3.88954C9.94088 4.18281 9.48528 4.58638 9.13075 5.0725C10.6126 5.25156 11.9916 5.92249 13.047 6.97793C14.1024 8.03337 14.7734 9.41233 14.9524 10.8942ZM15.6749 16.4833L17.1083 17.9167L16.2249 18.8L13.7541 16.33C13.6292 16.205 13.559 16.0355 13.559 15.8587C13.559 15.682 13.6292 15.5125 13.7541 15.3875L16.2249 12.9167L17.1083 13.8L15.6749 15.2333H19.1666V16.4833H15.6749ZM4.32492 4.81667L2.89159 6.25L3.77492 7.13333L6.24575 4.66333C6.37068 4.53832 6.44086 4.36882 6.44086 4.19208C6.44086 4.01535 6.37068 3.84584 6.24575 3.72083L3.77492 1.25L2.89159 2.13333L4.32492 3.56667H0.833252V4.81667H4.32492Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Button>
            <img
              className="opacity-30 z-0 absolute top-1/2 -translate-y-1/2 right-2 size-[7.625rem]"
              src={getImageUrl("@/assets/images/assets/token.png")}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Verticle
              className="w-[calc(50%-0.5rem)]"
              title="Activity CYS"
              desc={"1,000"}
            />
            <Verticle
              className="w-[calc(50%-0.5rem)]"
              title="Prover CYS"
              desc={"1,000"}
            />
            <Verticle
              className="w-[calc(50%-0.5rem)]"
              title="Verifier CYS"
              desc={"1,000"}
            />
            <Verticle
              className="w-[calc(50%-0.5rem)]"
              title="Reward CYS"
              desc={"1,000"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Assets;
