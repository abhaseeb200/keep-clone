import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "@/Components/Input";
import Button from "@/Components/Button";

function SignUp() {
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
                <Input
                    label="Your Password"
                    placeholder="Password"
                    name="password"
                    register={register}
                    validation={{ required: "Password is required" }}
                    errors={errors}
                    defaultValue="password123"
                />
                <Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirm-password"
                    register={register}
                    validation={{ required: "Password is required" }}
                    errors={errors}
                    defaultValue="password123"
                />
                <Button title="Sign Up" />
                <Link to="/">
                    <div className="font-bold text-center cursor-pointer">
                        Already have an account
                    </div>
                </Link>
            </form>
        </>
    );
}

export default SignUp;
