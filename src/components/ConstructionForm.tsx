import React from 'react';
import { useCabinet } from '../contexts/CabinetContext';

const ConstructionForm: React.FC = () => {
  const { cabinet, updateConstruction } = useCabinet();
  const { construction } = cabinet;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      updateConstruction({ [name]: checkbox.checked });
    } else if (type === 'number') {
      updateConstruction({ [name]: parseFloat(value) });
    } else {
      updateConstruction({ [name]: value });
    }
  };
  
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">
          Cabinet Material
        </label>
        <select
          id="material"
          name="material"
          value={construction.material}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="Plywood">Plywood</option>
          <option value="MDF">MDF</option>
          <option value="Particleboard">Particleboard</option>
          <option value="Solid Wood">Solid Wood</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="materialThickness" className="block text-sm font-medium text-gray-700 mb-1">
          Material Thickness (inches)
        </label>
        <select
          id="materialThickness"
          name="materialThickness"
          value={construction.materialThickness}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value={0.5}>1/2"</option>
          <option value={0.625}>5/8"</option>
          <option value={0.75}>3/4"</option>
          <option value={1}>1"</option>
        </select>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="useDado"
          name="useDado"
          checked={construction.useDado}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="useDado" className="ml-2 block text-sm text-gray-700">
          Use Dado Joinery
        </label>
      </div>
      
      {construction.useDado && (
        <div>
          <label htmlFor="dadoDepth" className="block text-sm font-medium text-gray-700 mb-1">
            Dado Depth (inches)
          </label>
          <select
            id="dadoDepth"
            name="dadoDepth"
            value={construction.dadoDepth}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value={0.25}>1/4"</option>
            <option value={0.375}>3/8"</option>
            <option value={0.5}>1/2"</option>
          </select>
        </div>
      )}
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="useStretchers"
          name="useStretchers"
          checked={construction.useStretchers}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="useStretchers" className="ml-2 block text-sm text-gray-700">
          Use Stretchers
        </label>
      </div>
      
      {construction.useStretchers && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="stretcherWidth" className="block text-sm font-medium text-gray-700 mb-1">
              Stretcher Width
            </label>
            <input
              type="number"
              id="stretcherWidth"
              name="stretcherWidth"
              min="1"
              max="6"
              step="0.125"
              value={construction.stretcherWidth}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="stretcherThickness" className="block text-sm font-medium text-gray-700 mb-1">
              Thickness
            </label>
            <select
              id="stretcherThickness"
              name="stretcherThickness"
              value={construction.stretcherThickness}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value={0.5}>1/2"</option>
              <option value={0.75}>3/4"</option>
              <option value={1}>1"</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstructionForm;