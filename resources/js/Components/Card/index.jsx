import React, { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    ArchivedIcon,
    CollaborateIcon,
    CopyIcon,
    CrossIcon,
    DragIcon,
    DrawIcon,
    ImageUploadIcon,
    LabelIcon,
    MoreIcon,
    PencilIcon,
    PinIcon,
    TickIcon,
    TrashIcon,
} from "@/Components/Icons";
import LabelSelect from "@/Components/LabelSelect";
import BackgroundOptions from "@/Components/BackgroundOptions";
import useHandler from "@/Hooks/useHandler";
import useImageUpload from "@/Hooks/useImageUpload";
import useClickOutside from "@/Hooks/useClickOutside";
import DrawingModal from "../DrawingModal";

const Card = ({
    data,
    selectMultiple,
    setSelectedModalNote,
    setIsOpenNote,
    currentId,
    handleLabelToggle,
    setCurrentId,
}) => {
    const [isBackgroundOptionOpen, setIsBackgroundOptionOpen] = useState(false);
    const [isMoreOption, setIsMoreOption] = useState(false);
    const [isDrawingOpen, setIsDrawingOpen] = useState(false);

    const moreOptionRef = useRef(null);

    useClickOutside(moreOptionRef, () => setIsMoreOption(false));

    const {
        handleOnSelect,
        handlePin,
        handleArchived,
        handleTrash,
        handleRemoveLabel,
        handleUpdateBackgroundOption,
        handleSelectModalNote,
        handleCopyNote,
        handleSelectLabels,
    } = useHandler();

    const { handleFileChangeUpdate, handleImageUploadRef, imageUploadRef } =
        useImageUpload();

    const id = data?.id;

    let isSelected = selectMultiple?.some((i) => i?.id == data?.id);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        transition,
        cursor: isDragging ? "grabbing" : "",
        zIndex: isDragging ? 100 : "auto",
        boxShadow: isDragging
            ? "0px 8px 16px rgba(0, 0, 0, 0.3)"
            : "0px 4px 8px rgba(0, 0, 0, 0.1)",
    };

    const handleMoreOption = () => {
        setIsMoreOption(!isMoreOption);
    };

    const handleDrawingToggle = () => {
        setIsDrawingOpen(!isDrawingOpen);
    };

    return (
        <div className="relative" ref={setNodeRef} style={style}>
            <div
                className={`${
                    isSelected ? "border-gray-900" : "border-gray-200"
                } group border bg-white rounded-lg relative hover:shadow-lg`}
                style={{
                    background: data?.background?.includes("svg")
                        ? `url(${data?.background})`
                        : data?.background,
                }}
            >
                {/* ============= DRAG ICONS =============*/}
                <div className="absolute right-2 top-2 flex gap-0.5">
                    <PinIcon
                        onClick={() => handlePin(data)}
                        className={`${
                            isSelected ? "flex" : "show-on-hover"
                        } size-9 bg-soft-with-hover`}
                    />

                    <div className="cursor-move" {...attributes} {...listeners}>
                        <DragIcon
                            className={`${
                                isSelected ? "flex" : "show-on-hover"
                            } bg-gray-50/50 hover:bg-gray-200 size-9 rounded-full p-2`}
                        />
                    </div>
                </div>

                {/* ============= IMAGE =============*/}
                {data?.image && (
                    <div
                        className="rounded-t-lg overflow-hidden cursor-pointer"
                        onClick={() =>
                            handleSelectModalNote(
                                data,
                                setSelectedModalNote,
                                setIsOpenNote
                            )
                        }
                    >
                        <img src={data?.image} alt="card-image" />
                    </div>
                )}
                
                {/* ============= DRAWING IMAGE =============*/}
                {data?.drawing && (
                    <div
                        className="rounded-t-lg overflow-hidden cursor-pointer"
                        onClick={() =>
                            handleSelectModalNote(
                                data,
                                setSelectedModalNote,
                                setIsOpenNote
                            )
                        }
                    >
                        <img src={data?.drawing} alt="drawing-image" />
                    </div>
                )}

                {/* ============= SELECTED ICON =============*/}
                <div className="absolute -top-2 -left-2 cursor-pointer">
                    <TickIcon
                        className={`bg-white overflow-hidden rounded-full ${
                            isSelected ? "flex" : "show-on-hover"
                        }`}
                        onClick={() => handleOnSelect(data)}
                    />
                </div>

                {/* ============= CONTENT WITH TITLE =============*/}
                <div
                    className="px-4 pt-3 cursor-text"
                    onClick={() =>
                        handleSelectModalNote(
                            data,
                            setSelectedModalNote,
                            setIsOpenNote
                        )
                    }
                >
                    <div className="font-medium text-lg flex justify-between mb-2">
                        {data?.title}
                    </div>
                    <div className="text-sm">{data?.content}</div>
                </div>

                {/* ============= LABELS =============*/}
                <div className="px-4 mt-7 flex gap-2 flex-wrap">
                    {data?.labels?.map((label, index) => (
                        <div
                            key={index}
                            className="relative group/edit flex items-center gap-0.5 bg-gray-200 h-6 px-3 rounded-xl text-xs opacity-75"
                        >
                            <span className="group-hover/edit:-translate-x-1.5">
                                {label?.name}
                            </span>
                            <CrossIcon
                                onClick={() => handleRemoveLabel(label, data)}
                                className="absolute right-0 group-hover/edit:block hidden size-4 mt-0.5 cursor-pointer hover:bg-slate-400 rounded-full p-0.5"
                            />
                        </div>
                    ))}
                </div>

                {/* ============= OPTIONS - SHOW ON HOVER =============*/}
                <div
                    className={`${
                        !(isMoreOption || isBackgroundOptionOpen) &&
                        "show-on-hover"
                    } flex px-2 pb-2 justify-between mt-2 relative`}
                >
                    <PencilIcon
                        className="bg-soft-with-hover 2xl:size-9 size-[34px] "
                        onClick={() =>
                            handleSelectModalNote(
                                data,
                                setSelectedModalNote,
                                setIsOpenNote
                            )
                        }
                    />
                    <CollaborateIcon className="bg-soft-with-hover 2xl:size-9 size-[34px] " />
                    <ArchivedIcon
                        onClick={() => handleArchived(data)}
                        className="bg-soft-with-hover 2xl:size-9 size-[34px] "
                    />
                    <BackgroundOptions
                        isOpen={isBackgroundOptionOpen}
                        setIsOpen={setIsBackgroundOptionOpen}
                        data={data}
                        handleBackgroundOption={handleUpdateBackgroundOption}
                    />
                    <ImageUploadIcon
                        className="bg-soft-with-hover 2xl:size-9 size-[34px] "
                        handleFileChange={(event) =>
                            handleFileChangeUpdate(event, data)
                        }
                        imageUploadRef={imageUploadRef}
                        handleImageUploadRef={() =>
                            handleImageUploadRef(imageUploadRef)
                        }
                    />
                    <MoreIcon
                        onClick={() => handleMoreOption()}
                        className="bg-soft-with-hover 2xl:size-9  size-8 more-icon"
                    />
                    {isMoreOption && (
                        <div
                            className="py-1 overflow-hidden w-44 z-50 absolute top-[43px] -right-28 bg-white rounded-lg flex flex-col shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)]"
                            ref={moreOptionRef}
                        >
                            <TrashIcon
                                onClick={() => handleTrash(data)}
                                className="opacity-70 p-2 size-9"
                                withText="Delete note"
                            />
                            <LabelIcon
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleLabelToggle(data);
                                }}
                                className="opacity-70 p-2 size-9"
                                withText="Add label"
                            />
                            <DrawIcon
                                className="opacity-70 p-2 size-9"
                                withText="Edit Drawing"
                                onClick={() => handleDrawingToggle()}
                            />
                            <CopyIcon
                                className="opacity-70 p-2 size-9"
                                onClick={() => handleCopyNote(data)}
                                withText="Make a Copy"
                            />
                        </div>
                    )}
                </div>
            </div>

            <LabelSelect
                className="absolute top-auto -right-24"
                note={data}
                currentId={currentId}
                setCurrentId={setCurrentId}
                handleSelectLabels={handleSelectLabels}
            />

            <DrawingModal
                setIsOpen={setIsDrawingOpen}
                isOpen={isDrawingOpen}
                isUpdate={true}
                data={data}
            />
        </div>
    );
};

export default Card;
