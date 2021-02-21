import IconPlaceholder from '@/components/Sidebar/IconPlaceholder';
import AddSection from '@/components/Sidebar/AddSection';
import { useResetUserSelection } from '@/utils/custom-hooks';

const DesktopSidebar = () => {
    const { resetUserSelection } = useResetUserSelection();

    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64">
                <div className="flex flex-col flex-1 h-0 border-r bg-dark-100 border-dark-200 dark:bg-dark-800 dark:border-dark-500 dark:text-white">
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
