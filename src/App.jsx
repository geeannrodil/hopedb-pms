import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { UserRightsProvider } from './context/UserRightsContext';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthCallbackPage from './pages/AuthCallbackPage';

// Protected Pages
import ProductListPage from './pages/ProductListPage';
import ReportsPage from './pages/ReportsPage';
import DeletedItemsPage from './pages/DeletedItemsPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Routes — wrapped in ProtectedRoute + UserRightsProvider */}
        <Route
          element={
            <ProtectedRoute>
              <UserRightsProvider>
                <Layout />
              </UserRightsProvider>
            </ProtectedRoute>
          }
        >
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/deleted-items" element={<DeletedItemsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;