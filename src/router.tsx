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
    className: "h-[135%]"
  },
  '/zk/invite': {
    img: getImageUrl('@/assets/images/_global/invite_landing_bg.png'),
    className: "h-screen"
  },
  '/ai': {
    img: getImageUrl('@/assets/images/_global/ai_landing_bg.png'),
    className: "h-screen grayscale brightness-[0.3]"
  },
  '/stake': {
    img: getImageUrl('@/assets/images/_global/stake_landing_bg.png'),
    className: "h-screen"
  },
  '/nft': {
    img: getImageUrl('@/assets/images/_global/nft_landing_bg.png'),
    className: "h-screen",
    style: {
      backgroundPosition: "center -10vh"
    }
  },
  '/nft/userPortal': {
    img: getImageUrl('@/assets/images/_global/userPortal_landing_bg.png'),
    className: "h-screen",
    style: {
      filter: "sepia(1) hue-rotate(90deg)",
      backgroundPosition: "center -10vh"
    }
  },
  '/nft/socialTask': {
    img: getImageUrl('@/assets/images/_global/socialTask_landing_bg.png'),
    className: "h-screen",
    style: {
      filter: "sepia(1) hue-rotate(90deg)",
      backgroundPosition: "center -30vh"
    }
  },
}