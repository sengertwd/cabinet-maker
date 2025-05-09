import React from 'react';
import { useCabinet } from '../contexts/CabinetContext';

const MaterialsForm: React.FC = () => {
  const { cabinet, updateMaterialSettings } = useCabinet();
  const { materialSettings } = cabinet;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      updateMaterialSettings({ [name]: checkbox.checked });
    } else if (type === 'number') {
      updateMaterialSettings({ [name]: parseFloat(value) });
    } else {
      updateMaterialSettings({ [name]: value });
    }
  };
  
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="sheetGoodsWidth" className="block text-sm font-medium text-gray-700 mb-1">
            Sheet Width (inches)
          </label>
          <input
            type="number"
            id="sheetGoodsWidth"
            name="sheetGoodsWidth"
            min="24"
            max="60"
            step="1"
            value={materialSettings.sheetGoodsWidth}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="sheetGoodsLength" className="block text-sm font-medium text-gray-700 mb-1">
            Sheet Length (inches)
          </label>
          <input
            type="number"
            id="sheetGoodsLength"
            name="sheetGoodsLength"
            min="48"
            max="120"
            step="1"
            value={materialSettings.sheetGoodsLength}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="sheetGoodsThickness" className="block text-sm font-medium text-gray-700 mb-1">
          Sheet Thickness (inches)
        </label>
        <select
          id="sheetGoodsThickness"
          name="sheetGoodsThickness"
          value={materialSettings.sheetGoodsThickness}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value={0.5}>1/2"</option>
          <option value={0.625}>5/8"</option>
          <option value={0.75}>3/4"</option>
          <option value={1}>1"</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="edgeBandingWidth" className="block text-sm font-medium text-gray-700 mb-1">
          Edge Banding Width (inches)
        </label>
        <select
          id="edgeBandingWidth"
          name="edgeBandingWidth"
          value={materialSettings.edgeBandingWidth}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value={0.75}>3/4"</option>
          <option value={1}>1"</option>
          <option value={1.5}>1-1/2"</option>
          <option value={2}>2"</option>
        </select>
      </div>
      
      <div className="flex items-center pt-2">
        <input
          type="checkbox"
          id="usePremadeDrawerboxes"
          name="usePremadeDrawerboxes"
          checked={materialSettings.usePremadeDrawerboxes}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="usePremadeDrawerboxes" className="ml-2 block text-sm text-gray-700">
          Use Premade Drawer Boxes
        </label>
      </div>
    </div>
  );
};

export default MaterialsForm;