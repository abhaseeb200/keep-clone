import { useRef } from "react";

const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    const debouncedCallback = (...args) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedCallback;
};

export default useDebounce;
