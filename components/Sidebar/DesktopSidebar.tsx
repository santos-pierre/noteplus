import AddSection from './AddSection/AddSection';
import LogoPlaceholder from './IconPlaceholder';
import Item from './Item/Item';

export default function DesktopSidebar() {
    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex flex-col flex-1 h-0 border-r bg-dark-100 border-dark-200 dark:bg-dark-800 dark:border-dark-500 dark:text-white">
                    <div className="flex flex-col flex-1 pt-5 pb-4 space-y-3 overflow-y-auto">
                        <LogoPlaceholder />
                        <AddSection />
                        <nav className="flex-1 mt-5" aria-label="Sidebar">
                            <div className="px-2 space-y-1">
                                <Item folder />
                                <Item />
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
