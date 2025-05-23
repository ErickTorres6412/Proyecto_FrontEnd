import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearSector, obtenerCondominios } from '../../../services/api';
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../../utils/alertUtils';

const useSectorForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
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
                setCondominios(response.data);
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

    const handleCrearSector = () => {
        showConfirmationAlert(
            'Confirmar creación',
            '¿Desea crear este sector?'
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
            await crearSector(formData);
            showSuccessAlert('Sector creado correctamente.');
            navigate('/sector/ver'); 
        } catch (error) {
            console.error('Error al crear sector:', error);
            showErrorAlert(error.response?.data?.message || 'Error al crear el sector.');
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
        handleCrearSector
    };
};

export default useSectorForm;
