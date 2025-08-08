import React, { useState } from 'react';
import { Copy, ExternalLink, Code } from 'lucide-react';
import Card from '../../components/UI/Card';
import { useApp } from '../../contexts/AppContext';

const ApiDocs: React.FC = () => {
  const { addNotification } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addNotification({
      type: 'success',
      title: 'Copied',
      message: 'Code copied to clipboard',
    });
  };

  const codeExamples = {
    balance: `// Get account balance
const response = await fetch('https://api.dhrufusion.com/v2', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    key: 'YOUR_API_KEY',
    action: 'balance'
  })
});

const data = await response.json();
console.log('Balance:', data.balance);`,
    
    services: `// Get all services
const response = await fetch('https://api.dhrufusion.com/v2', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    key: 'YOUR_API_KEY',
    action: 'services'
  })
});

const data = await response.json();
console.log('Services:', data);`,
    
    order: `// Place new order
const response = await fetch('https://api.dhrufusion.com/v2', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    key: 'YOUR_API_KEY',
    action: 'add',
    service: 1,
    link: 'https://instagram.com/username',
    quantity: 1000
  })
});

const data = await response.json();
console.log('Order ID:', data.order);`,
    
    status: `// Check order status
const response = await fetch('https://api.dhrufusion.com/v2', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    key: 'YOUR_API_KEY',
    action: 'status',
    order: 12345
  })
});

const data = await response.json();
console.log('Order Status:', data);`
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">API Documentation</h1>
        <p className="text-gray-400 mt-1">Complete guide to integrate with DHRU FUSION API</p>
      </div>

      {/* API Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'authentication', label: 'Authentication' },
            { id: 'endpoints', label: 'Endpoints' },
            { id: 'examples', label: 'Examples' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <Card title="API Overview" subtitle="Getting started with DHRU FUSION API">
            <div className="space-y-4">
              <p className="text-gray-300">
                The DHRU FUSION API allows you to integrate social media marketing services into your applications. 
                Our RESTful API provides endpoints for managing orders, checking balances, and retrieving service information.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Base URL</h4>
                  <code className="text-sm text-blue-400 bg-gray-800 px-2 py-1 rounded">
                    https://api.dhrufusion.com/v2
                  </code>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Format</h4>
                  <code className="text-sm text-blue-400 bg-gray-800 px-2 py-1 rounded">
                    JSON
                  </code>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Rate Limits" subtitle="API usage limitations">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-400">1000</p>
                  <p className="text-sm text-gray-400">Requests per hour</p>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-green-400">50</p>
                  <p className="text-sm text-gray-400">Orders per minute</p>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-400">5</p>
                  <p className="text-sm text-gray-400">Concurrent requests</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'authentication' && (
        <Card title="Authentication" subtitle="Secure your API requests">
          <div className="space-y-4">
            <p className="text-gray-300">
              All API requests require authentication using your unique API key. Include your API key in the request body.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-300">Example Request</h4>
                <button
                  onClick={() => copyToClipboard('{\n  "key": "YOUR_API_KEY",\n  "action": "balance"\n}')}
                  className="text-gray-400 hover:text-white"
                >
                  <Copy size={16} />
                </button>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "key": "YOUR_API_KEY",
  "action": "balance"
}`}
              </pre>
            </div>
            <div className="p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
              <p className="text-yellow-300 text-sm">
                <strong>Important:</strong> Never expose your API key in client-side code. Always make API calls from your server.
              </p>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'endpoints' && (
        <div className="space-y-6">
          {[
            {
              action: 'balance',
              description: 'Get account balance',
              parameters: [{ name: 'key', type: 'string', required: true, description: 'Your API key' }],
              response: '{ "balance": "1500.50", "currency": "USD" }'
            },
            {
              action: 'services',
              description: 'Get all available services',
              parameters: [{ name: 'key', type: 'string', required: true, description: 'Your API key' }],
              response: '[{ "service": 1, "name": "Instagram Followers", "rate": "0.025", "min": "100", "max": "10000" }]'
            },
            {
              action: 'add',
              description: 'Place new order',
              parameters: [
                { name: 'key', type: 'string', required: true, description: 'Your API key' },
                { name: 'service', type: 'integer', required: true, description: 'Service ID' },
                { name: 'link', type: 'string', required: true, description: 'Target URL' },
                { name: 'quantity', type: 'integer', required: true, description: 'Order quantity' },
              ],
              response: '{ "order": 12345 }'
            },
            {
              action: 'status',
              description: 'Check order status',
              parameters: [
                { name: 'key', type: 'string', required: true, description: 'Your API key' },
                { name: 'order', type: 'integer', required: true, description: 'Order ID' },
              ],
              response: '{ "charge": "25.50", "start_count": "1250", "status": "Completed", "remains": "0" }'
            },
          ].map((endpoint) => (
            <Card key={endpoint.action} title={`Action: ${endpoint.action}`} subtitle={endpoint.description}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left text-xs font-medium text-gray-400 uppercase py-2">Name</th>
                          <th className="text-left text-xs font-medium text-gray-400 uppercase py-2">Type</th>
                          <th className="text-left text-xs font-medium text-gray-400 uppercase py-2">Required</th>
                          <th className="text-left text-xs font-medium text-gray-400 uppercase py-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.parameters.map((param) => (
                          <tr key={param.name} className="border-b border-gray-700/50">
                            <td className="py-2 text-sm text-gray-300">{param.name}</td>
                            <td className="py-2 text-sm text-blue-400">{param.type}</td>
                            <td className="py-2 text-sm">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                param.required ? 'bg-red-900/50 text-red-400' : 'bg-gray-700/50 text-gray-300'
                              }`}>
                                {param.required ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="py-2 text-sm text-gray-300">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Example Response</h4>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <pre className="text-sm text-gray-300 overflow-x-auto">{endpoint.response}</pre>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'examples' && (
        <div className="space-y-6">
          {Object.entries(codeExamples).map(([key, code]) => (
            <Card key={key} title={`${key.charAt(0).toUpperCase() + key.slice(1)} Example`}>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Code size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-400">JavaScript</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(code)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{code}</code>
                </pre>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Links */}
      <Card title="Quick Links" subtitle="Helpful resources">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#"
            className="flex items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ExternalLink size={20} className="text-blue-400 mr-3" />
            <div>
              <h4 className="font-medium text-white">DHRU FUSION Dashboard</h4>
              <p className="text-sm text-gray-400">Manage your API keys and settings</p>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ExternalLink size={20} className="text-green-400 mr-3" />
            <div>
              <h4 className="font-medium text-white">Support</h4>
              <p className="text-sm text-gray-400">Get help with API integration</p>
            </div>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default ApiDocs;