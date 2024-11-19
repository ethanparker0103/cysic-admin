import useAuthCheck from "@/hooks/useAuthCheck";
import { Outlet } from "react-router-dom";

export default function Root() {
    useAuthCheck()
    return (
        <Outlet />
    );
}
