import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate'; // Asume que tienes una función para formatear fechas

const TemasListItem = ({ tema }) => {
    return (
        <Link 
            to={`/foro/${tema.foroID}`}
            className="block hover:bg-blue-50 transition-colors"
        >
            <div className="border-b border-gray-200 p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-900 mb-1">{tema.titulo}</h3>
                        <p className="text-gray-600 line-clamp-2 mb-2">{tema.contenido}</p>
                        
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-3">
                                <i className="far fa-user mr-1"></i>
                                {tema.nombreUsuario || 'Usuario'}
                            </span>
                            <span>
                                <i className="far fa-calendar-alt mr-1"></i>
                                {formatDate(tema.fecha)}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center ml-4">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center">
                            {tema.respuestas?.length || 0}
                        </div>
                        <span className="text-xs text-gray-500 mt-1">Respuestas</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TemasListItem;