import { defineChain } from 'viem';

export const evm_cysic_devnet = defineChain({
    id: 9_000,
    name: 'Cysic Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'CYS',
      symbol: 'CYS',
    },
    rpcUrls: {
      default: { http: ['https://evm-dev.prover.xyz'] },
    },
    blockExplorers: {
      default: {
        name: 'Cysic Testnet Scan',
        url: 'https://cys-dev.prover.xyz/',
      },
    },
    testnet: true,
    contracts: {
      multicall3: {
        address: '0x2c92F7945ecba1bB3179F7486187FDaCcF7a05B5',
        blockCreated: 457614,
      },
    },
  })

  export const evm_cysic_testnet = defineChain({
    id: 9_001,
    name: 'Cysic Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'CYS',
      symbol: 'CYS',
    },
    rpcUrls: {
      default: { http: ['https://evm-dev.prover.xyz'] },
    },
    blockExplorers: {
      default: {
        name: 'Cysic Testnet Scan',
        url: 'https://cys-dev.prover.xyz/',
      },
    },
    testnet: true,
    contracts: {
      multicall3: {
        address: '0x2c92F7945ecba1bB3179F7486187FDaCcF7a05B5',
        blockCreated: 457614,
      },
    },
  })