import { useState, useCallback } from 'react';
import { obtenerCondominios, obtenerCondominio } from '../../../services/api';
import { handleApiError } from '../../../utils/handleApiError';

export const useCondominios = () => {
    const [condominios, setCondominios] = useState([]);
    const [selectedCondominio, setSelectedCondominio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    const getAllCondominios = useCallback(async () => {
        setLoading(true);
        try {
            const response = await obtenerCondominios();
            setCondominios(response.data);
            return response.data;
        } catch (error) {
            handleApiError(error, 'Error buscando los condominios');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCondominioDetails = useCallback(async (id) => {
        setModalLoading(true);
        try {
            const response = await obtenerCondominio(id);
            setSelectedCondominio(response.data);
            console.log('Condominio details:', response.data);
            return response.data;
        } catch (error) {
            handleApiError(error, 'Error obteniendo los detalles del condominio');
        } finally {
            setModalLoading(false);
        }
    }, []);

    const handleCondominioUpdate = useCallback((updatedCondominio) => {
        setSelectedCondominio(updatedCondominio);
        setCondominios(prevCondominios => 
            prevCondominios.map(condominio => 
                condominio.condominioId === updatedCondominio.condominioId ? updatedCondominio : condominio
            )
        );
    }, []);

    return {
        condominios,
        selectedCondominio,
        loading,
        modalLoading,
        getAllCondominios,
        fetchCondominioDetails,
        handleCondominioUpdate,
        setSelectedCondominio
    };
};