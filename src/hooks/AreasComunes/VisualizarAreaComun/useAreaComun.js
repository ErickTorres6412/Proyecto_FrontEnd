import { useState, useCallback } from 'react';
import { obtenerAreasComunes, obtenerAreaComun } from '../../../services/api';
import { handleApiError } from '../../../utils/handleApiError';

export const useAreaComun = () => {
    const [areasComunes, setAreasComunes] = useState([]);
    const [selectedAreaComun, setSelectedAreaComun] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    const getAllAreasComunes = useCallback(async () => {
        setLoading(true);
        try {
            const response = await obtenerAreasComunes();
            setAreasComunes(response.data);
           
            return response.data;
        } catch (error) {
            handleApiError(error, 'Error buscando las áreas comunes');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAreaComunDetails = useCallback(async (id) => {
        setModalLoading(true);
        try {
            const response = await obtenerAreaComun(id);
            setSelectedAreaComun(response.data);
            console.log('Obtener Areas Comunes:', response.data)
            return response.data;
        } catch (error) {
            handleApiError(error, 'Error obteniendo los detalles del área común');
        } finally {
            setModalLoading(false);
        }
    }, []);

    const handleAreaComunUpdate = useCallback((updatedArea) => {
        setSelectedAreaComun(updatedArea);
        setAreasComunes(prev =>
            prev.map(area =>
                area.areaComunID === updatedArea.areaComunID ? updatedArea : area
            )
        );
    }, []);

    return {
        areasComunes,
        selectedAreaComun,
        loading,
        modalLoading,
        getAllAreasComunes,
        fetchAreaComunDetails,
        handleAreaComunUpdate,
        setSelectedAreaComun
    };
};
