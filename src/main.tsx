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



const projectId = "c3409365992fb110b8778d63a74b252b";
const queryClient = new QueryClient();
// const chains = [sepolia, arbitrumSepolia, mainnet, bsc, bscTestnet, arbitrum];
const config = getDefaultConfig({
    appName: 'Cysic',
    projectId,
    chains: Object.values(chains) as any,
    // wallets: [{
    //     groupName: 'Recommended',
    //     wallets: [metaMaskWallet],
    // }]
});



ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        <Theme>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider>
                        <RouterProvider router={router} />
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </Theme>
    </>
);
