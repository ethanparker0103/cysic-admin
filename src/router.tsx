import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "./routes/root";
import Home from "./routes/pages/Home/index";
import BasicLayout from "@/routes/layout/BasicLayout/index";
import DashboardLayout from "@/routes/layout/DashboardLayout/index";
import Project from "@/routes/pages/Project";
import Computility from "@/routes/pages/Computility";
import Test from "@/routes/pages/Test";
import Verify from "@/routes/pages/Verify";
import Dashboard from "@/routes/pages/Dashboard";
import Verifier from "@/routes/pages/Dashboard/Verifier";
import VerifierDetail from "@/routes/pages/Dashboard/Verifier/Detail";
import DashboardComputility from "@/routes/pages/Dashboard/Computility";
import ComputilityDetail from "@/routes/pages/Dashboard/Computility/Detail";
import DashboardProject from "@/routes/pages/Dashboard/Project";
import ProjectDetail from "@/routes/pages/Dashboard/Project/Detail";
import Task from "@/routes/pages/Dashboard/Task";
import TaskDetail from "@/routes/pages/Dashboard/Task/Detail";
import My from "@/routes/pages/Dashboard/My";
import ActivityLayout from "@/routes/layout/ActivityLayout/inidex";
import Aleo from "@/routes/pages/Activity/Aleo";
import Leadingboard from "@/routes/pages/Dashboard/Leadingboard";
import Referral from "@/routes/pages/Dashboard/Referral";
import Faucet from "@/routes/pages/Dashboard/Faucet";
import VeComputed from "@/routes/pages/Dashboard/Stake/VeComputed";
import VeCysic from "@/routes/pages/Dashboard/Stake/VeCysic";
import SocialTasks from "@/routes/pages/Dashboard/SocialTasks";
import FillReferralCode from "@/routes/pages/Dashboard/Referral/fillReferralCode";
import Phase1Convert from "@/routes/pages/Dashboard/My/page/phase1convert";
import Phase2Finalize from "@/routes/pages/Phase2Finalize";
import About from "@/routes/pages/About";
import Faq from "@/routes/pages/Faq";
import Phase2FinalizeLayout from "@/routes/layout/Phase2FinalizeLayout";

/* eslint-enable react-refresh/only-export-components */

// 添加一个开关变量来控制是否启用重定向
const PHASE2_FINALIZE_MODE = true; // 设置为 true 启用重定向，false 禁用重定向

// 条件重定向函数
const conditionalRedirect = () => {
  if (PHASE2_FINALIZE_MODE) {
    return redirect("/subscribe");
  }
  return null; // 不重定向时返回 null
};

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              loader: async () => {
                // 如果不需要重定向到 phase2Finalize，则执行原有的重定向逻辑
                return redirect("/dashboard/overview");
              },
            },
            {
              path: "overview",
              element: <Dashboard />,
            },
            {
              path: "test",
              element: <Test />,
            },
          ],
        },
        {
          path: "dashboard/verifier",
          element: <DashboardLayout />,
          loader: conditionalRedirect,
          children: [
            {
              index: true,
              element: <Verifier />,
            },
            {
              path: ":id",
              element: <VerifierDetail />,
            },
          ],
        },
        {
          path: "dashboard/prover",
          element: <DashboardLayout />,
          loader: conditionalRedirect,
          children: [
            {
              index: true,
              element: <DashboardComputility />,
            },
            {
              path: ":id",
              element: <ComputilityDetail />,
            },
          ],
        },
        {
          path: "dashboard/project",
          element: <DashboardLayout />,
          loader: conditionalRedirect,
          children: [
            {
              index: true,
              element: <DashboardProject />,
            },
            {
              path: ":id",
              element: <ProjectDetail />,
            },
          ],
        },
        {
          path: "dashboard/task",
          element: <DashboardLayout />,
          loader: conditionalRedirect,
          children: [
            {
              index: true,
              element: <Task />,
            },
            {
              path: ":id",
              element: <TaskDetail />,
            },
          ],
        },
        {
          path: "stake",
          element: <DashboardLayout />,
          loader: conditionalRedirect,
          children: [
            {
              path: "cgt",
              element: <VeCysic />,
            },
            {
              path: "vecompute",
              element: <VeComputed />,
            },
          ],
        },
        {
          path: "my",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <My />,
            },
            {
              path: "phase1",
              element: <Phase1Convert />,
            },
          ],
        },
        {
          path: "leadingboard",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <Leadingboard />,
            },
          ],
        },
        {
          path: "referral",
          element: <DashboardLayout />,
          loader: conditionalRedirect,
          children: [
            {
              index: true,
              element: <Referral />,
            },
            {
              path: "invite",
              element: <FillReferralCode />,
            },
            {
              path: "socialTasks",
              element: <SocialTasks />,
            },
          ],
        },
        {
          path: "faucet",
          element: <DashboardLayout />,
          loader: conditionalRedirect,
          children: [
            {
              index: true,
              element: <Faucet />,
            },
          ],
        },
        {
          path: "about",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <About />,
            },
          ],
        },
        {
          path: "faq",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <Faq />,
            },
          ],
        },
        {
          path: "/register",
          element: <BasicLayout />,
          loader: conditionalRedirect,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "prover",
              element: <Computility />,
            },
            {
              path: "project",
              element: <Project />,
            },
            {
              path: "verifier",
              element: <Verify />,
            },
          ],
        },
        {
          path: "/aleopool",
          element: <ActivityLayout />,
          loader: conditionalRedirect,
          children: [
            {
              index: true,
              element: <Aleo />,
            },
          ],
        },
        {
          path: "/subscribe",
          element: <Phase2FinalizeLayout />,
          children: [
            {
              index: true,
              element: <Phase2Finalize />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/m",
  }
);
