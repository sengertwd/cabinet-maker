import React from 'react';
import { useCabinet } from '../contexts/CabinetContext';

const DrawersForm: React.FC = () => {
  const { cabinet, updateDrawerConfig } = useCabinet();
  const { drawerConfig } = cabinet;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      updateDrawerConfig({ [name]: parseFloat(value) });
    } else {
      updateDrawerConfig({ [name]: value });
    }
  };
  
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="drawerCount" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Drawers
        </label>
        <select
          id="drawerCount"
          name="drawerCount"
          value={drawerConfig.drawerCount}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>
      
      {drawerConfig.drawerCount > 0 && (
        <>
          <div>
            <label htmlFor="drawerHeight" className="block text-sm font-medium text-gray-700 mb-1">
              Drawer Height (inches)
            </label>
            <input
              type="number"
              id="drawerHeight"
              name="drawerHeight"
              min="3"
              max="12"
              step="0.125"
              value={drawerConfig.drawerHeight}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="drawerSlideType" className="block text-sm font-medium text-gray-700 mb-1">
              Drawer Slide Type
            </label>
            <select
              id="drawerSlideType"
              name="drawerSlideType"
              value={drawerConfig.drawerSlideType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Side-Mount">Side-Mount</option>
              <option value="Undermount">Undermount</option>
              <option value="Center-Mount">Center-Mount</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="drawerboxMaterial" className="block text-sm font-medium text-gray-700 mb-1">
              Drawer Box Material
            </label>
            <select
              id="drawerboxMaterial"
              name="drawerboxMaterial"
              value={drawerConfig.drawerboxMaterial}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Plywood">Plywood</option>
              <option value="Solid Wood">Solid Wood</option>
              <option value="MDF">MDF</option>
              <option value="Same as Cabinet">Same as Cabinet</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="drawerboxThickness" className="block text-sm font-medium text-gray-700 mb-1">
              Drawer Box Thickness
            </label>
            <select
              id="drawerboxThickness"
              name="drawerboxThickness"
              value={drawerConfig.drawerboxThickness}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value={0.375}>3/8"</option>
              <option value={0.5}>1/2"</option>
              <option value={0.625}>5/8"</option>
              <option value={0.75}>3/4"</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="drawerFrontThickness" className="block text-sm font-medium text-gray-700 mb-1">
              Drawer Front Thickness
            </label>
            <select
              id="drawerFrontThickness"
              name="drawerFrontThickness"
              value={drawerConfig.drawerFrontThickness}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value={0.625}>5/8"</option>
              <option value={0.75}>3/4"</option>
              <option value={1}>1"</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default DrawersForm;