import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VenuesPage from './pages/VenuesPage';
import ImportVenuesButton from './components/ImportVenuesButton';

function App() {
  return (
    <div className="App">
      <Toaster />
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            {/* Admin tools - remove in production */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="max-w-7xl mx-auto">
                <ImportVenuesButton />
              </div>
            </div>
            
            <Routes>
              <Route path="/" element={<div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-gray-900">Welcome to the App</h1>
              </div>} />
              <Route path="/venues" element={<VenuesPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;