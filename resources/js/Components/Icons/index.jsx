export const ImageIcon = ({ className }) => {
    return (
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
    );
};

export const PinIcon = ({ className, onClick }) => {
    return (
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
    );
};

export const ColorIcon = ({ className }) => {
    return (
        <svg
            className={className}
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
    );
};

export const ArchivedIcon = ({ className, onClick }) => {
    return (
        <svg
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#000"
        >
            <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z" />
        </svg>
    );
};

export const LabelIcon = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
        </svg>
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
                <use fill="#000000" fillRule="nonzero" xlinkHref="#path-1" />
            </g>
        </svg>
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
