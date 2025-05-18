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

import MyProjectPage from "@/routes/pages/Zk/project/my/page";
import MyProjectDetailPage from "@/routes/pages/Zk/project/[id]/page";
import EcosystemPage from "@/routes/pages/Ecosystem/page";
import AcademyPage from "@/routes/pages/Academy/page";
import HardwarePage from "@/routes/pages/Hardware/page";

import ProjectPage from "@/routes/pages/Zk/project/page";
import VerifierPage from "@/routes/pages/Zk/verifier/page";
import ProverPage from "@/routes/pages/Zk/prover/page";

import DashboardPage from "@/routes/pages/Zk/dashboard/page";
import TaskListPage from "@/routes/pages/Zk/dashboard/task/page";
import ProjectListPage from "@/routes/pages/Zk/dashboard/project/page";
import VerifierListPage from "@/routes/pages/Zk/dashboard/verifier/page";
import ProverListPage from "@/routes/pages/Zk/dashboard/prover/page";
import ProjectDetailPage from "@/routes/pages/Zk/dashboard/project/[id]/page";
import VerifierDetailPage from "@/routes/pages/Zk/dashboard/verifier/[id]/page";
import ProverDetailPage from "@/routes/pages/Zk/dashboard/prover/[id]/page";
import TaskDetailPage from "@/routes/pages/Zk/dashboard/task/[id]/page"



const portalModules = {
  path: "userPortal",
  children: [
    {
      index: true,
      element: <NftUserPortal />,
    },
    {
      path: "serviceHub",
      element: <NftServiceHub />,
    },

  ]
}

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
        portalModules,
        {
          path: "/ecosystem",
          element: <EcosystemPage />,
        },
        {
          path: "/academy",
          element: <AcademyPage />,
        },
        {
          path: "/hardware",
          element: <HardwarePage />,
        },
        {
          path: "socialTask",
          element: <NftSocialTask />,
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
              path: "project/my/:id",
              element: <MyProjectDetailPage />,
            },

            {
              path: "dashboard",
              element: <DashboardPage />,
            },
            {
              path: 'dashboard/project',
              element: <ProjectListPage />,
            },
            {
              path: 'dashboard/verifier',
              element: <VerifierListPage />
            },
            {
              path: 'dashboard/prover',
              element: <ProverListPage />
            },
            {
              path: 'dashboard/task',
              element: <TaskListPage />
            },
            {
              path: 'dashboard/project/:id',
              element: <ProjectDetailPage />
            },
            {
              path: 'dashboard/verifier/:id',
              element: <VerifierDetailPage />
            },
            {
              path: 'dashboard/prover/:id',
              element: <ProverDetailPage />
            },
            {
              path: 'dashboard/task/:id',
              element: <TaskDetailPage />
            },
            portalModules
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
            portalModules
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
    className: "grayscale h-[160vh]",
  },
  '/ecosystem': {
    img: getImageUrl('@/assets/images/_global/zk_ecosystem_bg.png'),
    className: "h-[50vh]",
    style: { filter: "grayscale(1) brightness(0.3) ", backgroundPosition: "center -25vh" },
    needShadow: true
  },
  '/academy': {
    img: getImageUrl('@/assets/images/_global/zk_academy_bg.png'),
    className: "h-[100vh]",
    style: { backgroundPosition: "center -50vh" },
    needShadow: true
  },
  '/hardware': {
    img: getImageUrl('@/assets/images/_global/zk_hardware_bg.png'),
    className: "h-screen",
    style: { backgroundPosition: "center -10vh" },
    // needShadow: true
  },
  '/zk': {
    img: getImageUrl('@/assets/images/_global/zk_landing_bg.png'),
    className: isMobile ? "h-[90%]" : "h-[180vh]",
    // needShadow: true
  },
  '/zk/invite': {
    img: getImageUrl('@/assets/images/_global/invite_landing_bg.png'),
    className: "h-screen",
    needShadow: true,
    needBack: true,
    backTo: '/zk/userPortal',
    backContent: 'User Portal'
  },
  '/zk/prover': {
    img: getImageUrl('@/assets/images/_global/prover_landing_bg.png'),
    className: "h-screen",
    needShadow: true
  },
  '/zk/verifier': {
    // img: getImageUrl('@/assets/images/_global/stake_landing_bg.png'),
    // className: "h-screen",
    // needShadow: true
  },
  '/zk/project': {
    img: getImageUrl('@/assets/images/_global/project_landing_bg.png'),
    className: "h-screen brightness-[0.7]",
    style: {
      backgroundPosition: "center -25vh"
    },
    needShadow: true
  },
  '/zk/project/my': {
    img: '#000',
    needBack: true
  },
  '/zk/dashboard': {
    img: getImageUrl('@/assets/images/_global/dashboard_landing_bg.png'),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh"
    },
  },
  '/zk/dashboard/project': {
    img: getImageUrl('@/assets/images/_global/dashboard_landing_bg.png'),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh"
    },
    needBack: true
  },
  '/zk/dashboard/verifier': {
    img: getImageUrl('@/assets/images/_global/dashboard_verifier_landing_bg.png'),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh"
    },
    needBack: true
  },
  '/zk/dashboard/prover': {
    img: getImageUrl('@/assets/images/_global/dashboard_prover_landing_bg.png'),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh"
    },
    needBack: true
  },
  '/zk/dashboard/task': {
    img: getImageUrl('@/assets/images/_global/dashboard_task_landing_bg.png'),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh"
    },
    needBack: true
  },
  '/zk/dashboard/project/:id': {
    img: getImageUrl('@/assets/images/_global/socialTask_landing_bg.png'),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh"
    },
    needBack: true
  },
  '/zk/dashboard/verifier/:id': {
    img: getImageUrl('@/assets/images/_global/dashboard_verifier_landing_bg.png'),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh"
    },
    needBack: true
  },
  '/zk/dashboard/prover/:id': {
    img: getImageUrl('@/assets/images/_global/dashboard_prover_landing_bg.png'),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh"
    },
    needBack: true
  },
  '/zk/dashboard/task/:id': {
    img: getImageUrl('@/assets/images/_global/dashboard_task_landing_bg.png'),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh"
    },
    needBack: true
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
  
  '/userPortal': {
    img: getImageUrl('@/assets/images/_global/userPortal_landing_bg.png'),
    className: "h-screen green-landing",
    style: {
      backgroundPosition: "center 12vh",
    },
    needShadow: true
  },
  '/zk/userPortal': {
    img: getImageUrl('@/assets/images/_global/userPortal_landing_bg.png'),
    className: "h-screen green-landing",
    style: {
      backgroundPosition: "center 12vh"
    },
    needShadow: true
  },
  '/socialTask': {
    img: getImageUrl('@/assets/images/_global/socialTask_landing_bg.png'),
    className: "h-screen green-landing",
    style: {
      backgroundPosition: "center -20vh"
    },
    needShadow: true

  },
}