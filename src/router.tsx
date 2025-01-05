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
import Phase1 from "@/routes/pages/Dashboard/My/page/phase1";
import Phase1Convert from "@/routes/pages/Dashboard/My/page/phase1convert";
import About from "@/routes/pages/About";
import Faq from "@/routes/pages/Faq";


/* eslint-enable react-refresh/only-export-components */

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: 'dashboard',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        loader: async ()=>redirect('/dashboard/overview')
                        // element: <Dashboard />
                    },
                    {
                        path: 'overview',
                        element: <Dashboard />
                    },
                    {
                        path: 'verifier',
                        element: <Verifier />,
                    },
                    {
                        path: 'verifier/:id',
                        element: <VerifierDetail />,
                    },
                    {
                        path: 'prover',
                        element: <DashboardComputility />,
                    },
                    {
                        path: 'prover/:id',
                        element: <ComputilityDetail />,
                    },
                    {
                        path: 'project',
                        element: <DashboardProject />,

                    },
                    {
                        path: 'project/:id',
                        element: <ProjectDetail />,
                    },
                    {
                        path: 'task',
                        element: <Task />,
                    },
                    {
                        path: 'task/:id',
                        element: <TaskDetail />,
                    },
                    {
                        path: 'test',
                        element: <Test />
                    }
                ]
            },
            {
                path: 'stake',
                element: <DashboardLayout />,
                children: [
                    {
                        path: 'cgt',
                        element: <VeCysic />,
                    },
                    {
                        path: 'vecompute',
                        element: <VeComputed />,
                    },
                ]
            },
            {
                path: 'my',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <My />,
                    },
                    {
                        path: 'phase1',
                        element: <Phase1 />,
                    },
                    {
                        path: 'phase1Convert',
                        element: <Phase1Convert />,
                    },
                    
                ]
            },
            {
                path: 'leadingboard',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <Leadingboard />,
                    },
                ]
            },
            {
                path: 'referral',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <Referral />,
                    },
                    {
                        path: 'invite',
                        element: <FillReferralCode />,
                    },
                    {
                        path: 'socialTasks',
                        element: <SocialTasks />,
                    },
                ]
            },
            {
                path: 'faucet',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <Faucet />,
                    },
                ]
            },

            {
                path: 'about',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <About />,
                    },
                ]
            },
            {
                path: 'faq',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <Faq />,
                    },
                ]
            },

            {
                path: "/register",
                element: <BasicLayout />,
                children: [
                    {
                        index: true,
                        element: <Home />
                    },
                    {
                        path: 'prover',
                        element: <Computility />
                    },
                    {
                        path: 'project',
                        element: <Project />
                    },
                    {
                        path: 'verifier',
                        element: <Verify />
                    },
                ],
            },
            {
                path: "/aleopool",
                element: <ActivityLayout />,
                children: [
                    {
                        index: true,
                        element: <Aleo />
                    },
                ],
            },
        ],
    }
], {
    basename: '/m'
});
