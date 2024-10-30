import Button from "@/components/Button";
import Input from "@/components/Input";
import {
    cosmosFee,
    cosmosReservedValue,
    cysicBaseCoin,
    cysicStCoin,
    supTokens,
} from "@/config";
import useModalState from "@/hooks/useModalState";
import useCosmos from "@/models/_global/cosmos";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { useEventListener } from "ahooks";
import { useState } from "react";
import { MsgExchangeToGovToken, MsgExchangeToPlatformToken } from "@/utils/cysic-msg";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import { calculateTransactionFee, format, sleep } from "@/utils/tools";
import { checkKeplrWallet, signAndBroadcastDirect } from "@/utils/cosmos";




// async function checkModule() {
//     const rpcEndpoint = "https://rpc.your-cosmos-chain.com"; // 替换为你的RPC端点
//     const client = await StargateClient.connect(rpcEndpoint);

//     // 检查某个模块是否存在，例如治理模块
//     const governance = await client.getGovernanceParams();
//     console.log("Governance Module:", governance);
// }

const ExchangeModal = () => {
    const { balanceMap, connector, address } = useCosmos();
    const { visible, setVisible }: any = useModalState({
        eventName: "modal_exchange_visible",
    });
    const { dispatch }: any = useModalState({
        eventName: "modal_slippage_visible",
    });

    useEventListener("modal_exchange_visible", (e: any) => {
        const fromToken = e?.detail?.fromToken;
        const toToken = e?.detail?.toToken;
        if (fromToken) {
            setFromToken(fromToken);
        }
        if (toToken) {
            setToToken(toToken);
        }
    });

    const [fromAmount, setFromAmount] = useState("");
    // const [toAmount, setToAmount] = useState('')
    const toAmount = fromAmount;
    const setToAmount = setFromAmount;
    const [fromToken, setFromToken] = useState(cysicBaseCoin);
    const [toToken, setToToken] = useState(cysicStCoin);

    const exchangeToPlatformToken = async (client: any, address: string) => {
        const amount = {
            denom: "CGT",
            amount: BigNumber(toAmount).multipliedBy(1e18).toString(),
        };
        const msg = {
            typeUrl: MsgExchangeToPlatformToken.typeUrl,
            value: MsgExchangeToPlatformToken.encode(MsgExchangeToPlatformToken.fromPartial({
                sender: address,
                amount: amount.amount,
            })).finish(),
        };

        const result = await signAndBroadcastDirect(address, msg, cosmosFee, client)

        toast.success(`Submit Success at ${result?.transactionHash}`)
    };

    

    const exchangeToGovToken = async (client: any, address: string) => {
        if (
            BigNumber(balanceMap?.[cysicBaseCoin]?.hm_amount)
                .minus(fromAmount)
                .lt(cosmosReservedValue)
        ) {
            throw { message: `Reserved Balance < ${cosmosReservedValue}` };
        }
        // 1. 构建交易参数
        const amount = {
            denom: "CYS",
            amount: BigNumber(fromAmount).multipliedBy(1e18).toString(),
        };

        const msg: any = {
            typeUrl: MsgExchangeToGovToken.typeUrl,
            value: MsgExchangeToGovToken.encode(MsgExchangeToGovToken.fromPartial({
                sender: address,
                amount: amount.amount,
            })).finish(),
        };

        const result = await signAndBroadcastDirect(address, msg, cosmosFee, client)

        toast.success(`Submit Success at ${result?.transactionHash}`)
    };

    const handleExchange = async (closeLoading?: any) => {
        try {
            checkKeplrWallet()
            if (fromToken == cysicBaseCoin) {
                await exchangeToGovToken(connector, address);
            } else {
                await exchangeToPlatformToken(connector, address);
            }
            //   setVisible(false);
            setFromAmount('')
        } catch (e: any) {
            console.log("error", e);
            toast.error(e?.message || e?.msg || e);
        } finally {
            await sleep(1000)
            dispatchEvent(new CustomEvent('refresh_cosmosBalance'))
            closeLoading?.();
        }
    };

    const toggle = () => {
        const tempDataList: any = {
            fromAmount,
            fromToken,
            toAmount,
            toToken,
        };
        setFromToken(tempDataList?.toToken);
        setFromAmount(tempDataList?.toAmount);
        setToToken(tempDataList?.fromToken);
        setToAmount(tempDataList?.fromAmount);
    };

    return (
        <Modal isOpen={visible} onOpenChange={setVisible}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Exchange</ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1 relative">
                                    {/* from */}
                                    <div className="border border-[#FFFFFF52] rounded-[16px] p-4 flex flex-col gap-3 bg-[#000000]">
                                        <span className="text-[#A3A3A3]">Sell</span>
                                        <Input
                                            value={fromAmount}
                                            onChange={setFromAmount}
                                            type="text"
                                            placeholder="0.00"
                                            className="[&_input]:flex-1 !px-0 text-2xl font-bold"
                                            suffix={
                                                <div className="text-base font-[500] flex items-center gap-2 p-2 bg-[#FFFFFF1F] rounded-full">
                                                    <img
                                                        className="size-6"
                                                        src={supTokens?.[fromToken]?.icon}
                                                    />
                                                    <div>{fromToken}</div>
                                                </div>
                                            }
                                        />
                                        <div className="flex items-center gap-1 text-[#A3A3A3] hover:text-[#00F0FF] self-end">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M13 11C13 11.2652 13.1054 11.5196 13.2929 11.7071C13.4804 11.8946 13.7348 12 14 12C14.2652 12 14.5196 11.8946 14.7071 11.7071C14.8946 11.5196 15 11.2652 15 11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11Z"
                                                    fill="#00F0FF"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M12.5 3C12.8978 3 13.2794 3.15804 13.5607 3.43934C13.842 3.72064 14 4.10218 14 4.5H5.5V5H16C16.5304 5 17.0391 5.21071 17.4142 5.58579C17.7893 5.96086 18 6.46957 18 7V15C18 15.5304 17.7893 16.0391 17.4142 16.4142C17.0391 16.7893 16.5304 17 16 17H4.182C3.89546 17 3.61172 16.9436 3.34698 16.8339C3.08225 16.7242 2.84171 16.5635 2.63909 16.3609C2.22989 15.9517 2 15.3967 2 14.818V4.5C2 4.66 2.026 4.776 2.074 4.86C2.02594 4.74602 2.00079 4.62369 2 4.5C2 3.671 3.171 3 4 3H12.5ZM14 9C13.4696 9 12.9609 9.21071 12.5858 9.58579C12.2107 9.96086 12 10.4696 12 11C12 11.5304 12.2107 12.0391 12.5858 12.4142C12.9609 12.7893 13.4696 13 14 13C14.5304 13 15.0391 12.7893 15.4142 12.4142C15.7893 12.0391 16 11.5304 16 11C16 10.4696 15.7893 9.96086 15.4142 9.58579C15.0391 9.21071 14.5304 9 14 9Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span onClick={()=>setFromAmount(format(balanceMap?.[fromToken]?.hm_amount, 3))}>{format(balanceMap?.[fromToken]?.hm_amount, 3) || "-"}</span>
                                        </div>
                                    </div>

                                    {/* exchange */}
                                    <div
                                        onClick={toggle}
                                        className="cursor-pointer absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                                    >
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="0.5"
                                                y="0.5"
                                                width="39"
                                                height="39"
                                                rx="11.5"
                                                fill="black"
                                            />
                                            <rect
                                                x="0.5"
                                                y="0.5"
                                                width="39"
                                                height="39"
                                                rx="11.5"
                                                stroke="#2B2B2B"
                                            />
                                            <path
                                                d="M16.6011 13.399C16.4417 13.2396 16.2255 13.1501 16 13.1501C15.7746 13.1501 15.5584 13.2396 15.399 13.399L11.399 17.399C11.067 17.731 11.067 18.2692 11.399 18.6011C11.7309 18.9331 12.2691 18.9331 12.6011 18.6011L15.15 16.0522V26.0002C15.15 26.4696 15.5305 26.8502 16 26.8502C16.4694 26.8502 16.85 26.4696 16.85 26.0002V16.0521L19.399 18.6011C19.7309 18.9331 20.2691 18.9331 20.6011 18.6011C20.933 18.2692 20.933 17.731 20.6011 17.399L16.6011 13.399Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M23.15 23.948L20.601 21.399C20.2691 21.067 19.7309 21.067 19.3989 21.399C19.067 21.7309 19.067 22.2691 19.3989 22.6011L23.3989 26.6011C23.7309 26.933 24.2691 26.933 24.601 26.6011L28.601 22.6011C28.933 22.2691 28.933 21.7309 28.601 21.399C28.2691 21.0671 27.7309 21.0671 27.3989 21.399L24.85 23.9479L24.85 14.0002C24.85 13.5307 24.4695 13.1502 24 13.1502C23.5306 13.1502 23.15 13.5307 23.15 14.0002L23.15 23.948Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>

                                    {/* to */}
                                    <div className="border border-[#FFFFFF52] rounded-[16px] p-4 flex flex-col gap-3 bg-[#000000]">
                                        <span className="text-[#A3A3A3]">Buy</span>
                                        <Input
                                            value={toAmount}
                                            onChange={setToAmount}
                                            type="text"
                                            placeholder="0.00"
                                            className="[&_input]:flex-1 !px-0 text-2xl font-bold"
                                            suffix={
                                                <div className="text-base font-[500] flex items-center gap-2 p-2 bg-[#FFFFFF1F] rounded-full">
                                                    <img
                                                        className="size-6"
                                                        src={supTokens?.[toToken]?.icon}
                                                    />
                                                    <div>{toToken}</div>
                                                </div>
                                            }
                                        />
                                        <div className="flex items-center gap-1 text-[#A3A3A3] hover:text-[#00F0FF] self-end">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M13 11C13 11.2652 13.1054 11.5196 13.2929 11.7071C13.4804 11.8946 13.7348 12 14 12C14.2652 12 14.5196 11.8946 14.7071 11.7071C14.8946 11.5196 15 11.2652 15 11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M12.5 3C12.8978 3 13.2794 3.15804 13.5607 3.43934C13.842 3.72064 14 4.10218 14 4.5H5.5V5H16C16.5304 5 17.0391 5.21071 17.4142 5.58579C17.7893 5.96086 18 6.46957 18 7V15C18 15.5304 17.7893 16.0391 17.4142 16.4142C17.0391 16.7893 16.5304 17 16 17H4.182C3.89546 17 3.61172 16.9436 3.34698 16.8339C3.08225 16.7242 2.84171 16.5635 2.63909 16.3609C2.22989 15.9517 2 15.3967 2 14.818V4.5C2 4.66 2.026 4.776 2.074 4.86C2.02594 4.74602 2.00079 4.62369 2 4.5C2 3.671 3.171 3 4 3H12.5ZM14 9C13.4696 9 12.9609 9.21071 12.5858 9.58579C12.2107 9.96086 12 10.4696 12 11C12 11.5304 12.2107 12.0391 12.5858 12.4142C12.9609 12.7893 13.4696 13 14 13C14.5304 13 15.0391 12.7893 15.4142 12.4142C15.7893 12.0391 16 11.5304 16 11C16 10.4696 15.7893 9.96086 15.4142 9.58579C15.0391 9.21071 14.5304 9 14 9Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span onClick={()=>setFromAmount(format(balanceMap?.[toToken]?.hm_amount, 3))}>{format(balanceMap?.[toToken]?.hm_amount, 3) || "-"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-[#A3A3A3]">
                                    1 {cysicBaseCoin} = 1 {cysicStCoin}
                                </div>

                                <div className="flex flex-col gap-2">
                                    {/* <div className="flex items-center justify-between">
                                    <span className="text-[#A3A3A3]">Max. slippage:</span>
                                    <div className="flex items-center gap-1 cursor-pointer" onClick={()=>dispatch({visible: true})}>
                                        <span>0.5%</span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.00062 5.07815C7.24293 5.07815 6.51628 5.38603 5.98051 5.93406C5.44474 6.48208 5.14375 7.22536 5.14375 8.00039C5.14375 8.77541 5.44474 9.5187 5.98051 10.0667C6.51628 10.6147 7.24293 10.9226 8.00062 10.9226C8.75831 10.9226 9.48496 10.6147 10.0207 10.0667C10.5565 9.5187 10.8575 8.77541 10.8575 8.00039C10.8575 7.22536 10.5565 6.48208 10.0207 5.93406C9.48496 5.38603 8.75831 5.07815 8.00062 5.07815ZM8.00062 9.94855C7.49549 9.94855 7.01106 9.7433 6.65388 9.37795C6.2967 9.01259 6.09604 8.51707 6.09604 8.00039C6.09604 7.48371 6.2967 6.98818 6.65388 6.62283C7.01106 6.25748 7.49549 6.05223 8.00062 6.05223C8.50574 6.05223 8.99018 6.25748 9.34736 6.62283C9.70454 6.98818 9.9052 7.48371 9.9052 8.00039C9.9052 8.51707 9.70454 9.01259 9.34736 9.37795C8.99018 9.7433 8.50574 9.94855 8.00062 9.94855ZM14.5441 6.73409C14.5307 6.66563 14.5031 6.60092 14.4631 6.54434C14.4231 6.48776 14.3717 6.44063 14.3124 6.40615L12.5373 5.37038L12.5297 3.32351C12.5295 3.25305 12.5143 3.18347 12.4853 3.11957C12.4562 3.05567 12.414 2.99897 12.3615 2.95336C11.7175 2.39614 10.976 1.96907 10.1763 1.69485C10.1132 1.67308 10.0464 1.66506 9.98015 1.67133C9.91389 1.67759 9.84964 1.69799 9.79156 1.73122L8.00125 2.75465L6.20778 1.72862C6.14969 1.6954 6.08545 1.67499 6.01918 1.66873C5.95292 1.66247 5.8861 1.67048 5.82305 1.69226C5.02345 1.96863 4.28238 2.39767 3.63914 2.95661C3.58666 3.00211 3.54445 3.05871 3.51541 3.12249C3.48637 3.18628 3.47118 3.25575 3.4709 3.32611L3.46201 5.37492L1.68694 6.4094C1.62753 6.44394 1.57608 6.49117 1.53609 6.54787C1.49611 6.60457 1.46853 6.66941 1.45522 6.73798C1.29268 7.57334 1.29268 8.43328 1.45522 9.26864C1.46853 9.33721 1.49611 9.40205 1.53609 9.45875C1.57608 9.51545 1.62753 9.56268 1.68694 9.59723L3.46265 10.6323L3.46899 12.6792C3.46926 12.7497 3.4845 12.8194 3.51366 12.8833C3.54282 12.9472 3.5852 13.0039 3.63787 13.0494C4.28197 13.6067 5.02373 14.0338 5.82369 14.3079C5.88665 14.3296 5.95334 14.3375 6.01949 14.3313C6.08564 14.325 6.14978 14.3046 6.20778 14.2715L8.00062 13.2455L9.79346 14.2715C9.85153 14.3048 9.91583 14.3252 9.98215 14.3312C10.0485 14.3373 10.1153 14.3289 10.1782 14.3066C10.9776 14.0308 11.7187 13.6024 12.3621 13.0442C12.4145 12.9986 12.4566 12.942 12.4855 12.8782C12.5144 12.8144 12.5295 12.745 12.5297 12.6747L12.5386 10.6259L14.3143 9.59138C14.3738 9.55677 14.4253 9.50944 14.4653 9.45262C14.5053 9.3958 14.5328 9.33084 14.546 9.26215C14.7075 8.42771 14.7068 7.56827 14.5441 6.73409ZM13.6515 8.86018L11.9507 9.84919C11.8763 9.8925 11.8147 9.95554 11.7723 10.0317C11.738 10.0927 11.7018 10.1576 11.6644 10.218C11.6172 10.2949 11.5921 10.3838 11.592 10.4746L11.5831 12.4376C11.126 12.8049 10.6167 13.0986 10.0728 13.3085L8.35805 12.3305C8.28671 12.2903 8.20649 12.2695 8.12505 12.2701H7.89714C7.81208 12.2678 7.72797 12.2887 7.65335 12.3305L5.93669 13.3111C5.39181 13.1028 4.88121 12.8107 4.42255 12.4448L4.4162 10.4843C4.41584 10.3933 4.39054 10.3042 4.34319 10.2271C4.30555 10.1662 4.26977 10.104 4.2359 10.0408C4.19399 9.96368 4.13259 9.89954 4.05814 9.85504L2.35545 8.86277C2.26739 8.2929 2.26739 7.71242 2.35545 7.14255L4.05306 6.15159C4.12725 6.10818 4.18866 6.04515 4.23082 5.96911C4.26574 5.90807 4.30193 5.84313 4.33875 5.78274C4.38617 5.70595 4.41148 5.61705 4.41176 5.52623L4.42065 3.56314C4.8776 3.19594 5.38671 2.90228 5.93034 2.69231L7.64383 3.67029C7.71835 3.71234 7.80254 3.7332 7.88761 3.73068H8.1041C8.18937 3.73306 8.27372 3.71222 8.34852 3.67029L10.0645 2.68971C10.6099 2.89752 11.1203 3.18974 11.5787 3.55599L11.585 5.51649C11.5857 5.6074 11.6104 5.69637 11.658 5.77365C11.6949 5.83404 11.7311 5.89508 11.7653 5.95937C11.8072 6.0373 11.8688 6.10159 11.9437 6.14574L13.6458 7.13736C13.7347 7.70817 13.7366 8.28937 13.649 8.86018H13.6515Z" fill="#A3A3A3" />
                                        </svg>
                                    </div>
                                </div> */}

                                    <div className="flex items-center justify-between">
                                        <span className="text-[#A3A3A3]">Receive at least</span>
                                        <div className="flex items-center gap-1">
                                            <span>{fromAmount || "-"}</span>
                                            <span className="text-[#A3A3A3]">{toToken}</span>
                                        </div>
                                    </div>
                                    {/* 
                                <div className="flex items-center justify-between">
                                    <span className="text-[#A3A3A3]">Fee(0.25%):</span>
                                    <div className="flex items-center gap-1">
                                        <span>$1.23</span>
                                    </div>
                                </div> */}

                                    <div className="flex items-center justify-between">
                                        <span className="text-[#A3A3A3]">Network cost:</span>
                                        <div className="flex items-center gap-1">
                                            <svg
                                                width="10"
                                                height="14"
                                                viewBox="0 0 10 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_1568_156223)">
                                                    <path
                                                        d="M9.97131 6.19803C9.91798 6.07737 9.79866 6.00003 9.66666 6.00003H6.66666V1.00003C6.66666 0.862034 6.58201 0.738037 6.45267 0.688704C6.32267 0.638704 6.17799 0.674696 6.08532 0.776696L0.0853237 7.44336C-0.00267633 7.54136 -0.0253169 7.68137 0.0286831 7.80204C0.0820164 7.9227 0.20133 8.00003 0.33333 8.00003H3.33333V13C3.33333 13.138 3.41799 13.262 3.54732 13.3114C3.58665 13.326 3.62666 13.3334 3.66666 13.3334C3.75933 13.3334 3.85 13.2947 3.91467 13.2227L9.91467 6.55603C10.0027 6.4587 10.0246 6.31803 9.97131 6.19803Z"
                                                        fill="url(#paint0_linear_1568_156223)"
                                                    />
                                                </g>
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_1568_156223"
                                                        x1="1.49963"
                                                        y1="-11.6017"
                                                        x2="10.6573"
                                                        y2="-11.6017"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#01F0FF" />
                                                        <stop offset="1" stopColor="#9D48FF" />
                                                    </linearGradient>
                                                    <clipPath id="clip0_1568_156223">
                                                        <rect width="10" height="14" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <span>{calculateTransactionFee()}{cysicBaseCoin}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                needLoading
                                className="w-full !text-[#000]"
                                type="gradient"
                                onClick={handleExchange}
                            >
                                Exchange
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ExchangeModal;
