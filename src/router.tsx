import { createBrowserRouter } from "react-router-dom";
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

import MyProjectPage from "@/routes/pages/Zk/project/my/page";
import MyProjectDetailPage from "@/routes/pages/Zk/project/[id]/page";
import EcosystemPage from "@/routes/pages/Ecosystem/page";
import AcademyPage from "@/routes/pages/Academy/page";
import HardwarePage from "@/routes/pages/Hardware/page";
import ProjectPage from "@/routes/pages/Zk/project/page";
import VerifierPage from "@/routes/pages/Zk/verifier/page";

import DashboardPage from "@/routes/pages/Zk/dashboard/page";
import TaskListPage from "@/routes/pages/Zk/dashboard/task/page";
import ProjectListPage from "@/routes/pages/Zk/dashboard/project/page";
import VerifierListPage from "@/routes/pages/Zk/dashboard/verifier/page";
import ProverListPage from "@/routes/pages/Zk/dashboard/prover/page";
import ProjectDetailPage from "@/routes/pages/Zk/dashboard/project/[id]/page";
import VerifierDetailPage from "@/routes/pages/Zk/dashboard/verifier/[id]/page";
import ProverDetailPage from "@/routes/pages/Zk/dashboard/prover/[id]/page";
import TaskDetailPage from "@/routes/pages/Zk/dashboard/task/[id]/page";
import UnbindPage from "@/routes/pages/unbind/page";
import Bridge from "@/routes/pages/Bridge/page";
import { enableBridge, enableSocialTask } from "@/config";
import MediakitPage from "@/routes/pages/Mediakit/page";
import ContactUs from "@/routes/pages/ContactUs/page";

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
  ],
};

const socialTaskModules = enableSocialTask ? {
  path: "socialTask",
  element: <NftSocialTask />,
} : {}

const bridgeModules = enableBridge ? {
  path: "bridge",
  element: <Bridge />,
} : {}

// 定义共享的路由结构
const routeChildren = [
  {
    index: true,
    element: <Home />,
  },
  portalModules,
  bridgeModules,
  {
    path: "unbind",
    element: <UnbindPage />,
  },
  {
    path: "ecosystem",
    element: <EcosystemPage />,
  },
  {
    path: "academy",
    element: <AcademyPage />,
  },
  {
    path: "hardware",
    element: <HardwarePage />,
  },
  {
    path: "mediakit",
    element: <MediakitPage />,
  },
  {
    path: "contactus",
    element: <ContactUs />,
  },
  {
    path: "media-kit",
    element: <MediakitPage />,
  },
  {
    path: "contact-us",
    element: <ContactUs />,
  },
  socialTaskModules,
  {
    path: "zk",
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
        path: "project/:id",
        element: <MyProjectDetailPage />,
      },

      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "dashboard/project",
        element: <ProjectListPage />,
      },
      {
        path: "dashboard/verifier",
        element: <VerifierListPage />,
      },
      {
        path: "dashboard/prover",
        element: <ProverListPage />,
      },
      {
        path: "dashboard/task",
        element: <TaskListPage />,
      },
      {
        path: "dashboard/project/:id",
        element: <ProjectDetailPage />,
      },
      {
        path: "dashboard/verifier/:id",
        element: <VerifierDetailPage />,
      },
      {
        path: "dashboard/prover/:id",
        element: <ProverDetailPage />,
      },
      {
        path: "dashboard/task/:id",
        element: <TaskDetailPage />,
      },
      portalModules,
    ],
  },
  {
    path: "ai",
    element: <Ai />,
  },
  {
    path: "nft",
    children: [
      {
        index: true,
        element: <Nft />,
      },
      portalModules,
    ],
  },
  {
    path: "stake",
    element: <Stake />,
  },
];

export const router = createBrowserRouter([
  // 默认路径 "/"
  {
    path: "/",
    element: <Root />,
    children: routeChildren,
  },
  // 备份路径 "/m"
  {
    path: "/m",
    element: <Root />,
    children: routeChildren,
  }
]);

