import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginReducer, logoutReducer } from "@/Features/auth/authSlice";
import API from "@/Config/api";
import toast from "react-hot-toast";

const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const signIn = async (data) => {
        try {
            setIsLoading(true);
            const response = await API.post("/login", data);
            dispatch(loginReducer(response?.data));
            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (data) => {
        try {
            setIsLoading(true);
            const response = await API.post("/register", data);
            dispatch(loginReducer(response?.data));
            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async (data) => {
        try {
            // const response = await API.post("/register", data);
            // console.log(response);
            dispatch(logoutReducer());
            navigate("/");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setIsLoading(false);
        }
    };

    //THIS API WILL SEND EMAIL
    const forgotPassword = async (data) => {
        try {
            // const response = await API.post("/forgot-password", data);
            // console.log(response);
            const response = { email: "admin@email.com", password: "123" };
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const newPassword = async (data) => {
        try {
            // const response = await API.post("/reset-password", data);
            // console.log(response);
            navigate("/");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        signIn,
        signUp,
        forgotPassword,
        newPassword,
        signOut,
        isLoading,
    };
};

export default useAuth;
