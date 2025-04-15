import BasicLayout from "@/routes/layout/BasicLayout";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <BasicLayout>
            <Outlet />
        </BasicLayout>
    );
}
