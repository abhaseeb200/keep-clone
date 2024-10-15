import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
// import "./style.css";
import { Link } from "react-router-dom";

function SignIn() {
    return (
        <div className="container-input">
            <div className="wrapper-from">
                <h1 className="title">Create New Account</h1>
                <Input label="Your Full Name" placeholder="Full Name" name="fullName"/>
                <Input label="Your Email" placeholder="Email" name="email" />
                <Input
                    label="Your Password"
                    placeholder="Password"
                    name="password"
                />
                <Button title="Sign Up" />
                <Link to="/">
                    <div className="already-account">Already have an account</div>
                </Link>
            </div>
        </div>
    );
}

export default SignIn;
