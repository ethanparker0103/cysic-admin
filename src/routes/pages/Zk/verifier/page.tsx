// @ts-nocheck
import Button from "@/components/Button";
import { getImageUrl, handleMultiplierModal, handleReserveModal } from "@/utils/tools";
import { ArrowRight, CircleHelp } from "lucide-react";
import GradientBorderCard from "@/components/GradientBorderCard";
import Tooltip from "@/components/Tooltip";
import axios from "@/service";
import { useRequest } from "ahooks";
import useAccount from "@/hooks/useAccount";
import { isMobile } from "react-device-detect";
import { cn, Divider, Tab, Tabs } from "@nextui-org/react";
import { downloadLink } from "@/config";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs"; // 选择一个你喜欢的主题
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

const guide = {
    ["Android"]: {
        totalStep: 3,
        steps: [
            {
                title: "Install The APP",
                desc: (
                    <div className="flex flex-col gap-6">
                        <span>Download the official Cysic Verifier App</span>

                        <div className={cn("flex gap-4 items-center", isMobile ? "flex-col" : "flex-row")}>
                            <GradientBorderCard className=" p-6 bg-[#FFFFFF0D]">
                                <div className="flex items-center gap-1">
                                    <img
                                        className="size-8"
                                        src={getImageUrl(
                                            "@/assets/images/tutorial/android_bot.svg"
                                        )}
                                    />
                                    <div className="!text-[32px] !font-[400]">
                                        Download the APK Android
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 justify-between mt-4">
                                    <a href={downloadLink.andorid} className="flex items-center gap-1 text-sub text-sm">
                                        <span>Download</span>
                                        <ArrowRight width={16} height={16} />
                                    </a>
                                    <Tooltip
                                        closeDelay={0}
                                        disableAnimation
                                        classNames={{
                                            content: "bg-[#2A313B]",
                                        }}
                                        content={
                                            <div className="p-5 rounded-[12px] bg-[#2A313B] flex flex-col items-center gap-3">
                                                <img
                                                    className="size-[10.25rem]"
                                                    src={getImageUrl(
                                                        "@/assets/images/tutorial/cysic_prover_app.png"
                                                    )}
                                                />
                                                <div className="text-sm">Scan to Download</div>
                                            </div>
                                        }
                                    >
                                        <div className="p-2 rounded-[12px] cursor-pointer hover:bg-[#2A313B]">
                                            <img
                                                className="size-8"
                                                src={getImageUrl(
                                                    "@/assets/images/tutorial/qrcode_trigger.svg"
                                                )}
                                            />
                                        </div>
                                    </Tooltip>
                                </div>
                            </GradientBorderCard>

                            <GradientBorderCard className=" p-6 bg-[#FFFFFF0D]">
                                <div className="flex items-center gap-1">
                                    <img
                                        className="size-8"
                                        src={getImageUrl(
                                            "@/assets/images/download/google-play_icon_white.svg"
                                        )}
                                    />
                                    <div className="!text-[32px] !font-[400]">
                                        Download from Google Play
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 justify-between mt-4">
                                    <a href={downloadLink.googlePlay} className="flex items-center gap-1 text-sub text-sm">
                                        <span>Google Play </span>
                                        <ArrowRight width={16} height={16} />
                                    </a>
                                    <div
                                        onClick={() =>
                                            window.open(downloadLink.googlePlay, "_blank")
                                        }
                                        className="flex items-center pr-2 cursor-pointer"
                                    >
                                        <img
                                            className="w-[9.25rem]"
                                            src={getImageUrl(
                                                "@/assets/images/download/google-play.svg"
                                            )}
                                        />
                                    </div>
                                </div>
                            </GradientBorderCard>
                        </div>
                    </div>
                ),
            },
            {
                title: "Import Your Wallet",
                desc: "Import your wallet seed phrase. Cysic does not store any seed phrases or private keys. Please ensure the security of your wallet information.",
            },
            {
                title: "Start VerifIcation",
                desc: "Click the Start Verification button on the main interface to begin the Verifier process. After starting verifier, Cysic App can switch to backstage operating. You can start or stop the verification work at any time. ",
            },
        ],
    },
    ["Linux"]: {
        totalStep: 3,
        steps: [
            {
                title: "Setup",
                desc: "Start your terminal program on Linux. Copy the code below, replacing the address placeholder with your reward address, then run it in your terminal.",
                code: `# replace 0x-Fill-in-your-reward-address-here with your reward address below
            
curl -L https://github.com/cysic-labs/phase2_libs/releases/download/v1.0.0/setup_linux.sh > ~/setup_linux.sh && bash ~/setup_linux.sh 0x-Fill-in-your-reward-address-here`,
            },
            {
                title: "Start the verifier program",
                desc: (
                    <div className="flex flex-col gap-1">
                        <span>
                            Wait a while for the setup process script to run. Then copy and
                            paste the below code, press enter to run.
                        </span>
                        <span>
                            · If you see “err: rpc error”, don’t worry—just wait a few minutes
                            for the verifier to connect.{" "}
                        </span>
                        <span>
                            · Once connected, you’ll see a message like “start sync data from
                            server,” indicating it’s running successfully.
                        </span>
                    </div>
                ),
                code: `cd ~/cysic-verifier/ && bash start.sh`,
            },
            {
                title: "Success",
                desc: (
                    <>
                        If you need to reconnect the verifier, please execute Step 2 again.
                        <br />
                        *The verifier program will create mnemonic files for you. Your
                        submitted address mnemonic file is in: ～/.cysic/keys/ folder,
                        please keep it or you can not run the verifier program again.
                    </>
                ),
            },
        ],
    },
    ["Windows"]: {
        totalStep: 3,
        steps: [
            {
                title: "Setup",
                desc: "Start your terminal program on Linux. Copy the code below, replacing the address placeholder with your reward address, paste the code in your terminal, then press enter to run.",
                code: `# replace 0x-Fill-in-your-reward-address-here with your reward address below

cd $env:USERPROFILE

Invoke-WebRequest -Uri "https://github.com/cysic-labs/phase2_libs/releases/download/v1.0.0/setup_win.ps1" -OutFile "setup_win.ps1"

.\\setup_win.ps1 -CLAIM_REWARD_ADDRESS "0x-Fill-in-your-reward-address-here" `,
            },
            {
                title: "Start the verifier program",
                desc: (
                    <div className="flex flex-col gap-1">
                        <span>
                            Wait a while for the setup process script to run. Then copy and
                            paste the below code, press enter to run.
                        </span>
                        <span>
                            · If you see “err: rpc error”, don’t worry—just wait a few minutes
                            for the verifier to connect.{" "}
                        </span>
                        <span>
                            · Once connected, you’ll see a message like “start sync data from
                            server,” indicating it’s running successfully.
                        </span>
                    </div>
                ),
                code: `# run the verifier

cd $env:USERPROFILE\\cysic-verifier

.\\start.ps1`,
            },
            {
                title: "Success",
                desc: (
                    <div className="flex flex-col gap-1">
                        <span>
                            If you need to reconnect the verifier, please execute Step 2
                            again.
                        </span>
                        <span>
                            *The verifier program will create mnemonic files for you. Your
                            submitted address mnemonic file is in: ～/.cysic/keys/ folder,
                            please keep it or you can not run the verifier program again.
                        </span>
                    </div>
                ),
            },
        ],
    },
    ["MacOS"]: {
        totalStep: 3,
        steps: [
            {
                title: "Setup",
                desc: `Open your terminal first. Copy the code below, replacing the address placeholder with your reward address, then press to run.`,
                code: `# replace 0x-Fill-in-your-reward-address-here with your reward address below

curl -L https://github.com/cysic-labs/phase2_libs/releases/download/v1.0.0/setup_mac.sh > ~/setup_mac.sh && bash ~/setup_mac.sh 0x-Fill-in-your-reward-address-here`,
            },
            {
                title: "Start the verifier program",
                desc: (
                    <div className="flex flex-col gap-1">
                        <span>
                            Wait a while for the setup process script to run. Then copy and
                            paste the below code, press enter to run.
                        </span>
                        <span>
                            · If you see “err: network error”, don’t worry—just wait a few
                            minutes for the verifier to connect.
                        </span>
                        <span>
                            · Once connected, you’ll see a message like “start sync data from
                            server,” indicating it’s running successfully.
                        </span>
                    </div>
                ),
                code: `cd ~/cysic-verifier/ && bash start.sh`,
            },
            {
                title: "Success",
                desc: (
                    <div className="flex flex-col gap-1">
                        <span>
                            If you need to reconnect the verifier, please execute Step 2
                            again.
                        </span>
                        <span>
                            *The verifier program will create mnemonic files for you. Your
                            submitted address mnemonic file is in: ～/.cysic/keys/ folder,
                            please keep it or you can not run the verifier program again.
                        </span>
                    </div>
                ),
            },
        ],
    },
};

