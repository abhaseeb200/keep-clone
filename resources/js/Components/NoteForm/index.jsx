import React, { useRef, useState } from "react";
import {
    ArchivedIcon,
    ImageUploadIcon,
    LabelIcon,
    PinIcon,
    TrashIcon,
} from "@/Components/Icons";
import BackgroundOptions from "@/Components/BackgroundOptions";
import useImageUpload from "@/Hooks/useImageUpload";
import { useForm } from "react-hook-form";
import useClickOutside from "@/Hooks/useClickOutside";
import useHandler from "@/Hooks/useHandler";
import useNotes from "@/Hooks/useNotes";
import LabelSelect from "@/Components/LabelSelect";

function NoteForm() {
    const [background, setBackground] = useState("");
    const [isMoreField, setIsMoreField] = useState(false);
    const [isLabelSelectOpen, setIsLabelSelectOpen] = useState(false);
    const [isBackgroundOptionOpen, setIsBackgroundOptionOpen] = useState(false);
    const [labels, setLabels] = useState([]);

    const containerRef = useRef(null);

    useClickOutside(containerRef, () => {
        setIsMoreField(false);
        setIsBackgroundOptionOpen(false);
    });

    const { handleClose, handleBackgroundOption } = useHandler();
    const { createNote } = useNotes();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const {
        imagePreview,
        imageUploadRef,
        handleFileChange,
        handleImageUploadRef,
        handleClearImage,
    } = useImageUpload();

    const onSubmit = async (data) => {
        let labelsId = labels.map((i) => i?.id);
        let modifiedData = { ...data, labels: labelsId };
        // return console.log(modifiedData);

        await createNote(modifiedData, reset, handleClearImage, setBackground);
    };

    const handleLabelToggle = () => {
        setIsLabelSelectOpen(!isLabelSelectOpen);
    };

    const handleSelectLabels = (data) => {
        let updatedLabels;
        if (labels.some((i) => i?.id === data?.id)) {
            updatedLabels = labels.filter((i) => i?.id !== data?.id);
        } else {
            updatedLabels = [...labels, { id: data?.id }];
        }
        setLabels(updatedLabels);
    };

    return (
        <form
            className="relative mb-8 rounded-lg shadow-lg max-w-2xl mx-auto"
            style={{ background: background || "#fff" }}
            ref={containerRef}
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* ============== IMAGE - IF UPLOADED ============== */}
            {imagePreview && (
                <div className="flex justify-center relative">
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full w-[672px]"
                    />
                    <div
                        className="absolute top-4 right-4"
                        onClick={() => handleClearImage(setValue)}
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
                <PinIcon className="bg-soft-with-hover size-10" />
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
                    className={`${
                        isMoreField && "!hidden"
                    } bg-soft-with-hover size-10`}
                    handleFileChange={(event) =>
                        handleFileChange(event, setIsMoreField, setValue)
                    }
                    imageUploadRef={imageUploadRef}
                    handleImageUploadRef={() =>
                        handleImageUploadRef(imageUploadRef)
                    }
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
                        handleFileChange={(e) => {
                            handleFileChange(e, setIsMoreField, setValue);
                        }}
                        imageUploadRef={imageUploadRef}
                        handleImageUploadRef={() => {
                            handleImageUploadRef(imageUploadRef);
                        }}
                    />
                    <ArchivedIcon className="bg-soft-with-hover size-9" />
                    <LabelIcon
                        className="bg-soft-with-hover size-9"
                        onClick={() => handleLabelToggle()}
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <button
                        className="hover:bg-gray-100 cursor-pointer px-3 py-2"
                        type="button"
                        onClick={(e) => handleClose(e, setIsMoreField, reset)}
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

            <LabelSelect
                className="absolute left-36"
                note={{ labels: labels }}
                isOpen={isLabelSelectOpen}
                handleSelectLabels={handleSelectLabels}
                setCurrentId={setIsLabelSelectOpen} // Used for the close Label Select
            />
        </form>
    );
}

export default NoteForm;
