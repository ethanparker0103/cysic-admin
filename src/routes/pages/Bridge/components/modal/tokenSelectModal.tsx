import useModalState from "@/hooks/useModalState";
import clsx from "clsx";
import Modal from "@/components/Modal";
import { isMobile } from "react-device-detect";
import { bridgeConfig, bridgeToken } from "@/config";
import { getImageUrl } from "@/utils/tools";
import useBridge from "@/models/bridge";

const TokenSelectModal = () => {
  const { bridgeDir, toTokenAddress, fromTokenAddress, fromChainId, toChainId, setState } = useBridge();

  const chainId = !bridgeDir ? fromChainId : toChainId
  const { visible, setVisible } = useModalState({
    eventName: "modal_token_select_visible",
  });

  const handleSubmit = async (addr: string) => {
    setState({
      fromTokenAddress: addr,
    });
  };

  return (
    <Modal
      isOpen={visible}
      onClose={() => setVisible(false)}
      className="max-w-[440px] border border-[#FFFFFF33]"
    >
      {/* <ModalBody> */}
      <div className={clsx("flex justify-between")}>
        <div
          className={clsx(
            "flex flex-col gap-10 bg-[#0B0C0F] relative z-1",
            isMobile ? "w-full p-3 " : "w-[440px] py-6"
          )}
        >
          <div className="Gemsbuck px-6 text-[#fff]">Chain</div>
          <div className="flex flex-col -mt-3">
            {Object.values(bridgeToken?.[fromChainId] || {})?.map((i: any, index: number) => {
              return (
                <div
                  onClick={() => {
                    handleSubmit(i?.address);
                  }}
                  key={i?.address || index}
                  className={clsx("py-3 hover:bg-[#34353875]", fromTokenAddress == i?.address ? 'bg-[#343538]' : '')}
                >
                  <div className="flex items-center px-6 gap-2">
                    <img
                      className="size-6 rounded-full"
                      src={getImageUrl("@/assets/images/tokens/CYS.svg")}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-[#fff]">{i?.name}</span>
                      <span className="text-xs text-[#737373]">{i?.symbol}</span>
                    </div>

                    {fromTokenAddress == i?.address ? (
                      <svg
                        className="ml-auto"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.7333 5.53334L5.16952 11.9562L2.11194 7.36981L3.22134 6.63021L5.49709 10.0438L12.9333 4.46667L13.7333 5.53334Z"
                          fill="white"
                        />
                      </svg>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TokenSelectModal;
