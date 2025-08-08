import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  CreditCard,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

const adminNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Services', href: '/admin/services', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Tickets', href: '/admin/tickets', icon: MessageSquare },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'API Connection', href: '/admin/api-connection', icon: Zap },
  { name: 'API Docs', href: '/admin/api-docs', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const userNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Services', href: '/services', icon: Package },
  { name: 'My Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Support', href: '/tickets', icon: MessageSquare },
  { name: 'Profile', href: '/profile', icon: Users },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { sidebarCollapsed, setSidebarCollapsed } = useApp();
  const { user } = useAuth();

  const navigation = user?.role === 'admin' || user?.role === 'reseller' 
    ? adminNavigation 
    : userNavigation;

  return (
    <div className={`bg-gray-800 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!sidebarCollapsed && (
          <h1 className="text-xl font-bold text-white">DHRU FUSION</h1>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-6">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white border-r-2 border-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <item.icon size={20} className={sidebarCollapsed ? 'mx-auto' : 'mr-3'} />
              {!sidebarCollapsed && item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;