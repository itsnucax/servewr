import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, DollarSign, Users, ShoppingCart, Package, AlertTriangle } from 'lucide-react';
import Card from '../../components/UI/Card';

const statsData = [
  { name: 'Jan', orders: 65, revenue: 2400 },
  { name: 'Feb', orders: 78, revenue: 3200 },
  { name: 'Mar', orders: 90, revenue: 2800 },
  { name: 'Apr', orders: 81, revenue: 3800 },
  { name: 'May', orders: 95, revenue: 4200 },
  { name: 'Jun', orders: 88, revenue: 3900 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your panel.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Revenue</p>
              <p className="text-2xl font-semibold text-white">$24,890</p>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +12.5% from last month
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Orders</p>
              <p className="text-2xl font-semibold text-white">1,259</p>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +8.2% from last month
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Active Users</p>
              <p className="text-2xl font-semibold text-white">2,847</p>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +5.7% from last month
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Package className="h-6 w-6 text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Active Services</p>
              <p className="text-2xl font-semibold text-white">47</p>
              <p className="text-xs text-red-400 flex items-center mt-1">
                <AlertTriangle size={12} className="mr-1" />
                3 services offline
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Overview" subtitle="Monthly revenue for the last 6 months">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6',
                }}
              />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Order Trends" subtitle="Order volume over the last 6 months">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6',
                }}
              />
              <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Orders" subtitle="Latest orders from your customers">
          <div className="space-y-4">
            {[
              { id: '#12589', user: 'john_doe', service: 'Instagram Followers', amount: '$25.00', status: 'completed' },
              { id: '#12588', user: 'jane_smith', service: 'YouTube Views', amount: '$15.50', status: 'processing' },
              { id: '#12587', user: 'mike_wilson', service: 'Twitter Followers', amount: '$18.00', status: 'pending' },
              { id: '#12586', user: 'sarah_jones', service: 'TikTok Likes', amount: '$12.75', status: 'completed' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">{order.id}</p>
                  <p className="text-sm text-gray-400">{order.user} - {order.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">{order.amount}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-900/50 text-green-400' :
                    order.status === 'processing' ? 'bg-blue-900/50 text-blue-400' :
                    'bg-yellow-900/50 text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="System Status" subtitle="Current status of your panel services">
          <div className="space-y-4">
            {[
              { service: 'API Connection', status: 'online', uptime: '99.9%' },
              { service: 'Payment Gateway', status: 'online', uptime: '99.5%' },
              { service: 'Order Processing', status: 'online', uptime: '98.7%' },
              { service: 'Email Service', status: 'maintenance', uptime: '95.2%' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    item.status === 'online' ? 'bg-green-400' :
                    item.status === 'maintenance' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`}></div>
                  <div>
                    <p className="font-medium text-white">{item.service}</p>
                    <p className="text-sm text-gray-400 capitalize">{item.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">{item.uptime}</p>
                  <p className="text-sm text-gray-400">Uptime</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;