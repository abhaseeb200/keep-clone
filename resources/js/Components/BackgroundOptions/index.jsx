import React, { useRef } from "react";
import {
    ColorIcon,
    NoColorIcon,
    NoImageIcon,
    TickIconWithBG,
    Tooltip,
} from "@/Components/Icons";
import useClickOutside from "@/Hooks/useClickOutside";

const colorOptions = [
    { title: "Coral", code: "#faafa8" },
    { title: "Peach", code: "#f39f76" },
    { title: "Sand", code: "#fff8b8" },
    { title: "Mint", code: "#e2f6d3" },
    { title: "Sage", code: "#b4ddd3" },
    { title: "Fog", code: "#d4e4ed" },
    { title: "Storm", code: "#aeccdc" },
    { title: "Dusk", code: "#d3bfdb" },
    { title: "Blossom", code: "#f6e2dd" },
    { title: "Clay", code: "#e9e3d4" },
    { title: "Chalk", code: "#efeff1" },
];

const imageOptions = [
    { title: "Groceries", url: "/backgrounds/grocery.svg" },
    { title: "Food", url: "/backgrounds/food.svg" },
    { title: "Music", url: "/backgrounds/music.svg" },
    { title: "Recipe", url: "/backgrounds/recipe.svg" },
    { title: "Notes", url: "/backgrounds/notes.svg" },
    { title: "Places", url: "/backgrounds/places.svg" },
    { title: "Travel", url: "/backgrounds/travel.svg" },
    { title: "Video", url: "/backgrounds/video.svg" },
    { title: "Celebration", url: "/backgrounds/celebration.svg" },
];

function BackgroundOptions({
    isOpen,
    setIsOpen,
    handleBackgroundOption,
    data = [],
}) {
    const backgroundOptionRef = useRef(null);

    useClickOutside(backgroundOptionRef, () => setIsOpen && setIsOpen(false));


    console.log(data?.background, data.title);
    

    return (
        <div className="relative" ref={backgroundOptionRef}>
            <ColorIcon
                className="bg-soft-with-hover 2xl:size-9 size-[34px]"
                onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div className="absolute top-8 -left-7 shadow-xl px-3 py-2.5 rounded-lg bg-white z-10">
                    {/* ============ COLORS ============*/}
                    <div className="flex gap-1 flex-row items-center pb-2 border-b justify-between">
                        <div
                            className={`${
                                !data?.background && "border-[#a142f4]"
                            } group/tooltip cursor-pointer size-8 flex justify-center items-center relative border-[2.3px] hover:border-black rounded-full`}
                            // FOR COLORS. USED KEY 'CODE'
                            onClick={() =>
                                handleBackgroundOption({ code: "" }, data)
                            }
                        >
                            {!data?.background && (
                                <TickIconWithBG className="absolute -top-1.5 -right-2 size-4 bg-[#a142f4] rounded-full fill-white" />
                            )}
                            <NoColorIcon
                                className="size-[17px]"
                                title="Default"
                            />
                        </div>

                        {colorOptions.map((i, index) => (
                            <div
                                className="flex rounded-full relative group/tooltip"
                                key={index}
                                onClick={() => handleBackgroundOption(i, data)}
                            >
                                {i?.code === data?.background && (
                                    <TickIconWithBG className="absolute -top-1.5 -right-0.5 size-4 bg-[#a142f4] rounded-full fill-white" />
                                )}
                                <span
                                    className={`${
                                        i?.code === data?.background &&
                                        "!border-[#a142f4]"
                                    } size-8 rounded-full cursor-pointer border-[2.3px] hover:!border-black`}
                                    style={{
                                        background: i?.code,
                                        borderColor: `${i.code}`,
                                    }}
                                ></span>
                                <Tooltip title={i?.title} />
                            </div>
                        ))}
                    </div>

                    {/* ============ IMAGES ============*/}
                    <div className="flex gap-1 flex-row items-center pt-2 border-t">
                        <div
                            // FOR COLORS. USED KEY 'URL'
                            onClick={() =>
                                handleBackgroundOption({ url: "" }, data)
                            }
                            className={`${
                                !data?.background && "border-[#a142f4]"
                            } hover:border-black cursor-pointer group/tooltip size-10 p-1 flex justify-center items-center relative border-[2.3px] rounded-full`}
                        >
                            {!data?.background && (
                                <TickIconWithBG className="absolute -top-1.5 -right-2 size-4 bg-[#a142f4] rounded-full fill-white" />
                            )}
                            <NoImageIcon title="Default" className="size-6" />
                        </div>

                        {imageOptions.map((i, index) => (
                            <div
                                key={index}
                                className="flex rounded-full relative group/tooltip"
                                onClick={() => handleBackgroundOption(i, data)}
                            >
                                <span
                                    className={`${
                                        i.url === data.background &&
                                        "!border-[#a142f4]"
                                    } size-10 rounded-full cursor-pointer border-[2.3px] hover:border-black`}
                                    style={{
                                        backgroundImage: `url(${i.url})`,
                                    }}
                                ></span>
                                {i?.url === data?.background && (
                                    <TickIconWithBG className="absolute -top-1.5 -right-0.5 size-4 bg-[#a142f4] rounded-full fill-white" />
                                )}

                                <Tooltip title={i?.title} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BackgroundOptions;
