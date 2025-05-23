// src/services/authService.js
import api from './api';

export const authService = {
  // Función para hacer login
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error de conexión'
      };
    }
  },

  // Función para logout (si tienes endpoint)
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  },

  // Función para verificar si el token es válido
  async verifyToken() {
    try {
      const response = await api.get('/auth/verify');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Token inválido'
      };
    }
  },

  // Función para refrescar token (si implementas refresh tokens)
  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al refrescar token'
      };
    }
  }
};