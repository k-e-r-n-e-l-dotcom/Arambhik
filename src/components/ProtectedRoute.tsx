import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: 'admin' | 'teacher' | 'student';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/login?role=teacher" replace />;
  }

  if (requiredRole === 'teacher') {
    if (profile.role !== 'admin' && profile.role !== 'teacher') {
      return <Navigate to="/student-corner" replace />;
    }
  } else if (profile.role !== requiredRole) {
    const redirect = (profile.role === 'admin' || profile.role === 'teacher') ? '/teachers-corner' : '/student-corner';
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
};
