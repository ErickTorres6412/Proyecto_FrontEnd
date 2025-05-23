import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearPropiedad, obtenerSectores } from '../../../services/api'; // Ajusta los imports a tu estructura real
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../../utils/alertUtils';

const usePropiedadForm = () => {
    const [formData, setFormData] = useState({
        numero: '',
        tipo: '',
        caracteristicas: '',
        sectorID: '',
        fechaRegistro: new Date().toISOString().split('T')[0]
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sectores, setSectores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarSectores = async () => {
            try {
                const response = await obtenerSectores();
                console.log(response);
                setSectores(response.data); // Ajusta si la respuesta es diferente
            } catch (error) {
                console.error('Error al cargar sectores:', error);
                showErrorAlert('Error al cargar la lista de sectores.');
            }
        };

        cargarSectores();
    }, []);

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'numero':
                if (!value.trim()) error = 'El número es requerido.';
                break;
            case 'tipo':
                if (!value.trim()) error = 'El tipo es requerido.';
                break;
            case 'sectorID':
                if (!value) error = 'Debe seleccionar un sector.';
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

    const handleCrearPropiedad = () => {
        showConfirmationAlert(
            'Confirmar creación',
            '¿Desea crear esta propiedad?'
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
            await crearPropiedad(formData);
            showSuccessAlert('Propiedad creada correctamente.');
            navigate('/propiedad/ver'); // Ajusta según tu ruta
        } catch (error) {
            console.error('Error al crear propiedad:', error);
            showErrorAlert(error.response?.data?.message || 'Error al crear la propiedad.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        isSubmitting,
        sectores,
        handleInputChange,
        handleCrearPropiedad
    };
};

export default usePropiedadForm;