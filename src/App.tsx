import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { UserCircle, Users, Layout, LogIn } from 'lucide-react';
import { useUserStore } from './store/userStore';
import RegistrationForm from './components/RegistrationForm';
import UserDashboard from './components/UserDashboard';
import AdminPanel from './components/AdminPanel';
import LoginForm from './components/LoginForm';

function App() {
  const currentUser = useUserStore((state) => state.currentUser);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    src="https://i.ibb.co/S6KJZ4z/LOGO.png"
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                  <span className="ml-2 text-xl font-bold text-gray-900">Employee Portal</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    <UserCircle className="h-5 w-5 mr-1" />
                    Registration
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    <Layout className="h-5 w-5 mr-1" />
                    Dashboard
                  </Link>
                  <Link
                    to="/admin"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    <Users className="h-5 w-5 mr-1" />
                    Admin
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                {!currentUser && (
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Log In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;