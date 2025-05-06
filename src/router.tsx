import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "./routes/root";
import Home from "./routes/pages/Home/page";
import Zk from "@/routes/pages/Zk/page";
import Ai from "@/routes/pages/Ai/page";
import Nft from "@/routes/pages/Nft/page";
import Stake from "@/routes/pages/Stake/page";
import ZkInvite from "@/routes/pages/Zk/invite/page";
import ZkProver from "@/routes/pages/Zk/prover/page"; 
import NftUserPortal from "@/routes/pages/Nft/userPortal/page";
import NftSocialTask from "@/routes/pages/Nft/socialTask/page";
import NftServiceHub from "@/routes/pages/Nft/serviceHub/page";
import { getImageUrl } from "@/utils/tools";
import { isMobile } from "react-device-detect";
import VerifierPage from "@/routes/pages/Zk/verifier/page";
import ProjectPage from "@/routes/pages/Zk/project/page";
import MyProjectPage from "@/routes/pages/Zk/project/my/page";
import ProjectDetailPage from "@/routes/pages/Zk/project/[id]/page";
import EcosystemPage from "@/routes/pages/Ecosystem/page";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/ecosystem",
          element: <EcosystemPage />,
        },
        {
          path: "/zk",
          children: [
            {
              index: true,
              element: <Zk />,
            },
            {
              path: "invite",
              element: <ZkInvite />,
            },
            {
              path: "prover",
              element: <ZkProver />,
            },
            {
              path: "verifier",
              element: <VerifierPage />,
            },
            {
              path: "project",
              element: <ProjectPage />,
            },
            {
              path: "project/my",
              element: <MyProjectPage />,
            },
            {
              path: "project/detail/:id",
              element: <ProjectDetailPage />,
            },
            {
              path: "serviceHub",
              element: <NftServiceHub />,
            },
          ]
        },
        {
          path: "/ai",
          element: <Ai />,
        },
        {
          path: "/nft",
          children: [
            {
              index: true,
              element: <Nft />,
            },
            {
              path: "userPortal",
              element: <NftUserPortal />,
            },
            {
              path: "socialTask",
              element: <NftSocialTask />,
            },
          ]
        },
        {
          path: "/stake",
          element: <Stake />,
        },
      ],
    },
  ],
  {
    basename: "/m",
  }
);


export const backgroundImageList = {
  '/': {
    img: getImageUrl('@/assets/images/_global/home_landing_bg.png'),
    className: "grayscale",
  },
  '/zk': {
    img: getImageUrl('@/assets/images/_global/zk_landing_bg.png'),
    className: isMobile ? "h-[90%]" : "h-[135%]",
  },
  '/zk/invite': {
    img: getImageUrl('@/assets/images/_global/invite_landing_bg.png'),
    className: "h-screen",
    needShadow: true
  },
  '/zk/prover': {
    img: getImageUrl('@/assets/images/_global/stake_landing_bg.png'),
    className: "h-screen",
    needShadow: true
  },
  '/zk/verifier': {
    img: getImageUrl('@/assets/images/_global/stake_landing_bg.png'),
    className: "h-screen",
    needShadow: true
  },
  '/zk/project': {
    img: getImageUrl('@/assets/images/_global/project_landing_bg.png'),
    className: "h-screen brightness-[0.7]",
    style: {
      backgroundPosition: "center -25vh"
    },
    needShadow: true
  },  
  '/ai': {    
    img: getImageUrl('@/assets/images/_global/ai_landing_bg.png'),
    className: "h-screen grayscale brightness-[0.3]",
    needShadow: true
  },
  '/stake': {
    img: getImageUrl('@/assets/images/_global/stake_landing_bg.png'),
    className: "h-screen",
  },
  '/nft': {
    img: getImageUrl('@/assets/images/_global/nft_landing_bg.png'),
    className: "h-screen",
    style: {
      backgroundPosition: "center -10vh"
    },
    needShadow: true
  },
  '/nft/userPortal': {
    img: getImageUrl('@/assets/images/_global/userPortal_landing_bg.png'),
    className: "h-screen",
    style: {
      filter: "sepia(1) hue-rotate(90deg)",
      backgroundPosition: "center -10vh"
    },
    needShadow: true

  },
  '/nft/socialTask': {
    img: getImageUrl('@/assets/images/_global/socialTask_landing_bg.png'),
    className: "h-screen",
    style: {
      filter: "sepia(1) hue-rotate(90deg)",
      backgroundPosition: "center -30vh"
    },
    needShadow: true
    
  },
}