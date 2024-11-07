import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { Lock, CheckCircle } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const users = useUserStore((state) => state.users);
  const verifyUser = useUserStore((state) => state.verifyUser);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === 'Saumya' && credentials.password === 'Admin@12') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleVerify = (email: string) => {
    verifyUser(email);
    alert('User verified successfully!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Lock className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
            <div className="space-y-8">
              {users.map((user, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Name:</span> {user.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Email:</span> {user.email}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Date of Joining:</span> {user.dateOfJoining}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Designation:</span> {user.designation}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Password:</span> {user.password}
                          </p>
                        </div>
                        {!user.isVerified && (
                          <button
                            onClick={() => handleVerify(user.email)}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Verify User
                          </button>
                        )}
                        {user.isVerified && (
                          <span className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>
                        <div className="mt-2">
                          <img
                            src={user.profilePicture}
                            alt="Profile"
                            className="h-32 w-32 rounded-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Documents</h3>
                        <div className="mt-2 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Aadhar Card</h4>
                            <img
                              src={user.aadharCard}
                              alt="Aadhar Card"
                              className="mt-1 max-w-full h-auto rounded border border-gray-200"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">College ID</h4>
                            <img
                              src={user.collegeId}
                              alt="College ID"
                              className="mt-1 max-w-full h-auto rounded border border-gray-200"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;