import React, { useState } from 'react';
import { Plus, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import Card from '../../components/UI/Card';
import DataTable from '../../components/UI/DataTable';
import { useApp } from '../../contexts/AppContext';

const UserTickets: React.FC = () => {
  const { addNotification } = useApp();
  const [tickets] = useState([
    {
      id: '#T-001',
      subject: 'Order not processing',
      priority: 'high',
      status: 'open',
      created: '2024-01-15 10:30',
      lastReply: '2024-01-15 11:45',
      replies: 3,
    },
    {
      id: '#T-002',
      subject: 'Balance not updated after payment',
      priority: 'medium',
      status: 'awaiting_reply',
      created: '2024-01-15 09:15',
      lastReply: '2024-01-15 12:20',
      replies: 2,
    },
    {
      id: '#T-003',
      subject: 'Question about service quality',
      priority: 'low',
      status: 'closed',
      created: '2024-01-14 16:45',
      lastReply: '2024-01-15 08:30',
      replies: 5,
    },
  ]);

  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    priority: 'medium',
    message: '',
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      type: 'success',
      title: 'Ticket Created',
      message: 'Your support ticket has been submitted successfully.',
    });
    setShowNewTicket(false);
    setNewTicket({ subject: '', priority: 'medium', message: '' });
  };

  const columns = [
    { key: 'id', label: 'Ticket ID' },
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
    { key: 'lastReply', label: 'Last Reply' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
          <p className="text-gray-400 mt-1">Get help with your orders and account</p>
        </div>
        <button
          onClick={() => setShowNewTicket(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          New Ticket
        </button>
      </div>

      {/* Ticket Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Open</p>
              <p className="text-2xl font-semibold text-white">1</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Clock className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Awaiting Reply</p>
              <p className="text-2xl font-semibold text-white">1</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-gray-500/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Closed</p>
              <p className="text-2xl font-semibold text-white">1</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <MessageSquare className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total</p>
              <p className="text-2xl font-semibold text-white">3</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card title="My Tickets" subtitle="Your support ticket history">
        <DataTable columns={columns} data={tickets} />
      </Card>

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Create New Ticket</h3>
              <button
                onClick={() => setShowNewTicket(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                  placeholder="Please describe your issue in detail..."
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewTicket(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTickets;