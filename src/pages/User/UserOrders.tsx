import React, { useState } from 'react';
import { Eye, RefreshCw, AlertCircle } from 'lucide-react';
import Card from '../../components/UI/Card';
import DataTable from '../../components/UI/DataTable';

const UserOrders: React.FC = () => {
  const [orders] = useState([
    {
      id: '#12589',
      service: 'Instagram Followers',
      link: 'https://instagram.com/username',
      quantity: 2500,
      charge: 62.50,
      status: 'completed',
      created: '2024-01-15 14:30',
      startCount: 1250,
      remains: 0,
      progress: 100,
    },
    {
      id: '#12588',
      service: 'YouTube Views',
      link: 'https://youtube.com/watch?v=abc123',
      quantity: 10000,
      charge: 120.00,
      status: 'processing',
      created: '2024-01-15 13:45',
      startCount: 5420,
      remains: 4580,
      progress: 46,
    },
    {
      id: '#12587',
      service: 'Twitter Followers',
      link: 'https://twitter.com/username',
      quantity: 1000,
      charge: 30.00,
      status: 'pending',
      created: '2024-01-15 12:20',
      startCount: 0,
      remains: 1000,
      progress: 0,
    },
    {
      id: '#12586',
      service: 'Instagram Likes',
      link: 'https://instagram.com/p/abc123',
      quantity: 500,
      charge: 7.50,
      status: 'partial',
      created: '2024-01-14 16:45',
      startCount: 120,
      remains: 150,
      progress: 70,
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/50 text-green-400';
      case 'processing':
        return 'bg-blue-900/50 text-blue-400';
      case 'pending':
        return 'bg-yellow-900/50 text-yellow-400';
      case 'partial':
        return 'bg-orange-900/50 text-orange-400';
      case 'cancelled':
        return 'bg-red-900/50 text-red-400';
      default:
        return 'bg-gray-700/50 text-gray-300';
    }
  };

  const columns = [
    { key: 'id', label: 'Order ID' },
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
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {value}
        </span>
      ),
    },
    {
      key: 'progress',
      label: 'Progress',
      render: (value: number, row: any) => (
        <div className="w-full">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{value}%</span>
            <span>{row.quantity - row.remains}/{row.quantity}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                value === 100 ? 'bg-green-500' : value > 0 ? 'bg-blue-500' : 'bg-gray-600'
              }`}
              style={{ width: `${value}%` }}
            ></div>
          </div>
        </div>
      ),
    },
    { key: 'created', label: 'Created' },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedOrder(row)}
            className="p-1 text-blue-400 hover:text-blue-300"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          {(row.status === 'processing' || row.status === 'partial') && (
            <button className="p-1 text-yellow-400 hover:text-yellow-300" title="Refresh Status">
              <RefreshCw size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Orders</h1>
        <p className="text-gray-400 mt-1">Track your service orders and their progress</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">124</p>
            <p className="text-sm text-gray-400 mt-1">Completed</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">3</p>
            <p className="text-sm text-gray-400 mt-1">Processing</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">1</p>
            <p className="text-sm text-gray-400 mt-1">Pending</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">$1,247.50</p>
            <p className="text-sm text-gray-400 mt-1">Total Spent</p>
          </div>
        </Card>
      </div>

      {/* Orders Table */}
      <Card title="Order History" subtitle="Complete list of your service orders">
        <DataTable columns={columns} data={orders} />
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Order ID</label>
                    <p className="text-white font-medium">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Service</label>
                    <p className="text-white">{selectedOrder.service}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Target Link</label>
                    <p className="text-blue-400 break-all">{selectedOrder.link}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Created</label>
                    <p className="text-white">{selectedOrder.created}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Charge</label>
                    <p className="text-white font-medium">${selectedOrder.charge.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-white">Progress</h4>
                  <span className="text-sm text-gray-400">{selectedOrder.progress}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3 mb-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      selectedOrder.progress === 100 ? 'bg-green-500' : 
                      selectedOrder.progress > 0 ? 'bg-blue-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${selectedOrder.progress}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Quantity:</span>
                    <p className="text-white font-medium">{selectedOrder.quantity.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Start Count:</span>
                    <p className="text-white font-medium">{selectedOrder.startCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Remains:</span>
                    <p className="text-white font-medium">{selectedOrder.remains.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Status Information */}
              {selectedOrder.status === 'processing' && (
                <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <div className="flex items-center">
                    <RefreshCw className="h-5 w-5 text-blue-400 mr-2" />
                    <div>
                      <p className="text-blue-400 font-medium">Order in Progress</p>
                      <p className="text-sm text-gray-300">Your order is being processed. This may take some time depending on the service.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedOrder.status === 'partial' && (
                <div className="p-4 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-orange-400 mr-2" />
                    <div>
                      <p className="text-orange-400 font-medium">Partial Completion</p>
                      <p className="text-sm text-gray-300">This order was partially completed. The delivered amount has been adjusted accordingly.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;