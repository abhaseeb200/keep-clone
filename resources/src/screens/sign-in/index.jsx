import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import api from "../../../config/api";

function SignIn() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/login", data);
            localStorage.setItem("auth", JSON.stringify({...response?.data}));
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-input">
            <div className="wrapper-from">
                <h1 className="title">Login Your Account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <Input
                        label="Your Email"
                        placeholder="Email"
                        name="email"
                        register={register}
                        validation={{
                            required: "Email Address is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address",
                            },
                        }}
                        errors={errors}
                        defaultValue="john.doe3@example.com"
                    />
                    <Input
                        label="Your Password"
                        placeholder="Password"
                        name="password"
                        register={register}
                        validation={{ required: "Password is required" }}
                        errors={errors}
                        defaultValue="password123"
                    />
                    <Button title="Sign In" type="submit" />
                    <Link to="/signup">
                        <div className="already-account">
                            Create a new account
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
