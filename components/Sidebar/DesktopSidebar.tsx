import { useDispatch, useSelector } from 'react-redux';
import { getNotesByFolder, selectFolder } from '../../redux/slices/notesSlice';
import { selectItemSidebar } from '../../redux/slices/sidebarSlice';
import AddSection from './AddSection/AddSection';
import LogoPlaceholder from './IconPlaceholder';
import ListItems from './Items/ListItems';

const DesktopSidebar = () => {
    // const notes = useSelector(getNotesByFolder);
    // const dispatch = useDispatch();
    // const resetUserSelection = () => {
    //     dispatch(selectFolder(null));
    //     dispatch(selectItemSidebar(null));
    // };
    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64">
                {/* Sidebar component, swap this element with an4cbaed4f-c3eb-4a2e-b033-c3253cd03c50 sidebar if you like */}
                <div className="flex flex-col flex-1 h-0 border-r bg-dark-100 border-dark-200 dark:bg-dark-800 dark:border-dark-500 dark:text-white">
                    <div className="flex flex-col flex-1 pt-5 pb-4 space-y-3 overflow-y-auto">
                        <LogoPlaceholder />
                        <AddSection />
                        <nav
                            className="flex-1 mt-5"
                            aria-label="Sidebar"
                            /*
                            onClick={resetUserSelection}
                            */
                        >
                            <div
                                className="space-y-1"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {/* <ListItems notes={notes} /> */}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopSidebar;
