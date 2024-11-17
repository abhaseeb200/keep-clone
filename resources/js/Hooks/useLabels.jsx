import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
    createLabelReducer,
    deleteLabelReducer,
    getLabelReducer,
    updateLabelReducer,
} from "@/Features/label/labelSlice";
import API from "@/Config/api";

const useLabels = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const getLabels = async () => {
        try {
            const response = await API.get("/labels");
            dispatch(getLabelReducer(response.data.data));
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const createLabel = async (body, reset) => {
        try {
            const response = await API.post("/label", body);
            dispatch(createLabelReducer(response.data.data));
            reset();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateLabel = async (body) => {
        try {
            const response = await API.put(`/label/${body.id}`, body);
            dispatch(updateLabelReducer(response?.data?.data));
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteLabel = async (id) => {
        try {
            const response = await API.delete(`/label/${id}`);
            dispatch(deleteLabelReducer(id));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getLabels,
        updateLabel,
        deleteLabel,
        createLabel,
        isLoading,
    };
};

export default useLabels;
