import { useState, useEffect } from 'react';
import { actualizarVehiculo } from '../../../services/api'; // Asume que existe esta función en tu API
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../../utils/alertUtils';

const useVehiculoEdit = (vehiculoInicial, onSuccess) => {
    // Estado para los datos que se están editando
    const [formData, setFormData] = useState({
        vehiculoID: 0,
        propiedadID: 0,
        placa: '',
        tipo: '',
        codigoAcceso: '',
        fechaRegistro: '',
        fechaExpiracion: '',
        propiedadNumero: ''
    });

    // Estado temporal durante la edición
    const [tempData, setTempData] = useState({
        vehiculoID: 0,
        propiedadID: 0,
        placa: '',
        tipo: '',
        codigoAcceso: '',
        fechaRegistro: '',
        fechaExpiracion: '',
        propiedadNumero: ''
    });

    // Estado para manejar errores de validación
    const [errors, setErrors] = useState({});
    
    // Estado para controlar si estamos en modo edición
    const [isEditing, setIsEditing] = useState(false);
    
    // Estado para controlar si estamos enviando la solicitud
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Actualizar los datos cuando cambia el vehículo inicial
    useEffect(() => {
        if (vehiculoInicial) {
            const initialData = {
                vehiculoID: vehiculoInicial.vehiculoID || 0,
                propiedadID: vehiculoInicial.propiedadID || 0,
                placa: vehiculoInicial.placa || '',
                tipo: vehiculoInicial.tipo || '',
                codigoAcceso: vehiculoInicial.codigoAcceso || '',
                fechaRegistro: vehiculoInicial.fechaRegistro || '',
                fechaExpiracion: vehiculoInicial.fechaExpiracion || '',
                propiedadNumero: vehiculoInicial.propiedadNumero || ''
            };
            setFormData(initialData);
            setTempData(initialData);
        }
    }, [vehiculoInicial]);

    // Validar un campo específico
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'placa':
                if (!value.trim()) {
                    error = 'La placa del vehículo es requerida.';
                } else if (value.length < 3) {
                    error = 'La placa debe tener al menos 3 caracteres.';
                }
                break;
            case 'tipo':
                if (!value.trim()) {
                    error = 'El tipo de vehículo es requerido.';
                }
                break;
            case 'codigoAcceso':
                if (!value.trim()) {
                    error = 'El código de acceso es requerido.';
                }
                break;
            case 'fechaExpiracion':
                if (!value) {
                    error = 'La fecha de expiración es requerida.';
                } else if (new Date(value) <= new Date(tempData.fechaRegistro)) {
                    error = 'La fecha de expiración debe ser posterior a la fecha de registro.';
                }
                break;
            default:
                break;
        }

        return error;
    };

    // Validar todos los campos
    const validateAllFields = () => {
        const newErrors = {};
        
        // Solo validamos los campos que son editables
        ['placa', 'tipo', 'codigoAcceso', 'fechaExpiracion'].forEach(field => {
            const error = validateField(field, tempData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        setTempData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validar el campo actual
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    // Iniciar el modo de edición
    const startEditing = () => {
        setIsEditing(true);
        setTempData({...formData});
        setErrors({});
    };

    // Cancelar la edición
    const cancelEditing = () => {
        setIsEditing(false);
        setTempData({...formData});
        setErrors({});
    };

    // Guardar los cambios localmente
    const saveChanges = () => {
        setFormData({...tempData});
        setIsEditing(false);
        return {...tempData};
    };

    // Actualizar el vehículo en la API
    const updateVehiculo = async () => {
        if (!validateAllFields()) {
            showErrorAlert('Por favor corrija los errores antes de continuar.');
            return;
        }

        showConfirmationAlert(
            'Confirmación de actualización',
            '¿Está seguro de que desea actualizar este vehículo?'
        ).then(async (result) => {
            if (result.isConfirmed) {
                setIsSubmitting(true);
                try {
                    // Enviamos solo los campos que necesitamos actualizar
                    const datosActualizados = {
                        vehiculoID: vehiculoInicial.vehiculoID,
                        propiedadID: vehiculoInicial.propiedadID,
                        placa: tempData.placa,
                        tipo: tempData.tipo,
                        codigoAcceso: tempData.codigoAcceso,
                        fechaRegistro: vehiculoInicial.fechaRegistro,
                        fechaExpiracion: tempData.fechaExpiracion,
                        propiedadNumero: vehiculoInicial.propiedadNumero
                    };

                    console.log('Datos a actualizar:', datosActualizados);
                    await actualizarVehiculo(datosActualizados);
                    
                    // Actualizamos el estado local con los datos actualizados
                    saveChanges();
                    
                    showSuccessAlert('Vehículo actualizado correctamente');
                    
                    // Si se proporciona un callback de éxito, lo llamamos con los datos actualizados
                    if (onSuccess) {
                        onSuccess({
                            ...vehiculoInicial,
                            ...datosActualizados
                        });
                    }
                } catch (error) {
                    console.error('Error al actualizar vehículo:', error);
                    showErrorAlert(error.response?.data?.message || 'Error al actualizar el vehículo');
                } finally {
                    setIsSubmitting(false);
                }
            }
        });
    };

    // Actualizar solo los datos locales (sin enviar a la API)
    const updateData = (newData) => {
        setFormData(newData);
        setTempData(newData);
    };

    return {
        isEditing,
        isSubmitting,
        data: formData,
        tempData,
        errors,
        startEditing,
        cancelEditing,
        saveChanges,
        updateData,
        handleChange,
        updateVehiculo
    };
};

export default useVehiculoEdit;