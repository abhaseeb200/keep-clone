import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    ArchivedIcon,
    BulbIcon,
    LabelIcon,
    PencilIcon,
} from "@/Components/Icons";

const Sidebar = ({ openModal, isOpen, setIsOpen }) => {
    const { labels } = useSelector((state) => state?.label);

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <div
                className={`fixed z-20 inset-y-0 left-0 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:relative z-10 transition-transform duration-200 ease-in-out w-72 bg-white  text-black`}
            >
                <nav className="mt-[67px] overflow-auto max-h-[88vh]">
                    <Link
                        to="/dashboard"
                        className={`flex items-center gap-4 font-medium py-3.5 px-4 rounded-r-full transition ${
                            isActive("/dashboard")
                                ? "bg-[#feefc3]"
                                : "hover:bg-gray-100"
                        }`}
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
                        className={`flex items-center gap-4 font-medium py-3.5 px-4 rounded-r-full transition ${
                            isActive("/archived")
                                ? "bg-[#feefc3]"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        <ArchivedIcon className="size-6" />
                        <span>Archived</span>
                    </Link>

                    {labels?.map((label) => (
                        <Link
                            key={label?.id}
                            to={`/labels/${label?.id}`} // Ensure the path is absolute
                            className={`flex items-center gap-4 font-medium py-3.5 px-4 rounded-r-full transition ${
                                isActive(`/labels/${label?.id}`)
                                    ? "bg-[#feefc3]"
                                    : "hover:bg-gray-100"
                            }`}
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
        </>
    );
};

export default Sidebar;
