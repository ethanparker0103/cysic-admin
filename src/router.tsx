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
import Assets from "@/routes/pages/Dashboard/Assets";
import VeComputed from "@/routes/pages/Dashboard/Stake/VeComputed";
import VeCysic from "@/routes/pages/Dashboard/Stake/VeCysic";
import SocialTasks from "@/routes/pages/Dashboard/SocialTasks";


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
                        element: <Dashboard />
                    },
                    {
                        path: 'my',
                        element: <My />,
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
                        path: 'provider',
                        element: <DashboardComputility />,
                    },
                    {
                        path: 'provider/:id',
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
                        path: 'leadingboard',
                        element: <Leadingboard />,
                    },
                    {
                        path: 'referral',
                        element: <Referral />,
                    },
                    {
                        path: 'assets',
                        element: <Assets />,
                    },
                    {
                        path: 'stake',
                        loader: async ()=>redirect('/dashboard')
                    },
                    {
                        path: 'stake/vecysic',
                        element: <VeCysic />,
                    },
                    {
                        path: 'stake/vecompute',
                        element: <VeComputed />,
                    },
                    {
                        path: 'faucet',
                        element: <Faucet />,
                    },
                    {
                        path: 'socialTasks',
                        element: <SocialTasks />,
                    }
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
                        path: 'provider',
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
                    {
                        path: 'test',
                        element: <Test />
                    }
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
