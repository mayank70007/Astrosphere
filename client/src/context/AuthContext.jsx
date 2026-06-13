import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('gemstone-token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: newToken } = res.data;
    setToken(newToken);
    localStorage.setItem('gemstone-token', newToken);
    // Fetch full user profile with favorites & history populated
    const profile = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${newToken}` },
    });
    setUser(profile.data);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token: newToken } = res.data;
    setToken(newToken);
    localStorage.setItem('gemstone-token', newToken);
    // Fetch full user profile with favorites & history populated
    const profile = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${newToken}` },
    });
    setUser(profile.data);
    return res.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gemstone-token');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, refreshUser: fetchUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
