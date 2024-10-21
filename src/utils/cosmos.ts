import { cosmosHubTestnet } from "@/config/cosmos/cosmosHubTestnet";
import { cysicTestnet } from "@/config/cosmos/cysicTestnet";
import { OsmosisTestnetChainInfo } from "@/config/cosmos/osmoTestnet";
import useCosmos from "@/models/_global/cosmos";
import { Registry, GeneratedType } from "@cosmjs/proto-signing";
import { SigningStargateClient, defaultRegistryTypes } from "@cosmjs/stargate";
import { MsgExchangeToPlatformToken, MsgExchangeToGovToken, MsgDelegate } from "./cysic-msg";
import { keplrDownloadLink } from "@/config";
import * as bech32 from 'bech32'
import { toast } from "react-toastify";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { AuthInfo, TxBody, Fee, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { Buffer } from "buffer";


declare global{
    interface Window{
        keplr?: any
    }
}

const provider = window?.keplr

const set = useCosmos.getState().setState
// const rpc = 'http://dev-node-1.prover.xyz'

const chain = cysicTestnet.chainId
const cosmosConfig = {
    [OsmosisTestnetChainInfo.chainId]: OsmosisTestnetChainInfo,
    [cosmosHubTestnet.chainId]: cosmosHubTestnet,
    [cysicTestnet.chainId]: cysicTestnet
}

async function connectWallet() {
    const chainId = cosmosConfig[chain]?.chainId
    const rpc = cosmosConfig[chain]?.rpc

    // 检查是否安装了 Keplr
    if (!provider) {
        console.log('dispatch')
        dispatchEvent(new CustomEvent('basicDoubleconfirmModalVisible', {
            detail: {
                callback: (closeLoading?: any) => {
                    window.open(keplrDownloadLink, '_blank');
                    closeLoading?.()
                },
                title: 'Download Keplr',
                desc: 'Keplr is not available, Please download first.',
                btnText: 'Go'
            }
        }))
        throw { message: 'Keplr is not available' }
        return;
    }
    set({ isConnecting: true })

    try {
        await provider.experimentalSuggestChain(cosmosConfig[chain]);

        // 请求用户授权
        await provider?.enable(chainId);

        // 创建签名客户端
        const offlineSigner = provider.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();

        // register cysic msgs
        const cysicRegistryTypes = [
            ["/cysicmint.govtoken.v1.MsgExchangeToGovToken", MsgExchangeToGovToken] as [string, GeneratedType],
            ["/cysicmint.govtoken.v1.MsgExchangeToPlatformToken", MsgExchangeToPlatformToken] as [string, GeneratedType],
            ["/cysicmint.delegate.v1.MsgDelegate", MsgDelegate] as [string, GeneratedType],
        ];
        const registry = new Registry(defaultRegistryTypes.concat(cysicRegistryTypes));
        const client: any = await SigningStargateClient.connectWithSigner(
            rpc,
            offlineSigner,
            { registry }
        );

        client.disable = () => {
            client?.signer?.keplr?.disable?.()
            useCosmos.getState().init()
        }
        useCosmos.getState().setState({
            address: accounts[0].address,
            client,
            chainId,
            connector: client,
            isConnected: true,
            isConnecting: false,
            hasConnectedWithKeplr: true,
        })

        return client
    } catch (e) {
        useCosmos.getState().setState({
            isConnecting: false
        })
    }
}


export function cosmosToEthAddress(cosmosAddress: string) {
    try {
        const decoded = bech32.decode(cosmosAddress);
        const data = bech32.fromWords(decoded.words);
        const ethAddress = '0x' + Buffer.from(data).toString('hex');
        return ethAddress;
    } catch (error) {
        console.error('Incorrect Cosmos Address:', error);
        return null;
    }
}

// const cosmosAddress = 'cysic1qdr7yshldxank3nx54lv59gzz9p5uztpq4vhnh';
// console.log('cosmosToEthAddress', cosmosAddress, cosmosToEthAddress(cosmosAddress));

export const checkkTx = async (client: any, txHash: string) => {
    // 查询交易状态
    const result = await client.getTx(txHash);
    console.log('tx res', result)

    if (result && result.code === 0) {
        toast.success(`Tx Success at ${result?.hash}`);
    } else {
        toast.error(`Tx Failed at ${result?.hash}`)
    }

    return result
}


export async function signAndBroadcastDirect(address: any, msg: any, cosmosFee: any, client: any) {
    if (!window?.keplr) {
        throw new Error("Keplr is not installed");
    }

    const chainId = "cysicmint_9001-1"; // 替换为实际的 chainId

    // 启用 Keplr 与链的交互
    await window?.keplr.enable(chainId);

    // 获取离线签名器
    const offlineSigner = window?.keplr.getOfflineSigner(chainId);

    // 获取账户信息
    const accounts = await offlineSigner.getAccounts();


    console.log('accounts', accounts)

    // 构建消息
    // const msg: any = {
    //     typeUrl: '/cysicmint.govtoken.v1.MsgExchangeToGovToken',
    //     value: MsgExchangeToGovToken.encode(MsgExchangeToGovToken.fromPartial({
    //         sender: address,
    //         amount: amount.amount,
    //     })).finish(),
    // };

    // 获取链上账户数据，例如 accountNumber 和 sequence
    const account = await client.getAccount(address);

    const { pubKey } = await window?.keplr.getKey(chainId);
    console.log('pubKey', pubKey)
    const signDoc = {
        bodyBytes: TxBody.encode(
            TxBody.fromPartial({
                messages: Array.isArray(msg) ? msg : [msg],
                memo: '',
            })
        ).finish(),
        authInfoBytes: AuthInfo.encode({
            signerInfos: [
                {
                    publicKey: {
                        typeUrl: "/cysicmint.crypto.v1.ethsecp256k1.PubKey", // "/cosmos.crypto.secp256k1.PubKey",
                        value: PubKey.encode({
                            key: pubKey,
                        }).finish(),
                    },
                    modeInfo: {
                        single: {
                            mode: SignMode.SIGN_MODE_DIRECT,
                        },
                        multi: undefined,
                    },
                    sequence: account.sequence,
                },
            ],
            fee: Fee.fromPartial({
                amount: cosmosFee.amount.map((coin: any) => {
                    return {
                        denom: coin.denom,
                        amount: coin.amount.toString(),
                    };
                }),
                gasLimit: cosmosFee.gas,
            }),
        }).finish(),
        chainId: chainId,
        accountNumber: account.accountNumber
    }


    console.log('signDoc', signDoc)

    const signed = await window?.keplr.signDirect(
        chainId,
        address,
        signDoc,
    )

    const signedTx = {
        tx: TxRaw.encode({
            bodyBytes: signed.signed.bodyBytes,
            authInfoBytes: signed.signed.authInfoBytes,
            signatures: [Buffer.from(signed.signature.signature, "base64")],
        }).finish(),
        signDoc: signed.signed,
    }

    console.log('signedTx', signedTx, 'signDoc', signDoc)

    // 广播签名后的交易
    // const result = await window?.keplr.sendTx(chainId,  signedTx.tx, "sync")
    const result = await client.broadcastTx(signedTx.tx)
    console.log('result', result)
    return result;
}

export { connectWallet }