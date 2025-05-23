import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const SelectWithHelp = ({
  object,
  errors,
  handleChange,
  name,
  label,
  tooltipMessage,
  disabled = false,
  options = [],
  valueKey = 'id',
  labelKey = 'name',
  placeholder
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const selectRef = useRef(null);

  // Cerrar tooltip al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setTooltipOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative flex">
        <div className="relative flex-grow">
          <select
            ref={selectRef}
            id={name}
            name={name}
            value={object[name] || ''}
            onChange={handleChange}
            disabled={disabled}
            className={`block w-full px-3 py-2 bg-white border rounded-l-md shadow-sm appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors[name]
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300'
            } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            style={{ backgroundImage: 'none' }}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options && options.map((option) => (
              <option key={option[valueKey]} value={option[valueKey]}>
                {option[labelKey]}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown
              size={18}
              className={errors[name] ? 'text-red-500' : 'text-gray-400'}
            />
          </div>
        </div>
        <div
          ref={triggerRef}
          onClick={() => setTooltipOpen(!tooltipOpen)}
          className={`inline-flex items-center justify-center px-3 py-2 text-gray-500 border border-l-0 rounded-r-md cursor-pointer ${
            errors[name] 
              ? 'border-red-500 text-red-500' 
              : 'border-gray-300'
          } ${disabled ? 'opacity-50' : ''}`}
        >
          <HelpCircle
            size={18}
            className={errors[name] ? 'text-red-500' : 'text-gray-400'}
          />
        </div>
        
        {/* Tooltip mejorado */}
        {tooltipOpen && (
          <div 
            ref={tooltipRef}
            className="absolute z-10 w-64 p-3 text-sm bg-white border border-gray-200 rounded-md shadow-lg right-0 mt-2 top-full transform transition duration-150 ease-in-out"
          >
            <div className="absolute -top-2 right-4 w-4 h-4 rotate-45 transform bg-white border-t border-l border-gray-200"></div>
            <div className="relative z-10">
              {tooltipMessage}
            </div>
          </div>
        )}
      </div>
      
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
      )}
    </div>
  );
};

export default SelectWithHelp;