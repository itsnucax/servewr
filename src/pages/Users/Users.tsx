import React, { useState } from 'react';
import { UserPlus, Edit, Lock, Unlock } from 'lucide-react';
import Card from '../../components/UI/Card';
import DataTable from '../../components/UI/DataTable';

const Users: React.FC = () => {
  const [users] = useState([
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      role: 'user',
      balance: 125.50,
      totalSpent: 850.25,
      status: 'active',
      registered: '2024-01-10',
      lastLogin: '2024-01-15 09:30',
    },
    {
      id: 2,
      username: 'jane_smith',
      email: 'jane@example.com',
      role: 'reseller',
      balance: 320.75,
      totalSpent: 1250.00,
      status: 'active',
      registered: '2024-01-05',
      lastLogin: '2024-01-15 14:22',
    },
    {
      id: 3,
      username: 'mike_wilson',
      email: 'mike@example.com',
      role: 'user',
      balance: 0.00,
      totalSpent: 45.50,
      status: 'suspended',
      registered: '2024-01-12',
      lastLogin: '2024-01-14 11:15',
    },
  ]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Role',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
          value === 'admin' ? 'bg-purple-900/50 text-purple-400' :
          value === 'reseller' ? 'bg-blue-900/50 text-blue-400' :
          'bg-gray-700/50 text-gray-300'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'balance',
      label: 'Balance',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'active' ? 'bg-green-900/50 text-green-400' :
          value === 'suspended' ? 'bg-red-900/50 text-red-400' :
          'bg-yellow-900/50 text-yellow-400'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: any) => (
        <div className="flex space-x-2">
          <button className="p-1 text-blue-400 hover:text-blue-300" title="Edit User">
            <Edit size={16} />
          </button>
          <button 
            className={`p-1 ${row.status === 'active' ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}`}
            title={row.status === 'active' ? 'Suspend User' : 'Activate User'}
          >
            {row.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-gray-400 mt-1">Manage your platform users</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus size={16} className="mr-2" />
          Add User
        </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">2,847</p>
            <p className="text-sm text-gray-400 mt-1">Total Users</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">2,695</p>
            <p className="text-sm text-gray-400 mt-1">Active</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">152</p>
            <p className="text-sm text-gray-400 mt-1">Resellers</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">89</p>
            <p className="text-sm text-gray-400 mt-1">New Today</p>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card title="All Users" subtitle="Manage user accounts, balances, and permissions">
        <DataTable columns={columns} data={users} />
      </Card>
    </div>
  );
};

export default Users;