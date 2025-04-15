import { WagmiProvider } from "wagmi";
import * as chains from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { router } from "@/router";

const projectId2 = "31f035438ae413926262557046ca933a";
// @ts-ignore
const projectId1 = "0311c63d54926ae045833d490f9cf369";

const projectId = projectId2;
const queryClient = new QueryClient();
const metadata = {
  name: "Cysic",
  description:
    "Cysic is a real-time ZK Proof Generation Layer with State-of-the-Art hardware and prover network.",
  url: "https://cysic.xyz/",
  // url: 'https://feat-dowload.cysic-network-web.pages.dev',
  icons: [
    "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic-testnet/chain.png",
  ],
};

const networks = [chains.mainnet, chains.arbitrum, chains.arbitrumSepolia];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  // ssr: true
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    connectMethodsOrder: ["wallet"],
    swaps: false,
    email: false,
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export default function ReownProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
