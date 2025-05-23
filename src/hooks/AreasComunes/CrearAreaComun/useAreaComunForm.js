import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearAreaComun, obtenerCondominios } from '../../../services/api'; // Ajusta los imports a tu estructura real
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../../utils/alertUtils';

const useAreaComunForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        capacidad: '',
        reglas: '',
        condominioID: '',
        fechaRegistro: new Date().toISOString().split('T')[0]
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [condominios, setCondominios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarCondominios = async () => {
            try {
                const response = await obtenerCondominios();
                console.log(response);
                setCondominios(response.data); // Ajusta si la respuesta es diferente
            } catch (error) {
                console.error('Error al cargar condominios:', error);
                showErrorAlert('Error al cargar la lista de condominios.');
            }
        };

        cargarCondominios();
    }, []);

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'nombre':
                if (!value.trim()) error = 'El nombre es requerido.';
                else if (value.length < 3) error = 'Debe tener al menos 3 caracteres.';
                break;
            case 'capacidad':
                if (value && isNaN(value)) error = 'La capacidad debe ser un número.';
                break;
            case 'condominioID':
                if (!value) error = 'Debe seleccionar un condominio.';
                break;
            case 'fechaRegistro':
                if (!value) error = 'La fecha de registro es requerida.';
                break;
            default:
                break;
        }
        return error;
    };

    const validateAllFields = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
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

    const handleCrearAreaComun = () => {
        showConfirmationAlert(
            'Confirmar creación',
            '¿Desea crear esta área común?'
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
            await crearAreaComun(formData);
            showSuccessAlert('Área común creada correctamente.');
            navigate('/visualizar-areas-comunes'); // Ajusta según tu ruta
        } catch (error) {
            console.error('Error al crear área común:', error);
            showErrorAlert(error.response?.data?.message || 'Error al crear el área común.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        isSubmitting,
        condominios,
        handleInputChange,
        handleCrearAreaComun
    };
};

export default useAreaComunForm;
