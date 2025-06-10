import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import Home from "./routes/pages/Home/page";
import { getImageUrl } from "@/utils/tools";

import EcosystemPage from "@/routes/pages/Ecosystem/page";
import AcademyPage from "@/routes/pages/Academy/page";
import HardwarePage from "@/routes/pages/Hardware/page";

import MediakitPage from "@/routes/pages/Mediakit/page";
import ContactUs from "@/routes/pages/ContactUs/page";
import CareersPage from "@/routes/pages/Careers/page";


// 定义共享的路由结构
const routeChildren = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "careers",
    element: <CareersPage />,
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
    mainClassName: "overflow-x-hidden",
  },
  "/careers": {
    img: "#000",
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
    style: { backgroundPosition: "center -62vh" },
    needShadow: true,
    
  },
  "/hardware": {
    img: getImageUrl("@/assets/images/_global/zk_hardware_bg.png"),
    className: "h-[calc(100vh+5.625rem)] lg:h-screen",
    style: { backgroundPosition: "center -10vh" },
    mainClassName: "pt-0",
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
