import { useSidebar } from '@/utils/custom-hooks';

const MobileHeader = () => {
    const { toggleVisibility } = useSidebar();

    return (
        <div className="lg:hidden">
            <div className="flex items-center justify-between bg-dark-50 dark:bg-dark-800 border-b border-dark-200 dark:border-dark-500 px-4 py-1.5">
                <div>
                    <img
                        className="hidden w-auto h-8 dark:block"
                        src="/noteplus-logo-dark.svg"
                        alt="noteplus-logo"
                    />
                    <img
                        className="block w-auto h-8 dark:hidden"
                        src="/noteplus-logo-light.svg"
                        alt="noteplus-logo"
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center w-12 h-12 -mr-3 rounded-md text-dark-500 dark:text-dark-300 hover:text-dark-900 focus:ring-2 focus:ring-inset focus:ring-dark-500 dark:hover:text-dark-500 focus:outline-none"
                        onClick={toggleVisibility}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;
