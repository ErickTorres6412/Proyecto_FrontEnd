import { useState, useCallback } from 'react';
import { obtenerVehiculos, obtenerVehiculo } from '../../../services/api';
import { handleApiError } from '../../../utils/handleApiError';

export const useVehiculos = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [selectedVehiculo, setSelectedVehiculo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    const getAllVehiculos = useCallback(async () => {
        setLoading(true);
        try {
            const response = await obtenerVehiculos();
            setVehiculos(response.data);
            return response.data;
        } catch (error) {
            handleApiError(error, 'Error buscando los vehículos');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchVehiculoDetails = useCallback(async (id) => {
        setModalLoading(true);
        try {
            const response = await obtenerVehiculo(id);
            setSelectedVehiculo(response.data);
            console.log('Vehículo details:', response.data);
            return response.data;
        } catch (error) {
            handleApiError(error, 'Error obteniendo los detalles del vehículo');
        } finally {
            setModalLoading(false);
        }
    }, []);

    const handleVehiculoUpdate = useCallback((updatedVehiculo) => {
        setSelectedVehiculo(updatedVehiculo);
        setVehiculos(prevVehiculos => 
            prevVehiculos.map(vehiculo => 
                vehiculo.vehiculoID === updatedVehiculo.vehiculoID ? updatedVehiculo : vehiculo
            )
        );
    }, []);

    return {
        vehiculos,
        selectedVehiculo,
        loading,
        modalLoading,
        getAllVehiculos,
        fetchVehiculoDetails,
        handleVehiculoUpdate,
        setSelectedVehiculo
    };
};