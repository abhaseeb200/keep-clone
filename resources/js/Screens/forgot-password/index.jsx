import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import useAuth from "@/Hooks/useAuth";

function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { forgotPassword, isLoading } = useAuth();

    const onSubmit = async (data) => {
        await forgotPassword(data);
    };

    return (
        <>
            <h1 className="text-center text-3xl font-bold">Create Account</h1>

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

                <Button
                    title="Send Email"
                    type="submit"
                    isLoading={isLoading}
                />

                <Link to="/">
                    <div className="font-bold text-center cursor-pointer">
                        Back To Login
                    </div>
                </Link>
            </form>
        </>
    );
}

export default ForgotPassword;
