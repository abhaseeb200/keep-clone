import { useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    ArchivedIcon,
    CrossIcon,
    DragIcon,
    ImageUploadIcon,
    LabelIcon,
    PencilIcon,
    PinIcon,
    TickIcon,
    TrashIcon,
} from "@/Components/Icons";
import LabelSelect from "@/Components/LabelSelect";
import BackgroundOptions from "@/Components/BackgroundOptions";
import useNotes from "@/Hooks/useNotes";

const Card = ({
    data,
    handleOnSelect,
    selectMultiple,
    handlePin,
    handleTrash,
    handleArchived,
    handleSelectLabels,
    handleLabelToggle,
    handleRemoveLabel,
    currentId,
    setCurrentId,
    handleUpdateBackgroundOption,
    handleSelectModalNote,
    setIsOpenNote,
}) => {
    const [isBackgroundOptionOpen, setIsBackgroundOptionOpen] = useState(false);
    const imageUploadRef = useRef(null);

    const { id } = data;

    const { updateImageNote } = useNotes();

    let isSelected = selectMultiple?.some((i) => i?.id == data?.id);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const { id } = data;
            await updateImageNote({ id, image: file });
        }
    };

    const handleImageUploadRef = () => {
        if (imageUploadRef.current) {
            imageUploadRef.current.click();
        }
    };

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

    return (
        <div className="relative" ref={setNodeRef} style={style}>
            <div
                className={`${
                    isSelected ? "border-gray-900" : "border-gray-200"
                } group border bg-white rounded-lg relative hover:shadow-lg`}
                style={{
                    background: data?.background.includes("background")
                        ? `url(${data.background})`
                        : data.background,
                }}
            >
                {/* ============= DRAG ICONS =============*/}
                <div
                    className="absolute right-2 top-2 cursor-move"
                    {...attributes}
                    {...listeners}
                >
                    <DragIcon
                        className={`${
                            isSelected ? "flex" : "show-on-hover"
                        } bg-gray-50/50 hover:bg-gray-200 size-9 rounded-full p-2`}
                    />
                </div>

                {/* ============= IMAGE =============*/}
                {data?.image && (
                    <div
                        className="rounded-t-lg overflow-hidden cursor-pointer"
                        onClick={() => handleSelectModalNote(data)}
                    >
                        <img src={data?.image} alt="card-image" />
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
                    onClick={() => handleSelectModalNote(data)}
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
                <div className="px-2 pb-2 flex gap-2 mt-2 show-on-hover">
                    <PinIcon
                        onClick={() => handlePin(data)}
                        className="size-9 bg-soft-with-hover"
                    />
                    <BackgroundOptions
                        isOpen={isBackgroundOptionOpen}
                        setIsOpen={setIsBackgroundOptionOpen}
                        data={data}
                        handleBackgroundOption={handleUpdateBackgroundOption}
                    />
                    <ImageUploadIcon
                        className="bg-soft-with-hover size-9"
                        handleFileChange={handleFileChange}
                        imageUploadRef={imageUploadRef}
                        handleImageUploadRef={handleImageUploadRef}
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
                    <PencilIcon
                        className="bg-soft-with-hover size-9"
                        onClick={() => setIsOpenNote(true)}
                    />
                    <TrashIcon
                        onClick={() => handleTrash(data)}
                        className="bg-soft-with-hover size-9"
                    />
                </div>
            </div>

            <LabelSelect
                className="absolute top-auto -right-24"
                note={data}
                currentId={currentId}
                setCurrentId={setCurrentId}
                handleSelectLabels={handleSelectLabels}
            />
        </div>
    );
};

export default Card;
