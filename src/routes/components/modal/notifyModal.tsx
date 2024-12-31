import { useEffect } from "react";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";

const NotifyModal = () => {
  const { visible, setVisible } = useModalState({
    eventName: "modal_exclusive_code_visible",
  });

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const start = new Date("2025-01-01T10:00:00+08:00"); // SGT is UTC+8
      const end = new Date("2025-01-01T18:00:00+08:00");

      if (now >= start && now <= end) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Modal
      classNames={{
        backdrop: '!z-[999]',
        wrapper: '!z-[999]'
      }}
      isOpen={visible}
      onClose={() => { }}
      className="[&_button.absolute]:hidden [&_button]:z-[2] max-w-[760px] w-[760px] border border-[#FFFFFF33]"
    >
      <div className="flex ">
        <div className="py-10 px-10 flex flex-col gap-10">
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col items-start gap-2">
              <div className="Gemsbuck text-gradient text-[30px] font-[400]">
                System Upgrade Announcement
              </div>
              <div className="font-bold text-sm">Scheduled Downtime: January 1, 2025, 10:00 AM - 6:00 PM (SGT) </div>

            </div>

            <div className="text-lg text-[#fff] font-[500] flex flex-col gap-4 leading-[1.5]">
              <div>
                Dear Cysors,
              </div>
              <div>
                We are upgrading our blockchain system to enhance scalability, performance, and support advanced features.
              </div>
              <div>
                During this period, all on-chain services will be unavailable. Please make any necessary arrangements in advance. We will work diligently to complete the upgrade smoothly and notify you as soon as the service is restored.
              </div>
              <div>Check back soon after the upgrade to enjoy the improved system!</div>
            </div>
            <div className="text-[#A1A1AA] text-sm">*No action required on your part. Your client will automatically reconnect to the chain once the upgrade is complete.</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotifyModal;