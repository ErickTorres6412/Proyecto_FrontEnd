import { useState, useEffect } from 'react';
import { actualizarCondominio } from '../../../services/api'; // Asume que existe esta función en tu API
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../../utils/alertUtils';

const useCondominioEdit = (condominioInicial, onSuccess) => {
    // Estado para los datos que se están editando
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        fechaRegistro: ''
    });

    // Estado temporal durante la edición
    const [tempData, setTempData] = useState({
        nombre: '',
        direccion: '',
        fechaRegistro: ''
    });

    // Estado para manejar errores de validación
    const [errors, setErrors] = useState({});
    
    // Estado para controlar si estamos en modo edición
    const [isEditing, setIsEditing] = useState(false);
    
    // Estado para controlar si estamos enviando la solicitud
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Actualizar los datos cuando cambia el condominio inicial
    useEffect(() => {
        if (condominioInicial) {
            const initialData = {
                id: condominioInicial.condominioId || null,
                nombre: condominioInicial.nombre || '',
                direccion: condominioInicial.direccion || '',
                fechaRegistro: condominioInicial.fechaRegistro || ''
            };
            setFormData(initialData);
            setTempData(initialData);
        }
    }, [condominioInicial]);

    // Validar un campo específico
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'nombre':
                if (!value.trim()) {
                    error = 'El nombre del condominio es requerido.';
                } else if (value.length < 3) {
                    error = 'El nombre debe tener al menos 3 caracteres.';
                }
                break;
            case 'direccion':
                if (!value.trim()) {
                    error = 'La dirección es requerida.';
                } else if (value.length < 5) {
                    error = 'La dirección debe tener al menos 5 caracteres.';
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
        ['nombre', 'direccion'].forEach(field => {
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

    // Actualizar el condominio en la API
    const updateCondominio = async () => {
        if (!validateAllFields()) {
            showErrorAlert('Por favor corrija los errores antes de continuar.');
            return;
        }

        showConfirmationAlert(
            'Confirmación de actualización',
            '¿Está seguro de que desea actualizar este condominio?'
        ).then(async (result) => {
            if (result.isConfirmed) {
                setIsSubmitting(true);
                try {
                    // Enviamos solo los campos que necesitamos actualizar
                    const datosActualizados = {
                        condominioId: condominioInicial.condominioID, // Asegúrate de incluir el ID
                        nombre: tempData.nombre,
                        direccion: tempData.direccion,
                        fechaRegistro: condominioInicial.fechaRegistro
                    };

                    console.log('Datos a actualizar:', datosActualizados);
                    await actualizarCondominio(datosActualizados);
                    
                    // Actualizamos el estado local con los datos actualizados
                    saveChanges();
                    
                    showSuccessAlert('Condominio actualizado correctamente');
                    
                    // Si se proporciona un callback de éxito, lo llamamos con los datos actualizados
                    if (onSuccess) {
                        onSuccess({
                            ...condominioInicial,
                            ...datosActualizados
                        });
                    }
                } catch (error) {
                    console.error('Error al actualizar condominio:', error);
                    showErrorAlert(error.response?.data?.message || 'Error al actualizar el condominio');
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
        updateCondominio
    };
};

export default useCondominioEdit;