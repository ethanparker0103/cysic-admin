import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Theme } from "@radix-ui/themes";
import { WagmiProvider } from "wagmi";
import * as chains from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
// import {
//     metaMaskWallet,
//   } from '@rainbow-me/rainbowkit/wallets';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import "@/assets/style/tailwind.css";
import "@/assets/style/global.css";
import '@rainbow-me/rainbowkit/styles.css'


import en from '@/lng/en.json'
import BigNumber from "bignumber.js";
BigNumber.config({ EXPONENTIAL_AT: 99 });

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: en
            }
        },
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });



// const projectId = "c3409365992fb110b8778d63a74b252b";
const projectId = "0311c63d54926ae045833d490f9cf369"
const queryClient = new QueryClient();
const metadata = {
    name: 'Cysic',
    description: 'Cysic is a real-time ZK Proof Generation Layer with State-of-the-Art hardware and prover network.',
    // url: 'https://cysic.xyz/',
    url: 'https://feat-dowload.cysic-network-web.pages.dev'
    icons: ['https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic-testnet/chain.png']
}

const networks = Object.values(chains) as any

const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    // ssr: true
})

createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
    features: {
        connectMethodsOrder: ['wallet'],
        analytics: true // Optional - defaults to your Cloud configuration
    }
})

// const chains = [sepolia, arbitrumSepolia, mainnet, bsc, bscTestnet, arbitrum];
// const config = getDefaultConfig({
//     appName: 'Cysic',
//     projectId,
//     chains: Object.values(chains) as any,
//     // wallets: [{
//     //     groupName: 'Recommended',
//     //     wallets: [metaMaskWallet],
//     // }]
// });



ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        <Theme>
            <WagmiProvider config={wagmiAdapter.wagmiConfig}>
                {/* <WagmiProvider config={config}> */}
                <QueryClientProvider client={queryClient}>
                    {/* <RainbowKitProvider> */}
                        <RouterProvider router={router} />
                    {/* </RainbowKitProvider> */}
                </QueryClientProvider>
            </WagmiProvider>
        </Theme>
    </>
);
