import React, { useEffect, useRef, useState } from "react";

const DrawingModal = ({ setIsOpen, isOpen, data }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

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
        }
    }, [isOpen]);

    const handleDraw = (event) => {
        if (isDrawing) {
            const { offsetX, offsetY } = event.nativeEvent;

            //Draw a line from x,y point
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
    };

    const handleFinishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const handleStartDrawing = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        contextRef.current.beginPath();

        //Start moving the drawing from x,y point
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const handleSave = () => {
        console.log(contextRef.current);
        
       if (contextRef.current) {
        const dataUrl = contextRef.current.toDataURL();
        const jsonData = JSON.stringify({ image: dataUrl });

        // Save JSON to a file (optional)
        const blob = new Blob([jsonData], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "canvas-drawing.json";
        link.click();
       }
    };

    return (
        <>
            {isOpen && (
                <div className="w-full h-screen p-2 fixed inset-0 z-50 bg-white shadow-lg overflow-hidden">
                    <button
                        className="bg-gray-300 p-2"
                        onClick={() => handleSave()}
                    >
                        Save State
                    </button>
                    <canvas
                        ref={canvasRef}
                        onMouseMove={handleDraw}
                        onMouseUp={handleFinishDrawing}
                        onMouseDown={handleStartDrawing}
                    />
                </div>
            )}
        </>
    );
};

export default DrawingModal;
