import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store';

interface SidebarProps {
  isOpen: boolean;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'HomeIcon' },
  { name: 'Profile', href: '/profile', icon: 'UserIcon' },
  { name: 'Settings', href: '/settings', icon: 'CogIcon' },
];

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                <span className="mr-3 flex-shrink-0 h-6 w-6">
                  {/* Icon component would go here */}
                </span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src={user.avatar || 'https://via.placeholder.com/40'}
                  alt={user.name}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.name}
                </p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  View profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 