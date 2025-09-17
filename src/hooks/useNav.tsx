import { appUrl, enableBridge, enableSocialTask, mediasLink } from "@/config";
import { useMemo } from "react";


const comingSoonConfig = [
  {
    content: "Cysic NFT",
    key: "cysic-nft",
    href: "https://cube.cysicfoundation.org/",
  },
  {
    content: "Cysic AI",
    key: "cysic-ai",
    href: "https://ai.cysic.xyz/",
  },
  {
    content: "Cysic Mining",
    key: "cysic-mining",
    href: "/",
    disabled: true,
  },
];

const bridgeNav = enableBridge
  ? {
      content: "Bridge",
      key: "bridge",
      href: "/bridge",
    }
  : null;

const socialTaskNav = enableSocialTask
  ? {
      content: "Social Tasks",
      key: "social-tasks",
      href: appUrl + "/socialTask",
    }
  : null;

const basicNav = [
  {
    content: "Cysic Portal",
    children: [
      socialTaskNav,
      {
        content: "Staking",
        key: "staking",
        href: appUrl + "/stake",
      },
      bridgeNav,
      {
        content: "Dashboard",
        key: "dashboard",
        href: appUrl + "/dashboard",
      },
      {
        content: "Explorer",
        key: "explorer",
        href: mediasLink.cosmosExplorer,
      },
    ].filter(Boolean)
  },
  {
    content: "Resource",
    children: [
      {
        content: "Academy",
        key: "academy",
        href: "/academy",
      },
      {
        content: "Whitepaper",
        key: "whitepaper",
        href: mediasLink.whitePaper,
      },
      {
        content: "Docs",
        key: "docs",
        href: mediasLink.gitbook,
      },
      {
        content: "Blog",
        key: "blog",
        href: mediasLink.medium,
      },
      {
        content: "Media Kit",
        key: "media",
        href: "/mediakit",
      },
    ],
  },
  {
    content: "Leaderboard",
    href: '/leaderboard'
  },
];

const navs = [
  {
    content: "Service",
    children: [
      {
        content: "Cysic ZK",
        key: "zk",
        href: appUrl
      },
      ...comingSoonConfig,
    ],
  },
  {
    content: "Hardware",
    key: "hardware",
    href: "/hardware",
  },
  {
    content: "Ecosystem",
    key: "ecosystem",
    href: "/ecosystem",
  },
  ...basicNav,
  
];

const useNav = () => {

  const currentNavs = useMemo(() => {
    return navs;
  }, []);

  return {
    currentNavs,
  };
};

export default useNav;
