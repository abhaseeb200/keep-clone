import React, { useEffect, useState } from "react";
import {
    useSearchParams,
    useOutletContext,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Masonry from "react-layout-masonry";
import { LabelIcon } from "@/Components/Icons";
import CardModal from "@/Components/CardModal";
import Card from "@/Components/Card";
import useNotes from "@/Hooks/useNotes";
import { set } from "react-hook-form";

const Search = () => {
    const [searchData, setSearchData] = useState([]);
    const [selectedModalNote, setSelectedModalNote] = useState({});
    const [isOpenNote, setIsOpenNote] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [suggestions, setSuggestions] = useState({}); // colors, labels
    const { searchNote, searchSuggestion } = useNotes();
    const [selectMultiple, setSelectMultiple, isListView] = useOutletContext();
    const { notes } = useSelector((state) => state?.note);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const query = searchParams.get("query");
    const background = searchParams.get("background");
    const label = searchParams.get("label");

    const fetchSearchData = async () => {
        const response = await searchNote(query);
        setSearchData(response);
        console.log({ response });
    };

    const handleLabelToggle = (data) => {
        setCurrentId((prevId) => (prevId === data.id ? null : data.id));
    };

    const handleFilteredColor = (data) => {
        const filteredColors = notes?.filter(
            (note) => note?.background == data
        );
        setSearchData(filteredColors);

        setSearchParams({ background: data });
    };

    const handleFilteredBackground = (data) => {
        const filteredBackground = notes?.filter(
            (note) => note?.background == data
        );
        setSearchData(filteredBackground);

        setSearchParams({ background: data });
    };

    const handleFilteredLabel = (data) => {
        const filteredLabels = notes?.filter((note) =>
            note?.labels?.some(
                (label) =>
                    label?.name?.toLowerCase() == data?.name?.toLowerCase()
            )
        );
        setSearchData(filteredLabels);

        setSearchParams({ label: data?.name });
    };

    const fetchSearchSuggestion = async () => {
        const response = await searchSuggestion();
        const colors = response?.background.filter((i) => i?.includes("#"));
        const background = response?.background.filter((i) =>
            i?.includes("svg")
        );

        setSuggestions({ colors, background, labels: response?.labels });
    };

    useEffect(() => {
        fetchSearchSuggestion();
    }, []);

    //Used for the purpose of update current-note data in the modal
    useEffect(() => {
        let updateData = notes?.find(
            (note) => note?.id == selectedModalNote?.id
        );
        setSelectedModalNote(updateData);

        let newData = [...searchData];
        let findIndex = searchData?.findIndex(
            (note) => note?.id == selectedModalNote?.id
        );
        newData[findIndex] = updateData;

        setSearchData(newData);
    }, [notes]);

    useEffect(() => {
        if (query) {
            fetchSearchData();
        } else if (background) {
            handleFilteredBackground(background);
        } else if (label) {
            handleFilteredLabel({ name: label });
        } else {
            setSearchData([]);
        }
    }, [query, background, label]);

    return (
        <>
            {/* ============== MASONRY STYLE CARDS ============== */}
            {searchData?.length ? (
                <div className="mt-8">
                    <Masonry
                        columns={{ 640: 1, 768: 2, 1024: 4, 1366: 5 }}
                        gap={16}
                    >
                        {searchData?.map((note) => {
                            return (
                                <Card
                                    key={note?.id}
                                    data={note}
                                    currentId={currentId}
                                    setCurrentId={setCurrentId}
                                    selectMultiple={selectMultiple}
                                    handleLabelToggle={handleLabelToggle}
                                    setSelectedModalNote={setSelectedModalNote}
                                    setIsOpenNote={setIsOpenNote}
                                    isDrag={false}
                                />
                            );
                        })}
                    </Masonry>
                </div>
            ) : null}

            {/* ============== NO DATA FOUNDED / SUGGESTIONS ============== */}
            {!searchData?.length ? (
                <div className="w-full bg-white relative">
                    {query && (
                        <p className="py-5 max-w-[612px] mx-auto">
                            No matching results.
                        </p>
                    )}

                    {/* ================== LABELS ================== */}
                    <div className="flex flex-col gap-1 mb-5 max-w-[612px] mx-auto shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
                        <p className="font-medium p-3">Labels</p>
                        <div className="flex gap-3">
                            {suggestions?.labels?.map((label, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleFilteredLabel(label)}
                                    className="cursor-pointer bg-gray-300 size-36 flex justify-center items-center"
                                >
                                    <LabelIcon className="size-8" />
                                    <span>{label?.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================== BACKGROUNDS COLORS ================== */}
                    <div className="flex flex-col gap-1 mb-5 max-w-[612px] mx-auto shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
                        <p className="font-medium p-3">Colors</p>
                        <div className="flex gap-3">
                            <div className="flex gap-2">
                                {suggestions?.colors?.map((color, index) => (
                                    <span
                                        key={index}
                                        onClick={() =>
                                            handleFilteredColor(color)
                                        }
                                        className="cursor-pointer size-12 border rounded-full"
                                        style={{
                                            background: color,
                                            borderColor: color,
                                        }}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ================== BACKGROUNDS SVG'S ================== */}
                    <div className="flex flex-col gap-1 mb-5 max-w-[612px] mx-auto shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
                        <p className="font-medium p-3">Backgrounds</p>
                        <div className="flex gap-3">
                            <div className="flex gap-2">
                                {suggestions?.background?.map((svg, index) => (
                                    <span
                                        key={index}
                                        onClick={() =>
                                            handleFilteredBackground(svg)
                                        }
                                        className="cursor-pointer size-12 border rounded-full"
                                        style={{
                                            background: `url('${svg}')`,
                                        }}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* ============== CARD MODAL ============== */}
            <CardModal
                isOpen={isOpenNote}
                setIsOpenNote={setIsOpenNote}
                data={selectedModalNote}
            />
        </>
    );
};

export default Search;
