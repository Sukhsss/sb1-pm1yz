import React, { useEffect, useRef } from 'react';
import { useUserStore } from '../store/userStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { LogOut, Download, CheckCircle } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (currentUser && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const img = new Image();
      img.src = 'https://i.ibb.co/3mh6YcJ/1.png';
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx?.drawImage(img, 0, 0);
        
        if (ctx) {
          ctx.font = 'bold 30px Arial';
          ctx.fillStyle = 'black';
          ctx.fillText(currentUser.name, 135, 500);
          ctx.fillText(currentUser.email, 135, 540);
          ctx.fillText(currentUser.dateOfJoining, 1130, 500);
        }
      };
    }
  }, [currentUser]);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const downloadOfferLetters = () => {
    const links = [
      'https://i.ibb.co/3mh6YcJ/1.png',
      'https://i.ibb.co/Y0wbvJT/2.png',
      'https://i.ibb.co/k2qFNCB/3.png'
    ];
    
    links.forEach((url, index) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `offer-letter-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-8">
                <div className="flex-shrink-0">
                  <img
                    className="h-32 w-32 rounded-full object-cover"
                    src={currentUser.profilePicture}
                    alt="Profile"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
                    {currentUser.isVerified && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        KYC VERIFIED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{currentUser.designation}</p>
                  <p className="text-gray-600">{currentUser.email}</p>
                  <p className="text-gray-600">Joined: {currentUser.dateOfJoining}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Log Out
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Aadhar Card</h3>
                <img
                  src={currentUser.aadharCard}
                  alt="Aadhar Card"
                  className="mt-2 max-w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">College ID</h3>
                <img
                  src={currentUser.collegeId}
                  alt="College ID"
                  className="mt-2 max-w-full h-auto"
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">My Offer Letter</h3>
                <button
                  onClick={downloadOfferLetters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <canvas ref={canvasRef} className="w-full h-auto" />
                </div>
                <div>
                  <img src="https://i.ibb.co/Y0wbvJT/2.png" alt="Offer Letter 2" className="w-full h-auto" />
                </div>
                <div>
                  <img src="https://i.ibb.co/k2qFNCB/3.png" alt="Offer Letter 3" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;