import React, { useState } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "@/Hooks/useAuth";
import {
    ArchivedIcon,
    BulbIcon,
    ColorIcon,
    CrossIcon,
    ImageUploadIcon,
    LabelIcon,
    ListIcon,
    PencilIcon,
    PinIcon,
    RefreshIcon,
    SearchIcon,
    TrashIcon,
} from "@/Components/Icons";

const SearchBar = () => {
    return (
        <form className="flex items-center w-full">
            <label htmlFor="voice-search" className="sr-only">
                Search
            </label>
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-500" />
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
                ></button>
            </div>
        </form>
    );
};

const MainLayout = ({ openModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListView, setIsListView] = useState(false);
    const [selectMultiple, setSelectMultiple] = useState([]);

    const { labels } = useSelector((state) => state?.label);
    const { isLoggedIn } = useSelector((state) => state.auth);

    const { signOut } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to={"/"} />;
    }

    const handleSignOut = async () => {
        await signOut();
    };

    const handleRefresh = async () => {
        //
    };

    const handleView = () => {
        setIsListView(!isListView);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* ================= TOP BAR - SELECTED AREA ================= */}
            <div
                className={`${
                    selectMultiple.length ? "top-0" : "-top-28"
                } px-6 transition-all ease-in-out bg-white py-8 w-full flex items-center justify-between z-40 h-10 fixed`}
            >
                <div className="flex gap-2 items-center">
                    <CrossIcon
                        className="cursor-pointer bg-soft-with-hover size-8"
                        onClick={() => setSelectMultiple([])}
                    />
                    <p className="text-lg font-medium">
                        Selected Item {selectMultiple.length}
                    </p>
                </div>

                <div className="flex gap-2">
                    <PinIcon className="bg-soft-with-hover size-9" />
                    <ColorIcon className="bg-soft-with-hover size-9" />
                    <ImageUploadIcon className="bg-soft-with-hover size-9" />
                    <ArchivedIcon className="bg-soft-with-hover size-9" />
                    <TrashIcon className="bg-soft-with-hover size-9" />
                </div>
            </div>

            {/* ================= TOP BAR ================= */}
            <div className="px-6 border border-gray-300 py-8 w-full flex items-center z-30 h-10 bg-white fixed">
                <div className="min-w-60 text-xl font-medium text-[#3c4043]">
                    Keep
                </div>

                <div className="flex w-full items-center gap-40">
                    <SearchBar />
                    <div className="flex gap-6">
                        <RefreshIcon
                            className="cursor-pointer"
                            onClick={handleRefresh}
                        />
                        <div onClick={handleView}>
                            {isListView ? "Gird View" : <ListIcon />}
                        </div>
                    </div>
                </div>

                <div className="min-w-32 flex justify-end">
                    <span
                        onClick={handleSignOut}
                        className="bg-gray-200 cursor-pointer uppercase size-9 flex items-center justify-center rounded-full"
                    >
                        H
                    </span>
                </div>
            </div>

            {/* ================= SIDEBAR ================= */}
            <div
                className={`fixed z-20 inset-y-0 left-0 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:relative z-10 transition-transform duration-200 ease-in-out w-72 bg-white  text-black`}
            >
                <nav className="mt-[67px] overflow-auto max-h-[88vh]">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-4 font-medium py-3.5 px-4 rounded-r-full bg-[#feefc3] hover:bg-gray-100 transition"
                    >
                        <BulbIcon className="size-6" />
                        <span>Notes</span>
                    </Link>

                    <button
                        onClick={() => openModal()}
                        className="flex w-full items-center gap-4 font-medium py-3.5 px-4 rounded-r-full hover:bg-gray-100  transition"
                    >
                        <PencilIcon className="size-6" />
                        <span>Edit labels</span>
                    </button>

                    <Link
                        to="/archived"
                        className="flex items-center gap-4 font-medium py-3.5 px-4 rounded-r-full hover:bg-gray-100  transition"
                    >
                        <ArchivedIcon className="size-6" />
                        <span>Archived</span>
                    </Link>

                    {labels?.map((label) => (
                        <Link
                            key={label?.id}
                            to={label?.name}
                            className="flex items-center gap-4 font-medium py-3.5 px-4 rounded-r-full hover:bg-gray-100  transition"
                        >
                            <LabelIcon className="size-6" />
                            <span>{label?.name}</span>
                        </Link>
                    ))}
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
                    <Outlet context={[selectMultiple, setSelectMultiple, isListView]} />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
