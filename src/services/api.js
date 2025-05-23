import axios from 'axios';
import { API_ENDPOINTS } from '../config/constant.js';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5180";;

// Instancia para JSON
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Instancia para FormData
const api_form_data = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  }
});

// -------- Condominios --------
export const obtenerCondominios = () => api.get(API_ENDPOINTS.CONDOMINIO);
export const obtenerCondominio = (id) => api.get(`${API_ENDPOINTS.CONDOMINIO}/${id}`);
export const crearCondominio = (data) => api.post(API_ENDPOINTS.CONDOMINIO, data);
export const actualizarCondominio = (data) => api.put(API_ENDPOINTS.CONDOMINIO, data);

// -------- AreaComun --------
export const crearAreaComun = (data) => api.post(API_ENDPOINTS.AREACOMUN, data);
export const obtenerAreasComunes = () => api.get(API_ENDPOINTS.AREACOMUN);
export const obtenerAreaComun = (id) => api.get(`${API_ENDPOINTS.AREACOMUN}/${id}`);
export const actualizarAreaComun = (data) => api.put(API_ENDPOINTS.AREACOMUN, data);

// -------- Vehiculos --------
export const crearVehiculo = (data) => api.post(API_ENDPOINTS.VEHICULO, data);
export const obtenerVehiculos = () => api.get(API_ENDPOINTS.VEHICULO);
export const obtenerVehiculo = (id) => api.get(`${API_ENDPOINTS.VEHICULO}/${id}`);
export const actualizarVehiculo = (data) => api.put(API_ENDPOINTS.VEHICULO, data);


// -------- Foro --------
export const crearTemaForo = (data) => api.post(API_ENDPOINTS.FORO, data);
export const obtenerTemasForo = () => api.get(API_ENDPOINTS.FORO);
export const obtenerDetalleTema = (id) => api.get(`${API_ENDPOINTS.FORO}/${id}`);
export const agregarRespuesta = (data) => api.post(`${API_ENDPOINTS.FORO}/respuesta`, data);



//--------- Sector -------
export const crearSector = (data) => api.post(API_ENDPOINTS.SECTOR, data);
export const obtenerSectores= () => api.get(API_ENDPOINTS.SECTOR);
export const obtenerSector = (id) => api.get(`${API_ENDPOINTS.SECTOR}/${id}`);
export const actualizarSector= (data) => api.put(API_ENDPOINTS.SECTOR, data);



//--------- Propiedad --------
export const crearPropiedad = (data) => api.post(API_ENDPOINTS.PROPIEDAD, data);
export const obtenerPropiedades = () => api.get(API_ENDPOINTS.PROPIEDAD);
export const obtenerPropiedad = (id) => api.get(`${API_ENDPOINTS.PROPIEDAD}/${id}`);
export const actualizarPropiedad= (data) => api.put(API_ENDPOINTS.PROPIEDAD, data);

// Exportar las instancias si las necesitas en otros módulos
export { api, api_form_data };
export default api;
