import { PT12Wrapper } from "@/components/Wrappers";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Button } from "@nextui-org/react";
import { SettingsManagement } from "./components/SettingsManagement";
import { InviteCodeManagement } from "./components/InviteCodeManagement";
import { StampManagement } from "./components/StampManagement";
import { SignInRewardManagement } from "./components/SignInRewardManagement";
import { TaskManagement } from "./components/TaskManagement";
import { PendingTaskManagement } from "./components/PendingTaskManagement";
import { AdminUserManagement } from "./components/AdminUserManagement";
import { AdminLogin } from "./components/AdminLogin";
import { AuthProvider, useAuth } from "./components/AuthProvider";

const AdminContent = () => {
    const { isAuthenticated, logout, userId, login } = useAuth();

    if (!isAuthenticated) {
        return <AdminLogin onLoginSuccess={login} />;
    }

    return (
        <PT12Wrapper className="w-full">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">User ID: {userId}</span>
                    <Button 
                        color="danger" 
                        variant="flat" 
                        size="sm"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>
            </div>
            
            <Tabs aria-label="Admin Dashboard" className="w-full">
                <Tab key="settings" title="System Settings">
                    <SettingsManagement />
                </Tab>
                <Tab key="inviteCode" title="Invite Code">
                    <InviteCodeManagement />
                </Tab>
                <Tab key="stamp" title="Stamps">
                    <StampManagement />
                </Tab>
                <Tab key="signInReward" title="Sign-in Rewards">
                    <SignInRewardManagement />
                </Tab>
                <Tab key="task" title="Tasks">
                    <TaskManagement />
                </Tab>
                <Tab key="pendingTask" title="Pending Tasks">
                    <PendingTaskManagement />
                </Tab>
                <Tab key="adminUser" title="Admin Users">
                    <AdminUserManagement />
                </Tab>
            </Tabs>
        </PT12Wrapper>
    );
};

export const Admin = () => {
    return (
        <AuthProvider>
            <AdminContent />
        </AuthProvider>
    );
};
