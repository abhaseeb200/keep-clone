import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {
    ArchivedIcon,
    ColorIcon,
    ImageIcon,
    LabelIcon,
    PinIcon,
} from "@/Components/Icons";
import useClickOutside from "@/Hooks/useClickOutside";
import Card from "@/Components/Card";
import Masonry from "react-responsive-masonry";
// import api from "../../../config/api";

const noteData = [
    {
        title: "One Title",
        description:
            "This is content here This is content here This is content here This is content here This is content here This is content here...",
        labels: [{ title: "One" }, { title: "Two" }],
    },
    {
        title: "One Title",
        description: "This is content here...",
        description:
            "This is here This is content here This is content here This is content here...",
        labels: [{ title: "One" }, { title: "Two" }],
    },
    {
        title: "One Title",
        description: "This is content here...",
        labels: [{ title: "One" }, { title: "Two" }],
    },
    {
        title: "One Title",
        description: "This is content here...",
        labels: [{ title: "One" }, { title: "Two" }],
    },
    {
        title: "One Title",
        description: "This is content here...",
        labels: [{ title: "One" }, { title: "Two" }],
    },
    {
        title: "One Title",
        description: "This is content here...",
        labels: [{ title: "One" }, { title: "Two" }],
    },
    {
        title: "One Title",
        description: "This is content here...",
        labels: [{ title: "One" }, { title: "Two" }],
    },
    {
        title: "One Title",
        description: "This is content here...",
        labels: [{ title: "One" }, { title: "Two" }],
    },
    {
        title: "One Title",
        description: "This is content here...",
        labels: [{ title: "One" }, { title: "Two" }],
    },
];

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isMoreField, setIsMoreField] = useState(false);
    const containerRef = useRef(null);

    useClickOutside(containerRef, () => setIsMoreField(false));

    const authData = JSON.parse(localStorage.getItem("auth"));

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            if (isUpdate) {
                handleUpdate(data);
            } else {
                handleAdd(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchNotes = async () => {
        try {
            const response = await api.get("/notes");
            setNotes(response?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/notes/${id}`);
            let updatedNotes = notes?.filter((i) => i?.id !== id);
            setNotes(updatedNotes);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (data) => {
        setIsUpdate(true);
        Object.keys(data).forEach((key) => {
            setValue(key, data[key]);
        });
    };

    const handleUpdate = async (data) => {
        try {
            const response = await api.put(`/notes/${data?.id}`, data);
            let findIndex = notes.findIndex((i) => i?.id == data?.id);
            if (findIndex !== -1) {
                notes[findIndex] = response?.data.data;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAdd = async (data) => {
        try {
            const response = await api.post(`/notes`, data);
            let updatedNotes = [response?.data?.data, ...notes];
            setNotes(updatedNotes);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsUpdate(false);
        reset();
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="mt-8">
            <form
                className="mb-8 rounded-lg shadow-lg bg-white max-w-2xl mx-auto"
                ref={containerRef}
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
                        register={register}
                        validation={{
                            required: "Title is required",
                        }}
                        placeholder="Title"
                        errors={errors}
                    />
                    <PinIcon />
                </div>

                {/* ============== DESCRIPTION ============== */}
                <div className="flex justify-between box-border px-4 py-3 rounded-md outline-none">
                    <input
                        name="note"
                        className="bg-transparent outline-none w-full"
                        register={register}
                        placeholder="Take a note"
                        errors={errors}
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
                        <span
                            className="hover:bg-gray-100 cursor-pointer px-3 py-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMoreField(false);
                            }}
                        >
                            Close
                        </span>
                        <span className="hover:bg-gray-100 px-3 cursor-pointer py-2">
                            Save
                        </span>
                    </div>
                </div>
            </form>

            {/* <Card /> */}
            <div className="flex flex-wrap">
                <Masonry columnsCount={4} gutter="8px">
                    {noteData.map((note, index) => (
                        <Card data={note} index={index} />
                    ))}
                </Masonry>
            </div>
        </div>
    );
}
export default Dashboard;