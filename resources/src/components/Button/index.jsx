import React from "react";
import "./style.css";

function Button({ title, type, className, onClick = () => {} }) {
    return (
        <button onClick={onClick} className={`button ${className}`} type={type}>
            {title}
        </button>
    );
}

export default Button;
