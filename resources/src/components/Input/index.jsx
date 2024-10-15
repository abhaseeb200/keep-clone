import React from "react";
import "./style.css";

function Input({
    placeholder,
    label,
    register,
    name,
    errors,
    defaultValue,
    validation = () => {},
}) {
    return (
        <div className="wrapper-input">
            <label className="labels">{label}</label>
            <input
                className="inputs"
                placeholder={placeholder}
                label={label}
                {...register(name, validation)}
                defaultValue={defaultValue}
            />
            {errors && <span className="errors">{errors[name]?.message}</span>}
        </div>
    );
}

export default Input;
