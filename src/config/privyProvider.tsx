import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider, createConfig } from '@privy-io/wagmi';
import type { PrivyClientConfig } from '@privy-io/react-auth';
import { cysicTestnet } from './evm/cysicTestnet';
import { arbitrumSepolia, mainnet, sepolia } from 'viem/chains';
import { http } from 'viem';

const queryClient = new QueryClient();

const privyConfig: PrivyClientConfig = {
    embeddedWallets: {
        createOnLogin: 'users-without-wallets',
        requireUserPasswordOnCreate: true,
        showWalletUIs: true
    },
    loginMethods: ['wallet', 'email', 'sms', 'google', 'twitter', 'discord'],
    appearance: {
        showWalletLoginFirst: true
    }
};

export const config = createConfig({
    chains: [mainnet, sepolia, arbitrumSepolia, cysicTestnet],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [arbitrumSepolia.id]: http(),
        [cysicTestnet.id]: http()
    },
});

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider appId="cm9lg5u7d001ulb0m5de6obse" config={privyConfig}>
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={config}>{children}</WagmiProvider>
            </QueryClientProvider>
        </PrivyProvider>
    );
}