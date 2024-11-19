import copy from "copy-to-clipboard";
import { Copy } from 'lucide-react'
import { getImageUrl } from "@/utils/tools";
import {
    Accordion,
    AccordionItem,
    Tab,
    Tabs,
} from "@nextui-org/react";
import hljs from "highlight.js";
import "highlight.js/styles/github.min.css";
import './index.css'
import bash from "highlight.js/lib/languages/bash";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs"; // 选择一个你喜欢的主题
import toast from "react-simple-toasts";
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
                                        href="https://cysic2022.larksuite.com/docx/NErkdcvz1oSJo1x4JIEuh2LVsGb?source_type=message&from=message"
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

const tutorialList = {
    linux: [
        {
            title: "👉 Step 1: Setup",
            subTitle:
                "Start your terminal program on Linux. Copy the code below, replacing the address placeholder with your reward address, paste the code in your terminal, then press enter to run.",
            desc: `1. # replace 0x-Fill-in-your-reward-address-here to your reward address below 

2. curl -L https://github.com/cysic-labs/phase2_libs/releases/download/v1.0.0/setup_linux.sh > ~/setup_linux.sh && bash ~/setup_linux.sh 0x-Fill-in-your-reward-address-here`,
        },
        {
            title: "👉 Step 2: Start the verifier program",
            subTitle: <div className="flex flex-col gap-1">
                <span>Wait a while for the setup process script to run. Then copy and paste the below code, press enter to run.</span>
                <span>· If you see “err: rpc error”, don’t worry—just wait a few minutes for the verifier to connect. </span>
                <span>· Once connected, you’ll see a message like “start sync data from server,” indicating it’s running successfully.</span>
            </div>,
            desc: `1 cd ~/cysic-verifier/ && bash start.sh`,
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
            desc: `1 # replace 0x-Fill-in-your-reward-address-here with your reward address below

2 cd $env:USERPROFILE

3 Invoke-WebRequest  -Uri "https://github.com/cysic-3Labs/phase2 libs/releases/download/v1.0.0/setup_win.psl" -0utFile "setup_win.ps1"

4 .\\setup_win.pS1 -CLAIM_REWARD_ADDRESS "0x-Fill-in-your-reward-address-here"`,
        },
        {
            title: "👉 Step 2: Start the verifier program",
            subTitle: <div className="flex flex-col gap-1">
        <span>Wait a while for the setup process script to run. Then copy and paste the below code, press enter to run.</span>
        <span>· If you see “err: network error”, don’t worry—just wait a few minutes for the verifier to connect.</span>
        <span>· Once connected, you’ll see a message like “start sync data from server,” indicating it’s running successfully.</span>
      </div>,
            desc: `1 # run the verifier

2 cd $env:USERPROFILE\\cysic-verifier

3 .\\start.psl`,
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
            desc: `1 # replace 0x-Fill-in-your-reward-address-here with your reward address below
        
2 2 curl -L https://github.com/cysic-labs/phase2_libs/releases/download/v1.0.0/setup_mac.sh >~/setup_mac.sh && bash ~/setup_mac.sh 0x-Fill-in-your-reward-address-here`,
        },
        {
            title: "👉 Step 2: Start the verifier program",
            subTitle: <div className="flex flex-col gap-1">
            <span>Wait a while for the setup process script to run. Then copy and paste the below code, press enter to run.</span>
            <span>· If you see “err: network error”, don’t worry—just wait a few minutes for the verifier to connect.</span>
            <span>· Once connected, you’ll see a message like “start sync data from server,” indicating it’s running successfully.</span>
          </div>,
            desc: `1 cd ~/cysic-verifier/ && bash start.sh`,
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
