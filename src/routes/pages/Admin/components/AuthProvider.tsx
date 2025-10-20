import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/routes/pages/Admin/adminApi';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  login: (userId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  // 从 localStorage 恢复登录状态
  useEffect(() => {
    const savedUserId = localStorage.getItem('adminUserId');
    const isLoggedIn = authApi.isLoggedIn();
    
    if (savedUserId && isLoggedIn) {
      setUserId(parseInt(savedUserId));
      setIsAuthenticated(true);
    } else if (!isLoggedIn) {
      // 如果 token 不存在，清除本地状态
      setUserId(null);
      setIsAuthenticated(false);
      localStorage.removeItem('adminUserId');
    }
  }, []);

  const login = (newUserId: number) => {
    setUserId(newUserId);
    setIsAuthenticated(true);
    localStorage.setItem('adminUserId', newUserId.toString());
  };

  const logout = () => {
    setUserId(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminUserId');
    authApi.logout(); // 清除 token
  };

  const value = {
    isAuthenticated,
    userId,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
