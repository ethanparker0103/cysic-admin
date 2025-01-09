import copy from "copy-to-clipboard";
import { Copy } from 'lucide-react'
import { getImageUrl } from "@/utils/tools";
import {
    Accordion,
    AccordionItem,
    Tab,
    Tabs,
    Tooltip,
} from "@nextui-org/react";
import hljs from "highlight.js";
import "highlight.js/styles/github.min.css";
import './index.css'
import bash from "highlight.js/lib/languages/bash";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs"; // 选择一个你喜欢的主题
import toast from "react-simple-toasts";
import { downloadLink } from "@/config";
hljs.registerLanguage("bash", bash);
// hljs.addPlugin(
//   new CopyCode({
//     autohide: false,
//     callback: (text, el) => console.log("Copied to clipboard", text),
//   })
// );

// hljs.highlightAll()

const Tutorial = () => {
    return (
        <>
            <style>
                {`
        
        .tutorial .rotate-0{
            transform: rotate(90deg)
        }
        .tutorial .rotate-0[data-open=true]{
            transform: rotate(270deg)
        }
        `}
            </style>
            <div className="px-3 rounded-[20px] bg-[#FFFFFF12] tutorial">
                <Accordion
                    defaultChecked
                    keepContentMounted
                    defaultSelectedKeys={'all'}
                    className="[&_button]:flex-row-reverse"
                >
                    <AccordionItem
                        title={
                            <div className="flex flex-col ">
                                <div className="text-lg font-bold">
                                    Tutorial: Run Cysic Verifier Node in 2 simple steps
                                </div>
                                <div className="text-base text-[#A3A3A3] font-[500]">
                                    For more details, see the full{" "}
                                    <a
                                        href="https://medium.com/@cysic/6a09720cba4e"
                                        target="_blank"
                                    >
                                        <span className="text-[#00F0FF] underline">
                                            Verifier Tutorial Doc
                                        </span>
                                    </a>
                                </div>
                            </div>
                        }
                    >
                        <div className="pl-6 leading-[1.4] pb-6">
                            <CodeTutorial />
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};

export const tutorialList = {
    android: [
        {
            title: "👉 Step 1: Install The APP",
            subTitle: <div className="flex flex-col gap-6">
                <span>Download the official Cysic Verifier App</span>
                <div className="flex items-center gap-1">
                    <span>Android Version:</span>
                    <a className="!text-[#00F0FF]" target="_blank" href={downloadLink.andorid}>[Download]</a>
                </div>

                <div className="bg-[#10141A] p-6 rounded-[12px] flex items-cente justify-between">
                    <div className="flex items-center gap-3">
                        <img className="size-8" src={getImageUrl('@/assets/images/tutorial/android_bot.svg')} />
                        <div className="flex flex-col gap-1">
                            <span className="text-sm">Download the APK</span>
                            <div className="text-[#fff]">Android</div>
                        </div>
                    </div>
                    <div>
                        <Tooltip
                            classNames={{
                                content: 'bg-[#2A313B]'
                            }}
                            content={<div className="p-5 rounded-[12px] bg-[#2A313B] flex flex-col items-center gap-3">
                                <img src={getImageUrl('@/assets/images/tutorial/download_qrcode.svg')} />
                                <div className="text-sm">Scan to Download</div>
                            </div>}>
                            <div className="p-2 rounded-[12px] cursor-pointer hover:bg-[#2A313B]"><img className="size-8" src={getImageUrl('@/assets/images/tutorial/qrcode_trigger.svg')} /></div>
                        </Tooltip>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <span>Google Play Version:</span>
                    <span className="text-[#fff]" >Coming Soon</span>
                </div>

            </div>
        },
        {
            title: "👉 Step 2: lmport Your Wallet",
            subTitle: 'Import your wallet seed phrase. Cysic does not store any seed phrases or private keys. Please ensure the security of your wallet information.',
        },
        {
            title: "👉 Step 3: Start Verifcation",
            subTitle: <div className="">
                Click the Start <span className="font-semibold">Verification button</span> on the main interface to begin the Verifier process. After starting verifier, Cysic App can switch to backstage operating. You can <span className="font-semibold">start</span> or <span className="font-semibold">stop</span> the verification work at any time.
            </div>,
        },
    ],
    linux: [
        {
            title: "👉 Step 1: Setup",
            subTitle:
                "Start your terminal program on Linux. Copy the code below, replacing the address placeholder with your reward address, paste the code in your terminal, then press enter to run.",
            desc: `# replace 0x-Fill-in-your-reward-address-here with your reward address below
            
curl -L https://github.com/cysic-labs/phase2_libs/releases/download/v1.0.0/setup_linux.sh > ~/setup_linux.sh && bash ~/setup_linux.sh 0x-Fill-in-your-reward-address-here`,
        },
        {
            title: "👉 Step 2: Start the verifier program",
            subTitle: <div className="flex flex-col gap-1">
                <span>Wait a while for the setup process script to run. Then copy and paste the below code, press enter to run.</span>
                <span>· If you see “err: rpc error”, don’t worry—just wait a few minutes for the verifier to connect. </span>
                <span>· Once connected, you’ll see a message like “start sync data from server,” indicating it’s running successfully.</span>
            </div>,
            desc: `cd ~/cysic-verifier/ && bash start.sh`,
        },
        {
            title: "🎉 Success! ",
            subTitle: <div className="flex flex-col gap-1">
                <span>If you need to reconnect the verifier, please execute Step 2 again.</span>
                <span>*The verifier program will create mnemonic files for you. Your submitted address mnemonic file is in: ～/.cysic/keys/ folder, please keep it or you can not run the verifier program again.</span>
            </div>,
        },
    ],
    windows: [
        {
            title: "👉 Step 1: Setup",
            subTitle:
                "Open your terminal Powershell, and start as administrator. Copy the code below, replacing the address placeholder with your reward address, paste the code in your terminal, then press enter to run.",
            desc: `# replace 0x-Fill-in-your-reward-address-here with your reward address below

cd $env:USERPROFILE

Invoke-WebRequest -Uri "https://github.com/cysic-labs/phase2_libs/releases/download/v1.0.0/setup_win.ps1" -OutFile "setup_win.ps1"

.\\setup_win.ps1 -CLAIM_REWARD_ADDRESS "0x-Fill-in-your-reward-address-here" `,
        },
        {
            title: "👉 Step 2: Start the verifier program",
            subTitle: <div className="flex flex-col gap-1">
                <span>Wait a while for the setup process script to run. Then copy and paste the below code, press enter to run.</span>
                <span>· If you see “err: network error”, don’t worry—just wait a few minutes for the verifier to connect.</span>
                <span>· Once connected, you’ll see a message like “start sync data from server,” indicating it’s running successfully.</span>
            </div>,
            desc: `# run the verifier

cd $env:USERPROFILE\\cysic-verifier

.\\start.ps1`,
        },
        {
            title: "🎉 Success! ",
            subTitle: <div className="flex flex-col gap-1">
                <span>If you need to reconnect the verifier, please execute Step 2 again.</span>
                <span>*The verifier program will create mnemonic files for you. Your submitted address mnemonic file is in: ～/.cysic/keys/ folder, please keep it or you can not run the verifier program again.</span>
            </div>
        },
    ],
    macos: [
        {
            title: "👉 Step 1: Setup",
            subTitle: `Open your terminal first. Copy the code below, replacing the address placeholder with your reward address, then press to run.`,
            desc: `# replace 0x-Fill-in-your-reward-address-here with your reward address below

curl -L https://github.com/cysic-labs/phase2_libs/releases/download/v1.0.0/setup_mac.sh > ~/setup_mac.sh && bash ~/setup_mac.sh 0x-Fill-in-your-reward-address-here`,
        },
        {
            title: "👉 Step 2: Start the verifier program",
            subTitle: <div className="flex flex-col gap-1">
                <span>Wait a while for the setup process script to run. Then copy and paste the below code, press enter to run.</span>
                <span>· If you see “err: network error”, don’t worry—just wait a few minutes for the verifier to connect.</span>
                <span>· Once connected, you’ll see a message like “start sync data from server,” indicating it’s running successfully.</span>
            </div>,
            desc: `cd ~/cysic-verifier/ && bash start.sh`,
        },
        {
            title: "🎉 Success! ",
            subTitle: <div className="flex flex-col gap-1">
                <span>If you need to reconnect the verifier, please execute Step 2 again.</span>
                <span>*The verifier program will create mnemonic files for you. Your submitted address mnemonic file is in: ～/.cysic/keys/ folder, please keep it or you can not run the verifier program again.</span>
            </div>
        },
    ],
};
const CodeTutorial = () => {

    const handleCopy = (v: string) => {
        copy(v)
        toast('copied');
    };

    return (
        <div>
            <div className="p-6 border border-[#FFFFFF1F] rounded-[20px] bg-[#FFFFFF0D]">
                <Tabs
                    aria-label="Options"
                    classNames={{
                        base: "w-full pb-6",
                        tabList: "w-full",
                        tab: "!py-3",
                        cursor: "bg-[url(@/assets/images/_global/nav-shadow.svg)] bg-[rgba(255,255,255,0.05)] bg-bottom	bg-contain	bg-no-repeat"
                    }}
                >
                    <Tab
                        key="android"
                        title={
                            <div className="flex items-center gap-1">
                                <img
                                    className="size-5"
                                    src={getImageUrl("@/assets/images/tutorial/android.svg")}
                                />
                                <span className="text-lg font-[500]">Android</span>
                            </div>
                        }
                    >
                        <div className="flex items-start gap-4 flex-wrap">
                            <div className="flex flex-col gap-6 flex-1">
                                {tutorialList?.["android"]?.map((i, index) => {
                                    return (
                                        <div key={index} className="flex flex-col gap-2">
                                            <div className="text-base font-[700] text-[#fff]">
                                                {i?.title}
                                            </div>
                                            <div className="leading-[1.2] text-base font-[400] text-[#D3D3D3]">
                                                {i?.subTitle}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>


                            <div className="flex flex-col items-center gap-3">
                                <div className="font-semibold">Cysic Verifier App Video Guide</div>

                                <div className="p-4 self-center mx-auto max-w-[20.625rem] min-w-[15rem] ">
                                    <div className="rounded-[12px] p-3 bg-[#FFFFFF33]">
                                        <video controls preload="auto" className="aspect-[240/520]" poster="/tutorial_poster.png" muted>
                                            <source src="https://api-testnet.prover.xyz/images/c603ee3e4d0f6bbd0b61eb06667bfb3339cc384020ff3708609114003c642460.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab
                        key="linux"
                        title={
                            <div className="flex items-center gap-1">
                                <img
                                    className="size-5"
                                    src={getImageUrl("@/assets/images/tutorial/linux.png")}
                                />
                                <span className="text-lg font-[500]">Linux</span>
                            </div>
                        }
                    >
                        <div className="flex flex-col gap-6">
                            {tutorialList?.["linux"]?.map((i, index) => {
                                return (
                                    <div key={index} className="flex flex-col gap-2">
                                        <div className="text-base font-[700] text-[#fff]">
                                            {i?.title}
                                        </div>
                                        <div className="leading-[1.2] text-base font-[400] text-[#D3D3D3]">
                                            {i?.subTitle}
                                        </div>
                                        {i?.desc ? (
                                            <div className="font-[400] bg-[#FFFFFF] p-4 rounded-[20px] text-[#32363C] relative">
                                                <div className="relative bg-[#F5F6F7] border border-[#E6E8EA] rounded-[16px] px-8 py-6">
                                                    <div className="absolute right-6 top-4 cursor-pointer px-2 py-1 rounded-[6px] bg-[#0000001A] text-[#525252] text-xs font-[500] flex items-center gap-1 hover:bg-[#00F0FF]" onClick={() => handleCopy(i?.desc)}><Copy size={12} /> <span>Copy</span></div>
                                                    <SyntaxHighlighter language="bash" style={github}>
                                                        {i?.desc}
                                                    </SyntaxHighlighter>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </Tab>

                    <Tab
                        key="windows"
                        title={
                            <div className="flex items-center gap-1">
                                <img
                                    className="size-5"
                                    src={getImageUrl("@/assets/images/tutorial/windows.png")}
                                />
                                <span className="text-lg font-[500]">Windows</span>
                            </div>
                        }
                    >
                        <div className="flex flex-col gap-6">
                            {tutorialList?.["windows"]?.map((i, index) => {
                                return (
                                    <div key={index} className="flex flex-col gap-2">
                                        <div className="text-base font-[700] text-[#fff]">
                                            {i?.title}
                                        </div>
                                        <div className="leading-[1.2] text-base font-[400] text-[#D3D3D3]">
                                            {i?.subTitle}
                                        </div>
                                        {i?.desc ? (
                                            <div className="font-[400] bg-[#FFFFFF] p-4 rounded-[20px] text-[#32363C] relative">
                                                <div className="relative bg-[#F5F6F7] border border-[#E6E8EA] rounded-[16px] px-8 py-6">
                                                    <div className="absolute right-6 top-4 cursor-pointer px-2 py-1 rounded-[6px] bg-[#0000001A] text-[#525252] text-xs font-[500] flex items-center gap-1 hover:bg-[#00F0FF]" onClick={() => handleCopy(i?.desc)}><Copy size={12} /> <span>Copy</span></div>
                                                    <SyntaxHighlighter language="bash" style={github}>
                                                        {i?.desc}
                                                    </SyntaxHighlighter>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </Tab>

                    <Tab
                        key="macos"
                        title={
                            <div className="flex items-center gap-1">
                                <img
                                    className="size-5"
                                    src={getImageUrl("@/assets/images/tutorial/mac.png")}
                                />
                                <span className="text-lg font-[500]">Macos</span>
                            </div>
                        }
                    >
                        <div className="flex flex-col gap-6">
                            {tutorialList?.["macos"]?.map((i, index) => {
                                return (
                                    <div key={index} className="flex flex-col gap-2">
                                        <div className="text-base font-[700] text-[#fff]">
                                            {i?.title}
                                        </div>
                                        <div className="leading-[1.2] text-base font-[400] text-[#D3D3D3]">
                                            {i?.subTitle}
                                        </div>
                                        {i?.desc ? (
                                            <div className="font-[400] bg-[#FFFFFF] p-4 rounded-[20px] text-[#32363C] relative">
                                                <div className="relative bg-[#F5F6F7] border border-[#E6E8EA] rounded-[16px] px-8 py-6">
                                                    <div className="absolute right-6 top-4 cursor-pointer px-2 py-1 rounded-[6px] bg-[#0000001A] text-[#525252] text-xs font-[500] flex items-center gap-1 hover:bg-[#00F0FF]" onClick={() => handleCopy(i?.desc)}><Copy size={12} /> <span>Copy</span></div>
                                                    <SyntaxHighlighter language="bash" style={github}>
                                                        {i?.desc}
                                                    </SyntaxHighlighter>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};
export default Tutorial;
