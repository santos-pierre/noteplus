import { useState } from 'react';

type ItemProps = {
    folder?: boolean;
};

export default function Item({ folder = false }: ItemProps) {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <li
            className={`${
                isActive
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }  group flex items-center justify-between px-2 py-2 lg:text-sm text-base font-medium rounded-md cursor-pointer`}
            onClick={() => setIsActive(!isActive)}
        >
            <div className="flex items-center">
                <svg
                    className={`${
                        isActive
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500'
                    } mr-4 lg:mr-3 h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {folder ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                    )}
                </svg>
                <span className="flex-grow">File Name</span>
            </div>
            {folder && (
                <svg
                    className="text-gray-500 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {isActive ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    )}
                </svg>
            )}
        </li>
    );
}
