import {
    ArchivedIcon,
    ColorIcon,
    CrossIcon,
    ImageIcon,
    LabelIcon,
    PinIcon,
    TickIcon,
} from "@/Components/Icons";

const Card = ({
    data,
    index,
    handleOnSelect,
    selectedData,
    handlePin,
    handleArchived,
}) => {
    return (
        <div
            className={`${
                selectedData?.includes(index)
                    ? "border-gray-900"
                    : "border-gray-200"
            } group w-full border p-3 bg-white rounded-lg relative hover:shadow-lg`}
        >
            {/* ============= SELECTED ICON =============*/}
            <TickIcon
                className={`${
                    selectedData?.includes(index) ? "flex" : "show-on-hover"
                } absolute -top-2 -left-2 cursor-pointer`}
                onClick={() => handleOnSelect(index)}
            />

            {/* ============= CONTENT =============*/}
            <div>
                <div className="font-medium text-lg flex justify-between mb-2">
                    {data?.title}
                    <PinIcon
                        onClick={() => handlePin(data)}
                        className="cursor-pointer hover:bg-gray-200 size-10 -mt-2 rounded-full p-2 show-on-hover"
                    />
                </div>
                <div className="text-sm">{data?.content}</div>
            </div>

            {/* ============= LABELS =============*/}
            <div className="mt-7 flex gap-2">
                {data?.labels?.map((label) => (
                    <div className="relative group/edit flex items-center gap-0.5 bg-gray-200 h-6 px-3 rounded-xl text-xs opacity-75">
                        <span className="group-hover/edit:-translate-x-1.5">
                            {label?.title}
                        </span>
                        <CrossIcon className="absolute right-0 group-hover/edit:block hidden size-4 mt-0.5 cursor-pointer hover:bg-slate-400 rounded-full p-0.5" />
                    </div>
                ))}
            </div>

            {/* ============= OPTIONS - SHOW ON HOVER =============*/}
            <div className="flex gap-2 mt-2 show-on-hover">
                <ColorIcon className="bg-soft-with-hover size-9" />
                <ImageIcon className="bg-soft-with-hover size-9" />
                <ArchivedIcon
                    onClick={() => handleArchived(data)}
                    className="bg-soft-with-hover size-9"
                />
                <LabelIcon className="bg-soft-with-hover size-9" />
            </div>
        </div>
    );
};

export default Card;
