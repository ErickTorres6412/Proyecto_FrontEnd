import { useState, useEffect } from 'react';
import { actualizarAreaComun } from '../../../services/api'; // Asegúrate de tener esta función en tu API
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../../utils/alertUtils';

const useAreaComunEdit = (areaComunInicial, onSuccess) => {
    const [formData, setFormData] = useState({
        nombre: '',
        capacidad: '',
        reglas: ''
    });

    const [tempData, setTempData] = useState({
        nombre: '',
        capacidad: '',
        reglas: ''
    });

    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (areaComunInicial) {
            const initialData = {
                id: areaComunInicial.areaComunId || null,
                nombre: areaComunInicial.nombre || '',
                capacidad: areaComunInicial.capacidad || '',
                reglas: areaComunInicial.reglas || ''
            };
            setFormData(initialData);
            setTempData(initialData);
        }
    }, [areaComunInicial]);

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
            case 'capacidad':
                if (!value || isNaN(value)) {
                    error = 'La capacidad debe ser un número válido.';
                } else if (Number(value) <= 0) {
                    error = 'La capacidad debe ser mayor que cero.';
                }
                break;
            case 'reglas':
                if (!value.trim()) {
                    error = 'Las reglas son requeridas.';
                }
                break;
            default:
                break;
        }

        return error;
    };

    const validateAllFields = () => {
        const newErrors = {};
        ['nombre', 'capacidad', 'reglas'].forEach(field => {
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

    const updateAreaComun = async () => {
        if (!validateAllFields()) {
            showErrorAlert('Por favor corrija los errores antes de continuar.');
            return;
        }

        showConfirmationAlert(
            'Confirmación de actualización',
            '¿Está seguro de que desea actualizar esta área común?'
        ).then(async (result) => {
            if (result.isConfirmed) {
                setIsSubmitting(true);
                try {
                    const datosActualizados = {
                        areaComunId: areaComunInicial.areaComunID,
                        condominioID: areaComunInicial.condominioID,
                        nombre: tempData.nombre,
                        capacidad: tempData.capacidad,
                        reglas: tempData.reglas
                    };

                    await actualizarAreaComun(datosActualizados);

                    saveChanges();
                    showSuccessAlert('Área común actualizada correctamente');

                    if (onSuccess) {
                        onSuccess({
                            ...areaComunInicial,
                            ...datosActualizados
                        });
                    }
                } catch (error) {
                    console.error('Error al actualizar área común:', error);
                    showErrorAlert(error.response?.data?.message || 'Error al actualizar el área común');
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
        updateAreaComun
    };
};

export default useAreaComunEdit;
