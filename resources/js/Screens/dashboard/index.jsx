import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-responsive-masonry";
import {
    ArchivedIcon,
    ColorIcon,
    ImageIcon,
    LabelIcon,
    PinIcon,
} from "@/Components/Icons";
import Card from "@/Components/Card";
import BackgroundOptions from "@/Components/BackgroundOptions";
import { updateNoteReducer } from "@/Features/note/noteSlice";
import useNotes from "@/Hooks/useNotes";
import useDebounce from "@/Hooks/useDebounce";
import useClickOutside from "@/Hooks/useClickOutside";

function Dashboard() {
    const [isMoreField, setIsMoreField] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const containerRef = useRef(null);

    const [selectMultiple, setSelectMultiple] = useOutletContext();

    const dispatch = useDispatch();
    const { notes } = useSelector((state) => state?.note);

    const { getNotes, createNote, updateNote, updateNoteLabels } = useNotes();

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
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setIsMoreField(false);
        reset();
    };

    const handleOnSelect = (data) => {
        let isExists = selectMultiple.find((item) => item?.id == data?.id);
        let duplicate = [...selectMultiple];

        if (isExists) {
            duplicate = selectMultiple.filter((i) => i?.id !== isExists?.id);
        } else {
            duplicate.push(data);
        }

        setSelectMultiple(duplicate);
    };

    const handlePin = async (data) => {
        let updatedPin;
        if (data?.isPinned) {
            updatedPin = { ...data, isPinned: false };
        } else {
            updatedPin = { ...data, isPinned: true };
        }
        await updateNote(updatedPin);
    };

    const handleArchived = async (data) => {
        let updatedArchived;
        if (data?.isArchived) {
            updatedArchived = { ...data, isArchived: false };
        } else {
            updatedArchived = { ...data, isArchived: true };
        }
        await updateNote(updatedArchived);
    };

    const handleSelectLabels = async (label, note) => {
        let isExists = note.labels.find((i) => i?.id == label?.id);
        let newLabels,
            newLabelsId = [];

        if (isExists) {
            newLabels = note.labels.filter((i) => i.id !== isExists.id);
        } else {
            newLabels = [...note.labels, label];
        }

        newLabelsId = newLabels.map((i) => i?.id);

        dispatch(updateNoteReducer({ ...note, labels: newLabels }));

        debouncedChangeHandler({ ...note, labels: newLabelsId });
    };

    const debouncedChangeHandler = useDebounce((data) => {
        updateNoteLabels(data);
    }, 3000);

    const handleLabelToggle = (data) => {
        setCurrentId((prevId) => (prevId === data.id ? null : data.id));
    };

    const handleRemoveLabel = (label, note) => {
        let newLabels = note.labels.filter((i) => i.id !== label.id);
        let newLabelsId = newLabels.map((i) => i.id);

        dispatch(updateNoteReducer({ ...note, labels: newLabels }));
        updateNoteLabels({ ...note, labels: newLabelsId });
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
                        <div className="relative">
                            <ColorIcon className="bg-soft-with-hover size-9" />
                            <BackgroundOptions />
                        </div>
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
                    {notes?.map((note, index) => (
                        <Card
                            key={index}
                            data={note}
                            selectMultiple={selectMultiple}
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                            handleOnSelect={handleOnSelect}
                            handlePin={handlePin}
                            handleArchived={handleArchived}
                            handleSelectLabels={handleSelectLabels}
                            handleLabelToggle={handleLabelToggle}
                            handleRemoveLabel={handleRemoveLabel}
                        />
                    ))}
                </Masonry>
            </div>
        </div>
    );
}
export default Dashboard;
