import { evm_cysic_devnet, evm_cysic_testnet } from "@/config/evm/cysicTestnet";
import { getImageUrl } from "@/utils/tools";
import { arbitrumSepolia } from "viem/chains";

export const cysicChain = evm_cysic_devnet;

// chains config
export const EVM_CHAIN_ID_MAP = {
    [arbitrumSepolia.id]: arbitrumSepolia,
    [evm_cysic_devnet.id]: evm_cysic_devnet,
    [evm_cysic_testnet.id]: evm_cysic_testnet
};

export const EVM_CHAIN_EXPLORER_MAP = {
    [arbitrumSepolia.id]: arbitrumSepolia.blockExplorers.default.url,
    [evm_cysic_devnet.id]: evm_cysic_devnet.blockExplorers.default.url,
    [evm_cysic_testnet.id]: evm_cysic_testnet.blockExplorers.default.url
}

export const EVM_CHAIN_LOGO: any = {
    [arbitrumSepolia.id]: "https://arbitrum.io/logo_monochrome.svg",
    [evm_cysic_devnet.id]: getImageUrl('@/assets/images/tokens/CYS.svg'),
    [evm_cysic_testnet.id]: getImageUrl('@/assets/images/tokens/CYS.svg'),
}


// NFT
export const purchaseChainId = arbitrumSepolia.id;
export const USDC = {
    [arbitrumSepolia.id]: "0x1e6e1C6BcCD8b8B9ec82ee8863cD53D640D36b76",
};
export const USDCDecimal = 18;
export const purchaseNftContract = {
    [arbitrumSepolia.id]: "0x2E8D9A9bF85A06C57f46bA7Ac8e0c25259c544cC",
};


// bridge
export const bridgeChains = [arbitrumSepolia, cysicChain];

export const bridgeToken: any = {
    [arbitrumSepolia.id]: {
        ["0x078d8d0464c80eb985bf9b0613d06f9753d38f5c"]: {
            address: "0x078d8d0464c80eb985bf9b0613d06f9753d38f5c",
            decimal: 6,
            symbol: "TEST",
            name: "Test Token",
            icon: getImageUrl('@/assets/images/tokens/USDC.svg'),
            underlyingAddress: "0x5743E1b5c7058Ed0Bf3604b5B8E59E9c0eACd350", // cysic token addr
            underlyingDecimal: 18,
            toCysBridge: "0x12617962F26288BA677993468571277201191277", // chain -> cysic
            fromCysBridge: "0x76AC687776196f94F2340D289e148fA4EA9cCa2f", // cysic -> chain
        },
    },
};

export const bridgeConfig: any = {
    [arbitrumSepolia.id]: {
        bridgeContract: "0x12617962F26288BA677993468571277201191277", // chain -> cysic
        tokens: bridgeToken[arbitrumSepolia.id],
        chain: {
            icon: EVM_CHAIN_LOGO[arbitrumSepolia.id],
            id: arbitrumSepolia.id,
            name: arbitrumSepolia.name,
            explorer: EVM_CHAIN_EXPLORER_MAP[arbitrumSepolia.id]
        },
    },
};
