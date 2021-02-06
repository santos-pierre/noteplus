import DesktopSidebar from '../components/Sidebar/DesktopSidebar';
import MobileHeader from '../components/Sidebar/MobileHeader';
import MobileSidebar from '../components/Sidebar/MobileSidebar';

const Home = () => {
    return (
        <div className="h-screen flex overflow-hidden bg-white dark:bg-dark-700">
            <MobileSidebar />
            <DesktopSidebar />
            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                <MobileHeader />
                <div className="flex-1 relative z-0 flex overflow-hidden">
                    <main
                        className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
                        tabIndex={0}
                    >
                        {/* Start main area*/}
                        <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                            <div className="h-full border-2 border-gray-200 border-dashed rounded-lg" />
                        </div>
                        {/* End main area */}
                    </main>
                    <aside className="hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
                        {/* Start secondary column (hidden on smaller screens) */}
                        <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                            <div className="h-full border-2 border-gray-200 border-dashed rounded-lg" />
                        </div>
                        {/* End secondary column */}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Home;
