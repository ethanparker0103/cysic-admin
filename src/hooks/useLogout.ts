import { usePrivy } from "@/hooks/usePrivy";
import { useDisconnect } from "wagmi";

const useLogout = () => {
    const { logout: _logout, user } = usePrivy();
    const { disconnectAsync: _disconnectAsync } = useDisconnect();

    const disconnectAsync = async () => {
        await _disconnectAsync();
        window.localStorage.setItem('wagmi.com.okex.wallet.disconnected', 'true');
    }

    const logout = async () => {
        if(user?.wallet?.connectorType == "embedded"){
            await _logout();
        }
        await disconnectAsync();
    }

    return { logout, disconnectAsync };
}

export { useLogout };