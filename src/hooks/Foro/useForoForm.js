import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearTemaForo } from '../../services/api'; // Ajusta según tu estructura
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../utils/alertUtils';

const useForoForm = () => {
    const [formData, setFormData] = useState({
        titulo: '',
        contenido: '',
        usuarioId: localStorage.getItem('userId') || '', // Asumiendo que tienes el ID del usuario en localStorage
        fecha: new Date().toISOString()
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'titulo':
                if (!value.trim()) error = 'El título es requerido.';
                else if (value.length < 5) error = 'El título debe tener al menos 5 caracteres.';
                break;
            case 'contenido':
                if (!value.trim()) error = 'El contenido es requerido.';
                else if (value.length < 10) error = 'El contenido debe tener al menos 10 caracteres.';
                break;
            default:
                break;
        }
        return error;
    };

    const validateAllFields = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            if (field === 'titulo' || field === 'contenido') {
                const error = validateField(field, formData[field]);
                if (error) newErrors[field] = error;
            }
        });
        setErrors(newErrors);
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        const error = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));
    };

    const handleCrearTema = () => {
        showConfirmationAlert(
            'Confirmar creación',
            '¿Desea crear este tema en el foro?'
        ).then((result) => {
            if (result.isConfirmed) {
                handleSubmit();
            }
        });
    };

    const handleSubmit = async () => {
        const newErrors = validateAllFields();
        if (Object.keys(newErrors).length > 0) {
            showErrorAlert('Por favor corrija los errores antes de continuar.');
            return;
        }

        setIsSubmitting(true);
        try {
            await crearTemaForo(formData);
            showSuccessAlert('Tema creado correctamente.');
            navigate('/foro'); // Ajusta según tu ruta
        } catch (error) {
            console.error('Error al crear tema:', error);
            showErrorAlert(error.response?.data?.message || 'Error al crear el tema en el foro.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        isSubmitting,
        handleInputChange,
        handleCrearTema
    };
};

export default useForoForm;