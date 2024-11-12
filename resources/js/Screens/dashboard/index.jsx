import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import Masonry from "react-responsive-masonry";
import {
    ArchivedIcon,
    ColorIcon,
    ImageIcon,
    LabelIcon,
    PinIcon,
} from "@/Components/Icons";
import Card from "@/Components/Card";
import useClickOutside from "@/Hooks/useClickOutside";
import useNotes from "@/Hooks/useNotes";

function Dashboard() {
    const [isUpdate, setIsUpdate] = useState(false);
    const [isMoreField, setIsMoreField] = useState(false);

    const containerRef = useRef(null);
    const [selectedData, setSelectedData] = useOutletContext();
    const { notes } = useSelector((state) => state?.note);

    const { getNotes, createNote, updateNote } = useNotes();

    useClickOutside(containerRef, () => setIsMoreField(false));

    useEffect(() => {
        async function fetchNotes() {
            await getNotes();
        }
        fetchNotes();
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        await createNote(data);
        // if (isUpdate) {
        //     await updateNote(data);
        // }
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setIsMoreField(false);
        reset();
    };

    const handleOnSelect = (index) => {
        let findSelected = selectedData.find((item) => item == index);
        let dublicate = [...selectedData];

        //greater than or equal to zero. should be removed after the api data
        if (findSelected >= 0) {
            dublicate = selectedData.filter((i) => i !== findSelected);
        } else {
            dublicate.push(index);
        }

        setSelectedData(dublicate);
    };

    return (
        <div className="mt-8">
            <form
                className="mb-8 rounded-lg shadow-lg bg-white max-w-2xl mx-auto"
                ref={containerRef}
                onSubmit={handleSubmit(onSubmit)}
                onClick={() => setIsMoreField(true)}
            >
                {/* ============== TITLE ============== */}
                <div
                    className={`${
                        isMoreField ? "flex" : "hidden"
                    } justify-between box-border px-4 py-3 rounded-md outline-none`}
                >
                    <input
                        name="title"
                        className="bg-transparent outline-none w-full"
                        placeholder="Title"
                        errors={errors}
                        {...register("title", {
                            required: "Title is required",
                        })}
                    />
                    <PinIcon />
                </div>

                {/* ============== DESCRIPTION ============== */}
                <div className="flex justify-between box-border px-4 py-3 rounded-md outline-none">
                    <input
                        name="content"
                        className="bg-transparent outline-none w-full"
                        placeholder="Take a note"
                        errors={errors}
                        {...register("content")}
                    />
                    {!isMoreField && (
                        <ImageIcon className="cursor-pointer opacity-70 hover:bg-gray-200 size-10 rounded-full p-2" />
                    )}
                </div>

                {/* ============== OPTIONS ============== */}
                <div
                    className={`${
                        isMoreField ? "flex" : "hidden"
                    } flex justify-between items-center px-4 py-3 gap-2`}
                >
                    <div className="flex gap-2">
                        <ColorIcon className="bg-soft-with-hover size-9" />
                        <ImageIcon className="bg-soft-with-hover size-9" />
                        <ArchivedIcon className="bg-soft-with-hover size-9" />
                        <LabelIcon className="bg-soft-with-hover size-9" />
                    </div>

                    <div className="flex gap-2 items-center">
                        <button
                            className="hover:bg-gray-100 cursor-pointer px-3 py-2"
                            type="button"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="hover:bg-gray-100 px-3 cursor-pointer py-2"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>

            {/* ============== MASONRY NOTES CARDS ============== */}
            <div className="flex flex-wrap">
                <Masonry columnsCount={4} gutter="8px">
                    {notes.map((note, index) => (
                        <Card
                            data={note}
                            key={index}
                            index={index}
                            handleOnSelect={handleOnSelect}
                        />
                    ))}
                </Masonry>
            </div>
        </div>
    );
}
export default Dashboard;
