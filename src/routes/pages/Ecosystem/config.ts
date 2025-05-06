// 生态系统项目数据
export interface IEcosystemProject {
    projectName: string;
    category: string;
    blurb: string;
    websiteLink: string;
    twitterLink?: string;
    img?: string;
  }
  
  export const ecosystemProjects: IEcosystemProject[] = [
    {
      projectName: "Aleo",
      category: "ZK Project (ZK L1)",
      blurb: "A Layer 1 blockchain focused on privacy using Zero-Knowledge proofs.",
      websiteLink: "https://aleo.org",
      twitterLink: "https://twitter.com/AleoHQ",
      img: 'http://x.com/AleoHQ/photo'
    },
    {
      projectName: "Scroll",
      category: "ZK Project (zkEVM)",
      blurb: "zkEVM-based Ethereum scaling solution offering high throughput.",
      websiteLink: "https://scroll.io",
      twitterLink: "https://twitter.com/Scroll_ZKP",
      img: 'https://pbs.twimg.com/profile_images/1696531511519150080/Fq5O0LeN_400x400.jpg'
    },
    {
      projectName: "Herodotus",
      category: "ZK Coprocessor",
      blurb: "A zk-based coprocessor to accelerate computation for privacy-preserving applications.",
      websiteLink: "https://herodotus.dev/",
      twitterLink: "https://x.com/HerodotusDev",
      img: 'http://x.com/HerodotusDev/photo'
    },
    {
      projectName: "zkSync",
      category: "ZK Project (zkEVM)",
      blurb: "zkEVM Ethereum scaling solution for low-cost, high-speed transactions.",
      websiteLink: "https://zksync.io",
      twitterLink: "https://twitter.com/zksync",
      img: 'http://x.com/zksync/photo'
    },
    {
      projectName: "Nil",
      category: "ZK Project (zkEVM)",
      blurb: "zkEVM Ethereum-compatible scaling solution using ZK technology.",
      websiteLink: "https://nil.foundation",
      twitterLink: "https://x.com/nil_foundation",
      img: 'http://x.com/nil_foundation/photo'
    },
    {
      projectName: "Kakarot",
      category: "ZK Project (zkEVM)",
      blurb: "zkEVM solution for Ethereum scalability and privacy.",
      websiteLink: "https://www.kakarot.org/",
      twitterLink: "https://x.com/KakarotZkEvm",
      img: 'http://x.com/KakarotZkEvm/photo'
    },
    {
      projectName: "Axiom",
      category: "ZK Coprocessor / zkVM",
      blurb: "A Zero-Knowledge Virtual Machine (zkVM) focused on optimized computation.",
      websiteLink: "https://www.axiom.xyz/",
      twitterLink: "https://x.com/axiom_xyz",
      img: 'http://x.com/axiom_xyz/photo'
    },
    {
      projectName: "Talus",
      category: "AI L1",
      blurb: "AI-driven layer 1 blockchain with decentralized learning protocols.",
      websiteLink: "https://talus.network/",
      twitterLink: "https://x.com/TalusNetwork",
      img: 'http://x.com/TalusNetwork/photo'
    },
    {
      projectName: "Risc0",
      category: "zkVM / Prover Network",
      blurb: "zkVM and prover network for scalable privacy-preserving applications.",
      websiteLink: "https://risczero.com/",
      twitterLink: "https://x.com/RiscZero",
      img: 'http://x.com/RiscZero/photo'
    },
    {
      projectName: "Modulus Labs",
      category: "AI",
      blurb: "AI-powered research platform designed to simplify complex analytics.",
      websiteLink: "https://www.accountablemagic.com/",
      twitterLink: "https://x.com/CountableMagic",
      img: 'http://x.com/CountableMagic/photo'
    },
    {
      projectName: "Swaps.io",
      category: "ZK DEX",
      blurb: "A decentralized exchange (DEX) using Zero-Knowledge technology.",
      websiteLink: "https://swaps.io/",
      twitterLink: "https://x.com/swaps_io",
      img: 'http://x.com/swaps_io/photo'
    },
    {
      projectName: "Human.tech",
      category: "ZK Identity",
      blurb: "ZK-powered identity solutions aimed at privacy and security.",
      websiteLink: "https://human.tech/",
      twitterLink: "https://x.com/0xHolonym",
      img: 'http://x.com/0xHolonym/photo'
    },
    {
      projectName: "Nexus",
      category: "zkVM / Prover Network",
      blurb: "A privacy-focused prover network using zkVM technology.",
      websiteLink: "https://nexus.xyz/",
      twitterLink: "https://x.com/NexusLabs",
      img: 'http://x.com/NexusLabs/photo'
    },
    {
      projectName: "Manta",
      category: "L2",
      blurb: "Modular Layer 2 solutions built on ZK technology.",
      websiteLink: "https://manta.network",
      twitterLink: "https://x.com/MantaNetwork",
      img: 'http://x.com/MantaNetwork/photo'
    },
    {
      projectName: "Succinct",
      category: "ZK Infra",
      blurb: "Potential ZK solution for infrastructure scaling.",
      websiteLink: "https://www.succinct.xyz/",
      twitterLink: "https://x.com/SuccinctLabs",
      img: 'http://x.com/SuccinctLabs/photo'
    },
    {
      projectName: "zkCloud",
      category: "ZK Infra",
      blurb: "ZK-powered cloud computing infrastructure for privacy and scalability.",
      websiteLink: "https://zkcloud.com/",
      twitterLink: "https://x.com/thezkcloud",
      img: 'http://x.com/thezkcloud/photo'
    },
    {
      projectName: "ZKM",
      category: "ZK Infra",
      blurb: "Privacy-focused infrastructure powered by ZK technology.",
      websiteLink: "https://www.zkm.io/",
      twitterLink: "https://x.com/ProjectZKM",
      img: 'http://x.com/ProjectZKM/photo'
    },
    {
      projectName: "zkPass",
      category: "ZK Identity",
      blurb: "Privacy-focused identity solutions based on Zero-Knowledge proofs.",
      websiteLink: "https://zkpass.org",
      twitterLink: "https://x.com/zkPass",
      img: 'http://x.com/zkPass/photo'
    },
    {
      projectName: "Blocksense",
      category: "ZK Oracle",
      blurb: "Decentralized oracles using Zero-Knowledge proofs for enhanced privacy.",
      websiteLink: "https://blocksense.network/",
      twitterLink: "https://x.com/blocksense_",
      img: 'http://x.com/blocksense_/photo'
    },
    {
      projectName: "zPrize",
      category: "ZK Prize Competition",
      blurb: "A competition promoting innovation in Zero-Knowledge Proofs.",
      websiteLink: "https://www.zprize.io/",
      twitterLink: "https://x.com/z_prize",
      img: 'http://x.com/z_prize/photo'
    },
    {
      projectName: "ETHProofs",
      category: "ZK Infra",
      blurb: "Ethereum-based Zero-Knowledge Proof technology for",
      websiteLink: "https://ethproofs.org/",
      twitterLink: "https://x.com/eth_proofs",
      img: 'http://x.com/eth_proofs/photo'
    },
    {
      projectName: "Polyhedra",
      category: "ZK Bridge / Infra",
      blurb: "A cross-chain solution leveraging ZK proofs for secure interoperability.",
      websiteLink: "https://www.polyhedra.network/",
      twitterLink: "https://x.com/PolyhedraZK",
      img: 'http://x.com/PolyhedraZK/photo'
    },
    {
      projectName: "Brevis",
      category: "Oracle / Infra",
      blurb: "A decentralized oracle infrastructure powered by Zero-Knowledge proofs.",
      websiteLink: "https://brevis.network/",
      twitterLink: "https://x.com/brevis_zk",
      img: 'http://x.com/brevis_zk/photo'
    },
    {
      projectName: "Metamask",
      category: "Wallet",
      blurb: "A popular cryptocurrency wallet for managing digital assets and DeFi activities.",
      websiteLink: "https://metamask.io",
      twitterLink: "https://x.com/MetaMask",
      img: 'http://x.com/MetaMask/photo'
    },
    {
      projectName: "Keplr",
      category: "Wallet",
      blurb: "A wallet for Cosmos-based blockchains, providing decentralized access.",
      websiteLink: "https://keplr.app",
      twitterLink: "https://x.com/keplrwallet",
      img: 'http://x.com/keplrwallet/photo'
    },
    {
      projectName: "OKX Wallet",
      category: "Wallet",
      blurb: "OKX's official wallet for storing and trading crypto assets.",
      websiteLink: "https://www.okx.com",
      twitterLink: "https://x.com/okx",
      img: 'http://x.com/okx/photo'
    },
    {
      projectName: "Fox Wallet",
      category: "Wallet",
      blurb: "A crypto wallet (uncertain if active or official).",
      websiteLink: "https://foxwallet.com/",
      twitterLink: "https://x.com/FoxWallet",
      img: 'http://x.com/FoxWallet/photo'
    },
    {
      projectName: "Wormhole",
      category: "Bridge",
      blurb: "A cross-chain bridge for decentralized asset transfer.",
      websiteLink: "https://wormhole.com/",
      twitterLink: "https://x.com/wormhole",
      img: 'http://x.com/wormhole/photo'
    },
    {
      projectName: "Across",
      category: "Bridge",
      blurb: "A decentralized bridge for cross-chain communication.",
      websiteLink: "https://across.to/",
      twitterLink: "https://x.com/AcrossProtocol",
      img: 'http://x.com/AcrossProtocol/photo'
    },
    {
      projectName: "Orbiter",
      category: "Bridge",
      blurb: "Cross-chain bridge enabling efficient asset transfers.",
      websiteLink: "https://orbiter.finance",
      twitterLink: "https://x.com/Orbiter_Finance",
      img: 'http://x.com/Orbiter_Finance/photo'
    },
    {
      projectName: "LI.FI",
      category: "Bridge",
      blurb: "Interoperable cross-chain bridge for decentralized finance.",
      websiteLink: "https://li.fi/?utm_source=link3&utm_medium=link3&utm_campaign=link3",
      twitterLink: "https://x.com/lifiprotocol",
      img: 'http://x.com/lifiprotocol/photo'
    },
    {
      projectName: "Bungee",
      category: "Bridge",
      blurb: "Bridge solution for connecting different blockchains.",
      websiteLink: "https://new.bungee.exchange/",
      twitterLink: "https://x.com/BungeeExchange",
      img: 'http://x.com/BungeeExchange/photo'
    },
    {
      projectName: "Synapse",
      category: "Bridge",
      blurb: "A multi-chain cross-communication bridge.",
      websiteLink: "https://synapseprotocol.com/",
      twitterLink: "https://x.com/SynapseProtocol",
      img: 'http://x.com/SynapseProtocol/photo'
    },
    {
      projectName: "Cysic Bridge",
      category: "Bridge",
      blurb: "The bridge solution developed by Cysic Network.",
      websiteLink: "Not Available",
      twitterLink: "Not Available",
      img: 'http://x.com/CysicNetwork/photo'
    },
    {
      projectName: "Footprint Analytics",
      category: "Tooling",
      blurb: "Blockchain data analytics platform for Web3 projects.",
      websiteLink: "https://www.footprint.network",
      twitterLink: "https://x.com/Footprint_Data",
      img: 'http://x.com/Footprint_Data/photo'
    },
    {
      projectName: "Dune",
      category: "Tooling",
      blurb: "Data analytics tool for blockchain, creating customizable dashboards.",
      websiteLink: "https://dune.com",
      twitterLink: "https://x.com/Dune",
      img: 'http://x.com/Dune/photo'
    },
    {
      projectName: "BlockScout",
      category: "Tooling",
      blurb: "Open-source block explorer for Ethereum and Ethereum-compatible networks.",
      websiteLink: "https://blockscout.com",
      twitterLink: "https://x.com/blockscout",
      img: 'http://x.com/blockscout/photo'
    },
    {
      projectName: "Privy",
      category: "Tooling",
      blurb: "Privacy-preserving tooling for blockchain developers.",
      websiteLink: "https://www.privy.io/",
      twitterLink: "https://x.com/privy_io",
      img: 'http://x.com/privy_io/photo'
    },
    {
      projectName: "Cosmos SDK",
      category: "Tooling",
      blurb: "Framework for building application-specific blockchains.",
      websiteLink: "https://docs.cosmos.network/",
      twitterLink: "https://x.com/cosmos_sdk",
      img: 'http://x.com/cosmos_sdk/photo'
    },
    {
      projectName: "Cysic AMM",
      category: "DEX",
      blurb: "Cysic's decentralized automated market maker.",
      websiteLink: "Not Available",
      twitterLink: "Not Available",
      img: 'http://x.com/CysicNetwork/photo'
    },
    {
      projectName: "AntEX (Cody's)",
      category: "DEX",
      blurb: "Decentralized exchange developed by Cody's team.",
      websiteLink: "Not Available",
      twitterLink: "Not Available",
      img: 'http://x.com/CysicNetwork/photo'
    },
    {
      projectName: "Aave",
      category: "Lending",
      blurb: "Decentralized protocol for lending and borrowing digital assets.",
      websiteLink: "https://aave.com",
      twitterLink: "https://x.com/aave",
      img: 'http://x.com/aave/photo'
    },
    {
      projectName: "Uniswap",
      category: "DEX",
      blurb: "Decentralized exchange with liquidity pools for trading tokens.",
      websiteLink: "https://uniswap.org",
      twitterLink: "https://x.com/Uniswap",
      img: 'http://x.com/Uniswap/photo'
    },
    {
      projectName: "Compound",
      category: "Lending",
      blurb: "Lending protocol on Ethereum for crypto assets.",
      websiteLink: "https://compoundlabs.xyz/",
      twitterLink: "https://x.com/compoundfinance",
      img: 'http://x.com/compoundfinance/photo'
    },
    {
      projectName: "Ankr?",
      category: "Infra",
      blurb: "Decentralized cloud infrastructure provider.",
      websiteLink: "https://www.ankr.com",
      twitterLink: "https://x.com/ankr",
      img: 'http://x.com/ankr/photo'
    },
    {
      projectName: "Chainlink",
      category: "Oracle",
      blurb: "Decentralized oracle network for smart contracts.",
      websiteLink: "https://chain.link",
      twitterLink: "https://x.com/chainlink",
      img: 'http://x.com/chainlink/photo'
    },
    {
      projectName: "Alchemy",
      category: "Infra",
      blurb: "Blockchain development platform offering tools and infrastructure.",
      websiteLink: "https://www.alchemy.com",
      twitterLink: "https://x.com/Alchemy",
      img: 'http://x.com/Alchemy/photo'
    },
    {
      projectName: "OpenSea",
      category: "NFT",
      blurb: "The largest NFT marketplace for buying and selling digital art.",
      websiteLink: "https://opensea.io",
      twitterLink: "https://x.com/opensea",
      img: 'http://x.com/opensea/photo'
    },
    {
      projectName: "OKX NFT Marketplace",
      category: "NFT",
      blurb: "OKX's NFT marketplace offering digital art and collectibles.",
      websiteLink: "https://www.okx.com",
      twitterLink: "https://x.com/okx",
      img: 'http://x.com/okx/photo'
    },
    {
      projectName: "Tornado Cash",
      category: "Privacy",
      blurb: "Privacy-enhancing tool for Ethereum transactions.",
      websiteLink: "https://tornadocash-eth.ipns.dweb.link/",
      twitterLink: "https://x.com/TornadoCash",
      img: 'http://x.com/TornadoCash/photo'
    },
    {
      projectName: "Cysic Intelligence",
      category: "AI",
      blurb: "AI-powered solutions integrated with blockchain technologies.",
      websiteLink: "Not Available",
      twitterLink: "Not Available",
      img: 'http://x.com/CysicNetwork/photo'
    },
    {
      projectName: "Aspecta",
      category: "AI Identity",
      blurb: "AI-driven identity solution for decentralized systems.",
      websiteLink: "https://aspecta.ai/",
      twitterLink: "https://x.com/aspecta_ai",
      img: 'http://x.com/aspecta_ai/photo'
    },
    {
      projectName: "Inference Labs",
      category: "AI",
      blurb: "AI-focused research lab for future technologies.",
      websiteLink: "https://inferencelabs.com/",
      twitterLink: "https://x.com/inference_labs",
      img: 'http://x.com/inference_labs/photo'
    },
    {
      projectName: "Eternis AI",
      category: "AI",
      blurb: "AI platform for decentralized applications.",
      websiteLink: "https://www.eternis.ai/",
      twitterLink: "https://x.com/eternisai",
      img: 'http://x.com/eternisai/photo'
    },
    {
      projectName: "Gensyn",
      category: "AI",
      blurb: "AI infrastructure with scalability for blockchain projects.",
      websiteLink: "https://www.gensyn.ai/",
      twitterLink: "https://x.com/gensynai",
      img: 'http://x.com/gensynai/photo'
    },
    {
      projectName: "Future vibe coding",
      category: "Social",
      blurb: "A future-focused platform for coding and community interaction.",
      websiteLink: "Not Available",
      twitterLink: "Not Available",
      img: 'http://x.com/CysicNetwork/photo'
    },
    {
      projectName: "P2P",
      category: "Validator",
      blurb: "Peer-to-peer validator network for decentralized applications.",
      websiteLink: "https://www.p2p.org/staking-as-a-business",
      twitterLink: "https://x.com/P2Pvalidator",
      img: 'http://x.com/P2Pvalidator/photo'
    },
    {
      projectName: "OKX",
      category: "Validator / CEX",
      blurb: "Centralized exchange offering validator services.",
      websiteLink: "https://www.okx.com",
      twitterLink: "https://x.com/okx",
      img: 'http://x.com/okx/photo'
    },
    {
      projectName: "Noble",
      category: "Stablecoin Infra",
      blurb: "Stablecoin project focused on the Cosmos ecosystem.",
      websiteLink: "https://www.noble.xyz/",
      twitterLink: "https://x.com/noble_xyz",
      img: 'http://x.com/noble_xyz/photo'
    },
    {
      projectName: "Tether",
      category: "Stablecoin",
      blurb: "Popular stablecoin pegged to USD.",
      websiteLink: "https://www.tether.to",
      twitterLink: "https://x.com/Tether_to",
      img: 'http://x.com/Tether_to/photo'
    },
    {
      projectName: "Celestia",
      category: "Data Availability",
      blurb: "Scalable, modular blockchain for data availability.",
      websiteLink: "https://celestia.org",
      twitterLink: "https://x.com/celestia",
      img: 'http://x.com/celestia/photo'
    },
    {
      projectName: "Avail",
      category: "Data Availability",
      blurb: "Data availability layer for scalable decentralized applications.",
      websiteLink: "https://www.availproject.org/",
      twitterLink: "https://x.com/AvailProject",
      img: 'http://x.com/AvailProject/photo'
    },
    {
      projectName: "Mina",
      category: "ZK L1",
      blurb: "Mina is a zero knowledge (ZK) blockchain for proving anything. Building towards the private, provable web.",
      websiteLink: "https://minaprotocol.com/",
      twitterLink: "https://x.com/MinaProtocol",
      img: 'http://x.com/MinaProtocol/photo'
    },
    {
      projectName: "Ora",
      category: "AI",
      blurb: "World Intelligence",
      websiteLink: "https://www.ora.io/",
      twitterLink: "https://x.com/OraProtocol",
      img: 'http://x.com/OraProtocol/photo'
    },
    {
      projectName: "Electron Labs",
      category: "ZK Project",
      blurb: "Reducing TEE and ZK verification costs by 95%.",
      websiteLink: "https://electron.dev/",
      twitterLink: "https://x.com/ElectronZK",
      img: 'http://x.com/ElectronZK/photo'
    },
    {
      projectName: "zkLink Nova",
      category: "ZK Project",
      blurb: "Nova, the multi-rollup Aggregated Layer 3 zkEVM network with liquidity from any L2s.",
      websiteLink: "https://zklink.io/",
      twitterLink: "https://x.com/zkLink_Official",
      img: 'http://x.com/zkLink_Official/photo'
    },
    {
      projectName: "ChainUp",
      category: "Tooling",
      blurb: "Secure, Compliant, Innovative B2B Digital Asset Solutions CEX/DEX SaaS, Liquidity, Custody, MPC Wallet, KYT, Tokenization & more",
      websiteLink: "https://x.com/ChainUpOfficial",
      twitterLink: "https://x.com/ChainUpOfficial",
      img: 'http://x.com/ChainUpOfficial/photo'
    },
    {
      projectName: "Intmax",
      category: "ZK Project (L2)",
      blurb: "A zkRollup with a stateless architecture. Achieving hyper-scaling and privacy at the same time.",
      websiteLink: "https://www.intmax.io/",
      twitterLink: "https://x.com/intmaxIO",
      img: 'http://x.com/intmaxIO/photo'
    },
    {
      projectName: "6block",
      category: "Infra",
      blurb: "Crypto mining and staking solution provider",
      websiteLink: "https://6block.com/",
      twitterLink: "https://x.com/6block_official",
      img: 'http://x.com/6block_official/photo'
    },
    {
      projectName: "DBunker",
      category: "Infra",
      blurb: "Liquid & Aggregated Mining for DePIN & AI",
      websiteLink: "https://www.dbunker.xyz/",
      twitterLink: "https://x.com/Dbunker_Network",
      img: 'http://x.com/Dbunker_Network/photo'
    }
  ];

  export const ecosystemCategories = ['ALL', ...Array.from(new Set(ecosystemProjects.map((project) => project.category)))];

  export const ecosystemProjectsMap = ecosystemProjects.reduce((acc, project) => {
    acc[project.category] = [...(acc[project.category] || []), project];
    return acc;
  }, {} as Record<string, IEcosystemProject[]>);


