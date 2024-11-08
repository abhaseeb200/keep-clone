import React from "react";

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
        <div className="flex flex-col gap-1">
            <label className="uppercase text-xs font-medium">{label}</label>
            <input
                className="box-border p-3 rounded-md outline-none border border-gray-400"
                placeholder={placeholder}
                {...register(name, validation)}
                defaultValue={defaultValue}
            />
            {errors && <span className="text-red-500 text-xs">{errors[name]?.message}</span>}
        </div>
    );
}

export default Input;
