import React, { useEffect, useRef, useState } from "react";
import { BackIcon, ChevIcon, EraseIcon, InkPenIcon } from "@/Components/Icons";
import useClickOutside from "@/Hooks/useClickOutside";
import useImageUpload from "@/Hooks/useImageUpload";
import useNotes from "@/Hooks/useNotes";

const DrawingModal = ({
    isOpen,
    setIsOpen,
    setBinaryImage,
    isUpdate,
    data,
}) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [mode, setMode] = useState("draw"); // Mode can be "draw" or "erase"
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState(10);
    const [color, setColor] = useState("black");

    const { updateNote } = useNotes();

    useEffect(() => {
        if (isOpen) {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth * 2;
            canvas.height = window.innerHeight * 2;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            const context = canvas.getContext("2d");
            context.scale(2, 2);
            context.strokeStyle = "#000000";
            context.lineWidth = 2;
            contextRef.current = context;

            //LOAD THE DRAWING - IF UPDATED
            if (!isUpdate) return;

            const img = new Image();
            img.onload = () => {
                context.drawImage(img, 0, 0);
            };
            img.src = data?.drawing;
        }
    }, [isOpen]);

    const handleMouseMove = (event) => {
        setPosition({ x: event.clientX, y: event.clientY });

        if (isDrawing) {
            const { offsetX, offsetY } = event.nativeEvent;

            if (mode === "draw") {
                contextRef.current.lineTo(offsetX, offsetY);
                contextRef.current.stroke();
            } else if (mode === "erase") {
                contextRef.current.clearRect(
                    offsetX - 10,
                    offsetY - 10,
                    size,
                    size
                );
            }
        }
    };

    const handleFinishDrawing = () => {
        if (mode === "draw") {
            contextRef.current.closePath();
        }
        setIsDrawing(false);
    };

    const handleStartDrawing = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        if (mode === "draw") {
            contextRef.current.beginPath();
            contextRef.current.moveTo(offsetX, offsetY);
        }
        setIsDrawing(true);
    };

    const handleSave = async () => {
        if (!contextRef.current) return;

        const dataUrl = canvasRef.current.toDataURL();
        const modifiedData = { ...data, drawing: dataUrl };

        if (isUpdate) {
            await updateNote(modifiedData);
        } else {
            setBinaryImage(dataUrl);
            setIsOpen(false);
        }
    };

    const handleMode = (currentMode) => {
        setMode(currentMode);
    };

    const handleBack = () => {
        window.history.back();
    };

    const handleSizes = (currentSize) => {
        setSize(currentSize);
        if (mode == "draw") {
            contextRef.current.lineWidth = currentSize;
        }
    };

    const handleColors = (currentColor) => {
        setColor(currentColor);
        contextRef.current.strokeStyle = currentColor;
    };

    const handleNewDraw = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleDownload = () => {
        if (contextRef.current) {
            const dataUrl = canvasRef.current.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "canvas-drawing.png";

            link.click();
        }
    };

    return (
        <>
            {isOpen && (
                <div className="w-full h-screen fixed inset-0 z-50 bg-[#FAFAFA] shadow-lg overflow-hidden">
                    {/* ================ PANEL OPTIONS ================ */}
                    <div className="flex items-center justify-between mb-2 bg-white shadow-lg h-16 w-full px-5">
                        <div className="cursor-pointer flex gap-2">
                            {/* ================ TOOLS ================ */}
                            <div
                                onClick={() => handleBack()}
                                className="border p-2 border-gray-300 hover:bg-gray-200"
                            >
                                <BackIcon className="size-6 opacity-75" />
                            </div>

                            <ToolOption
                                mode={mode}
                                icon={<EraseIcon />}
                                name="erase"
                                handleMode={handleMode}
                                handleSizes={handleSizes}
                            />

                            <ToolOption
                                mode={mode}
                                icon={<InkPenIcon />}
                                name="draw"
                                handleMode={handleMode}
                                handleSizes={handleSizes}
                                handleColors={handleColors}
                            />
                        </div>

                        {/* ================ ACTIONS ================ */}
                        <div className="flex gap-2">
                            <ActionButton
                                onClick={handleDownload}
                                name="Download"
                            />
                            <ActionButton onClick={handleNewDraw} name="New" />
                            <ActionButton onClick={handleSave} name="Save" />
                        </div>
                    </div>

                    {/* ================ CANVAS ================ */}
                    <canvas
                        ref={canvasRef}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleFinishDrawing}
                        onMouseDown={handleStartDrawing}
                    />

                    {/* ================ CUSTOM-CURSOR ================ */}
                    <div
                        className={`${
                            mode !== "draw" &&
                            "border border-black rounded-full"
                        } fixed pointer-events-none -translate-x-2/4 -translate-y-2/4 z-50 rounded-full`}
                        style={{
                            background: mode == "draw" ? `${color}` : `white`,
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                        }}
                    ></div>
                </div>
            )}
        </>
    );
};

export default DrawingModal;

const ToolOption = ({
    handleMode,
    mode,
    icon,
    name,
    handleSizes,
    handleColors,
}) => {
    const [isOpenMore, setIsOpenMore] = useState(null);

    const containerRef = useRef();

    useClickOutside(containerRef, () => setIsOpenMore(false));

    const sizes = [10, 20, 30, 40, 50];
    const colors = ["#000", "red", "green", "blue", "orange"];

    useEffect(() => {
        return () => {
            handleSizes(sizes[0]);
            handleColors && handleColors(colors[0]);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative border border-gray-300 hover:bg-gray-200 cursor-pointer p-2 ${
                mode == name ? "bg-gray-300" : "bg-white"
            }`}
            onClick={() => handleMode(name)}
        >
            {/* ========== ICON ========== */}
            <div className="flex items-center gap-1">
                <span className="size-7">{icon}</span>
                <ChevIcon
                    className="size-6 -mr-1.5"
                    onClick={() => setIsOpenMore(!isOpenMore)}
                />
            </div>

            {isOpenMore && (
                <div className="absolute top-14 left-0 bg-white shadow-lg w-60 py-4">
                    {/* ========== SIZES ========== */}
                    <div className="flex justify-between items-center px-4 pt-4">
                        {sizes?.map((size, index) => (
                            <span
                                key={index}
                                onClick={() => handleSizes(size)}
                                className="bg-black rounded-full"
                                style={{
                                    width: `${size}px`,
                                    height: `${size}px`,
                                }}
                            ></span>
                        ))}
                    </div>

                    {/* ========== COLORS - [ NOT SHOW ON ERASER ]========== */}
                    {name != "erase" && (
                        <div className="flex justify-between items-center px-4 pt-4 mt-4 border-t border-gray-700">
                            {colors?.map((color, index) => (
                                <span
                                    key={index}
                                    onClick={() => handleColors(color)}
                                    className="size-5 border rounded-full"
                                    style={{
                                        background: color,
                                        borderColor: color,
                                    }}
                                ></span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const ActionButton = ({ onClick, name }) => {
    return (
        <span
            onClick={onClick}
            className="bg-gray-200 px-4 py-1 cursor-pointer hover:bg-slate-300"
        >
            {name}
        </span>
    );
};
