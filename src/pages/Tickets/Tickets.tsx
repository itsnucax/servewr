import React, { useState } from 'react';
import { MessageSquare, Eye, CheckCircle } from 'lucide-react';
import Card from '../../components/UI/Card';
import DataTable from '../../components/UI/DataTable';

const Tickets: React.FC = () => {
  const [tickets] = useState([
    {
      id: '#T-001',
      user: 'john_doe',
      subject: 'Order not processing',
      priority: 'high',
      status: 'open',
      created: '2024-01-15 10:30',
      lastReply: '2024-01-15 11:45',
      replies: 3,
    },
    {
      id: '#T-002',
      user: 'jane_smith',
      subject: 'Balance not updated after payment',
      priority: 'medium',
      status: 'awaiting_reply',
      created: '2024-01-15 09:15',
      lastReply: '2024-01-15 12:20',
      replies: 2,
    },
    {
      id: '#T-003',
      user: 'mike_wilson',
      subject: 'API integration help',
      priority: 'low',
      status: 'closed',
      created: '2024-01-14 16:45',
      lastReply: '2024-01-15 08:30',
      replies: 5,
    },
  ]);

  const columns = [
    { key: 'id', label: 'Ticket ID' },
    { key: 'user', label: 'User' },
    { key: 'subject', label: 'Subject' },
    {
      key: 'priority',
      label: 'Priority',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'high' ? 'bg-red-900/50 text-red-400' :
          value === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
          'bg-gray-700/50 text-gray-300'
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
          value === 'open' ? 'bg-green-900/50 text-green-400' :
          value === 'awaiting_reply' ? 'bg-blue-900/50 text-blue-400' :
          'bg-gray-700/50 text-gray-300'
        }`}>
          {value.replace('_', ' ')}
        </span>
      ),
    },
    { key: 'replies', label: 'Replies' },
    { key: 'created', label: 'Created' },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: any) => (
        <div className="flex space-x-2">
          <button className="p-1 text-blue-400 hover:text-blue-300" title="View Ticket">
            <Eye size={16} />
          </button>
          {row.status !== 'closed' && (
            <button className="p-1 text-green-400 hover:text-green-300" title="Close Ticket">
              <CheckCircle size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
          <p className="text-gray-400 mt-1">Manage customer support requests</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <MessageSquare size={16} className="mr-2" />
          New Ticket
        </button>
      </div>

      {/* Ticket Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">45</p>
            <p className="text-sm text-gray-400 mt-1">Open</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">23</p>
            <p className="text-sm text-gray-400 mt-1">Awaiting Reply</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-400">187</p>
            <p className="text-sm text-gray-400 mt-1">Closed</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">12</p>
            <p className="text-sm text-gray-400 mt-1">High Priority</p>
          </div>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card title="All Tickets" subtitle="Support tickets and customer communications">
        <DataTable columns={columns} data={tickets} />
      </Card>
    </div>
  );
};

export default Tickets;