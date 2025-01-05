import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-responsive-masonry";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import {
    ArchivedIcon,
    ImageUploadIcon,
    LabelIcon,
    PinIcon,
    TrashIcon,
} from "@/Components/Icons";
import Card from "@/Components/Card";
import BackgroundOptions from "@/Components/BackgroundOptions";
import CardModal from "@/Components/CardModal";
import { getNotesReducer, updateNoteReducer } from "@/Features/note/noteSlice";
import useNotes from "@/Hooks/useNotes";
import useClickOutside from "@/Hooks/useClickOutside";
import useLabels from "@/Hooks/useLabels";
import useHandler from "@/Hooks/useHandler";

function Dashboard() {
    const [isMoreField, setIsMoreField] = useState(false);
    const [isBackgroundOptionOpen, setIsBackgroundOptionOpen] = useState(false); //This state used for input form where the notes are created
    const [sortingItems, setSortingItems] = useState([]); // Used for drag-and-drop
    const [background, setBackground] = useState("#fff");
    const [preview, setPreview] = useState(null);
    const [selectedModalNote, setSelectedModalNote] = useState({});
    const [isOpenNote, setIsOpenNote] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const containerRef = useRef(null);
    const imageUploadRef = useRef(null);

    const [selectMultiple, setSelectMultiple, isListView] = useOutletContext();

    const { notes } = useSelector((state) => state?.note);

    const dispatch = useDispatch();

    const { getNotes, createNote } = useNotes();
    const { getLabels } = useLabels();

    const {
        handleClose,
        handleBackgroundOption,
        handleFileChange,
        handleImageUploadRef,
    } = useHandler();

    useClickOutside(containerRef, () => {
        setIsMoreField(false);
        setIsBackgroundOptionOpen(false);
    });

    useEffect(() => {
        async function fetchNotes() {
            await getNotes();
        }
        async function fetchLabels() {
            await getLabels();
        }

        fetchLabels();
        if (!notes?.length) {
            fetchNotes();
        }
    }, []);

    useEffect(() => {
        setSortingItems(notes.map((note) => note.id));
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        await createNote(data);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setSortingItems((prev) => {
                const oldIndex = prev.indexOf(active.id);
                const newIndex = prev.indexOf(over.id);
                const newOrder = arrayMove(prev, oldIndex, newIndex);

                const sortedNotes = newOrder.map((orderId) =>
                    notes.find((note) => note.id === orderId)
                );

                dispatch(getNotesReducer(sortedNotes));
                return newOrder;
            });
        }
    };

    const handleLabelToggle = (data) => {
        setCurrentId((prevId) => (prevId === data.id ? null : data.id));
    };

    useEffect(() => {
        setSelectedModalNote(notes.find((note) => note.id == selectedModalNote?.id));
    }, [notes]);

    return (
        <div className="mt-8">
            <form
                className="mb-8 rounded-lg shadow-lg max-w-2xl mx-auto"
                style={{ background: background }}
                ref={containerRef}
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* ============== IMAGE - IF UPLOADED ============== */}
                {preview && (
                    <div className="flex justify-center relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-w-full w-[672px]"
                        />
                        <div
                            className="absolute top-4 right-4"
                            onClick={() => setPreview(null)}
                        >
                            <TrashIcon className="cursor-pointer opacity-70 rounded-full p-2 size-9 shadow-xl bg-gray-900 fill-gray-100 hover:bg-white hover:!fill-black" />
                        </div>
                    </div>
                )}
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
                        onClick={() => setIsMoreField(true)}
                        name="content"
                        className="bg-transparent outline-none w-full"
                        placeholder="Take a note"
                        errors={errors}
                        {...register("content")}
                    />

                    <ImageUploadIcon
                        className={`bg-soft-with-hover size-9 ${
                            isMoreField ? "hidden" : "block"
                        }`}
                        handleFileChange={(e) =>
                            handleFileChange(
                                e,
                                setPreview,
                                setIsMoreField,
                                setValue
                            )
                        }
                        imageUploadRef={imageUploadRef}
                        handleImageUploadRef={() =>
                            handleImageUploadRef(imageUploadRef)
                        }
                        register={register}
                    />
                </div>

                {/* ============== OPTIONS ============== */}
                <div
                    className={`${
                        isMoreField ? "flex" : "hidden"
                    } flex justify-between items-center px-4 py-3 gap-2`}
                >
                    <div className="flex gap-2">
                        <BackgroundOptions
                            isOpen={isBackgroundOptionOpen}
                            setIsOpen={setIsBackgroundOptionOpen}
                            handleBackgroundOption={(data) =>
                                handleBackgroundOption(data, setBackground)
                            }
                        />
                        <ImageUploadIcon
                            className="bg-soft-with-hover size-9"
                            handleFileChange={(e) =>
                                handleFileChange(
                                    e,
                                    setPreview,
                                    setIsMoreField,
                                    setValue
                                )
                            }
                            imageUploadRef={imageUploadRef}
                            handleImageUploadRef={() =>
                                handleImageUploadRef(imageUploadRef)
                            }
                            register={register}
                        />
                        <ArchivedIcon className="bg-soft-with-hover size-9" />
                        <LabelIcon className="bg-soft-with-hover size-9" />
                    </div>

                    <div className="flex gap-2 items-center">
                        <button
                            className="hover:bg-gray-100 cursor-pointer px-3 py-2"
                            type="button"
                            onClick={(e) =>
                                handleClose(e, setIsMoreField, reset)
                            }
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
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={sortingItems}>
                    <div className="flex flex-wrap">
                        <Masonry
                            columnsCount={isListView ? 1 : 4}
                            gutter="18px"
                        >
                            {sortingItems.map((id) => {
                                const note = notes.find(
                                    (note) => note.id === id
                                );
                                return (
                                    <Card
                                        key={note?.id}
                                        data={note}
                                        currentId={currentId}
                                        setCurrentId={setCurrentId}
                                        selectMultiple={selectMultiple}
                                        handleLabelToggle={handleLabelToggle}
                                        setSelectedModalNote={
                                            setSelectedModalNote
                                        }
                                        setIsOpenNote={setIsOpenNote}
                                    />
                                );
                            })}
                        </Masonry>
                    </div>
                </SortableContext>
            </DndContext>

            {/* ============== CARD MODAL ============== */}
            <CardModal
                isOpen={isOpenNote}
                setIsOpenNote={setIsOpenNote}
                data={selectedModalNote}
            />
        </div>
    );
}
export default Dashboard;