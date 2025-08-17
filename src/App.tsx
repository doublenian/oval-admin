import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/Layout/AdminLayout';
import { Login } from './pages/Login';
import { CourtList } from './pages/Courts/CourtList';
import { CourtImages } from './pages/Courts/CourtImages';
import { BulkUpload } from './pages/Courts/BulkUpload';
import { IndoorCourtList } from './pages/Courts/IndoorCourtList';
import { IndoorCourtImages } from './pages/Courts/IndoorCourtImages';
import { IndoorBulkUpload } from './pages/Courts/IndoorBulkUpload';
import { UserList } from './pages/Users/UserList';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="" element={<Navigate to="/courts" replace />} />
              <Route path="courts" element={<CourtList />} />
              <Route path="courts/create" element={<div>新增球场</div>} />
              <Route path="courts/:courtId" element={<div>球场详情</div>} />
              <Route path="courts/:courtId/edit" element={<div>编辑球场</div>} />
              <Route path="courts/:courtId/images" element={<CourtImages />} />
              <Route path="courts/bulk-upload" element={<BulkUpload />} />
              <Route path="indoor-courts" element={<IndoorCourtList />} />
              <Route path="indoor-courts/create" element={<div>新增室内球场</div>} />
              <Route path="indoor-courts/:courtId" element={<div>室内球场详情</div>} />
              <Route path="indoor-courts/:courtId/edit" element={<div>编辑室内球场</div>} />
              <Route path="indoor-courts/:courtId/images" element={<IndoorCourtImages />} />
              <Route path="indoor-courts/bulk-upload" element={<IndoorBulkUpload />} />
              <Route path="users" element={<UserList />} />
              <Route path="users/create" element={<div>新增用户</div>} />
              <Route path="venues" element={<VenueList />} />
              <Route path="venues/:venueId" element={<VenueDetail />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;