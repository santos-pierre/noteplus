import IconPlaceholder from '@/components/Sidebar/IconPlaceholder';
import AddSection from '@/components/Sidebar/AddSection';
import { useResetUserSelection } from '@/utils/custom-hooks';
import { useSelector } from 'react-redux';
import { getNotesByFolder } from '@/redux/selectors';
import ListItems from '@/components/Sidebar/Items/ListItems';

const DesktopSidebar = () => {
    const { resetUserSelection } = useResetUserSelection();
    const notes = useSelector(getNotesByFolder);

    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64">
                <div className="flex flex-col flex-1 h-0 border-r bg-dark-800 border-dark-500 text-white">
                    <div className="flex flex-col flex-1 pt-5 pb-4 space-y-3 overflow-y-auto">
                        <IconPlaceholder />
                        <AddSection />
                        <nav className="flex-1 mt-5" aria-label="Sidebar" onClick={resetUserSelection}>
                            <div
                                className="space-y-1"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <ListItems notes={notes} />
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopSidebar;
