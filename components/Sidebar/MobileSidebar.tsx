import { Transition } from '@headlessui/react';
import { useSidebar } from '../../utils/custom-hooks';
import LogoPlaceholder from './IconPlaceholder';
import AddSection from './AddSection/AddSection';
import ListItemFolder from './Items/ListItemFolder';
import ListItem from './Items/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesByFolder, selectFolder } from '../../redux/slices/notesSlice';
import { selectItemSidebar } from '../../redux/slices/sidebarSlice';

const MobileSidebar = () => {
    const { isVisible, toggleVisibility } = useSidebar();
    const notes = useSelector(getNotesByFolder);

    const dispatch = useDispatch();
    const resetUserSelection = () => {
        dispatch(selectFolder(null));
        dispatch(selectItemSidebar(null));
    };

    return (
        <Transition as="div" className="lg:hidden" show={isVisible}>
            <div className="fixed inset-0 z-40 flex">
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
                        className="absolute inset-0 opacity-75 bg-dark-600 dark:bg-dark-800"
                        onClick={toggleVisibility}
                    />
                </Transition.Child>
                <Transition.Child
                    as="div"
                    className="relative flex flex-col flex-1 w-full max-w-xs bg-white dark:bg-dark-800 focus:outline-none"
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <div className="absolute top-0 right-0 pt-2 -mr-12">
                        <button
                            type="button"
                            className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={toggleVisibility}
                        >
                            <span className="sr-only">Close sidebar</span>
                            <svg
                                className="w-6 h-6 text-white"
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
                    <div className="flex-1 h-0 pt-5 pb-4 space-y-3 overflow-y-auto">
                        <LogoPlaceholder />
                        <AddSection />
                        <nav aria-label="Sidebar" className="mt-5">
                            <div className="px-2 space-y-1">
                                <ListItemFolder notes={notes} />
                                <ListItem notes={notes['other']} />
                            </div>
                        </nav>
                        <div className="pb-12" onClick={resetUserSelection}></div>
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
