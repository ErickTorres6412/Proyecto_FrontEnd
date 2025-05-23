import { useState, useCallback } from 'react';
import { obtenerPropiedades, obtenerPropiedad } from '../../../services/api';
import { handleApiError } from '../../../utils/handleApiError';

export const usePropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [selectedPropiedad, setSelectedPropiedad] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const getAllPropiedades = useCallback(async () => {
    setLoading(true);
    try {
      const response = await obtenerPropiedades();
      setPropiedades(response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Error buscando las propiedades');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPropiedadDetails = useCallback(async (id) => {
    setModalLoading(true);
    try {
      const response = await obtenerPropiedad(id);
      setSelectedPropiedad(response.data);
      console.log('Propiedad details:', response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Error obteniendo los detalles de la propiedad');
    } finally {
      setModalLoading(false);
    }
  }, []);

  const handlePropiedadUpdate = useCallback((updatedPropiedad) => {
    setSelectedPropiedad(updatedPropiedad);
    setPropiedades(prev =>
      prev.map(p => (p.propiedadID === updatedPropiedad.propiedadID ? updatedPropiedad : p))
    );
  }, []);

  return {
    propiedades,
    selectedPropiedad,
    loading,
    modalLoading,
    getAllPropiedades,
    fetchPropiedadDetails,
    handlePropiedadUpdate,
    setSelectedPropiedad
  };
};
