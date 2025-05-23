import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearCondominio } from '../../../services/api'; // Asume que existe esta función en tu API
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../../utils/alertUtils'; // Asume que tienes funciones para mostrar alertas

const useCondominioForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        fechaRegistro: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Función para validar un campo específico
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

    // Función para validar todos los campos
    const validateAllFields = () => {
        const newErrors = {};
        
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);
        return newErrors;
    };

    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Validar el campo actual
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    // Manejar el envío del formulario con confirmación
    const handleCrearCondominio = () => {
        // Confirmación de creación
        showConfirmationAlert(
            'Confirmación de creación',
            '¿Está seguro de que desea crear este condominio?'
        ).then((result) => {
            if (result.isConfirmed) {
                handleSubmit(); // Llama a la función de submit
            }
        });
    };

    // Función para enviar el formulario
    const handleSubmit = async () => {
        const newErrors = validateAllFields();
        if (Object.keys(newErrors).length > 0) {
            showErrorAlert('Por favor corrija los errores antes de continuar.');
            return;
        }

        setIsSubmitting(true);
        try {
            await crearCondominio(formData);
            showSuccessAlert('Condominio creado correctamente.');
            navigate('/visualizar-condominios'); // Asume que existe esta ruta
        } catch (error) {
            console.error('Error al crear condominio:', error);
            showErrorAlert(error.response?.data?.message || 'Error al crear el condominio.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        isSubmitting,
        handleInputChange,
        handleCrearCondominio
    };
};

export default useCondominioForm;