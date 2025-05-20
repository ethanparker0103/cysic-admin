import useAccount from "@/hooks/useAccount";
import { usePrevious } from "ahooks";

const useTriedConnectedOnce = () => {
  
    const { isReconnecting, isConnecting } = useAccount();
  
    // connecting：false->true->false
    const prevIsReconnecting = usePrevious(isReconnecting);
    const prevIsConnecting = usePrevious(isConnecting);
  
    const hasTryToConnectedOnce =
      (prevIsReconnecting && !isReconnecting) ||
      (prevIsConnecting && !isConnecting);
  
  return {
    hasTryToConnectedOnce
  };
  
};

export default useTriedConnectedOnce;