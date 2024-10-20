import Button from "@/components/Button"
import Input from "@/components/Input"
import { blockTime, cosmosFee } from "@/config"
import useCosmos from "@/models/_global/cosmos"
import { checkkTx, signAndBroadcastDirect } from "@/utils/cosmos"
import { sleep } from "@/utils/tools"
import BigNumber from "bignumber.js"
import { useState } from "react"
import { toast } from "react-toastify"
import * as tx_bank from "cosmjs-types/cosmos/bank/v1beta1/tx";

const CosmosTransferToken = () => {
    const { address, connector } = useCosmos()

    const [recipientAddress, setRecipientAddress] = useState<any>()
    const [value, setValue] = useState<any>()
    const handleTransfer = async (closeLoading?: any) => {
        try {


            const amount = {
                denom: "CYS",
                amount: BigNumber(value || 0).multipliedBy(1e18).toString(),
            }

            const msg = {
                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                value: tx_bank.MsgSend.encode(tx_bank.MsgSend.fromPartial({
                    fromAddress: address,
                    toAddress: recipientAddress,
                    amount: [amount],
                })).finish()
            };

            console.log('msg', msg)
            const result = await signAndBroadcastDirect(address, msg, cosmosFee, connector)

            await checkkTx(connector, result?.transactionHash)
        } catch (e: any) {
            console.log('error', e)
            toast.error(e?.message || e?.msg || e);
        } finally {
            await sleep(blockTime.short)
            dispatchEvent(new CustomEvent('refresh_cosmosBalance'))
            closeLoading?.()
        }
    }

    return <div className="flex flex-col gap-4 border p-4">
        <Input type="solid" prefix={<div className="mr-3 text-[#A3A3A3]">Recipient</div>} value={recipientAddress} onChange={setRecipientAddress} />
        <Input type="solid" prefix={<div className="mr-3 text-[#A3A3A3]">Amount</div>} value={value} onChange={setValue} />
        <Button needLoading onClick={handleTransfer}>Transfer</Button>
    </div>
}

export default CosmosTransferToken