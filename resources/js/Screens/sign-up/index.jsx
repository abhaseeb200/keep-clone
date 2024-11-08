import React from "react";
import { Link } from "react-router-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";

function SignIn() {
    return (
        <div className="flex max-w-md mx-auto flex-col h-screen justify-center gap-5">
            <div className="bg-white flex flex-col gap-6 p-10 rounded-md shadow-lg">
                <h1 className="text-xl font-bold text-center">
                    Create New Account
                </h1>
                <Input
                    label="Your Full Name"
                    placeholder="Full Name"
                    name="fullName"
                />
                <Input label="Your Email" placeholder="Email" name="email" />
                <Input
                    label="Your Password"
                    placeholder="Password"
                    name="password"
                />
                <Button title="Sign Up" />
                <Link to="/">
                    <div className="font-bold text-center cursor-pointer">
                        Already have an account
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SignIn;
