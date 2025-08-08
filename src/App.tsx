import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Services from './pages/Services/Services';
import Orders from './pages/Orders/Orders';
import Users from './pages/Users/Users';
import Tickets from './pages/Tickets/Tickets';
import Payments from './pages/Payments/Payments';
import Settings from './pages/Settings/Settings';
import ApiDocs from './pages/ApiDocs/ApiDocs';
import ApiConnection from './pages/Settings/ApiConnection';
import UserDashboard from './pages/User/UserDashboard';
import UserServices from './pages/User/UserServices';
import UserOrders from './pages/User/UserOrders';
import UserTickets from './pages/User/UserTickets';
import UserProfile from './pages/User/UserProfile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen bg-gray-900">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<UserDashboard />} />
                {/* Admin/Reseller Routes */}
                <Route path="admin/dashboard" element={<Dashboard />} />
                <Route path="admin/services" element={<Services />} />
                <Route path="admin/orders" element={<Orders />} />
                <Route path="admin/users" element={<Users />} />
                <Route path="admin/tickets" element={<Tickets />} />
                <Route path="admin/payments" element={<Payments />} />
                <Route path="admin/settings" element={<Settings />} />
                <Route path="admin/api-connection" element={<ApiConnection />} />
                <Route path="admin/api-docs" element={<ApiDocs />} />
                
                {/* User Routes */}
                <Route path="services" element={<UserServices />} />
                <Route path="orders" element={<UserOrders />} />
                <Route path="tickets" element={<UserTickets />} />
                <Route path="profile" element={<UserProfile />} />
              </Route>
            </Routes>
          </div>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;