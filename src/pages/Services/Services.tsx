import React, { useState } from 'react';
import { Plus, Edit, Eye, EyeOff } from 'lucide-react';
import Card from '../../components/UI/Card';
import DataTable from '../../components/UI/DataTable';

const Services: React.FC = () => {
  const [services] = useState([
    {
      id: 1,
      name: 'Instagram Followers',
      category: 'Instagram',
      price: 0.025,
      minOrder: 100,
      maxOrder: 10000,
      status: 'active',
      provider: 'Provider 1',
      description: 'High quality Instagram followers',
    },
    {
      id: 2,
      name: 'YouTube Views',
      category: 'YouTube',
      price: 0.015,
      minOrder: 1000,
      maxOrder: 1000000,
      status: 'active',
      provider: 'Provider 2',
      description: 'Real YouTube views from targeted audience',
    },
    {
      id: 3,
      name: 'Twitter Followers',
      category: 'Twitter',
      price: 0.030,
      minOrder: 50,
      maxOrder: 5000,
      status: 'inactive',
      provider: 'Provider 1',
      description: 'Quality Twitter followers',
    },
  ]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Service Name' },
    { key: 'category', label: 'Category' },
    {
      key: 'price',
      label: 'Price',
      render: (value: number) => `$${value.toFixed(3)}`,
    },
    {
      key: 'minOrder',
      label: 'Min/Max',
      render: (value: number, row: any) => `${value} - ${row.maxOrder}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'active' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
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
          <button className="p-1 text-blue-400 hover:text-blue-300">
            <Edit size={16} />
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-300">
            {row.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-gray-400 mt-1">Manage your service offerings</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={16} className="mr-2" />
          Add Service
        </button>
      </div>

      {/* Service Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { name: 'Instagram', count: 25, color: 'from-pink-500 to-purple-600' },
          { name: 'YouTube', count: 18, color: 'from-red-500 to-red-600' },
          { name: 'Twitter', count: 12, color: 'from-blue-400 to-blue-600' },
          { name: 'TikTok', count: 8, color: 'from-gray-700 to-gray-900' },
        ].map((category) => (
          <Card key={category.name}>
            <div className="text-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg`}>
                {category.name[0]}
              </div>
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              <p className="text-sm text-gray-400">{category.count} services</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Services Table */}
      <Card title="All Services" subtitle="Complete list of your services">
        <DataTable columns={columns} data={services} />
      </Card>
    </div>
  );
};

export default Services;