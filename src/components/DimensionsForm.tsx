import React from 'react';
import { useCabinet } from '../contexts/CabinetContext';
import { CabinetType } from '../types/cabinet';

const DimensionsForm: React.FC = () => {
  const { cabinet, updateDimensions } = useCabinet();
  const { dimensions, type } = cabinet;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateDimensions({ [name]: parseFloat(value) });
  };
  
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
            Width (inches)
          </label>
          <input
            type="number"
            id="width"
            name="width"
            min="6"
            max="60"
            step="0.125"
            value={dimensions.width}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Height (inches)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            min="12"
            max="96"
            step="0.125"
            value={dimensions.height}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="depth" className="block text-sm font-medium text-gray-700 mb-1">
          Depth (inches)
        </label>
        <input
          type="number"
          id="depth"
          name="depth"
          min="6"
          max="36"
          step="0.125"
          value={dimensions.depth}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      {type === CabinetType.Base && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="toeKickHeight" className="block text-sm font-medium text-gray-700 mb-1">
              Toe Kick Height
            </label>
            <input
              type="number"
              id="toeKickHeight"
              name="toeKickHeight"
              min="0"
              max="6"
              step="0.125"
              value={dimensions.toeKickHeight}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="toeKickDepth" className="block text-sm font-medium text-gray-700 mb-1">
              Toe Kick Depth
            </label>
            <input
              type="number"
              id="toeKickDepth"
              name="toeKickDepth"
              min="0"
              max="6"
              step="0.125"
              value={dimensions.toeKickDepth}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DimensionsForm;