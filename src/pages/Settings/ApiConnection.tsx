import React, { useState } from 'react';
import { Zap, CheckCircle, AlertCircle, RefreshCw, Download } from 'lucide-react';
import Card from '../../components/UI/Card';
import { useApp } from '../../contexts/AppContext';

interface ApiService {
  id: number;
  name: string;
  category: string;
  rate: number;
  min: number;
  max: number;
  status: 'active' | 'inactive';
}

const ApiConnection: React.FC = () => {
  const { addNotification } = useApp();
  const [apiConfig, setApiConfig] = useState({
    url: 'https://api.dhrufusion.com/v2',
    key: '',
    connected: false,
    lastSync: null as string | null,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [availableServices, setAvailableServices] = useState<ApiService[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const testConnection = async () => {
    if (!apiConfig.key) {
      addNotification({
        type: 'error',
        title: 'API Key Required',
        message: 'Please enter your DHRU FUSION API key',
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate API connection test
    setTimeout(() => {
      setApiConfig(prev => ({ 
        ...prev, 
        connected: true,
        lastSync: new Date().toISOString(),
      }));
      setIsConnecting(false);
      addNotification({
        type: 'success',
        title: 'Connection Successful',
        message: 'Successfully connected to DHRU FUSION API',
      });
    }, 2000);
  };

  const syncServices = async () => {
    if (!apiConfig.connected) {
      addNotification({
        type: 'error',
        title: 'Not Connected',
        message: 'Please connect to the API first',
      });
      return;
    }

    setIsSyncing(true);

    // Simulate fetching services from DHRU FUSION API
    setTimeout(() => {
      const mockServices: ApiService[] = [
        { id: 1, name: 'Instagram Followers', category: 'Instagram', rate: 0.025, min: 100, max: 10000, status: 'active' },
        { id: 2, name: 'Instagram Likes', category: 'Instagram', rate: 0.015, min: 50, max: 5000, status: 'active' },
        { id: 3, name: 'YouTube Views', category: 'YouTube', rate: 0.012, min: 1000, max: 1000000, status: 'active' },
        { id: 4, name: 'YouTube Subscribers', category: 'YouTube', rate: 0.45, min: 50, max: 2000, status: 'active' },
        { id: 5, name: 'Twitter Followers', category: 'Twitter', rate: 0.030, min: 50, max: 5000, status: 'active' },
        { id: 6, name: 'TikTok Views', category: 'TikTok', rate: 0.008, min: 1000, max: 100000, status: 'active' },
        { id: 7, name: 'TikTok Followers', category: 'TikTok', rate: 0.035, min: 100, max: 5000, status: 'active' },
        { id: 8, name: 'Facebook Page Likes', category: 'Facebook', rate: 0.040, min: 100, max: 10000, status: 'active' },
      ];

      setAvailableServices(mockServices);
      setSelectedServices(mockServices.map(s => s.id));
      setApiConfig(prev => ({ ...prev, lastSync: new Date().toISOString() }));
      setIsSyncing(false);
      
      addNotification({
        type: 'success',
        title: 'Services Synced',
        message: `Successfully synced ${mockServices.length} services from DHRU FUSION`,
      });
    }, 3000);
  };

  const importServices = () => {
    const selectedCount = selectedServices.length;
    if (selectedCount === 0) {
      addNotification({
        type: 'error',
        title: 'No Services Selected',
        message: 'Please select at least one service to import',
      });
      return;
    }

    // Here you would save the selected services to your database
    addNotification({
      type: 'success',
      title: 'Services Imported',
      message: `Successfully imported ${selectedCount} services to your panel`,
    });
  };

  const toggleServiceSelection = (serviceId: number) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const selectAllServices = () => {
    setSelectedServices(availableServices.map(s => s.id));
  };

  const deselectAllServices = () => {
    setSelectedServices([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">API Connection</h1>
        <p className="text-gray-400 mt-1">Connect and sync services from DHRU FUSION</p>
      </div>

      {/* Connection Status */}
      <Card title="Connection Status" subtitle="DHRU FUSION API connection">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-3 ${
                apiConfig.connected ? 'bg-green-500/20' : 'bg-gray-500/20'
              }`}>
                {apiConfig.connected ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-white">
                  {apiConfig.connected ? 'Connected' : 'Not Connected'}
                </p>
                <p className="text-sm text-gray-400">
                  {apiConfig.connected && apiConfig.lastSync 
                    ? `Last synced: ${new Date(apiConfig.lastSync).toLocaleString()}`
                    : 'No connection established'
                  }
                </p>
              </div>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              apiConfig.connected 
                ? 'bg-green-900/50 text-green-400' 
                : 'bg-gray-700/50 text-gray-300'
            }`}>
              {apiConfig.connected ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API URL
              </label>
              <input
                type="url"
                value={apiConfig.url}
                onChange={(e) => setApiConfig({ ...apiConfig, url: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiConfig.key}
                onChange={(e) => setApiConfig({ ...apiConfig, key: e.target.value })}
                placeholder="Enter your DHRU FUSION API key"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={testConnection}
              disabled={isConnecting}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isConnecting ? (
                <RefreshCw className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <Zap className="h-4 w-4 mr-2" />
              )}
              {isConnecting ? 'Testing...' : 'Test Connection'}
            </button>
            
            {apiConfig.connected && (
              <button
                onClick={syncServices}
                disabled={isSyncing}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSyncing ? (
                  <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                {isSyncing ? 'Syncing...' : 'Sync Services'}
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Available Services */}
      {availableServices.length > 0 && (
        <Card title="Available Services" subtitle="Select services to import from DHRU FUSION">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={selectAllServices}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAllServices}
                  className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Deselect All
                </button>
              </div>
              <span className="text-sm text-gray-400">
                {selectedServices.length} of {availableServices.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {availableServices.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedServices.includes(service.id)
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                  }`}
                  onClick={() => toggleServiceSelection(service.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{service.name}</h4>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => toggleServiceSelection(service.id)}
                      className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{service.category}</p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span>${service.rate.toFixed(3)}/1k</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Min/Max:</span>
                      <span>{service.min.toLocaleString()}-{service.max.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={importServices}
                disabled={selectedServices.length === 0}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Import Selected Services
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Integration Guide */}
      <Card title="Integration Guide" subtitle="How to connect your DHRU FUSION account">
        <div className="space-y-4">
          <div className="prose prose-invert max-w-none">
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              <li>
                <strong className="text-white">Get your API key:</strong> Log in to your DHRU FUSION account and navigate to the API section to generate your API key.
              </li>
              <li>
                <strong className="text-white">Enter API details:</strong> Copy your API key and paste it in the API Key field above.
              </li>
              <li>
                <strong className="text-white">Test connection:</strong> Click "Test Connection" to verify your API credentials are working.
              </li>
              <li>
                <strong className="text-white">Sync services:</strong> Once connected, click "Sync Services" to fetch all available services from DHRU FUSION.
              </li>
              <li>
                <strong className="text-white">Import services:</strong> Select the services you want to offer on your panel and click "Import Selected Services".
              </li>
              <li>
                <strong className="text-white">Configure pricing:</strong> After importing, you can adjust pricing and settings for each service in the Services section.
              </li>
            </ol>
          </div>
          
          <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
            <p className="text-blue-300 text-sm">
              <strong>Note:</strong> Your API key is stored securely and encrypted. Make sure to keep your DHRU FUSION account secure and never share your API key with unauthorized users.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ApiConnection;