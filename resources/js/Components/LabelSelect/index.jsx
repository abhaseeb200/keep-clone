import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PlusIcon, SearchIcon } from "@/Components/Icons";
import useClickOutside from "@/Hooks/useClickOutside";
import useLabels from "@/Hooks/useLabels";
import useHandler from "@/Hooks/useHandler";

const LabelSelect = ({
    className,
    note,
    currentId = null,
    setCurrentId,
    isOpen,
    handleSelectLabels // does't not used from useHook due to the different context
}) => {
    const [labelsCopy, setLabelsCopy] = useState([]); //Create a BackUp copy for searching labels
    const [searchValue, setSearchValue] = useState("");

    const { createLabel, isLoading } = useLabels();

    const { labels } = useSelector((state) => state?.label);

    // const { handleSelectLabels } = useHandler();

    const containerRef = useRef(null);

    useClickOutside(containerRef, () => {
        setCurrentId && setCurrentId(null);
    });

    const handleSearchValue = (event) => {
        let value = event.target.value;
        let newSearchItems;
        setSearchValue(value);

        if (value.trim()) {
            newSearchItems = labels.filter((i) =>
                i?.name?.toLowerCase().includes(value.toLowerCase().trim())
            );
        } else {
            newSearchItems = [...labels];
        }

        setLabelsCopy(newSearchItems);
    };

    const handleCreateLabel = async () => {
        let response = await createLabel({ name: searchValue });

        //Checked the label after successfully created
        handleSelectLabels(response, note);
    };

    useEffect(() => {
        setLabelsCopy(labels);
    }, [labels]);

    return (
        <>
            {(currentId === note?.id || isOpen) && (
                <div
                    ref={containerRef}
                    className={`bg-white shadow-lg min-w-52 z-50 ${className}`}
                >
                    <h3 className="text-sm font-medium pb-1 p-2">
                        Labels notes {note?.id}
                    </h3>

                    <div className="w-full max-w-md flex flex-col gap-1">
                        {/* ================= SEARCH INPUT ================= */}
                        <div className="relative flex justify-between gap-2 items-center mb-2 p-2">
                            <input
                                type="text"
                                name="search"
                                value={searchValue}
                                placeholder="Enter label name  "
                                onChange={handleSearchValue}
                                className="text-sm outline-none"
                            />
                            <SearchIcon className="size-[14px] text-gray-500" />
                        </div>

                        {/* ================= LABELS ================= */}
                        <div className="max-h-48 overflow-auto flex flex-col pb-1">
                            {labelsCopy?.map((label, index) => (
                                <div key={index}>
                                    <label className="px-2 py-[3px] hover:bg-gray-100 w-full cursor-pointer inline-flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox size-3 text-gray-600"
                                            checked={note?.labels?.some(
                                                (i) => i?.id == label?.id
                                            )}
                                            onChange={() =>
                                                handleSelectLabels(label, note)
                                            }
                                        />
                                        <span className="ml-2 text-gray-700">
                                            {label?.name}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* ================= CREATE NEW LABEL ================= */}
                        {searchValue.length >= 1 && (
                            <button
                                role="button"
                                disabled={isLoading}
                                onClick={handleCreateLabel}
                                className="px-2 py-1.5 hover:bg-gray-100 w-full cursor-pointer inline-flex items-center text-sm border-t-2 border-gray-300 gap-1"
                            >
                                <PlusIcon className="size-4" />
                                <p>
                                    Create
                                    <span className="font-bold">
                                        "{searchValue}"
                                    </span>
                                </p>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default LabelSelect;
