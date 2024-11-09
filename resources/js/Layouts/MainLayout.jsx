import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const SearchBar = () => {
    return (
        <form className="flex items-center w-full">
            <label htmlFor="voice-search" className="sr-only">
                Search
            </label>
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required=""
                />
                <button
                    type="button"
                    className="flex absolute inset-y-0 right-0 items-center pr-3"
                >
                    {/* <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                            clipRule="evenodd"
                        />
                    </svg> */}
                </button>
            </div>
        </form>
    );
};

const RefreshIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#000"
        >
            <path d="M13 9v2h7V4h-2v2.74C16.53 5.07 14.4 4 12 4c-2.21 0-4.21.9-5.66 2.34S4 9.79 4 12c0 4.42 3.58 8 8 8 2.21 0 4.21-.9 5.66-2.34l-1.42-1.42A5.98 5.98 0 0 1 12 18c-3.31 0-6-2.69-6-6 0-1.65.67-3.15 1.76-4.24A5.98 5.98 0 0 1 12 6a6.01 6.01 0 0 1 5.19 3H13z" />
        </svg>
    );
};

const ListIcon = () => {
    return (
        <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g
                id="list_view_24px"
                stroke="none"
                strokeWidth={1}
                fill="none"
                fillRule="evenodd"
            >
                <polygon
                    id="bounds"
                    fillOpacity={0}
                    fill="#FFFFFF"
                    points="0 0 24 0 24 24 0 24"
                />
                <path
                    d="M20,9 L4,9 L4,5 L20,5 L20,9 Z M20,19 L4,19 L4,15 L20,15 L20,19 Z M3,3 C2.45,3 2,3.45 2,4 L2,10 C2,10.55 2.45,11 3,11 L21,11 C21.55,11 22,10.55 22,10 L22,4 C22,3.45 21.55,3 21,3 L3,3 Z M3,13 C2.45,13 2,13.45 2,14 L2,20 C2,20.55 2.45,21 3,21 L21,21 C21.55,21 22,20.55 22,20 L22,14 C22,13.45 21.55,13 21,13 L3,13 Z"
                    id="icon"
                    fill="#000000"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
};

const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* ================= TOP BAR - SELECTED AREA ================= */}
            <div></div>

            {/* ================= TOP BAR ================= */}
            <div className="px-6 border border-gray-300 py-8 w-full flex items-center z-30 h-10 bg-white fixed">
                <div className="min-w-60 text-xl font-medium text-[#3c4043]">Keep</div>
                
                <div className="flex w-full items-center gap-40">
                    <SearchBar />
                    <div className="flex gap-6">
                        <RefreshIcon />
                        <ListIcon />
                    </div>
                </div>
                
                <div className="min-w-32 flex justify-end">
                <span className="bg-gray-200 cursor-pointer uppercase size-9 flex items-center justify-center rounded-full">
                    H
                </span>
                </div>
            </div>

            {/* ================= SIDEBAR ================= */}
            <div
                className={`fixed z-20 inset-y-0 left-0 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:relative z-10 transition-transform duration-200 ease-in-out w-64 bg-white  text-black`}
            >
                <nav className="mt-[74px]">
                    <Link
                        to="/dashboard"
                        className="block py-2.5 px-4 rounded-r-full bg-[#feefc3] hover:bg-gray-200 transition"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/users"
                        className="block py-2.5 px-4 rounded-r-full hover:bg-gray-200  transition"
                    >
                        Users
                    </Link>
                    <Link
                        to="/settings"
                        className="block py-2.5 px-4 rounded-r-full hover:bg-gray-200  transition"
                    >
                        Settings
                    </Link>
                </nav>
            </div>

            {/* ================= OVERLAY BACKGROUND ================= */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

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
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
