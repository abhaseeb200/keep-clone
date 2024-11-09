import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import api from "@/Config/api";

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
            localStorage.setItem("auth", JSON.stringify({ ...response?.data }));
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="text-center text-3xl font-bold">Login Account</h1>
            
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
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

                <div>
                    <Input
                        label="Your Password"
                        placeholder="Password"
                        name="password"
                        register={register}
                        validation={{ required: "Password is required" }}
                        errors={errors}
                        defaultValue="password123"
                    />
                    <Link
                        to="/forgot-password"
                        className="text-xs font-medium uppercase block text-end w-full"
                    >
                        Forgot Your Password
                    </Link>
                </div>

                <Button title="Sign In" type="submit" />

                <Link to="/signup">
                    <div className="font-bold text-center cursor-pointer">
                        Create a new account
                    </div>
                </Link>
            </form>
        </>
    );
}

export default SignIn;
