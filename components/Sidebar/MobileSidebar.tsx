import Item from './Item/Item';
import { Transition } from '@headlessui/react';
import { useSidebar } from '../../utils/custom-hooks';

const MobileSidebar = () => {
    const { isVisible, toggleVisibility } = useSidebar();

    return (
        <Transition as="div" className="lg:hidden" show={isVisible}>
            <div className="fixed inset-0 flex z-40">
                <Transition.Child
                    as="div"
                    className="fixed inset-0"
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="absolute inset-0 bg-gray-600 dark:bg-dark-800 opacity-75"
                        onClick={toggleVisibility}
                    />
                </Transition.Child>
                <Transition.Child
                    as="div"
                    className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-dark-800 focus:outline-none"
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={toggleVisibility}
                        >
                            <span className="sr-only">Close sidebar</span>
                            {/* Heroicon name: outline/x */}
                            <svg
                                className="h-6 w-6 text-white"
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <nav aria-label="Sidebar" className="mt-5">
                            <div className="px-2 space-y-1">
                                <Item folder />
                                <Item />
                            </div>
                        </nav>
                    </div>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                    {/* Force sidebar to shrink to fit close icon */}
                </div>
            </div>
        </Transition>
    );
};

export default MobileSidebar;
