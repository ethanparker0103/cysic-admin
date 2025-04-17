import Button from "@/components/Button";
import useModalState from "@/hooks/useModalState";
import Modal from "@/components/Modal";
import { ModalBody, ModalHeader } from "@nextui-org/react";
import useCosmos from "@/models/_global/cosmos";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import { checkKeplrWallet, checkTx, signAndBroadcastDirect } from "@/utils/cosmos";
import { useState } from "react";
import BigNumber from "bignumber.js";
import { cosmosFee_lower, cysicBaseCoin } from "@/config";
import { DepositType, MsgDeposit, MsgWithdraw } from "@/utils/cysic-msg";
import useAccount from "@/hooks/useAccount";

const CosmosDepositModal = () => {
    const { address, balanceMap, depositMap, connector } = useCosmos()
    const { address: evmAddress } = useAccount()
    const { visible, setVisible } = useModalState({ eventName: "modal_cosmos_deposit_visible" });

    const [proverValue, setProverValue] = useState()
    const [verifierValue, setVerifierValue] = useState()


    const handleDepositProver = async (closeLoading: any) => {
        try {
            checkKeplrWallet()

            const msgContent = {
                depositType: DepositType.PROVER_DEPOSIT_TYPE,
                amount: BigNumber(proverValue || 0).multipliedBy(1e18).toString(),
                sender: evmAddress,
            }

            console.log(msgContent)
            const msg = {
                typeUrl: MsgDeposit.typeUrl,
                value: MsgDeposit.encode(MsgDeposit.fromPartial(msgContent)).finish(),
            };
            const result = await signAndBroadcastDirect(address, msg, cosmosFee_lower, connector)
            await checkTx(connector, result?.transactionHash)

            toast.success("Deposit Success");
            dispatchEvent(new CustomEvent("refresh_cosmosBalance"));
        } catch (e: any) {
            console.log("error", e);
            const msg = e?.response?.data?.msg || e?.message
        } finally {
            closeLoading?.()
        }
    }
    const handleWithdrawProver = async (closeLoading: any) => {
        try {
            checkKeplrWallet()

            const msgContent = {
                depositType: DepositType.PROVER_DEPOSIT_TYPE,
                amount: BigNumber(proverValue || 0).multipliedBy(1e18).toString(),
                sender: evmAddress,
            }

            console.log(msgContent)
            const msg = {
                typeUrl: MsgWithdraw.typeUrl,
                value: MsgWithdraw.encode(MsgWithdraw.fromPartial(msgContent)).finish(),
            };
            const result = await signAndBroadcastDirect(address, msg, cosmosFee_lower, connector)
            await checkTx(connector, result?.transactionHash)

            toast.success("Deposit Success");
            dispatchEvent(new CustomEvent("refresh_cosmosBalance"));
        } catch (e: any) {
            console.log("error", e);
            const msg = e?.response?.data?.msg || e?.message
        } finally {
            closeLoading?.()
        }
    }
    const handleDepositVerifier = async (closeLoading: any) => {
        try {
            checkKeplrWallet()

            const msgContent = {
                depositType: DepositType.VERIFIER_DEPOSIT_TYPE,
                amount: BigNumber(proverValue || 0).multipliedBy(1e18).toString(),
                sender: evmAddress,
            }

            const msg = {
                typeUrl: MsgDeposit.typeUrl,
                value: MsgDeposit.encode(MsgDeposit.fromPartial(msgContent)).finish(),
            };
            const result = await signAndBroadcastDirect(address, msg, cosmosFee_lower, connector)
            await checkTx(connector, result?.transactionHash)

            toast.success("Deposit Success");
            dispatchEvent(new CustomEvent("refresh_cosmosBalance"));
        } catch (e: any) {
            console.log("error", e);
            const msg = e?.response?.data?.msg || e?.message
        } finally {
            closeLoading?.()
        }
    }
    const handleWithdrawVerifier = async (closeLoading: any) => {
        try {
            checkKeplrWallet()

            const msgContent = {
                depositType: DepositType.PROVER_DEPOSIT_TYPE,
                amount: BigNumber(proverValue || 0).multipliedBy(1e18).toString(),
                sender: evmAddress,
            }

            const msg = {
                typeUrl: MsgWithdraw.typeUrl,
                value: MsgWithdraw.encode(MsgWithdraw.fromPartial(msgContent)).finish(),
            };
            const result = await signAndBroadcastDirect(address, msg, cosmosFee_lower, connector)
            await checkTx(connector, result?.transactionHash)

            toast.success("Deposit Success");
            dispatchEvent(new CustomEvent("refresh_cosmosBalance"));
        } catch (e: any) {
            console.log("error", e);
            const msg = e?.response?.data?.msg || e?.message
        } finally {
            closeLoading?.()
        }
    }
    return (
        <Modal
            isOpen={visible}
            onClose={() => setVisible(false)}
            className="[&_button]:z-[2] max-w-[480px] border border-[#FFFFFF33]"
        >
            <>
                <ModalHeader>Deposit</ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-6 pb-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>Prover</div>
                                <div className="flex gap-2 items-center justify-end">
                                    <span>Balance: </span>
                                    <span>{balanceMap?.[cysicBaseCoin]?.hmAmount}</span>
                                </div>
                            </div>
                            <Input 
                            // max={balanceMap?.[cysicBaseCoin]?.hmAmount} 
                            type="solid" suffix={
                                <div className="flex items-center gap-2">
                                    <Button needLoading className="min-h-fit !h-8" onClick={handleDepositProver}>Deposit</Button>
                                    <Button needLoading className="min-h-fit !h-8" onClick={handleWithdrawProver}>Withdraw</Button>
                                </div>
                            } value={proverValue} onChange={setProverValue} />
                            <div className="flex gap-2 items-center justify-end">
                                <span>Deposited: </span>
                                <span>{depositMap?.proverHmAmount}</span>
                            </div>
                        </div>

                        <div className="bg-[rgba(255,255,255,0.08)] h-px w-full" />

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>Verifier</div>
                                <div className="flex gap-2 items-center justify-end">
                                    <span>Balance: </span>
                                    <span>{balanceMap?.[cysicBaseCoin]?.hmAmount}</span>
                                </div>
                            </div>
                            <Input 
                            // max={balanceMap?.[cysicBaseCoin]?.hmAmount}
                            type="solid" suffix={
                                <div className="flex items-center gap-2">
                                    <Button needLoading className="min-h-fit !h-8" onClick={handleDepositVerifier}>Deposit</Button>
                                    <Button needLoading className="min-h-fit !h-8" onClick={handleWithdrawVerifier}>Withdraw</Button>
                                </div>
                            } value={verifierValue} onChange={setVerifierValue} />
                            <div className="flex gap-2 items-center justify-end">
                                <span>Deposited: </span>
                                <span>{depositMap?.verifierHmAmount}</span>
                            </div>
                        </div>
                    </div>
                </ModalBody>

            </>
        </Modal>
    );
};

export default CosmosDepositModal;