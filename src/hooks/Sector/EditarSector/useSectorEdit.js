import { useState, useEffect } from 'react';
import { actualizarSector } from '../../../services/api';
import {
    showSuccessAlert,
    showErrorAlert,
    showConfirmationAlert
} from '../../../utils/alertUtils';

const useSectorEdit = (sectorInicial, onSuccess) => {
    const [formData, setFormData] = useState({
        nombre: '',
        condominioID: '',
        fechaRegistro: ''
    });

    const [tempData, setTempData] = useState({
        nombre: '',
        condominioID: '',
        fechaRegistro: ''
    });

    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (sectorInicial) {
            const initialData = {
                id: sectorInicial.sectorID || null,
                nombre: sectorInicial.nombre || '',
                condominioID: sectorInicial.condominioID || '',
                fechaRegistro: sectorInicial.fechaRegistro || ''
            };
            setFormData(initialData);
            setTempData(initialData);
        }
    }, [sectorInicial]);

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'nombre':
                if (!value.trim()) {
                    error = 'El nombre es requerido.';
                } else if (value.length < 3) {
                    error = 'El nombre debe tener al menos 3 caracteres.';
                }
                break;
            case 'condominioID':
                if (!value) {
                    error = 'Debe seleccionar un condominio.';
                }
                break;
            case 'fechaRegistro':
                if (!value) {
                    error = 'La fecha de registro es requerida.';
                }
                break;
            default:
                break;
        }

        return error;
    };

    const validateAllFields = () => {
        const newErrors = {};
        ['nombre', 'condominioID', 'fechaRegistro'].forEach(field => {
            const error = validateField(field, tempData[field]);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTempData(prev => ({
            ...prev,
            [name]: value
        }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const startEditing = () => {
        setIsEditing(true);
        setTempData({ ...formData });
        setErrors({});
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setTempData({ ...formData });
        setErrors({});
    };

    const saveChanges = () => {
        setFormData({ ...tempData });
        setIsEditing(false);
        return { ...tempData };
    };

    const updateSector = async () => {
        if (!validateAllFields()) {
            showErrorAlert('Por favor corrija los errores antes de continuar.');
            return;
        }

        showConfirmationAlert(
            'Confirmación de actualización',
            '¿Está seguro de que desea actualizar este sector?'
        ).then(async (result) => {
            if (result.isConfirmed) {
                setIsSubmitting(true);
                try {
                    const datosActualizados = {
                        sectorID: sectorInicial.sectorID,
                        condominioID: tempData.condominioID,
                        nombre: tempData.nombre,
                        fechaRegistro: tempData.fechaRegistro
                    };

                    await actualizarSector(datosActualizados);

                    saveChanges();
                    showSuccessAlert('Sector actualizado correctamente');

                    if (onSuccess) {
                        onSuccess({
                            ...sectorInicial,
                            ...datosActualizados
                        });
                    }
                } catch (error) {
                    console.error('Error al actualizar sector:', error);
                    showErrorAlert(error.response?.data?.message || 'Error al actualizar el sector');
                } finally {
                    setIsSubmitting(false);
                }
            }
        });
    };

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
        updateSector
    };
};

export default useSectorEdit;
