import React from "react";

function Button({ title, type, className, onClick = () => {} }) {
    return (
        <button
            onClick={onClick}
            className={`bg-black text-white uppercase text-sm flex justify-center items-center py-3 px-5 rounded-md transition-all duration-400 ease-in-out hover:bg-gray-800 ${className}`}
            type={type}
        >
            {title}
        </button>
    );
}

export default Button;
