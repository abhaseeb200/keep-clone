import { useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { updateNoteReducer } from "@/Features/note/noteSlice";
import useNotes from "@/Hooks/useNotes";
import useDebounce from "@/Hooks/useDebounce";

const useHandler = () => {
    const { updateNote, updateNoteLabels, deleteNote, createNote } = useNotes();

    const dispatch = useDispatch();
    const [selectMultiple, setSelectMultiple] = useOutletContext();

    const handleClose = (e, setIsMoreField, reset) => {
        e.stopPropagation();
        setIsMoreField(false);
        reset();
    };

    const handleOnSelect = (data) => {
        let isExists = selectMultiple.find((item) => item?.id == data?.id);
        let duplicate = [...selectMultiple];

        if (isExists) {
            duplicate = selectMultiple.filter((i) => i?.id !== isExists?.id);
        } else {
            duplicate.push(data);
        }

        setSelectMultiple(duplicate);
    };

    const handlePin = async (data) => {
        let updatedPin;
        if (data?.isPinned) {
            updatedPin = { ...data, isPinned: false };
        } else {
            updatedPin = { ...data, isPinned: true };
        }
        await updateNote(updatedPin);
    };

    const handleArchived = async (data) => {
        let updatedArchived;
        if (data?.isArchived) {
            updatedArchived = { ...data, isArchived: false };
        } else {
            updatedArchived = { ...data, isArchived: true };
        }
        await updateNote(updatedArchived);
    };

    const handleTrash = async (data) => {
        await deleteNote(data?.id);
    };

    const handleCopyNote = async (data) => {
        let labelsId = data.labels.map((i) => i?.id);
        let modifiedData = {
            ...data,
            labels: labelsId,
            image_url: data.image,
            image: null,
        };
        // return console.log(modifiedData);

        await createNote(modifiedData);
    };

    const handleSelectLabels = async (label, note) => {
        let isExists = note.labels.find((i) => i?.id == label?.id);
        let newLabels,
            newLabelsId = [];

        if (isExists) {
            newLabels = note.labels.filter((i) => i.id !== isExists.id);
        } else {
            newLabels = [...note.labels, label];
        }

        newLabelsId = newLabels.map((i) => i?.id);

        dispatch(updateNoteReducer({ ...note, labels: newLabels }));

        debouncedChangeHandler({ ...note, labels: newLabelsId });
    };

    const debouncedChangeHandler = useDebounce((data) => {
        updateNoteLabels(data);
    }, 3000);

    const handleLabelToggle = (data, setCurrentId) => {
        setCurrentId((prevId) => (prevId === data.id ? null : data.id));
    };

    const handleRemoveLabel = (label, note) => {
        let newLabels = note.labels.filter((i) => i.id !== label.id);
        let newLabelsId = newLabels.map((i) => i.id);

        dispatch(updateNoteReducer({ ...note, labels: newLabels }));
        updateNoteLabels({ ...note, labels: newLabelsId });
    };

    const handleBackgroundOption = (data, setBackground) => {
        if (Object.keys(data).includes("url")) {
            return setBackground(`url(${data?.url})`);
        }

        setBackground(data?.code);
    };

    const handleUpdateBackgroundOption = async (option, note) => {
        let background;
        if (Object.keys(option).includes("url")) {
            background = option?.url;
        } else {
            background = option?.code;
        }

        //Remove labels from it
        const { labels, ...remainNote } = note;

        await updateNote({
            ...remainNote,
            background: background,
        });
    };

    const handleFileChange = (event, setPreview, setIsMoreField, setValue) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
            };
            reader.readAsDataURL(file);

            setIsMoreField(true);
            setValue("image", file);
        }
    };

    const handleImageUploadRef = (imageUploadRef) => {
        if (imageUploadRef.current) {
            imageUploadRef.current.click();
        }
    };

    const handleSelectModalNote = (
        data,
        setSelectedModalNote,
        setIsOpenNote
    ) => {
        setSelectedModalNote(data);
        setIsOpenNote(true);
    };

    return {
        handleClose,
        handleOnSelect,
        handlePin,
        handleArchived,
        handleTrash,
        handleSelectLabels,
        handleLabelToggle,
        handleRemoveLabel,
        handleBackgroundOption,
        handleUpdateBackgroundOption,
        handleFileChange,
        handleImageUploadRef,
        handleSelectModalNote,
        handleCopyNote,
    };
};

export default useHandler;