export const backgroundImageList = {
  "/": {
    img: getImageUrl("@/assets/images/_global/home_landing_bg.png"),
    className: "grayscale h-[100vh] min-h-[1200px]",
    needShadow: true,
  },
  "/ecosystem": {
    img: getImageUrl("@/assets/images/_global/zk_ecosystem_bg.png"),
    className: "h-[50vh]",
    style: {
      filter: "grayscale(1) brightness(0.3) ",
      backgroundPosition: "center -25vh",
    },
    needShadow: true,
  },
  "/academy": {
    img: getImageUrl("@/assets/images/_global/zk_academy_bg.png"),
    // className: "h-[100vh]",
    style: { backgroundPosition: "center -62vh" },
    needShadow: true,
    
  },
  "/hardware": {
    img: getImageUrl("@/assets/images/_global/zk_hardware_bg.png"),
    className: "h-[calc(100vh+5.625rem)] lg:h-screen",
    style: { backgroundPosition: "center -10vh" },
    mainClassName: "pt-0",
  },
  "/zk": {
    img: getImageUrl("@/assets/images/_global/zk_landing_bg.png"),
    className: "!bg-center h-[100vh] lg:h-[min(170vh,100.875rem)]",
  },
  "/zk/invite": {
    img: getImageUrl("@/assets/images/_global/invite_landing_bg.png"),
    className: "h-screen",
    needShadow: true,
    needBack: true,
    backTo: "/zk/userPortal",
    backContent: "User Portal",
  },
  "/zk/prover": {
    img: getImageUrl("@/assets/images/_global/prover_landing_bg.png"),
    className: "h-screen",
    style: {
      backgroundPosition: "center -5vh",
    },
    needShadow: true,
  },
  "/zk/verifier": {
    img: '#000'
  },
  "/zk/project": {
    img: getImageUrl("@/assets/images/_global/project_landing_bg.png"),
    className: "h-screen brightness-[0.7]",
    style: {
      backgroundPosition: "center -25vh",
    },
    needShadow: true,
  },
  "/zk/project/:id": {
    img: getImageUrl("@/assets/images/_global/project_landing_bg.png"),
    className: "h-screen brightness-[0.7]",
    style: {
      backgroundPosition: "center -25vh",
    },
    needShadow: true,
    needBack: true,
  },
  "/zk/project/my": {
    img: getImageUrl("@/assets/images/_global/project_landing_bg.png"),
    className: "h-screen brightness-[0.7]",
    style: {
      backgroundPosition: "center -25vh",
    },
    needShadow: true,
    needBack: true,
  },
  "/zk/dashboard": {
    img: getImageUrl("@/assets/images/_global/dashboard_landing_bg.png"),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh",
    },
  },
  "/zk/dashboard/project": {
    img: "#000",
    needBack: true,
    backContent: "Dashboard",
  },
  "/zk/dashboard/verifier": {
    img: getImageUrl(
      "@/assets/images/_global/dashboard_verifier_landing_bg.png"
    ),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh",
    },
    needBack: true,
    backContent: "Dashboard",
  },
  "/zk/dashboard/prover": {
    img: getImageUrl("@/assets/images/_global/dashboard_prover_landing_bg.png"),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh",
    },
    needBack: true,
    backContent: "Dashboard",
  },
  "/zk/dashboard/task": {
    img: getImageUrl("@/assets/images/_global/dashboard_task_landing_bg.png"),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh",
    },
    needBack: true,
    backContent: "Dashboard",
  },
  "/zk/dashboard/project/:id": {
    img: "#000",
    needBack: true,
    backContent: "Project",
  },
  "/zk/dashboard/verifier/:id": {
    img: getImageUrl(
      "@/assets/images/_global/dashboard_verifier_landing_bg.png"
    ),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh",
    },
    needBack: true,
    backContent: "Verifier",
  },
  "/zk/dashboard/prover/:id": {
    img: getImageUrl("@/assets/images/_global/dashboard_prover_landing_bg.png"),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh",
    },
    needBack: true,
    backContent: "Prover",
  },
  "/zk/dashboard/task/:id": {
    img: getImageUrl("@/assets/images/_global/dashboard_task_landing_bg.png"),
    className: "h-screen purple-landing",
    style: {
      backgroundPosition: "center -20vh",
    },
    needBack: true,
    backContent: "Task",
  },

  "/ai": {
    img: getImageUrl("@/assets/images/_global/ai_landing_bg.png"),
    className: "h-screen grayscale brightness-[0.3]",
    needShadow: true,
  },
  "/stake": {
    img: getImageUrl("@/assets/images/_global/stake_landing_bg.png"),
    className: "h-screen",
  },
  "/nft": {
    img: getImageUrl("@/assets/images/_global/nft_landing_bg.png"),
    className: "h-screen",
    style: {
      backgroundPosition: "center -10vh",
    },
    needShadow: true,
  },

  "/userPortal": {
    img: getImageUrl("@/assets/images/_global/userPortal_landing_bg.png"),
    className: "h-screen green-landing",
    style: {
      backgroundPosition: "center 0",
    },
    needShadow: true,
  },
  "/zk/userPortal": {
    img: getImageUrl("@/assets/images/_global/userPortal_landing_bg.png"),
    className: "h-screen green-landing",
    style: {
      backgroundPosition: "center 0",
    },
    needShadow: true,
  },
  "/userPortal/serviceHub": {
    img: "#000",
    needBack: true,
    backContent: "User Portal",
  },
  "/zk/userPortal/serviceHub": {
    img: "#000",
    needBack: true,
    backContent: "User Portal",
  },
  "/socialTask": {
    img: getImageUrl("@/assets/images/_global/socialTask_landing_bg.png"),
    className: "h-screen green-landing",
    style: {
      backgroundPosition: "center -20vh",
    },
    needShadow: true,
  },
  "/mediakit": {
    img: getImageUrl("@/assets/images/_global/mediakit_landing_bg.png"),
    className: "h-screen",
  },
  "/media-kit": {
    img: getImageUrl("@/assets/images/_global/mediakit_landing_bg.png"),
    className: "h-screen",
  },
  "/contactus": {
    img: getImageUrl("@/assets/images/_global/contactus_landing_bg.png"),
    className: "purple-landing",
    needShadow: true,
  },
  "/contact-us": {
    img: getImageUrl("@/assets/images/_global/contactus_landing_bg.png"),
    className: "purple-landing",
    needShadow: true,
  },
};
