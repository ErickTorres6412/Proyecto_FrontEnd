import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Header } from '../../components/common/Header';
import TemasListItem from '../../components/Foro/TemasListItem';
import useListaForo from '../../hooks/Foro/useListaForo';

const Foro = () => {
    const { temas, loading, filtro, handleFiltroChange } = useListaForo();

    return (
        <div className="container mx-auto mt-8 px-4 pb-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Header title="Foro de Discusión" />

                <div className="p-6">
                    {/* Barra superior con filtro y botón */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar temas..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filtro}
                                    onChange={handleFiltroChange}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-search text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                        <Link 
                            to="/foro/crear" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            <span>Crear Tema</span>
                        </Link>
                    </div>

                    {/* Lista de temas */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg">
                        {loading ? (
                            <div className="p-10 flex justify-center">
                                <LoadingSpinner />
                            </div>
                        ) : temas.length > 0 ? (
                            <div>
                                {temas.map((tema) => (
                                    <TemasListItem key={tema.foroID} tema={tema} />
                                ))}
                            </div>
                        ) : (
                            <div className="p-10 text-center text-gray-500">
                                <div className="text-5xl mb-3">
                                    <i className="far fa-comments"></i>
                                </div>
                                <p className="text-lg mb-2">No se encontraron temas de discusión</p>
                                <p>Sé el primero en crear un tema para iniciar la conversación</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Foro;