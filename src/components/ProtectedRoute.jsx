import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Dummy logic, palitan mo nalang to M4 okay?
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}