import Item from './Item/Item';

export default function DesktopSidebar() {
    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100 dark:bg-dark-800 dark:border-gray-500">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <nav className="mt-5 flex-1" aria-label="Sidebar">
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
