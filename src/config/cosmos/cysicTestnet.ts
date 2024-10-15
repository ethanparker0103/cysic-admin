export const cysicTestnet = {
  "chainId": "cysicmint_9000-1",
  "chainName": "Cysic Network Testnet",  
  "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/chain.png",
  "rpc": "https://dev-rpc.prover.xyz",
  "rest": "https://dev-api.prover.xyz",
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
      "coinMinimalDenom": "ucys",
      "coinDecimals": 18,
      "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/ucys.png"
    },
    {
      "coinDenom": "CGT",
      "coinMinimalDenom": "uCGT",
      "coinDecimals": 18,
      "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/uCGT.png"
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "CYS",
      "coinMinimalDenom": "ucys",
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
    "coinMinimalDenom": "uCGT",
    "coinDecimals": 18,
    "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/uCGT.png"
  },
  "features": []
}