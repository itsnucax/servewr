import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';
import Card from '../../components/UI/Card';
import DataTable from '../../components/UI/DataTable';

const Payments: React.FC = () => {
  const [transactions] = useState([
    {
      id: '#P-001',
      user: 'john_doe',
      amount: 100.00,
      method: 'PayPal',
      status: 'completed',
      type: 'deposit',
      created: '2024-01-15 14:30',
    },
    {
      id: '#P-002',
      user: 'jane_smith',
      amount: -25.50,
      method: 'Balance',
      status: 'completed',
      type: 'withdrawal',
      created: '2024-01-15 13:45',
    },
    {
      id: '#P-003',
      user: 'mike_wilson',
      amount: 50.00,
      method: 'Stripe',
      status: 'pending',
      type: 'deposit',
      created: '2024-01-15 12:20',
    },
  ]);

  const columns = [
    { key: 'id', label: 'Transaction ID' },
    { key: 'user', label: 'User' },
    {
      key: 'amount',
      label: 'Amount',
      render: (value: number) => (
        <span className={value >= 0 ? 'text-green-400' : 'text-red-400'}>
          {value >= 0 ? '+' : ''}${Math.abs(value).toFixed(2)}
        </span>
      ),
    },
    { key: 'method', label: 'Method' },
    {
      key: 'type',
      label: 'Type',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
          value === 'deposit' ? 'bg-green-900/50 text-green-400' : 'bg-blue-900/50 text-blue-400'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'completed' ? 'bg-green-900/50 text-green-400' :
          value === 'pending' ? 'bg-yellow-900/50 text-yellow-400' :
          'bg-red-900/50 text-red-400'
        }`}>
          {value}
        </span>
      ),
    },
    { key: 'created', label: 'Created' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Payments & Transactions</h1>
        <p className="text-gray-400 mt-1">Monitor all financial activities</p>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Revenue</p>
              <p className="text-2xl font-semibold text-white">$24,890</p>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +12.5%
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-white">$1,250</p>
              <p className="text-xs text-gray-400 mt-1">15 transactions</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Today's Revenue</p>
              <p className="text-2xl font-semibold text-white">$890</p>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +8.2%
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <CreditCard className="h-6 w-6 text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Payment Methods</p>
              <p className="text-2xl font-semibold text-white">5</p>
              <p className="text-xs text-gray-400 mt-1">Active gateways</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card title="Payment Methods" subtitle="Configure available payment options">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'PayPal', status: 'active', fee: '3.5%' },
            { name: 'Stripe', status: 'active', fee: '2.9%' },
            { name: 'Bank Transfer', status: 'inactive', fee: '0%' },
          ].map((method) => (
            <div key={method.name} className="p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{method.name}</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  method.status === 'active' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                }`}>
                  {method.status}
                </span>
              </div>
              <p className="text-sm text-gray-400">Transaction fee: {method.fee}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Transactions Table */}
      <Card title="Recent Transactions" subtitle="Complete transaction history">
        <DataTable columns={columns} data={transactions} />
      </Card>
    </div>
  );
};

export default Payments;