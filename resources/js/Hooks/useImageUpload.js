import React, { useRef, useState } from "react";
import useNotes from "@/Hooks/useNotes";

const useImageUpload = () => {
    const imageUploadRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { updateImageNote } = useNotes();

    const handleImageUploadRef = (imageUploadRef) => {
        if (imageUploadRef.current) {
            imageUploadRef.current.click();
        }
    };

    const handleClearImage = (setValue) => {
        setImagePreview(null);
        setValue && setValue("image", null);
        if (imageUploadRef.current) {
            imageUploadRef.current.value = "";
        }
    };

    const handleFileChange = (event, setIsMoreField, setValue) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);

            setIsMoreField(true);
            setValue("image", file);
        }
    };

    //Used this function for update image in card-note 
    const handleFileChangeUpdate = async (event, data) => {
        const file = event.target.files[0];
        if (file) {
            const { id } = data;
            await updateImageNote({ id, image: file });
        }
    };

    return {
        imagePreview,
        imageUploadRef,
        setImagePreview,
        handleImageUploadRef,
        handleFileChange,
        handleClearImage,
        handleFileChangeUpdate
    };
};

export default useImageUpload;
