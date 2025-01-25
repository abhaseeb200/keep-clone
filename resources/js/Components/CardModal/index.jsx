import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    ArchivedIcon,
    CrossIcon,
    ImageUploadIcon,
    LabelIcon,
    PinIcon,
    TrashIcon,
} from "@/Components/Icons";
import BackgroundOptions from "@/Components/BackgroundOptions";
import useClickOutside from "@/Hooks/useClickOutside";
import useDebounce from "@/Hooks/useDebounce";
import useNotes from "@/Hooks/useNotes";
import useHandler from "@/Hooks/useHandler";
import LabelSelect from "../LabelSelect";
import { useSelector } from "react-redux";
import useImageUpload from "@/Hooks/useImageUpload";

const CardModal = ({ isOpen, setIsOpenNote, data }) => {
    const [isBackgroundOptionOpen, setIsBackgroundOptionOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const noteModalRef = useRef(null);

    const { updateNote } = useNotes();
    const {
        handlePin,
        handleArchived,
        handleTrash,
        handleSelectLabels,
        handleRemoveLabel,
        handleBackgroundOption,
        handleUpdateBackgroundOption,
        handleFileChange,
        handleSelectModalNote,
    } = useHandler();

    const { handleFileChangeUpdate, handleImageUploadRef, imageUploadRef } = useImageUpload()

    const handleLabelToggle = (data) => {
        setCurrentId(data.id);
        // setCurrentId((prevId) => (prevId === data.id ? null : data.id));
    };

    useClickOutside(noteModalRef, () => setIsOpenNote(false));

    const {
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const handleOnChange = (field, value) => {
        setValue(field, value);
        debouncedChangeHandler(field, value);
    };

    const debouncedChangeHandler = useDebounce((field, value) => {
        let isShowToast = false;
        updateNote({ ...data, [field]: value }, isShowToast);
    }, 1000);

    useEffect(() => {
        return () => {
            reset();
            setIsBackgroundOptionOpen(false);
            // setCurrentId(null);
        };
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="shadow-lg w-[600px] rounded-lg bg-white relative"
                        style={{
                            background: data?.background?.includes("background")
                                ? `url(${data.background})`
                                : data.background,
                        }}
                        ref={noteModalRef}
                    >
                        <div className="max-h-[80vh] overflow-auto">
                            {/* ======== IMAGE ======== */}
                            {data?.image && (
                                <div className="overflow-hidden rounded-t-lg">
                                    <img
                                        src={data?.image}
                                        className="size-full"
                                    />
                                </div>
                            )}
                            
                            {/* ======== DRAWING ======== */}
                            {data?.drawing && (
                                <div className="overflow-hidden rounded-t-lg">
                                    <img
                                        src={data?.drawing}
                                        className="size-full"
                                    />
                                </div>
                            )}

                            {/* ======== TITLE ======== */}
                            <div className="px-4 pb-2">
                                <input
                                    name="title"
                                    className="bg-transparent outline-none w-full h-14 text-2xl"
                                    placeholder="Title"
                                    errors={errors}
                                    defaultValue={data?.title}
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                    onChange={(e) => {
                                        handleOnChange("title", e.target.value);
                                    }}
                                />
                            </div>

                            {/* ======== CONTENT ======== */}
                            <div className="px-4">
                                <input
                                    name="content"
                                    className="bg-transparent outline-none w-full"
                                    placeholder="Note"
                                    errors={errors}
                                    defaultValue={data.content}
                                    {...register("content")}
                                    onChange={(e) => {
                                        handleOnChange(
                                            "content",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            {/* ======== LABELS ======== */}
                            <div className="px-4 pt-12 pb-2 flex gap-2 flex-wrap">
                                {data?.labels?.map((label, index) => (
                                    <div
                                        key={index}
                                        className="relative group/edit flex items-center gap-0.5 bg-gray-200 h-6 px-3 rounded-xl text-xs opacity-75"
                                    >
                                        <span className="group-hover/edit:-translate-x-1.5">
                                            {label?.name}
                                        </span>
                                        <CrossIcon
                                            onClick={() =>
                                                handleRemoveLabel(label, data)
                                            }
                                            className="absolute right-0 group-hover/edit:block hidden size-4 mt-0.5 cursor-pointer hover:bg-slate-400 rounded-full p-0.5"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ========== OPTIONS - STICKY BOTTOM ========== */}
                        <div>
                            <div className="flex justify-between items-center px-2">
                                <div className="pb-2 flex gap-3 mt-2">
                                    <PinIcon
                                        onClick={() => handlePin(data)}
                                        className="size-9 bg-soft-with-hover"
                                    />
                                    <BackgroundOptions
                                        data={data}
                                        isOpen={isBackgroundOptionOpen}
                                        setIsOpen={setIsBackgroundOptionOpen}
                                        handleBackgroundOption={
                                            handleUpdateBackgroundOption
                                        }
                                    />
                                    <ImageUploadIcon
                                        className="bg-soft-with-hover size-9"
                                        handleFileChange={(event) =>
                                            handleFileChangeUpdate(event, data)
                                        }
                                        imageUploadRef={imageUploadRef}
                                        handleImageUploadRef={() =>
                                            handleImageUploadRef(imageUploadRef)
                                        }
                                    />
                                    <ArchivedIcon
                                        onClick={() => handleArchived(data)}
                                        className="bg-soft-with-hover size-9"
                                    />
                                    <LabelIcon
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLabelToggle(data);
                                        }}
                                        className="bg-soft-with-hover size-9"
                                    />
                                    <TrashIcon
                                        onClick={() => handleTrash(data)}
                                        className="bg-soft-with-hover size-9"
                                    />
                                </div>

                                <button
                                    className="hover:bg-gray-100 cursor-pointer px-5 py-2"
                                    type="button"
                                    onClick={() => setIsOpenNote(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                        <LabelSelect
                            className="absolute bottom-16 left-48"
                            note={data}
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                            handleSelectLabels={handleSelectLabels}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default CardModal;
