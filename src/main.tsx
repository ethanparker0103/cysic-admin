import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Theme } from "@radix-ui/themes";
// import {
//     metaMaskWallet,
//   } from '@rainbow-me/rainbowkit/wallets';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import "@/assets/style/tailwind.css";
import "@/assets/style/global.css";
import '@rainbow-me/rainbowkit/styles.css'


import en from '@/lng/en.json'
import kr from '@/lng/kr.json'
import kr_en from '@/lng/kr_en.json'
import BigNumber from "bignumber.js";
// import ReownProvider from "@/config/reownProvider";
// import PrivyProvider from "@/config/privyProvider";


BigNumber.config({ EXPONENTIAL_AT: 99 });

// 从URL参数获取语言设置，默认为kr
const urlParams = new URLSearchParams(window.location.search);
const defaultLang = urlParams.get('lng') === 'en' ? 'kr_en' : 'kr';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: en
            },
            kr: {
                translation: kr
            },
            kr_en: {
                translation: kr_en
            }
        },
        lng: defaultLang, // if you're using a language detector, do not define the lng option
        fallbackLng: "kr",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });



ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        <Theme>
            {/* <PrivyProvider> */}
                <RouterProvider router={router} />
            {/* </PrivyProvider> */}
        </Theme>
    </>
);
