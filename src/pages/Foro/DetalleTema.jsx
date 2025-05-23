import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Header } from '../../components/common/Header';
import useDetalleTema from '../../hooks/Foro/useDetalleTema';
import { formatDate } from '../../utils/formatDate'; // Asume que tienes una función para formatear fechas

const DetalleTema = () => {
    const { 
        tema, 
        loading, 
        respuesta, 
        enviandoRespuesta, 
        handleRespuestaChange, 
        handleEnviarRespuesta 
    } = useDetalleTema();

    if (loading) {
        return (
            <div className="container mx-auto mt-8 px-4 flex justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!tema) {
        return (
            <div className="container mx-auto mt-8 px-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Tema no encontrado</h2>
                    <p className="mb-6">El tema que estás buscando no existe o ha sido eliminado.</p>
                    <Link to="/foro" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Volver al Foro
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-8 px-4 pb-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Header title="Tema de Discusión" />

                <div className="p-6">
                    {/* Navegación */}
                    <div className="mb-6">
                        <Link to="/foro" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <i className="fas fa-arrow-left mr-2"></i>
                            <span>Volver al Foro</span>
                        </Link>
                    </div>

                    {/* Tema principal */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                        <h1 className="text-2xl font-bold text-blue-900 mb-4">{tema.titulo}</h1>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <span className="mr-4">
                                <i className="far fa-user mr-1"></i>
                                {tema.nombreUsuario || 'Usuario'}
                            </span>
                            <span>
                                <i className="far fa-calendar-alt mr-1"></i>
                                {formatDate(tema.fecha)}
                            </span>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4">
                            <p className="text-gray-700 whitespace-pre-line">{tema.contenido}</p>
                        </div>
                    </div>

                    {/* Respuestas */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-blue-900 mb-4">
                            Respuestas ({tema.respuestas?.length || 0})
                        </h2>

                        {tema.respuestas && tema.respuestas.length > 0 ? (
                            <div className="space-y-4">
                                {tema.respuestas.map((resp, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                                    >
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium text-blue-800">
                                                {resp.nombreUsuario || 'Usuario'}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {formatDate(resp.fecha)}
                                            </span>
                                        </div>
                                        <p className="text-gray-700">{resp.contenido}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                                <p>No hay respuestas aún. Sé el primero en responder.</p>
                            </div>
                        )}
                    </div>

                    {/* Formulario para responder */}
                    <div>
                        <h2 className="text-xl font-semibold text-blue-900 mb-4">Responder</h2>
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows="4"
                                placeholder="Escribe tu respuesta..."
                                value={respuesta}
                                onChange={handleRespuestaChange}
                            ></textarea>
                            
                            <div className="mt-3 flex justify-end">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handleEnviarRespuesta}
                                    disabled={!respuesta.trim() || enviandoRespuesta}
                                >
                                    {enviandoRespuesta ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin mr-2"></i>
                                            <span>Enviando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="far fa-paper-plane mr-2"></i>
                                            <span>Enviar Respuesta</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleTema;