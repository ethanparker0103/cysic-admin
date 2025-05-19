import Button from "@/components/Button";
import Modal from "@/components/Modal";
import useAccount from "@/hooks/useAccount";
import useModalState from "@/hooks/useModalState";
import { handleSignIn, shortStr } from "@/utils/tools";
import { usePrivy } from "@privy-io/react-auth";
import { usePrevious } from "ahooks";
import { useEffect } from "react";
import { useDisconnect } from "wagmi";

const PrivyAccountMismatchModal = () => {
  const { visible, setVisible } = useModalState({
    eventName: "modal_privy_account_mismatch_visible",
  });

  const { walletAddress, isReconnecting, isConnecting } = useAccount();
  const { disconnectAsync } = useDisconnect();

  // connecting：false->true->false
  const prevIsReconnecting = usePrevious(isReconnecting);
  const prevIsConnecting = usePrevious(isConnecting);

  const hasTryToConnectedOnce =
    (prevIsReconnecting && !isReconnecting) ||
    (prevIsConnecting && !isConnecting);

  const { user, logout, connectWallet } = usePrivy();

  const accountMismatch =
    hasTryToConnectedOnce && !!user?.wallet?.address && user?.wallet?.address != walletAddress;

  const accountDisconnectedOrMatched =
    !user?.wallet?.address ||
    (user?.wallet?.address && user?.wallet?.address == walletAddress);

  useEffect(() => {
    if (accountDisconnectedOrMatched) {
      setVisible(false);
    }
  }, [accountDisconnectedOrMatched]);

  useEffect(() => {
    if (accountMismatch) {
      setVisible(true);
    }
  }, [accountMismatch]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleLogout = async () => {
    await logout();
    setVisible(false);
    handleSignIn();
  };

  const handleConnectWallet = async () => {
    if (
      walletAddress &&
      walletAddress?.toLowerCase() !== user?.wallet?.address?.toLowerCase()
    ) {
      await disconnectAsync();
      window.localStorage.setItem('wagmi.com.okex.wallet.disconnected', 'true');
    }
    await connectWallet();
  };

  return (
    <Modal
      isDismissable={false}
      isOpen={visible}
      onClose={handleClose}
      title="Match Your Account"
      className="max-w-[600px]"
      hideCloseButton
    >
      <div className="flex flex-col items-center space-y-6">
        <h3 className="text-lg font-light tracking-wide text-center teacher !normal-case">
          Current Account related address is not connected. <br />
          please connect your wallet{" "}
          <span className="underline teacher !normal-case">
            ({shortStr(user?.wallet?.address || "", 12)})
          </span>{" "}
          to continue.
        </h3>

        <Button
          type="light"
          className="font-[400] w-full h-16 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
          onClick={handleConnectWallet}
          needLoading
        >
          CONNECT WALLET
        </Button>

        <div className="text-sub my-6">
          or You can sign in with another account
        </div>

        <Button
          type="solid"
          className="font-[400] w-full h-16 bg-transparent border border-gray-600 rounded-lg text-white hover:bg-gray-800 transition-colors"
          onClick={handleLogout}
          needLoading
        >
          SWITCH WALLET
        </Button>
      </div>
    </Modal>
  );
};

export default PrivyAccountMismatchModal;
