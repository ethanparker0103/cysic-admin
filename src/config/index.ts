import { cysicTestnet_testnet } from "@/config/cosmos/cysicTestnet";
import { cysicTestnet_dev } from "@/config/cosmos/cysicTestnet-dev";
import { generateQueryString, getImageUrl } from "@/utils/tools";
import { coins } from "@cosmjs/proto-signing";
import { arbitrumSepolia } from "viem/chains";

export const BIND_CHECK_PATHS = ["/zk", "/ai"];
export const NO_BIND_CHECK_PATHS = ["/userPortal", "/zk/userPortal", "/zk/userPortal/serviceHub", "/userPortal/serviceHub"];
export const NO_CONTAINER_PATHS = ['/hardware', '/zk', '/userPortal', '/zk/userPortal', '/zk/userPortal/serviceHub', '/userPortal/serviceHub']

export const defaultChainId = "9527";

export const baseStatus: any = {
  "0": "Pending",
  "1": "Accept",
  "2": "Reject",
};

export const rewardStatus: any = {
  "0": "Pending",
  "1": "Claimed",
  "2": "No Reward",
};

export const providerStatus = baseStatus;

export const projectStatus = baseStatus;

export const verifierStatus = baseStatus;

export const taskStatus: any = {
  TaskStatusWaitSchedule: "Wait For Assign",
  TaskStatusWaitVerifier: "Wait For Verifier",
  TaskStatusFinishSuccess: "Success",
  TaskStatusWaitProof: "Wait For Proof",
  TaskStatusMatchProviderFailed: "Failed",
};

export const TaskStatus: any = {
  "0": "TaskStatusPublished",
  "1": taskStatus["TaskStatusWaitSchedule"],
  "2": taskStatus["TaskStatusWaitProof"],
  "3": taskStatus["TaskStatusWaitVerifier"],
  "100": taskStatus["TaskStatusFinishSuccess"],
  "200": "TaskStatusFinishFailed",
  "400": "TaskStatusInvalid",
  "40": taskStatus["TaskStatusMatchProviderFailed"],
  "401": "TaskStatusMatchVerifierFailed",
};

export const TaskStatusColor: any = {
  "0": "#75FF52",
  "1": "#F0AE52",
  "2": "#F0AE52",
  "3": "#F0AE52",
  "100": "#75FF52",
  "200": "#F0AE52",

  "400": "#FF5953",
  "40": "#FF5953",
  "401": "#FF5953",
};

export const ProofBackend: any = {
  "1": "Halo2",
};

export const isQa = import.meta.env.VITE_APP_ENV == "qa";
export const isProd = import.meta.env.VITE_APP_ENV == "prod";

export const cysicTestnet = isProd ? cysicTestnet_testnet : cysicTestnet_dev;

export const mainUrl = import.meta.env.VITE_APP_BASE_URL;
// isQa ? 'https://api-dev.prover.xyz' : 'https://api-testnet.prover.xyz'

export const baseHref = "/m";

export const defaultRewardAmount = 100;

export const commonPageSize = 10;

export const explorerUrl = "https://explorer-testnet.prover.xyz";

export const cosmosReservedValue = "0.1";

export const cysicBaseCoin = "CYS";
export const cysicStCoin = "CGT";

export const supTokens: any = {
  [cysicBaseCoin]: {
    name: cysicBaseCoin,
    icon: getImageUrl("@/assets/images/tokens/cysic.svg"),
  },
  [cysicStCoin]: {
    name: cysicStCoin,
    icon: getImageUrl("@/assets/images/tokens/cysic-light.svg"),
  },
};

export const cosmosFee = {
  amount: [
    {
      denom: cysicBaseCoin,
      amount: "200000",
    },
  ],
  gas: "2000000", // gas amount
};

export const cosmosFee_lower = {
  amount: coins(200000 / 2, cysicBaseCoin), // 5000 uatom
  gas: 2000000 / 2, // 200000 gas
};

export const keplrDownloadLink =
  "https://chromewebstore.google.com/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap";

export const blockTime = {
  short: 5_000,
  average: 10_000,
  long: 15_000,
};

export const twitterLink = `https://twitter.com/intent/tweet?${generateQueryString(
  {
    text: "Earn Cysic tokens as rewards while verifying and computing ZK proofs for top projects like @Scroll_ZKP and @AleoHQ, exclusively on @cysic_xyz. #cysictestnet \n\r ",
  }
)}`;

export const mediasLink = {
  gitbook: "https://gitbook.prover.xyz/cysic-network/cysic-network-whitepaper",
  whitePaper: "https://bit.ly/cysicnetworkwhitepaper",
  discord: "https://t.co/V7D83oIVWE",
  twitter: "https://x.com/cysic_xyz",
  medium: "https://medium.com/@cysic",
  twitterWhitePaper: "https://x.com/cysic_xyz/status/1846960627878866984",
  bridge: "https://testnet-bridge.prover.xyz/bridge",
  telegram: "https://t.me/CysicHQ",
  github: "https://github.com/cysic-labs",
  doc: "https://hackmd.io/@Cysic",
  cosmosExplorer: "https://explorer-testnet.prover.xyz",
  evmExplorer: "https://cys-dev.prover.xyz"
};

export const downloadLink = {
  andorid: "https://statics.prover.xyz/app-release.apk",
  googlePlay: "https://play.google.com/store/apps/details?id=com.cysic.plus",
};

export const enableCosmosUrl = [
  "my",
  "stake",
  "/my",
  "/my/phase1",
  "/stake/cgt",
  "/stake/veCompute",
  "/my/",
  "/stake/cgt/",
  "/stake/veCompute/",
  "/my/phase1/",
  "/my/phase1Convert",
  "/my/phase1Convert/",
];

export const loginSignContent = "Welcome to Cysic！";
export const responseSuccessCode = 0;

export const CHAIN_ID_MAP = {
  [arbitrumSepolia.id]: arbitrumSepolia,
};

export const purchaseChainId = arbitrumSepolia.id;
export const USDC = {
  [arbitrumSepolia.id]: "0x1e6e1C6BcCD8b8B9ec82ee8863cD53D640D36b76",
};
export const USDCDecimal = 18;
export const purchaseNftContract = {
  [arbitrumSepolia.id]: "0x2E8D9A9bF85A06C57f46bA7Ac8e0c25259c544cC",
};


export const classes = {
  subTitle: 'sub-title !tracking-widest !text-2xl !font-[400]',
}

export const routesConfig = {
  "ecosystem": "/ecosystem",
  "academy": "/academy",
  "hardware": "/hardware",
  "zk": "/zk",
  "invite": "/zk/invite",
  "prover": "/zk/prover",
  "verifier": "/zk/verifier",
  "project": "/zk/project",
  "project/my": "/zk/project/my",
  "project/my/:id": "/zk/project/my/:id",
  "serviceHub": "/zk/serviceHub",
  "ai": "/ai",
  "nft": "/nft",
  "userPortal": "/userPortal",
  "socialTask": "/socialTask",
  "stake": "/stake",
  "dashboard": "/zk/dashboard",
  "dashboard/project": "/zk/dashboard/project",
  "dashboard/prover": "/zk/dashboard/prover",
  "dashboard/verifier": "/zk/dashboard/verifier",
  
}

export * from './abi/faucet'
export * from './abi/purchase'
