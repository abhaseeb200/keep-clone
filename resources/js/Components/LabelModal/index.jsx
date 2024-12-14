import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    LabelFillIcon,
    PencilFillIcon,
    PlusIcon,
    TickWithoutBackgoundIcon,
    TrashFillIcon,
} from "@/Components/Icons";
import useLabels from "@/Hooks/useLabels";
import { useSelector } from "react-redux";

const LabelModal = ({ isOpen, closeModal }) => {
    const [updateValue, setUpdateValue] = useState("");

    const { getLabels, updateLabel, deleteLabel, createLabel } = useLabels();

    const { labels } = useSelector((state) => state?.label);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        await createLabel(data, reset);
    };

    const handleEdit = async (data) => {
        let body = {
            name: updateValue[data?.id],
            id: data.id,
        };
        await updateLabel(body);
    };

    const handleDelete = async (id) => {
        await deleteLabel(id);
    };

    const handleCloseModal = () => {
        closeModal();
        setUpdateValue("");
    };

    const handleOnChange = (e) => {
        setUpdateValue({
            ...updateValue,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    {/* Modal Content */}
                    <div className="bg-white shadow-lg w-[300px]">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">
                                Edit labels
                            </h2>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 flex flex-col gap-5 max-h-[60vh] overflow-auto">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <PlusIcon className="p-1 hover:bg-gray-300 rounded-full size-7 items-center justify-center cursor-pointer" />
                                    <input
                                        className="font-medium outline-none focus:border-gray-500 border-b-2 border-transparent"
                                        placeholder="Create new label"
                                        {...register("name", {
                                            required: "name is required",
                                        })}
                                    />
                                </div>

                                <button type="submit">
                                    <TickWithoutBackgoundIcon />
                                </button>
                            </form>

                            {labels.map((label, index) => (
                                <div
                                    key={index}
                                    className="group flex justify-between items-center"
                                >
                                    <div className="flex gap-4 items-center">
                                        <LabelFillIcon className="group-hover:hidden p-1 size-7 flex items-center justify-center" />
                                        <TrashFillIcon
                                            onClick={()=>handleDelete(label?.id)}
                                            className="hidden group-hover:block p-1 hover:bg-gray-300 rounded-full size-7 items-center justify-center cursor-pointer"
                                        />

                                        <input
                                            name={`${label?.id}`}
                                            className="font-medium outline-none focus:border-gray-500 border-b-2 border-transparent"
                                            value={
                                                updateValue[label?.id] ||
                                                label?.name
                                            }
                                            onChange={handleOnChange}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleEdit(label)}
                                    >
                                        <PencilFillIcon />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end p-4 border-t">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 hover:bg-gray-200"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LabelModal;
