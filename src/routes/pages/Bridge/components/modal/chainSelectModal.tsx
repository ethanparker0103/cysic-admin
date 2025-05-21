import useModalState from "@/hooks/useModalState";
import clsx from "clsx";
import Modal from "@/components/Modal";
import { isMobile } from "react-device-detect";
import { bridgeConfig } from "@/config";
import { getImageUrl } from "@/utils/tools";
import useBridge from "@/models/bridge";

const ChainSelectModal = () => {
  const { fromChainId, setState } = useBridge();
  const { visible, setVisible } = useModalState({
    eventName: "modal_chain_select_visible",
  });

  const handleSubmit = async (id: number) => {
    setState({
      fromChainId: id,
    });
    setVisible(false)
  };

  return (
    <Modal
      isOpen={visible}
      onClose={() => setVisible(false)}
      className="max-w-[440px] border border-[#FFFFFF33] [&_.modal-content]:!p-0"
      title="Chain"
    >
      {/* <ModalBody> */}
      <div className={clsx("flex justify-between")}>
        <div
          className={clsx(
            "flex flex-col gap-10 bg-[#0B0C0F] relative z-1",
            isMobile ? "w-full p-2 " : "w-[440px] py-2"
          )}
        >
          <div className="flex flex-col">
            {Object.values(bridgeConfig)?.map((i: any) => {
              return (
                <div
                  onClick={() => {
                    handleSubmit(i?.chain?.id);
                  }}
                  key={i?.chain?.id}
                  className={clsx("py-3 hover:bg-[#FFFFFF1A] px-6 py-4", fromChainId == i?.chain?.id ? 'bg-[#FFFFFF1A]' : '')}
                >
                  <div className="flex items-center gap-2">
                    <img
                      className="size-6 rounded-full"
                      src={i?.chain?.icon}
                    />
                    <span className="text-base teacher !normal-case group-hover:underline">{i?.chain?.name}</span>

                    {fromChainId == i?.chain?.id ? (
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

export default ChainSelectModal;
