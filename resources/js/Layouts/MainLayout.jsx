import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "@/Components/Sidebar";
import Topbar from "@/Components/Topbar";

const MainLayout = ({ openModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListView, setIsListView] = useState(false);
    const [selectMultiple, setSelectMultiple] = useState([]);

    const { isLoggedIn } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Topbar
                selectMultiple={selectMultiple}
                setSelectMultiple={setSelectMultiple}
                isListView={isListView}
                setIsListView={setIsListView}
            />

            <Sidebar
                openModal={openModal}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            {/* ================= MAIN CONTENT ================= */}
            <div className="flex flex-col flex-1 mt-11">
                {/* <div className="md:hidden p-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                    >
                        {isOpen ? "Close" : "Open"} Menu
                    </button>
                </div> */}

                <main className="flex-1 p-6">
                    <Outlet
                        context={[
                            selectMultiple,
                            setSelectMultiple,
                            isListView,
                        ]}
                    />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
