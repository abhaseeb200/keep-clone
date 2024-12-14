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
                stroke-width="4"
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
    register = () => {},
}) => {
    return (
        <>
            <div
                className={`group/tooltip relative`}
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

export const LabelIcon = ({ className, onClick }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={onClick}
                className={className}
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
            </svg>
            <Tooltip title="Label" />
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

export const TrashIcon = ({ onClick, className }) => {
    return (
        <div className="group/tooltip relative">
            <svg
                className={className}
                onClick={onClick}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
            </svg>
            <Tooltip title="Delete" />
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

export const PencilIcon = ({ className }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
        >
            <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z" />
        </svg>
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
