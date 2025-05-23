import { useState, useCallback } from 'react';
import { obtenerSectores, obtenerSector } from '../../../services/api';
import { handleApiError } from '../../../utils/handleApiError';

export const useSectores = () => {
    const [sectores, setSectores] = useState([]);
    const [selectedSector, setSelectedSector] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    const getAllSectores = useCallback(async () => {
        setLoading(true);
        try {
            const response = await obtenerSectores();
            setSectores(response.data);
            return response.data;
        } catch (error) {
            handleApiError(error, 'Error buscando los sectores');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSectorDetails = useCallback(async (id) => {
        setModalLoading(true);
        try {
            const response = await obtenerSector(id);
            setSelectedSector(response.data);
            console.log('Sector details:', response.data);
            return response.data;
        } catch (error) {
            handleApiError(error, 'Error obteniendo los detalles del sector');
        } finally {
            setModalLoading(false);
        }
    }, []);

    const handleSectorUpdate = useCallback((updatedSector) => {
        setSelectedSector(updatedSector);
        setSectores(prevSectores => 
            prevSectores.map(sector => 
                sector.sectorID === updatedSector.sectorID ? updatedSector : sector
            )
        );
    }, []);

    return {
        sectores,
        selectedSector,
        loading,
        modalLoading,
        getAllSectores,
        fetchSectorDetails,
        handleSectorUpdate,
        setSelectedSector
    };
};
