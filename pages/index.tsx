import DesktopSidebar from '@/components/Sidebar/DesktopSidebar';
import MobileHeader from '@/components/Sidebar/MobileHeader';
import MobileSidebar from '@/components/Sidebar/MobileSidebar';

import dynamic from 'next/dynamic';
const Editor = dynamic(import('@/components/Editor'), { ssr: false });

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
                        <div className="h-full">
                            <Editor />
                        </div>
                        <div className="fixed bottom-0 w-full h-10 bg-blue-600"></div>
                        {/* End main area */}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Home;
