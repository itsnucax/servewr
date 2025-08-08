import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, Clock, CheckCircle } from 'lucide-react';
import Card from '../../components/UI/Card';
import { useAuth } from '../../contexts/AuthContext';

const orderData = [
  { name: 'Jan', orders: 12 },
  { name: 'Feb', orders: 19 },
  { name: 'Mar', orders: 15 },
  { name: 'Apr', orders: 25 },
  { name: 'May', orders: 22 },
  { name: 'Jun', orders: 18 },
];

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back, {user?.username}!</h1>
        <p className="text-gray-400 mt-1">Here's your account overview</p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Balance</p>
              <p className="text-2xl font-semibold text-white">${user?.balance.toFixed(2)}</p>
              <button className="text-xs text-blue-400 hover:text-blue-300 mt-1">
                Add Funds
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Orders</p>
              <p className="text-2xl font-semibold text-white">127</p>
              <p className="text-xs text-green-400 mt-1">+5 this week</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-white">3</p>
              <p className="text-xs text-gray-400 mt-1">In progress</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Completed</p>
              <p className="text-2xl font-semibold text-white">124</p>
              <p className="text-xs text-green-400 mt-1">97.6% success rate</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order History Chart */}
        <Card title="Order History" subtitle="Your orders over the last 6 months">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderData}>
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
              <Bar dataKey="orders" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Orders */}
        <Card title="Recent Orders" subtitle="Your latest service orders">
          <div className="space-y-4">
            {[
              { id: '#12589', service: 'Instagram Followers', quantity: '2,500', status: 'completed', date: '2 hours ago' },
              { id: '#12588', service: 'YouTube Views', quantity: '10,000', status: 'processing', date: '5 hours ago' },
              { id: '#12587', service: 'Twitter Followers', quantity: '1,000', status: 'pending', date: '1 day ago' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">{order.service}</p>
                  <p className="text-sm text-gray-400">{order.id} • {order.quantity}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-900/50 text-green-400' :
                    order.status === 'processing' ? 'bg-blue-900/50 text-blue-400' :
                    'bg-yellow-900/50 text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions" subtitle="Common tasks and shortcuts">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-left">
            <ShoppingCart className="h-8 w-8 text-white mb-2" />
            <h3 className="font-semibold text-white">New Order</h3>
            <p className="text-sm text-blue-100">Place a new service order</p>
          </button>
          <button className="p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-left">
            <DollarSign className="h-8 w-8 text-white mb-2" />
            <h3 className="font-semibold text-white">Add Funds</h3>
            <p className="text-sm text-green-100">Top up your account balance</p>
          </button>
          <button className="p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-left">
            <CheckCircle className="h-8 w-8 text-white mb-2" />
            <h3 className="font-semibold text-white">Order Status</h3>
            <p className="text-sm text-purple-100">Check your order progress</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default UserDashboard;