import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "./routes/root";
import Home from "./routes/pages/Home/page";
import Zk from "@/routes/pages/Zk/page";
import Ai from "@/routes/pages/Ai/page";
import Nft from "@/routes/pages/Nft/page";
import Stake from "@/routes/pages/Stake/page";
import ZkInvite from "@/routes/pages/Zk/invite/page";
import ZkProver from "@/routes/pages/Zk/prover/page"; 


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
            
          ]
        },
        {
          path: "/ai",
          element: <Ai />,
        },
        {
          path: "/nft",
          element: <Nft />,
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