const GuideStepCard = ({
    step,
    totalStep,
    title,
    description,
    code,
}: // children,
    {
        step: number;
        totalStep: number;
        title: string;
        description?: string | React.ReactNode;
        code?: string;
        // children?: React.ReactNode;
    }) => {
    const handleCopy = (v: string) => {
        copy(v);
        toast("copied");
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div className="text-base font-[400]">
                    Step {step}/{totalStep}
                </div>
                <div className="title !text-xl !font-light">{title}</div>
            </div>
            {description ? (
                <>
                    <p className="text-sub text-sm font-[400]">{description}</p>
                </>
            ) : null}

            {/* {children} */}
            {code ? (
                <div className={
                    cn("relative bg-[#FFFFFF0D] rounded-[16px] p-4 flex items-center justify-between ", isMobile ? "flex-col gap-6" : "gap-10")
                }>
                    <SyntaxHighlighter
                        language="bash"
                        style={github}
                        className="flex-1 w-full break-words rounded-md !bg-[#FFFFFF0D] !text-[#fff] [&>code]:!whitespace-break-spaces  [&>code]:leading-4"
                    >
                        {code}
                    </SyntaxHighlighter>
                    <Button
                        type="solid"
                        className="cursor-pointer px-6 py-2 text-base max-h-10"
                        onClick={() => handleCopy(code)}
                    >
                        Copy
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

const SelfProverStepCard = ({
    step,
    title,
    description,
    buttonText,
    children,
    onClick,
}: {
    step: number;
    title: string;
    description?: string | React.ReactNode;
    buttonText?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <div className="mb-8">
            <div className="flex flex-col items-start">
                <div
                    className={cn(
                        "w-full flex ",
                        isMobile ? "flex-col" : "justify-between items-start"
                    )}
                >
                    <div className="flex flex-col">
                        <div className="!text-base !font-light title">Step {step}/2</div>
                        <h3
                            className={cn(
                                "title uppercase !font-light mb-2",
                                isMobile ? "!text-2xl" : "!text-3xl"
                            )}
                        >
                            {title}
                        </h3>
                    </div>
                    {buttonText ? (
                        <Button
                            onClick={onClick}
                            type="light"
                            className="rounded-lg px-12 py-3 min-h-fit h-fit !text-base !font-[400]"
                        >
                            {buttonText}
                        </Button>
                    ) : null}
                </div>

                <div className="flex-1 mt-4">
                    <p className="text-sub text-sm mb-4">{description}</p>
                </div>

                <div className="flex items-center gap-2 uppercase text-sm !font-[400] text-sub cursor-pointer hover:text-white transition-colors">
                    <span>Click here to know how to earn CGT</span>
                    <ArrowRight width={16} height={16} />
                </div>
            </div>
            {children || <div className="border-b border-white/10 mt-6"></div>}
        </div>
    );
};

const VerifierPage = () => {
    const { address, isRegistered } = useAccount();

    // 获取ZK任务概览信息
    const { data: zkTaskOverview } = useRequest(
        () => axios.get("/api/v1/zkTask/overview"),
        {
            onSuccess: (res) => {
                console.log("ZK任务概览数据:", res?.data);
            },
            ready: !!address && !!isRegistered,
            refreshDeps: [address, isRegistered],
        }
    );

    const verifierStatus = zkTaskOverview?.data?.verifierStatus || {
        standardActive: 0,
        mobileActive: 0,
    };

    const multiplierPercent = zkTaskOverview?.data?.multiplierPercent || 0;


    return (
        <div className="min-h-screen w-full pb-12 overflow-hidden">
            {/* 主标题 */}
            <div className="pt-12 flex flex-col items-center gap-6 relative z-[2]">
                <div className="flex flex-col items-center">
                    <span className="title !text-4xl !font-light !text-[#fff] text-center">
                        VERIFIER
                    </span>
                </div>
            </div>

            {/* 主要内容部分 */}
            <div className="container mx-auto mt-12 relative z-[2]">
                {/* 第一部分：成为 Prover */}
                <GradientBorderCard borderRadius={8} className="mb-4">
                    <div className={cn("w-full", isMobile ? "px-6 py-4" : "p-8")}>
                        <div className="flex flex-col gap-2 mb-6 ">
                            <h1
                                className={cn(
                                    "title !font-light uppercase",
                                    isMobile ? "!text-2xl" : "!text-4xl"
                                )}
                            >
                                Scale Up, Verify More, Earn More
                            </h1>
                            <h2
                                className={cn(
                                    "title !font-light uppercase mt-2",
                                    isMobile ? "!text-base" : "!text-xl"
                                )}
                            >
                                Run a lightweight node to support proof verification,
                                strengthening the network's security and scalability
                            </h2>
                        </div>

                        <p className="text-white !font-[400] text-base mb-6">
                            You can also maximize your earnings as a Cysic ZK Verifier by
                            running multiple devices-pC, servers, and Cysic official Android
                            App. You can also boost your rewards by increasing your
                            Multiplier, The more you verify, the more you earn.
                        </p>
                    </div>
                </GradientBorderCard>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* ZK VERIFIER STATUS */}
                    <GradientBorderCard borderRadius={8}>
                        <div
                            className={cn(
                                "w-full px-6 py-4 flex justify-between items-center",
                                isMobile ? "flex-col gap-4" : ""
                            )}
                        >
                            <div className="flex flex-col gap-4 w-full">
                                <h3 className="!text-base !font-light title uppercase">
                                    ZK VERIFIER STATUS
                                </h3>
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-3 h-3 rounded-full ${verifierStatus.standardActive
                                            ? "bg-green-500"
                                            : "bg-gray-500"
                                            }`}
                                    ></div>
                                    <span className="!font-light !text-sm title uppercase">
                                        STANDARD{" "}
                                        {verifierStatus.standardActive ? "ACTIVE" : "INACTIVE"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-3 h-3 rounded-full ${verifierStatus.mobileActive
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                            }`}
                                    ></div>
                                    <span className="!font-light !text-sm title uppercase">
                                        MOBILE {verifierStatus.mobileActive ? "ACTIVE" : "INACTIVE"}
                                    </span>
                                </div>
                            </div>
                            <Button
                                type="solid"
                                className={cn(
                                    "min-h-fit h-fit px-6 py-6",
                                    isMobile ? "w-full" : ""
                                )}
                            >
                                <div className="flex items-center justify-center gap-2 text-base !font-[400]">
                                    <span>DOWNLOAD OUR ANDROID APP</span>
                                    <ArrowRight size={16} />
                                </div>
                            </Button>
                        </div>
                    </GradientBorderCard>

                    {/* MULTIPLIER */}
                    <GradientBorderCard borderRadius={8}>
                        <div className="w-full px-6 py-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="!text-base !font-light title uppercase">
                                        MULTIPLIER
                                    </h3>
                                    <Tooltip
                                        classNames={{
                                            content: "!p-0",
                                        }}
                                        content={<>desc</>}
                                    >
                                        <div className="flex items-center">
                                            <CircleHelp width={12} height={12} />
                                        </div>
                                    </Tooltip>
                                </div>

                                <div className="flex items-center gap-2 cursor-pointer" onClick={handleMultiplierModal}>
                                    <span className="text-sub text-sm !font-[400]">SPEED UP</span>
                                    <Tooltip
                                        classNames={{
                                            content: "!p-0",
                                        }}
                                        content={<>{multiplierPercent + "%"}</>}
                                    >
                                        <div className="flex items-center">
                                            <CircleHelp width={12} height={12} />
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="w-full h-3 bg-[#FFFFFF4D] rounded-full overflow-hidden mb-6">
                                <div
                                    style={{ width: multiplierPercent + "%" }}
                                    className="h-full bg-gradient-to-r from-purple-600 via-blue-400 to-green-300 rounded-full"
                                ></div>
                            </div>

                            <div className="flex justify-end items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                    <span className="!text-sm !font-[400] title">HIGH SPEED</span>
                                </div>
                            </div>
                        </div>
                    </GradientBorderCard>
                </div>

                <div
                    className={cn(
                        "title text-center !text-[36px]",
                        isMobile ? "my-6" : "my-12"
                    )}
                >
                    Becoming a Cysic ZK verifier
                </div>

                <div className="flex flex-col">
                    <SelfProverStepCard
                        step={1}
                        title="RESERVE 100 CGT"
                        description={
                            <>
                                To become a Verifier on Cysic ZK, you need to reserve at least
                                100 CGT as collateral. <br /> Cysic will oversee Verifier
                                actions, retaining this collateral if any irregular behavior
                                occurs to protect Cysic ZK's operation.
                            </>
                        }
                        buttonText="RESERVE"
                        onClick={handleReserveModal}
                    />

                    <SelfProverStepCard
                        step={2}
                        title="Follow the corresponding tutorials based on your terminal machine"
                    >
                        <GradientBorderCard
                            borderRadius={8}
                            className="flex flex-col gap-4 py-8 px-6 mt-6"
                        >
                            <div className="!text-xl title !font-light">
                                Tutorial: Run Cysic Verifier Node in simple steps
                            </div>
                            <div className="text-sm text-sub">
                                For more details, see the full Verifier Tutorial Doc
                            </div>

                            <div className="flex flex-col gap-4">
                                <Tabs
                                    key={"underlined"}
                                    aria-label="Tabs variants"
                                    variant={"underlined"}
                                    classNames={{
                                        tabList: "w-full border-b border-white/30",
                                        panel: "!p-0",
                                    }}
                                    className="w-full"
                                >
                                    <Tab key="Android" title="Android">
                                        <div className={cn("bg-[#FFFFFF0D] w-full p-4 flex gap-6", isMobile ?"flex-col" :"")}>
                                            <div className="flex-1">

                                                <GuideStepCard
                                                    step={1}
                                                    totalStep={3}
                                                    title={guide["Android"].steps[0].title}
                                                    description={guide["Android"].steps[0].desc}
                                                    code={guide["Android"].steps[0].code}
                                                />
                                                <Divider className="bg-[#FFFFFF4D] my-6" />
                                                <GuideStepCard
                                                    step={2}
                                                    totalStep={3}
                                                    title={guide["Android"].steps[1].title}
                                                    description={guide["Android"].steps[1].desc}
                                                    code={guide["Android"].steps[1].code}
                                                />
                                                <Divider className="bg-[#FFFFFF4D] my-6" />
                                                <GuideStepCard
                                                    step={3}
                                                    totalStep={3}
                                                    title={guide["Android"].steps[2].title}
                                                    description={guide["Android"].steps[2].desc}
                                                    code={guide["Android"].steps[2].code}
                                                />
                                            </div>

                                            <div className="flex flex-col items-center gap-2">
                                                <div className="text-base text-sub">Cysic Verifier App Video Guide</div>

                                                <div className="p-4 self-center mx-auto max-w-[20.625rem] min-w-[15rem] ">
                                                    <div className="rounded-[12px] p-3 bg-[#FFFFFF33]">
                                                        <video controls preload="auto" className="aspect-[240/520]" poster="/tutorial_poster.png" muted>
                                                            <source src="https://api-testnet.prover.xyz/images/20ab22cdf245e99ffd59c5fd8806c9d3c853344d266f3d0ef31b288f41b299b6.mp4" type="video/mp4" />
                                                        </video>
                                                    </div>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </Tab>
                                    <Tab key="Linux" title="Linux">
                                        <div className="bg-[#FFFFFF0D] w-full p-4">
                                            <GuideStepCard
                                                step={1}
                                                totalStep={3}
                                                title={guide["Linux"].steps[0].title}
                                                description={guide["Linux"].steps[0].desc}
                                                code={guide["Linux"].steps[0].code}
                                            />
                                            <Divider className="bg-[#FFFFFF4D] my-6" />
                                            <GuideStepCard
                                                step={2}
                                                totalStep={3}
                                                title={guide["Linux"].steps[1].title}
                                                description={guide["Linux"].steps[1].desc}
                                                code={guide["Linux"].steps[1].code}
                                            />
                                            <Divider className="bg-[#FFFFFF4D] my-6" />
                                            <GuideStepCard
                                                step={3}
                                                totalStep={3}
                                                title={guide["Linux"].steps[2].title}
                                                description={guide["Linux"].steps[2].desc}
                                                code={guide["Linux"].steps[2].code}
                                            />
                                        </div>
                                    </Tab>
                                    <Tab key="Windows" title="Windows">
                                        <div className="bg-[#FFFFFF0D] w-full p-4">
                                            <GuideStepCard
                                                step={1}
                                                totalStep={3}
                                                title={guide["Windows"].steps[0].title}
                                                description={guide["Windows"].steps[0].desc}
                                                code={guide["Windows"].steps[0].code}
                                            />
                                            <Divider className="bg-[#FFFFFF4D] my-6" />
                                            <GuideStepCard
                                                step={2}
                                                totalStep={3}
                                                title={guide["Windows"].steps[1].title}
                                                description={guide["Windows"].steps[1].desc}
                                                code={guide["Windows"].steps[1].code}
                                            />
                                            <Divider className="bg-[#FFFFFF4D] my-6" />
                                            <GuideStepCard
                                                step={3}
                                                totalStep={3}
                                                title={guide["Windows"].steps[2].title}
                                                description={guide["Windows"].steps[2].desc}
                                                code={guide["Windows"].steps[2].code}
                                            />
                                        </div>
                                    </Tab>
                                    <Tab key="MacOS" title="MacOS">
                                        <div className="bg-[#FFFFFF0D] w-full p-4">
                                            <GuideStepCard
                                                step={1}
                                                totalStep={3}
                                                title={guide["MacOS"].steps[0].title}
                                                description={guide["MacOS"].steps[0].desc}
                                                code={guide["MacOS"].steps[0].code}
                                            />
                                            <Divider className="bg-[#FFFFFF4D] my-6" />
                                            <GuideStepCard
                                                step={2}
                                                totalStep={3}
                                                title={guide["MacOS"].steps[1].title}
                                                description={guide["MacOS"].steps[1].desc}
                                                code={guide["MacOS"].steps[1].code}
                                            />
                                            <Divider className="bg-[#FFFFFF4D] my-6" />
                                            <GuideStepCard
                                                step={3}
                                                totalStep={3}
                                                title={guide["MacOS"].steps[2].title}
                                                description={guide["MacOS"].steps[2].desc}
                                                code={guide["MacOS"].steps[2].code}
                                            />
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </GradientBorderCard>
                    </SelfProverStepCard>
                </div>
            </div>
        </div>
    );
};

export default VerifierPage;
