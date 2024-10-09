export const cysicTestnet = {
    "chainId": "cysicmint_9000-1",
    "chainName": "Cysic Network Testnet",  
    "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/chain.png",
    "rpc": "https://testnet-rpc.prover.xyz",
    "rest": "https://testnet-api.prover.xyz",
    "walletUrlForStaking": "https://wallet.keplr.app/chains/cysic",
    "bip44": {
      "coinType": 118
    },
    "bech32Config": {
      "bech32PrefixAccAddr": "cysic8",
      "bech32PrefixAccPub": "cysic8pub",
      "bech32PrefixValAddr": "cysic8valoper",
      "bech32PrefixValPub": "cysic8valoperpub",
      "bech32PrefixConsAddr": "cysic8valcons",
      "bech32PrefixConsPub": "cysic8valconspub"
    },
    "currencies": [
      {
        "coinDenom": "CYSIC",
        "coinMinimalDenom": "ucysic",
        "coinDecimals": 18,
        "coinGeckoId": "cysic",
        "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/ucysic.png"
      },
      {
        "coinDenom": "veCYSIC",
        "coinMinimalDenom": "uvecysic",
        "coinDecimals": 18,
        "coinGeckoId": "vecysic",
        "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/uvecysic.png"
      }
    ],
    "feeCurrencies": [
      {
        "coinDenom": "CYSIC",
        "coinMinimalDenom": "ucysic",
        "coinDecimals": 18,
        "coinGeckoId": "cysic",
        "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/ucysic.png",
        "gasPriceStep": {
            "low": 0.5,
            "average": 0.75,
            "high": 1.0
        }
      }
    ],
    "stakeCurrency": {
      "coinDenom": "veCYSIC",
      "coinMinimalDenom": "uvecysic",
      "coinDecimals": 18,
      "coinGeckoId": "vecysic",
      "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cysic/uvecysic.png"
    },
    "features": [
      "cosmwasm",
      "osmosis-txfees"
    ]
  }