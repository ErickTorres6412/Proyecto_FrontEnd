import { useState, useEffect } from 'react';
import { obtenerTemasForo } from '../../services/api'; // Ajusta según tu estructura
import { showErrorAlert } from '../../utils/alertUtils';

const useListaForo = () => {
    const [temas, setTemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        cargarTemas();
    }, []);

    const cargarTemas = async () => {
        try {
            setLoading(true);
            const response = await obtenerTemasForo();
            setTemas(response.data || []);
        } catch (error) {
            console.error('Error al cargar temas del foro:', error);
            showErrorAlert('Error al cargar los temas del foro.');
            setTemas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const temasFiltrados = temas.filter(tema => 
        tema.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        tema.contenido.toLowerCase().includes(filtro.toLowerCase())
    );

    return {
        temas: temasFiltrados,
        loading,
        filtro,
        handleFiltroChange,
        cargarTemas
    };
};

export default useListaForo;