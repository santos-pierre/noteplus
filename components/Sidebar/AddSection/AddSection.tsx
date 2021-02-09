import { ReactNode } from 'react';

const AddSection = () => {
    return (
        <div className="py-3 space-y-4 border-t border-b border-dark-200 dark:border-dark-500">
            <Button>Add File</Button>
            <Button>Add Folder</Button>
        </div>
    );
};

type ButtonProps = {
    children: ReactNode;
};

const Button = ({ children }: ButtonProps) => {
    return (
        <div className="px-4 font-bold focus:outline-none ">
            <button className="inline-flex font-medium rounded-md focus:outline-none hover:opacity-75">
                <svg
                    className="w-6 h-6 mr-2 text-blue-700 dark:text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                </svg>
                {children}
            </button>
        </div>
    );
};

export default AddSection;
