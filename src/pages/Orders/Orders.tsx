import React, { useState } from 'react';
import { Eye, RefreshCw, X } from 'lucide-react';
import Card from '../../components/UI/Card';
import DataTable from '../../components/UI/DataTable';

const Orders: React.FC = () => {
  const [orders] = useState([
    {
      id: '#12589',
      user: 'john_doe',
      service: 'Instagram Followers',
      quantity: 2500,
      charge: 62.50,
      status: 'completed',
      created: '2024-01-15 14:30',
      startCount: 1250,
      remains: 0,
    },
    {
      id: '#12588',
      user: 'jane_smith',
      service: 'YouTube Views',
      quantity: 10000,
      charge: 150.00,
      status: 'processing',
      created: '2024-01-15 13:45',
      startCount: 5420,
      remains: 4580,
    },
    {
      id: '#12587',
      user: 'mike_wilson',
      service: 'Twitter Followers',
      quantity: 1000,
      charge: 30.00,
      status: 'pending',
      created: '2024-01-15 12:20',
      startCount: 0,
      remains: 1000,
    },
  ]);

  const columns = [
    { key: 'id', label: 'Order ID' },
    { key: 'user', label: 'User' },
    { key: 'service', label: 'Service' },
    {
      key: 'quantity',
      label: 'Quantity',
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: 'charge',
      label: 'Charge',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'completed' ? 'bg-green-900/50 text-green-400' :
          value === 'processing' ? 'bg-blue-900/50 text-blue-400' :
          value === 'pending' ? 'bg-yellow-900/50 text-yellow-400' :
          'bg-red-900/50 text-red-400'
        }`}>
          {value}
        </span>
      ),
    },
    { key: 'created', label: 'Created' },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: any) => (
        <div className="flex space-x-2">
          <button className="p-1 text-blue-400 hover:text-blue-300" title="View Details">
            <Eye size={16} />
          </button>
          {row.status === 'processing' && (
            <button className="p-1 text-yellow-400 hover:text-yellow-300" title="Refresh Status">
              <RefreshCw size={16} />
            </button>
          )}
          {row.status === 'pending' && (
            <button className="p-1 text-red-400 hover:text-red-300" title="Cancel Order">
              <X size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 mt-1">Track and manage all customer orders</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">1,259</p>
            <p className="text-sm text-gray-400 mt-1">Completed</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">89</p>
            <p className="text-sm text-gray-400 mt-1">Processing</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">34</p>
            <p className="text-sm text-gray-400 mt-1">Pending</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">12</p>
            <p className="text-sm text-gray-400 mt-1">Failed</p>
          </div>
        </Card>
      </div>

      {/* Orders Table */}
      <Card title="All Orders" subtitle="Complete order history and status tracking">
        <DataTable columns={columns} data={orders} />
      </Card>
    </div>
  );
};

export default Orders;