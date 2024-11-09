import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="flex max-w-md mx-auto flex-col h-screen justify-center gap-5">
            <div className="bg-white flex flex-col gap-6 py-10 px-9 rounded-md shadow-xl border border-gray-300">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
