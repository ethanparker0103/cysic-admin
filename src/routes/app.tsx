import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function App() {

    return (
        <div className="text-white">
            <div className="w-full bg-white overflow-hidden">
                <Suspense>
                    {/* <div className="min-h-[840px] py-[80px]"> */}
                    <Outlet />
                    {/* </div> */}
                </Suspense>
            </div>
        </div>
    );
}
