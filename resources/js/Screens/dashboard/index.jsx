import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
// import api from "../../../config/api";

const EditIcon = ({ onClick }) => {
    return (
        <svg
            onClick={onClick}
            width="30px"
            height="30px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <path
                fill="#000000"
                fillRule="evenodd"
                d="M15.747 2.97a.864.864 0 011.177 1.265l-7.904 7.37-1.516.194.653-1.785 7.59-7.044zm2.639-1.366a2.864 2.864 0 00-4-.1L6.62 8.71a1 1 0 00-.26.39l-1.3 3.556a1 1 0 001.067 1.335l3.467-.445a1 1 0 00.555-.26l8.139-7.59a2.864 2.864 0 00.098-4.093zM3.1 3.007c0-.001 0-.003.002-.005A.013.013 0 013.106 3H8a1 1 0 100-2H3.108a2.009 2.009 0 00-2 2.19C1.256 4.814 1.5 7.848 1.5 10c0 2.153-.245 5.187-.391 6.81A2.009 2.009 0 003.108 19H17c1.103 0 2-.892 2-1.999V12a1 1 0 10-2 0v5H3.106l-.003-.002a.012.012 0 01-.002-.005v-.004c.146-1.62.399-4.735.399-6.989 0-2.254-.253-5.37-.4-6.99v-.003zM17 17c-.001 0 0 0 0 0zm0 0z"
            />
        </svg>
    );
};

const RemoveIcon = ({ onClick }) => {
    return (
        <svg
            onClick={onClick}
            width="30px"
            height="30px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#000000"
                d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
            />
        </svg>
    );
};

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
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
        <div>
            <h1>Dashboard</h1>
            <p className="welcome">
                Hey <b>{authData?.user?.name}</b>
            </p>

            <div className="container">
                <div className="flex">
                    <div className="col-6">
                        <div className="note-wrapper ">
                            <h3 className="subheading">Notes</h3>
                            <ul className="">
                                {notes?.map((note) => (
                                    <li key={note?.id}>
                                        <div>
                                            <h5>{note?.title}</h5>
                                            <p>{note?.content}</p>
                                        </div>
                                        <div className="actions-icon">
                                            <RemoveIcon
                                                onClick={() =>
                                                    handleDelete(note?.id)
                                                }
                                            />
                                            <EditIcon
                                                onClick={() => handleEdit(note)}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-6">
                        <form
                            className="note-form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Input
                                name="title"
                                register={register}
                                validation={{
                                    required: "Title is required",
                                }}
                                placeholder="Apple..."
                                errors={errors}
                            />
                            <Input
                                name="content"
                                register={register}
                                validation={{
                                    required: "Content is required",
                                }}
                                placeholder="Apple is an fruit..."
                                errors={errors}
                            />
                            <div className="flex">
                                {isUpdate && (
                                    <Button
                                        type="button"
                                        title="Cancel"
                                        className="w-50"
                                        onClick={handleCancel}
                                    />
                                )}
                                <Button
                                    type="submit"
                                    className={isUpdate ? 'w-50' : 'w-100' }
                                    title={`${isUpdate ? "Save" : "Add"} Note`}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