// 直接为所有类别分配固定颜色
export const ecosystemCategoriesTagColor: Record<string, string> = {
  "ALL": "bg-purple-500/30 border border-purple-500/60",
  "Bridge": "bg-blue-500/30 border border-blue-500/60",
  "DEX": "bg-green-500/30 border border-green-500/60",
  "Lending": "bg-yellow-500/30 border border-yellow-500/60",
  "Validator": "bg-red-500/30 border border-red-500/60",
  "Validator / CEX": "bg-red-500/30 border border-red-500/60",
  "Stablecoin": "bg-purple-600/30 border border-purple-600/60",
  "Stablecoin Infra": "bg-purple-500/30 border border-purple-500/60",
  "Data Availability": "bg-orange-500/30 border border-orange-500/60",
  "ZK Project": "bg-pink-500/30 border border-pink-500/60",
  "ZK Project (ZK L1)": "bg-pink-600/30 border border-pink-600/60",
  "ZK Project (zkEVM)": "bg-pink-500/30 border border-pink-500/60",
  "ZK Project (L2)": "bg-pink-400/30 border border-pink-400/60",
  "ZK L1": "bg-pink-600/30 border border-pink-600/60",
  "ZK Infra": "bg-pink-700/30 border border-pink-700/60",
  "ZK Bridge / Infra": "bg-blue-600/30 border border-blue-600/60",
  "ZK Coprocessor": "bg-cyan-600/30 border border-cyan-600/60",
  "ZK Coprocessor / zkVM": "bg-cyan-500/30 border border-cyan-500/60",
  "ZK Identity": "bg-purple-700/30 border border-purple-700/60",
  "ZK DEX": "bg-green-600/30 border border-green-600/60",
  "ZK Oracle": "bg-teal-500/30 border border-teal-500/60",
  "ZK Prize Competition": "bg-amber-500/30 border border-amber-500/60",
  "Tooling": "bg-cyan-500/30 border border-cyan-500/60",
  "Infra": "bg-blue-600/30 border border-blue-600/60",
  "Privacy": "bg-violet-700/30 border border-violet-700/60",
  "AI": "bg-cyan-600/30 border border-cyan-600/60",
  "AI L1": "bg-cyan-700/30 border border-cyan-700/60",
  "AI Identity": "bg-cyan-500/30 border border-cyan-500/60",
  "Social": "bg-emerald-600/30 border border-emerald-600/60",
  "NFT": "bg-orange-400/30 border border-orange-400/60",
  "Oracle": "bg-teal-500/30 border border-teal-500/60",
  "Oracle / Infra": "bg-teal-600/30 border border-teal-600/60",
  "Wallet": "bg-emerald-400/30 border border-emerald-400/60",
  "L2": "bg-rose-600/30 border border-rose-600/60",
  "zkVM / Prover Network": "bg-rose-500/30 border border-rose-500/60"
};

// 确保所有类别都有颜色
ecosystemCategories.forEach(category => {
  if (!ecosystemCategoriesTagColor[category]) {
    // 如果某个类别没有预定义颜色，则分配默认颜色
    ecosystemCategoriesTagColor[category] = "bg-gray-500/30 border border-gray-500/60";
    console.warn(`Category without predefined color: ${category}`);
  }
});