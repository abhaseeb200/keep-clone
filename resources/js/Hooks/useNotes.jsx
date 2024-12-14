import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
    createNoteReducer,
    deleteNoteReducer,
    getNotesReducer,
    updateNoteReducer,
} from "@/Features/note/noteSlice";
import API from "@/Config/api";

const useNotes = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const getNotes = async () => {
        try {
            const response = await API.get("/notes");
            dispatch(getNotesReducer(response.data.data));
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const createNote = async (body) => {
        // CREATE A FORM DATA
        const formData = new FormData();
        Object.keys(body).forEach((key) => {
            const value = body[key];
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            } else {
                formData.append(key, value);
            }
        });

        try {
            const response = await API.post("/note", body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(createNoteReducer(response.data.data));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    // REMEMBER: PASS FROM_DATA IN THE BODY
    const updateNote = async (body) => {
        try {
            // REMOVE IMAGE FROM THE OBJECT
            delete body.image;
            const response = await API.put(`/note/${body.id}`, body);
            dispatch(updateNoteReducer(response?.data?.data));
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    // REMEMBER: Please use POST method to update image
    // ROUTE:  api/note-image/1_method=PUT
    const updateImageNote = async (body) => {
        const formData = new FormData();
        Object.keys(body).forEach((key) => {
            const value = body[key];
            formData.append(key, value);
        });

        try {
            const response = await API.post(`/note-image/${body.id}_method=PUT`, body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(updateNoteReducer(response?.data?.data));
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateNoteLabels = async (body) => {
        try {
            // REMOVE IMAGE FROM THE OBJECT
            delete body.image;
            const response = await API.put(`/note/${body.id}`, body);
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await API.delete(`/note/${id}`);
            dispatch(deleteNoteReducer(id));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const searchNote = async (query) => {
        try {
            const response = await API.get(`/search?query=${query}`);
            console.log(response.data.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getNotes,
        updateNote,
        updateImageNote,
        updateNoteLabels,
        deleteNote,
        createNote,
        searchNote,
        isLoading,
    };
};

export default useNotes;
