import { cosmosHubTestnet } from "@/config/cosmos/cosmosHubTestnet";
import { cysicTestnet } from "@/config/cosmos/cysicTestnet";
import { OsmosisTestnetChainInfo } from "@/config/cosmos/osmoTestnet";
import useCosmos from "@/models/_global/cosmos";
import { Registry, GeneratedType } from "@cosmjs/proto-signing";
import { SigningStargateClient, defaultRegistryTypes } from "@cosmjs/stargate";
import { MsgExchangeToPlatformToken, MsgExchangeToGovToken } from "./cysic-msg";

// @ts-ignore
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
        ];
        const registry = new Registry(defaultRegistryTypes.concat(cysicRegistryTypes));
        const client: any = await SigningStargateClient.connectWithSigner(
            rpc,
            offlineSigner,
            { registry }
        );

        client.disable = ()=>{
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

export { connectWallet }