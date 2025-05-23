import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearVehiculo, obtenerPropiedades } from '../../../services/api'; // Asume que existe esta función en tu API
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../../utils/alertUtils';

const useVehiculoForm = () => {
    const [formData, setFormData] = useState({
        vehiculoID: 0,
        propiedadID: 0,
        placa: '',
        tipo: '',
        codigoAcceso: '',
        fechaRegistro: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
        fechaExpiracion: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // Un año adelante por defecto
        propiedadNumero: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [propiedades, setPropiedades] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarPropiedades = async () => {
            try {
                const response = await obtenerPropiedades();
                console.log(response);
                setPropiedades(response.data); // Ajusta si la respuesta es diferente
            } catch (error) {
                console.error('Error al cargar propiedades:', error);
                showErrorAlert('Error al cargar la lista de propiedades.');
            }
        };

        cargarPropiedades();
    }, []);

    // Función para validar un campo específico
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'propiedadID':
                if (!value || value <= 0) {
                    error = 'Debe seleccionar una propiedad válida.';
                }
                break;
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
            case 'fechaRegistro':
                if (!value) {
                    error = 'La fecha de registro es requerida.';
                }
                break;
            case 'fechaExpiracion':
                if (!value) {
                    error = 'La fecha de expiración es requerida.';
                } else if (new Date(value) <= new Date(formData.fechaRegistro)) {
                    error = 'La fecha de expiración debe ser posterior a la fecha de registro.';
                }
                break;
            case 'propiedadNumero':
                if (!value.trim()) {
                    error = 'El número de propiedad es requerido.';
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
            // Saltamos la validación de vehiculoID ya que se genera automáticamente
            if (field !== 'vehiculoID') {
                const error = validateField(field, formData[field]);
                if (error) {
                    newErrors[field] = error;
                }
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
    const handleCrearVehiculo = () => {
        // Confirmación de creación
        showConfirmationAlert(
            'Confirmación de registro',
            '¿Está seguro de que desea registrar este vehículo?'
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
            await crearVehiculo(formData);
            showSuccessAlert('Vehículo registrado correctamente.');
            navigate('/visualizar-vehiculos'); // Asume que existe esta ruta
        } catch (error) {
            console.error('Error al registrar vehículo:', error);
            showErrorAlert(error.response?.data?.message || 'Error al registrar el vehículo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        isSubmitting,
        handleInputChange,
        handleCrearVehiculo,
        propiedades
    };
};

export default useVehiculoForm;