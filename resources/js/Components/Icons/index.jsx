export const Tooltip = ({ title }) => {
    return (
        <span className="z-10 rounded-md text-[13px] leading-4 bg-gray-800 text-white p-1.5 hidden group-hover/tooltip:block absolute top-[120%] -left-2">
            {title}
        </span>
    );
};

export const SpinnerIcon = ({ className }) => {
    return (
        <svg
            className={`animate-spin ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};

export const RefreshIcon = ({ className, onClick }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                className={className}
                onClick={onClick}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#000"
            >
                <path d="M13 9v2h7V4h-2v2.74C16.53 5.07 14.4 4 12 4c-2.21 0-4.21.9-5.66 2.34S4 9.79 4 12c0 4.42 3.58 8 8 8 2.21 0 4.21-.9 5.66-2.34l-1.42-1.42A5.98 5.98 0 0 1 12 18c-3.31 0-6-2.69-6-6 0-1.65.67-3.15 1.76-4.24A5.98 5.98 0 0 1 12 6a6.01 6.01 0 0 1 5.19 3H13z" />
            </svg>
            <Tooltip title="Refresh" />
        </div>
    );
};

export const SearchIcon = ({ className }) => {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export const ListIcon = () => {
    return (
        <div className="group/tooltip relative cursor-pointer">
            <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g
                    id="list_view_24px"
                    stroke="none"
                    strokeWidth={1}
                    fill="none"
                    fillRule="evenodd"
                >
                    <polygon
                        id="bounds"
                        fillOpacity={0}
                        fill="#FFFFFF"
                        points="0 0 24 0 24 24 0 24"
                    />
                    <path
                        d="M20,9 L4,9 L4,5 L20,5 L20,9 Z M20,19 L4,19 L4,15 L20,15 L20,19 Z M3,3 C2.45,3 2,3.45 2,4 L2,10 C2,10.55 2.45,11 3,11 L21,11 C21.55,11 22,10.55 22,10 L22,4 C22,3.45 21.55,3 21,3 L3,3 Z M3,13 C2.45,13 2,13.45 2,14 L2,20 C2,20.55 2.45,21 3,21 L21,21 C21.55,21 22,20.55 22,20 L22,14 C22,13.45 21.55,13 21,13 L3,13 Z"
                        id="icon"
                        fill="#000000"
                        fillRule="nonzero"
                    />
                </g>
            </svg>
            <Tooltip title="List View" />
        </div>
    );
};

export const ImageUploadIcon = ({
    className,
    handleFileChange,
    imageUploadRef,
    handleImageUploadRef,
}) => {
    return (
        <>
            <div
                className={`group/tooltip relative cursor-pointer`}
                onClick={handleImageUploadRef}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={className}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#000"
                >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
                </svg>
                <Tooltip title="Add Image" />
            </div>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                ref={imageUploadRef}
            />
        </>
    );
};

export const PinIcon = ({ className, onClick }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                onClick={onClick}
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                    fill="#000"
                    d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"
                />
            </svg>
            <Tooltip title="Pin Note" />
        </div>
    );
};

export const ColorIcon = ({ className, onClick, title }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                className={className}
                onClick={onClick}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#000"
            >
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
                <circle cx="6.5" cy="11.5" r="1.5" />
                <circle cx="9.5" cy="7.5" r="1.5" />
                <circle cx="14.5" cy="7.5" r="1.5" />
                <circle cx="17.5" cy="11.5" r="1.5" />
            </svg>
            <Tooltip title="Background Option" />
        </div>
    );
};

export const ArchivedIcon = ({ className, onClick }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                onClick={onClick}
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#000"
            >
                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z" />
            </svg>
            <Tooltip title="Archived" />
        </div>
    );
};

export const LabelIcon = ({ className, onClick, withText }) => {
    return (
        <div
            onClick={onClick}
            className={`${
                withText && "py-0.5 hover:bg-gray-200 px-2"
            } group/tooltip relative flex items-center gap-0.5 transition-all ease-in-out cursor-pointer`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
            </svg>
            {withText && <span className="text-sm">{withText}</span>}
            {!withText && <Tooltip title="Label" />}
        </div>
    );
};

export const LabelFillIcon = ({ onClick, className }) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            height="18px"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="#000000"
        >
            <path d="m0 0h48v48h-48z" fill="none" />
            <path d="m35.27 11.69c-0.73-1.02-1.92-1.69-3.27-1.69l-22 0.02c-2.21 0-4 1.77-4 3.98v20c0 2.21 1.79 3.98 4 3.98l22 0.02c1.35 0 2.54-0.67 3.27-1.69l8.73-12.31-8.73-12.31z" />
        </svg>
    );
};

export const TickIcon = ({ className, onClick }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                className={className}
                onClick={onClick}
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <defs>
                    <path
                        d="M12,2 C17.52,2 22,6.48 22,12 C22,17.52 17.52,22 12,22 C6.48,22 2,17.52 2,12 C2,6.48 6.48,2 12,2 Z M10,14.2 L7.4,11.6 L6,13 L10,17 L18,9 L16.6,7.6 L10,14.2 Z"
                        id="path-1"
                    />
                </defs>
                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                    <polygon points="0 0 24 0 24 24 0 24" />
                    <mask fill="white">
                        <use xlinkHref="#path-1" />
                    </mask>
                    <use
                        fill="#000000"
                        fillRule="nonzero"
                        xlinkHref="#path-1"
                    />
                </g>
            </svg>
            <Tooltip title="Select" />
        </div>
    );
};

export const TickWithoutBackgoundIcon = ({ className, onClick }) => {
    return (
        <svg
            height="18px"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="#000000"
        >
            <path d="m0 0h18v18h-18z" fill="none" />
            <path d="m6.61 11.89l-3.11-3.11-1.06 1.06 4.17 4.16 8.95-8.95-1.06-1.05z" />
        </svg>
    );
};

export const CrossIcon = ({ className, onClick }) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            height="18px"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="#000000"
        >
            <path d="m0 0h18v18h-18zh18v18h-18z" fill="none" />
            <path d="m14.53 4.53l-1.06-1.06-4.47 4.47-4.47-4.47-1.06 1.06 4.47 4.47-4.47 4.47 1.06 1.06 4.47-4.47 4.47 4.47 1.06-1.06-4.47-4.47z" />
        </svg>
    );
};

export const TrashIcon = ({ onClick, className, withText }) => {
    return (
        <div
            onClick={onClick}
            className="group/tooltip relative p-0.5 px-2 flex items-center gap-0.5 hover:bg-gray-200 transition-all ease-in-out cursor-pointer"
        >
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
            </svg>
            {withText && <span className="text-sm">{withText}</span>}
            {!withText && <Tooltip title="Delete" />}
        </div>
    );
};

export const TrashFillIcon = ({ onClick, className }) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            height="18px"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="#000000"
        >
            <path d="m12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z" />
            <path d="m0 0h48v48h-48z" fill="none" />
        </svg>
    );
};

export const BulbIcon = ({ className }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
        >
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
        </svg>
    );
};

export const PencilIcon = ({ className, onClick = () => {}, withText }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                className={className}
                onClick={onClick}
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
            >
                <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z" />
            </svg>
            {withText && <span className="text-sm">{withText}</span>}
            {!withText && <Tooltip title="Edit note" />}
        </div>
    );
};

export const PencilFillIcon = ({ className, onClick }) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            height="18px"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="#000000"
        >
            <path d="m6 34.5v7.5h7.5l22.13-22.13-7.5-7.5-22.13 22.13zm35.41-20.41c0.78-0.78 0.78-2.05 0-2.83l-4.67-4.67c-0.78-0.78-2.05-0.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z" />
            <path d="m0 0h48v48h-48z" fill="none" />
        </svg>
    );
};

export const PlusIcon = ({ className, onClick }) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            height="18px"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="#000000"
        >
            <path d="m38 26h-12v12h-4v-12h-12v-4h12v-12h4v12h12v4z" />
            <path d="m0 0h48v48h-48z" fill="none" />
        </svg>
    );
};

export const TickIconWithBG = ({ className, onClick }) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            focusable="false"
        >
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
        </svg>
    );
};

export const NoColorIcon = ({ className, onClick, title }) => {
    return (
        <>
            <svg
                className={`relative ${className}`}
                onClick={onClick}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                focusable="false"
            >
                <path d="M21.19 21.19l-3.06-3.06-1.43-1.43-8.3-8.3L7 7 2.81 2.81 1.39 4.22l4.25 4.25A8.056 8.056 0 0 0 4.01 13H4c0 4.42 3.58 8 8 8 1.74 0 3.35-.57 4.66-1.51l3.12 3.12 1.41-1.42zM12 19c-3.22 0-5.86-2.55-5.99-5.74l.01-.19c.04-1.14.42-2.25 1.06-3.18l8.16 8.16c-.95.6-2.05.95-3.24.95zm0-14.17l4.25 4.24a6.014 6.014 0 0 1 1.74 4.01l.01.17c-.02.56-.13 1.11-.3 1.62l1.53 1.53c.49-1.03.77-2.18.77-3.4h-.01a7.975 7.975 0 0 0-2.33-5.35L12 2 8.41 5.58 9.83 7 12 4.83z"></path>
            </svg>

            <Tooltip title={title} />
        </>
    );
};

export const NoImageIcon = ({ className, onClick, title }) => {
    return (
        <>
            <svg
                className={`relative ${className}`}
                onClick={onClick}
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <style
                        dangerouslySetInnerHTML={{
                            __html: ".cls-1{fill:none;}",
                        }}
                    />
                </defs>
                <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z" />
                <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z" />
                <rect className="cls-1" width={32} height={32} />
            </svg>

            <Tooltip title={title} />
        </>
    );
};

export const DragIcon = ({ className, onClick }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                className={className}
                onClick={onClick}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g strokeWidth={0} />
                <g strokeLinecap="round" strokeLinejoin="round" />
                <g>
                    <path d="M7 2a2 2 0 10.001 4.001A2 2 0 007 2zm0 6a2 2 0 10.001 4.001A2 2 0 007 8zm0 6a2 2 0 10.001 4.001A2 2 0 007 14zm6-8a2 2 0 10-.001-4.001A2 2 0 0013 6zm0 2a2 2 0 10.001 4.001A2 2 0 0013 8zm0 6a2 2 0 10.001 4.001A2 2 0 0013 14z" />
                </g>
            </svg>

            <Tooltip title="Drag note" />
        </div>
    );
};

export const GridIcon = ({ className, onClick }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                className={className}
                onClick={onClick}
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <defs>
                    <path
                        d="M3,3 L10,3 C10.55,3 11,3.45 11,4 L11,10 C11,10.55 10.55,11 10,11 L3,11 C2.45,11 2,10.55 2,10 L2,4 C2,3.45 2.45,3 3,3 Z M3,13 L10,13 C10.55,13 11,13.45 11,14 L11,20 C11,20.55 10.55,21 10,21 L3,21 C2.45,21 2,20.55 2,20 L2,14 C2,13.45 2.45,13 3,13 Z M14,3 L21,3 C21.55,3 22,3.45 22,4 L22,10 C22,10.55 21.55,11 21,11 L14,11 C13.45,11 13,10.55 13,10 L13,4 C13,3.45 13.45,3 14,3 Z M14,13 L21,13 C21.55,13 22,13.45 22,14 L22,20 C22,20.55 21.55,21 21,21 L14,21 C13.45,21 13,20.55 13,20 L13,14 C13,13.45 13.45,13 14,13 Z M9,9 L9,5 L4,5 L4,9 L9,9 Z M9,19 L9,15 L4,15 L4,19 L9,19 Z M20,9 L20,5 L15,5 L15,9 L20,9 Z M20,19 L20,15 L15,15 L15,19 L20,19 Z"
                        id="path-1"
                    />
                </defs>
                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                    <polygon
                        id="bounds"
                        fillOpacity={0}
                        fill="#FFFFFF"
                        points="0 0 24 0 24 24 0 24"
                    />
                    <mask id="mask-2" fill="white">
                        <use xlinkHref="#path-1" />
                    </mask>
                    <use
                        id="icon"
                        fill="#000000"
                        fillRule="nonzero"
                        xlinkHref="#path-1"
                    />
                </g>
            </svg>

            <Tooltip title="Grid View" />
        </div>
    );
};

export const CopyIcon = ({ onClick, className, withText }) => {
    return (
        <div
            onClick={onClick}
            className="group/tooltip relative p-0.5 px-2 flex items-center gap-0.5 hover:bg-gray-200 transition-all ease-in-out cursor-pointer"
        >
            <svg
                className={className}
                onClick={onClick}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3 16V4C3 2.89543 3.89543 2 5 2H15M9 22H18C19.1046 22 20 21.1046 20 20V8C20 6.89543 19.1046 6 18 6H9C7.89543 6 7 6.89543 7 8V20C7 21.1046 7.89543 22 9 22Z"
                    stroke="#000000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            {withText && <span className="text-sm">{withText}</span>}
            {!withText && <Tooltip title="Grid View" />}
        </div>
    );
};

export const CollaborateIcon = ({ className, onClick }) => {
    return (
        <div className="group/tooltip relative flex items-center gap-0.5">
            <svg
                className={className}
                onClick={onClick}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000"
            >
                <path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z" />
            </svg>

            <Tooltip title="Collaborator" />
        </div>
    );
};

export const DrawIcon = ({ className, onClick, withText }) => {
    return (
        <div
            onClick={onClick}
            className="group/tooltip relative p-0.5 px-2 flex items-center gap-0.5 hover:bg-gray-200 transition-all ease-in-out cursor-pointer"
        >
            <svg
                className={className}
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5 17V7M5 17C3.89543 17 3 17.8954 3 19C3 20.1046 3.89543 21 5 21C6.10457 21 7 20.1046 7 19M5 17C6.10457 17 7 17.8954 7 19M5 7C6.10457 7 7 6.10457 7 5M5 7C3.89543 7 3 6.10457 3 5C3 3.89543 3.89543 3 5 3C6.10457 3 7 3.89543 7 5M7 5H17M17 5C17 6.10457 17.8954 7 19 7C20.1046 7 21 6.10457 21 5C21 3.89543 20.1046 3 19 3C17.8954 3 17 3.89543 17 5ZM7 19H17M17 19C17 20.1046 17.8954 21 19 21C20.1046 21 21 20.1046 21 19C21 17.8954 20.1046 17 19 17C17.8954 17 17 17.8954 17 19ZM17.9247 6.6737L15.1955 10.3776M15.1955 13.6223L17.9222 17.3223M16 12C16 13.1046 15.1046 14 14 14C12.8954 14 12 13.1046 12 12C12 10.8954 12.8954 10 14 10C15.1046 10 16 10.8954 16 12Z"
                    stroke="#000000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {withText && <span className="text-sm">{withText}</span>}
            {!withText && <Tooltip title="Drawing Tool" />}
        </div>
    );
};

export const MoreIcon = ({ className, onClick }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                className={className}
                onClick={onClick}
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                version="1.1"
                y="0px"
                x="0px"
                viewBox="0 0 18 18"
                enableBackground="new 0 0 18 18"
                fill="#000"
            >
                <path d="m9 5.5c1 0 1.8-0.8 1.8-1.8s-0.8-1.7-1.8-1.7-1.8 0.8-1.8 1.8 0.8 1.7 1.8 1.7zm0 1.7c-1 0-1.8 0.8-1.8 1.8s0.8 1.8 1.8 1.8 1.8-0.8 1.8-1.8-0.8-1.8-1.8-1.8zm0 5.3c-1 0-1.8 0.8-1.8 1.8s0.8 1.7 1.8 1.7 1.8-0.8 1.8-1.8-0.8-1.7-1.8-1.7z" />
            </svg>

            <Tooltip title="More" />
        </div>
    );
};

export const BackIcon = ({ className, onClick }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                className={className}
                onClick={onClick}
                height="24px"
                version="1.1"
                viewBox="0 0 24 24"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>

            <Tooltip title="Back" />
        </div>
    );
};

export const EraseIcon = ({ className, onClick }) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            version="1.1"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path
                fill="#424242"
                d="M21.41,11.33 L13.04,20 L4.73,20 L2.58,17.86 C1.8,17.08 1.8,15.83 2.58,15.04 L13.62,3.58 C14.4,2.81 15.68,2.81 16.46,3.58 L21.41,8.51 C22.2,9.29 22.2,10.55 21.41,11.33 L21.41,11.33 Z"
            />
            <polygon
                color="#4285f4"
                className="ink-icon-color"
                points="17.26 18 15.26 20 21.96 20 21.96 18"
            />
        </svg>
    );
};

export const InkPenIcon = ({ className, onClick }) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            fill="none"
            fillRule="evenodd"
            height="24px"
            stroke="none"
            strokeWidth={1}
            version="1.1"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <polygon
                fill="#424242"
                points="3 17.25 3 21 6.74 21 14.28 13.47 10.53 9.72"
            />
            <path
                color="#000000"
                className="ink-icon-color"
                d="M18.37,3.3 L20.71,5.63 C21.1,6.02 21.11,6.66 20.72,7.05 L15.35,12.41 L11.59,8.65 L14.12,6.12 L13.39,5.39 L7.73,11.05 L6.33,9.65 L12.7,3.29 C13.09,2.9 13.74,2.91 14.12,3.3 L15.54,4.71 L16.96,3.3 C17.34,2.91 17.98,2.91 18.37,3.3 L18.37,3.3 Z"
            />
            <path
                fill="#424242"
                className="ink-cap-border"
                d="M17.7,4L20,6.3L15.4,11L13,8.6l1.8-1.8l0.7-0.7l-0.7-0.7l-0.2-0.2l0.2,0.2l0.7,0.7l0.7-0.7L17.7,4 M13.4,3 c-0.3,0-0.5,0.1-0.7,0.3L6.3,9.6l1.4,1.4l5.7-5.7l0.7,0.7l-2.5,2.5l3.8,3.8L20.7,7c0.4-0.4,0.4-1,0-1.4l-2.3-2.3 C18.2,3.1,17.9,3,17.7,3S17.2,3.1,17,3.3l-1.4,1.4l-1.4-1.4C13.9,3.1,13.7,3,13.4,3L13.4,3z"
            />
        </svg>
    );
};

export const ChevIcon = ({ className, onClick }) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            fill="#000000"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M7 10l5 5 5-5z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    );
};
