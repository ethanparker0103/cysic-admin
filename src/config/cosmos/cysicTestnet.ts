
export const cysicTestnet_testnet = {
  "chainId": "cysicmint_9001-1",
  "chainName": "Cysic Network Testnet",
  "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/chain.png",
  // NOTE: local test connects to node 1
  // "rpc": "http://localhost:26668",
  // "rest": "http://localhost:8327",
  "rpc": "https://rpc-testnet.prover.xyz",
  "rest": "https://api-testnet.prover.xyz",
  "walletUrlForStaking": "https://wallet.keplr.app/chains/cysic",
  "bip44": {
    "coinType": 60
  },
  "bech32Config": {
    "bech32PrefixAccAddr": "cysic",
    "bech32PrefixAccPub": "cysicpub",
    "bech32PrefixValAddr": "cysicvaloper",
    "bech32PrefixValPub": "cysicvaloperpub",
    "bech32PrefixConsAddr": "cysicvalcons",
    "bech32PrefixConsPub": "cysicvalconspub"
  },
  "currencies": [
    {
      "coinDenom": "CYS",
      "coinMinimalDenom": "CYS",
      "coinDecimals": 18,
      "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/ucys.png"
    },
    {
      "coinDenom": "CGT",
      "coinMinimalDenom": "CGT",
      "coinDecimals": 18,
      "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/uCGT.png"
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "CYS",
      "coinMinimalDenom": "CYS",
      "coinDecimals": 18,
      "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/ucys.png",
      "gasPriceStep": {
        "low": 25000000000,
        "average": 25000000000,
        "high": 50000000000
      }
    }
  ],
  "stakeCurrency": {
    "coinDenom": "CGT",
    "coinMinimalDenom": "CGT",
    "coinDecimals": 18,
    "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/uCGT.png"
  },
  "features": ["eth-address-gen"]
  // "features": []
}

