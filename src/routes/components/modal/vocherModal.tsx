import Button from "@/components/Button";
import Modal from "@/components/Modal";
import useModalState from "@/hooks/useModalState";
import { Tab, Tabs } from "@nextui-org/react";
import { Check } from "lucide-react";

const validTasks = [
    {
        name: "Start Digital Harvester Trial",
        description: "Tier 1 ZK Harvester 3-DAY Free Trial",
        reward: "10", // +10 Boosts
        status: 0, // 0: pending, 1: completed, 2: claimed, 3: expired
    },
    {
        name: "Bond your Discord",
        reward: "10", // +10 Boosts
        status: 2, // 0: pending, 1: completed, 2: claimed, 3: expired
    },
    {
        name: "Tweet with cysic PhaseIII",
        reward: "10", // +10 Boosts
        description: "Tier 1 ZK Harvester 3-DAY Free Trial",
        status: 1, // 0: pending, 1: completed, 2: claimed, 3: expired
    },
    {
        name: "Bond your Discord",
        reward: "10", // +10 Boosts
        description: "Tier 1 ZK Harvester 3-DAY Free Trial",
        expired: "Apr 1 2025, 2PM UTC",
        status: 3, // 0: pending, 1: completed, 2: claimed, 3: expired
    },
];

const invalidTasks = [
    {
        name: "Bond your Discord",
        reward: "10", // +10 Boosts
        description: "Tier 1 ZK Harvester 3-DAY Free Trial",
        status: 3, // 0: pending, 1: completed, 2: claimed, 3: expired
    },
    {
        name: "Bond your Discord",
        reward: "10", // +10 Boosts
        expired: "Apr 1 2025, 2PM UTC",
        status: 3, // 0: pending, 1: completed, 2: claimed, 3: expired
    },
];

const StatusButton = ({
    status,
    children,
}: {
    status: number;
    children: React.ReactNode;
}) => {
    if (status === 3) {
        return (
            <Button
                type="dark"
                className="bg-[#FFFFFF12] border border-[#FFFFFF1A] text-[#EA4335] rounded-full text-sm flex items-center gap-1"
            >
                {children}
            </Button>
        );
    }
    if (status === 2) {
        return (
            <Button
                type="dark"
                disabled
                className="opacity-[1] disabled:[--tw-text-opacity:1] disabled:[--tw-bg-opacity:1] 
                        bg-[#FFFFFF12] border border-[#FFFFFF1A]
                        rounded-full text-sm flex items-center gap-1"
            >
                {children}
            </Button>
        );
    }
    if (status === 1) {
        return (
            <Button type="light" className="rounded-full text-sm">
                {children}
            </Button>
        );
    }
    return (
        <Button type="solid" className="!rounded-full text-sm">
            {children}
        </Button>
    );
};

const VoucherModal = () => {
    const { visible, setVisible } = useModalState({
        eventName: "modal_voucher_visible",
    });

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <Modal
            title="VOUCHER"
            className="max-w-[33.75rem]"
            isOpen={visible}
            onClose={handleClose}
        >
            <div className="flex flex-col gap-6">
                <div className="text-base">
                    Free Trial vouchers activate instantly upon redemption, while discount
                    vouchers can be applied at checkout when purchasing a Digital
                    Harvester.
                </div>
                <Tabs
                    classNames={{
                        panel: "!p-0",
                        tabList:
                            "w-full p-0 gap-0 rounded-md overflow-hidden border border-[#FFFFFF80]",
                        tab: 'py-6 [&:not(:last-child)]:border-r  [&:not(:last-child)]:border-r-[#FFFFFF80] !rounded-none px-0 [data-selected="true"]:text-black [data-selected="true"]:bg-white [data-selected="true"]:border-black bg-[#FFFFFF1A] text-[#FFFFFF80]',
                        cursor: "rounded-none",
                    }}
                    className="w-full"
                >
                    <Tab key="valid" title="VALID">
                        <div className="flex flex-col gap-4">
                            {validTasks.map((task) => (
                                <div
                                    key={task.name}
                                    className="flex items-center justify-between gap-2 p-4 border border-[#FFFFFF80] rounded-md"
                                >
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="text-[24px]">{task.name}</div>
                                            {task.description && (
                                                <div className="text-lg">{task.description}</div>
                                            )}
                                        </div>

                                        {task.expired && (
                                            <div className="text-sm text-sub">
                                                Valid Until {task.expired}
                                            </div>
                                        )}
                                    </div>
                                    <StatusButton status={task.status}>
                                        {task.status === 3 ? <>Expired</> : task.status === 2 ? (
                                            <>
                                                <Check className="w-3 h-3 text-green-500" />
                                                <span>Claimed</span>
                                            </>
                                        ) : task.status === 1 ? (
                                            <span>Claim {task.reward} Boosts</span>
                                        ) : (
                                            <span>+{task.reward} Boosts</span>
                                        )}
                                    </StatusButton>
                                </div>
                            ))}
                        </div>
                    </Tab>
                    <Tab key="invalid" title="INVALID">
                        <div className="flex flex-col gap-4">
                            {invalidTasks.map((task) => (
                                <div
                                    key={task.name}
                                    className="flex items-center justify-between gap-2 p-4 border border-[#FFFFFF80] rounded-md"
                                >
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="text-[24px]">{task.name}</div>
                                            {task.description && (
                                                <div className="text-lg">{task.description}</div>
                                            )}
                                        </div>
                                        {task.expired && (
                                            <div className="text-sm text-sub">
                                                Valid Until {task.expired}
                                            </div>
                                        )}
                                    </div>
                                    <StatusButton status={task.status}>
                                        {task.status === 3 ? <>Expired</> : task.status === 2 ? (
                                            <>
                                                <Check className="w-3 h-3 text-green-500" />
                                                <span>Claimed</span>
                                            </>
                                        ) : task.status === 1 ? (
                                            <span>Claim {task.reward} Boosts</span>
                                        ) : (
                                            <span>+{task.reward} Boosts</span>
                                        )}
                                    </StatusButton>
                                </div>
                            ))}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </Modal>
    );
};

export default VoucherModal;
