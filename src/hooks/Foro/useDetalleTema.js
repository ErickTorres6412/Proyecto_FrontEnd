import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerDetalleTema, agregarRespuesta } from '../../services/api'; // Ajusta según tu estructura
import { showErrorAlert, showSuccessAlert } from '../../utils/alertUtils';

const useDetalleTema = () => {
    const { foroID } = useParams();
    const [tema, setTema] = useState(null);
    const [loading, setLoading] = useState(true);
    const [respuesta, setRespuesta] = useState('');
    const [enviandoRespuesta, setEnviandoRespuesta] = useState(false);

    useEffect(() => {
        cargarDetalleTema();
    }, [foroID]);

    const cargarDetalleTema = async () => {
        try {
            setLoading(true);
            console.log('Cargando detalle del tema con ID:', foroID);
            const response = await obtenerDetalleTema(foroID);
            setTema(response.data);
        } catch (error) {
            console.error('Error al cargar detalle del tema:', error);
            showErrorAlert('Error al cargar el detalle del tema.');
        } finally {
            setLoading(false);
        }
    };

    const handleRespuestaChange = (e) => {
        setRespuesta(e.target.value);
    };

    const handleEnviarRespuesta = async () => {
        if (!respuesta.trim()) {
            showErrorAlert('La respuesta no puede estar vacía.');
            return;
        }

        const respuestaData = {
            temaId: foroID,
            contenido: respuesta,
            usuarioId: localStorage.getItem('userId') || '',
            fecha: new Date().toISOString()
        };

        try {
            setEnviandoRespuesta(true);
            await agregarRespuesta(respuestaData);
            showSuccessAlert('Respuesta agregada correctamente.');
            setRespuesta('');
            await cargarDetalleTema(); // Recargamos el tema para mostrar la nueva respuesta
        } catch (error) {
            console.error('Error al enviar respuesta:', error);
            showErrorAlert(error.response?.data?.message || 'Error al enviar la respuesta.');
        } finally {
            setEnviandoRespuesta(false);
        }
    };

    return {
        tema,
        loading,
        respuesta,
        enviandoRespuesta,
        handleRespuestaChange,
        handleEnviarRespuesta
    };
};

export default useDetalleTema;