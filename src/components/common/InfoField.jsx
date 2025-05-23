import React from "react";

const InfoField = ({ 
  icon: Icon, 
  label, 
  value, 
  editing, 
  inputProps = {}, 
  noEdit = false 
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
      <div className="flex items-center">
        {Icon && (
          <div className="flex-shrink-0 mr-3">
            <div className="p-2 bg-blue-50 rounded-md">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        )}
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-500">{label}</div>
          
          {editing && !noEdit ? (
            <div className="mt-1">
              {inputProps.isTextarea ? (
                <textarea
                  {...inputProps}
                  className={`w-full px-3 py-2 border ${
                    inputProps.error ? "border-red-500" : "border-gray-300"
                  } rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-20`}
                />
              ) : (
                <input
                  type={inputProps.type || "text"}
                  {...inputProps}
                  className={`w-full px-3 py-2 border ${
                    inputProps.error ? "border-red-500" : "border-gray-300"
                  } rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              )}
              {inputProps.error && (
                <p className="mt-1 text-sm text-red-600">{inputProps.error}</p>
              )}
            </div>
          ) : (
            <div className="mt-1 text-sm font-medium text-gray-900">
              {value || "No especificado"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoField;