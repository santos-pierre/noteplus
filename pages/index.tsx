// import dynamic from 'next/dynamic';
// const Editor = dynamic(import('./../components/Editor/Editor'), { ssr: false });

import DesktopSidebar from '@/components/Sidebar/DesktopSidebar';
import MobileHeader from '@/components/Sidebar/MobileHeader';
import MobileSidebar from '@/components/Sidebar/MobileSidebar';

const Home = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-dark-700">
            <MobileSidebar />
            <DesktopSidebar />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <MobileHeader />
                <div className="relative z-0 flex flex-1 overflow-hidden">
                    <main
                        className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last"
                        tabIndex={0}
                    >
                        {/* Start main area*/}
                        <div className="h-full">{/* <Editor /> */}</div>
                        <div className="fixed bottom-0 w-full h-10 bg-blue-600"></div>
                        {/* End main area */}
                    </main>
                    <aside className="relative flex-shrink-0 hidden border-r border-gray-200 xl:order-first xl:flex xl:flex-col w-96">
                        {/* Start secondary column (hidden on smaller screens) */}
                        <div className="absolute inset-0 px-4 py-6 sm:px-6 lg:px-8">
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
