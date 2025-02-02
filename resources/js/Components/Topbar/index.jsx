import React, { useEffect, useState } from "react";
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import {
    ArchivedIcon,
    CrossIcon,
    GridIcon,
    ListIcon,
    PinIcon,
    RefreshIcon,
    SearchIcon,
    TrashIcon,
} from "@/Components/Icons";
import BackgroundOptions from "@/Components/BackgroundOptions";
import useNotes from "@/Hooks/useNotes";
import useAuth from "@/Hooks/useAuth";
import useDebounce from "@/Hooks/useDebounce";
import { set } from "react-hook-form";

const Topbar = ({
    selectMultiple,
    setSelectMultiple,
    isListView,
    setIsListView,
}) => {
    const [isBackgroundOptionOpen, setIsBackgroundOptionOpen] = useState(false);

    const { signOut } = useAuth();
    const { deleteBulkNotes, updateBulkNotes } = useNotes();

    const handleSignOut = async () => {
        await signOut();
    };

    const handleRefresh = async () => {
        window.location.reload();
    };

    const handleView = () => {
        setIsListView(!isListView);
    };

    const handleTrash = async () => {
        let ids = selectMultiple.map((note) => note?.id);
        await deleteBulkNotes(ids);
    };

    const handlePinned = async () => {
        let body = {
            isPinned: true,
        };
        let ids = selectMultiple.map((note) => note?.id);
        await updateBulkNotes(ids, body);
    };

    const handleArchived = async () => {
        let body = {
            isArchived: true,
        };
        let ids = selectMultiple.map((note) => note?.id);
        await updateBulkNotes(ids, body);
    };

    const handleBackgroundOption = async (data) => {
        let background;
        if (Object.keys(data).includes("url")) {
            background = data?.url;
        } else {
            background = data?.code;
        }

        let ids = selectMultiple.map((note) => note?.id);
        await updateBulkNotes(ids, { background });
    };

    return (
        <>
            {/* ================= TOP BAR - SELECTED AREA ================= */}
            <div
                className={`${
                    selectMultiple.length ? "top-0" : "-top-28"
                } px-6 transition-all ease-in-out bg-white py-8 w-full flex items-center justify-between z-20 h-10 fixed`}
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
                    <PinIcon
                        className="bg-soft-with-hover size-9"
                        onClick={handlePinned}
                    />
                    <BackgroundOptions
                        isOpen={isBackgroundOptionOpen}
                        setIsOpen={setIsBackgroundOptionOpen}
                        handleBackgroundOption={handleBackgroundOption}
                    />
                    <ArchivedIcon
                        className="bg-soft-with-hover size-9"
                        onClick={handleArchived}
                    />
                    <TrashIcon
                        className="bg-soft-with-hover size-9"
                        onClick={handleTrash}
                    />
                </div>
            </div>

            {/* ================= TOP BAR ================= */}
            <div className="px-6 border border-gray-300 py-8 w-full flex items-center z-30 h-10 bg-white fixed">
                <div className="min-w-60 text-xl font-medium text-[#3c4043]">
                    Keep
                </div>

                <div className="flex w-full items-center gap-40 relative">
                    <SearchBar />
                    <div className="flex gap-6">
                        <RefreshIcon
                            className="cursor-pointer"
                            onClick={handleRefresh}
                        />
                        <div onClick={handleView}>
                            {isListView ? (
                                <GridIcon className="bg-soft-with-hover size-9" />
                            ) : (
                                <ListIcon className="bg-soft-with-hover size-9" />
                            )}
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
        </>
    );
};

export default Topbar;

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [placeholder, setPlaceholder] = useState("Search");

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("query");
    const labelParam = searchParams.get("label");
    const backgroundParam = searchParams.get("background");

    const handleClose = (e) => {
        e.stopPropagation();
        setIsSearchOpen(false);
        setSearchParams({});
        setSearchValue("");
        navigate("/");
    };

    const debouncedChangeHandler = useDebounce((value) => {
        setSearchParams({ query: value });
    }, 1000);

    const handleSearchOnChange = (e) => {
        setSearchValue(e.target.value)
        debouncedChangeHandler(e.target.value.trim());
    };

    useEffect(() => {
        //WHEN SCREEN RELOAD HANDLE THE PARAMS SCENARIO
        if (query) {
            setSearchValue(query);
        } else if (labelParam || backgroundParam || query) {
            setIsSearchOpen(true);
        } else {
            setSearchParams({});
        }

        //UPDATE THE PLACEHOLDER IN THE SEARCH INPUT
        let currentPlaceholder = "Search";
        if (labelParam) {
            currentPlaceholder = `Selected label: ${labelParam}`;
        } else if (backgroundParam) {
            currentPlaceholder = `Selected background: ${backgroundParam}`;
        }
        setPlaceholder(currentPlaceholder);
    }, [query, backgroundParam, labelParam]);

    return (
        <>
            <form className="flex items-center w-full">
                <label htmlFor="voice-search" className="sr-only">
                    Search
                </label>
                <div
                    className="relative w-full"
                    onClick={() => {
                        setIsSearchOpen(true);
                        if (location.pathname !== "/search") {
                            navigate("/search");
                        }
                    }}
                >
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={placeholder}
                        value={searchValue}
                        onChange={handleSearchOnChange}
                    />
                    {isSearchOpen && (
                        <div
                            className="flex absolute inset-y-0 right-2 items-center pl-3 cursor-pointer"
                            onClick={handleClose}
                        >
                            <CrossIcon className="bg-soft-with-hover size-9" />
                        </div>
                    )}
                </div>
            </form>
        </>
    );
};
