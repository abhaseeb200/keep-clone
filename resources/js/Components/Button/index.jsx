import React from "react";
import { SpinnerIcon } from "@/Components/Icons";

function Button({ title, type, className, isLoading, onClick = () => {} }) {
    return (
        <button
            disabled={isLoading}
            onClick={onClick}
            className={`bg-black gap-2 text-white uppercase text-sm flex justify-center items-center h-[50px] px-5 rounded-md transition-all duration-400 ease-in-out hover:bg-gray-800 ${className}`}
            type={type}
        >
            {isLoading && <SpinnerIcon className="size-4" />} {title}
        </button>
    );
}

export default Button;
