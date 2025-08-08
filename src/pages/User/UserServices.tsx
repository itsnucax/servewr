import React, { useState } from 'react';
import { Search, ShoppingCart, Info, Star } from 'lucide-react';
import Card from '../../components/UI/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  rate: number;
  min: number;
  max: number;
  rating: number;
  orders: number;
}

const UserServices: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [orderForm, setOrderForm] = useState({
    link: '',
    quantity: '',
  });

  const services: Service[] = [
    {
      id: 1,
      name: 'Instagram Followers',
      category: 'Instagram',
      description: 'High quality Instagram followers with profile pictures',
      rate: 0.025,
      min: 100,
      max: 10000,
      rating: 4.8,
      orders: 1250,
    },
    {
      id: 2,
      name: 'Instagram Likes',
      category: 'Instagram',
      description: 'Real Instagram likes from active users',
      rate: 0.015,
      min: 50,
      max: 5000,
      rating: 4.9,
      orders: 2100,
    },
    {
      id: 3,
      name: 'YouTube Views',
      category: 'YouTube',
      description: 'High retention YouTube views from real users',
      rate: 0.012,
      min: 1000,
      max: 1000000,
      rating: 4.7,
      orders: 890,
    },
    {
      id: 4,
      name: 'YouTube Subscribers',
      category: 'YouTube',
      description: 'Real YouTube subscribers with profile pictures',
      rate: 0.45,
      min: 50,
      max: 2000,
      rating: 4.6,
      orders: 650,
    },
    {
      id: 5,
      name: 'Twitter Followers',
      category: 'Twitter',
      description: 'Active Twitter followers with complete profiles',
      rate: 0.030,
      min: 50,
      max: 5000,
      rating: 4.5,
      orders: 420,
    },
    {
      id: 6,
      name: 'TikTok Views',
      category: 'TikTok',
      description: 'High quality TikTok views from real users',
      rate: 0.008,
      min: 1000,
      max: 100000,
      rating: 4.8,
      orders: 1800,
    },
  ];

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const quantity = parseInt(orderForm.quantity);
    const totalCost = quantity * selectedService.rate;

    if (quantity < selectedService.min || quantity > selectedService.max) {
      addNotification({
        type: 'error',
        title: 'Invalid Quantity',
        message: `Quantity must be between ${selectedService.min} and ${selectedService.max}`,
      });
      return;
    }

    if (totalCost > (user?.balance || 0)) {
      addNotification({
        type: 'error',
        title: 'Insufficient Balance',
        message: 'Please add funds to your account to place this order',
      });
      return;
    }

    // Here you would integrate with the DHRU FUSION API
    addNotification({
      type: 'success',
      title: 'Order Placed',
      message: `Your order for ${selectedService.name} has been placed successfully!`,
    });

    setSelectedService(null);
    setOrderForm({ link: '', quantity: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Services</h1>
        <p className="text-gray-400 mt-1">Choose from our premium social media services</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category === 'all' ? 'All Services' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{service.name}</h3>
                  <p className="text-sm text-gray-400">{service.category}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-300">{service.rating}</span>
                </div>
              </div>

              <p className="text-sm text-gray-300">{service.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Rate per 1000:</span>
                  <span className="text-white font-medium">${service.rate.toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Min/Max:</span>
                  <span className="text-white">{service.min.toLocaleString()} - {service.max.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Orders:</span>
                  <span className="text-green-400">{service.orders.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedService(service)}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart size={16} className="mr-2" />
                Order Now
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Order Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Place Order</h3>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mb-4 p-4 bg-gray-700/50 rounded-lg">
              <h4 className="font-medium text-white">{selectedService.name}</h4>
              <p className="text-sm text-gray-400 mt-1">{selectedService.description}</p>
              <div className="mt-2 text-sm">
                <span className="text-gray-400">Rate: </span>
                <span className="text-white">${selectedService.rate.toFixed(3)} per 1000</span>
              </div>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Link/URL
                </label>
                <input
                  type="url"
                  required
                  value={orderForm.link}
                  onChange={(e) => setOrderForm({ ...orderForm, link: e.target.value })}
                  placeholder="https://instagram.com/username"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  required
                  min={selectedService.min}
                  max={selectedService.max}
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                  placeholder={`Min: ${selectedService.min}, Max: ${selectedService.max}`}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {orderForm.quantity && (
                <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Total Cost:</span>
                    <span className="text-white font-medium">
                      ${(parseInt(orderForm.quantity) * selectedService.rate).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-300">Your Balance:</span>
                    <span className="text-green-400">${user?.balance.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserServices;