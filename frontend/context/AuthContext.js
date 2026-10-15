import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.142.254:5000/api/v1'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [isActionLoading, setIsActionLoading] = useState(false); 

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userInfo');
        const userToken = await AsyncStorage.getItem('userToken');

        if (storedUser && userToken) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } catch (parseError) {
            console.error('Bozuk JSON tespit edildi, hafıza temizleniyor...', parseError);
            await AsyncStorage.removeItem('userInfo');
            await AsyncStorage.removeItem('userToken');
            setUser(null);
          }
        }
      } catch (e) {
        console.error('Lokal veri okuma hatası:', e);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapAsync();
  }, []);

  const login = async (email, password) => {
    try {
      setIsActionLoading(true);
      const response = await axios.post(`${API_URL}/login`, { email, password });
      
      const { token, user } = response.data;
      
      const loggedInUser = { ...user, type: 'donor' };

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(loggedInUser));
      
      setUser(loggedInUser);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Giriş başarısız');
    } finally {
      setIsActionLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsActionLoading(true);
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Kayıt başarısız');
    } finally {
      setIsActionLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = { user, isLoading, isActionLoading, login, register, logout, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};