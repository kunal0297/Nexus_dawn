import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store';
import Header from './Header';
import Sidebar from './Sidebar';
import NotificationList from '../common/NotificationList';

const Layout = () => {
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <main
          className={`flex-1 p-4 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <NotificationList />
    </div>
  );
};

export default Layout; 