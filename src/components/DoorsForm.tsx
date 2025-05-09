import React from 'react';
import { useCabinet } from '../contexts/CabinetContext';
import { DoorStyle } from '../types/cabinet';

const DoorsForm: React.FC = () => {
  const { cabinet, updateDoorConfig } = useCabinet();
  const { doorConfig } = cabinet;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      updateDoorConfig({ [name]: checkbox.checked });
    } else if (type === 'number') {
      updateDoorConfig({ [name]: parseFloat(value) });
    } else {
      updateDoorConfig({ [name]: value });
    }
  };
  
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
          Door Style
        </label>
        <select
          id="style"
          name="style"
          value={doorConfig.style}
          onChange={(e) => updateDoorConfig({ style: e.target.value as DoorStyle })}
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value={DoorStyle.Slab}>Slab</option>
          <option value={DoorStyle.Shaker}>Shaker</option>
          <option value={DoorStyle.RaisedPanel}>Raised Panel</option>
          <option value={DoorStyle.Beadboard}>Beadboard</option>
          <option value={DoorStyle.Glass}>Glass Panel</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="doorCount" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Doors
        </label>
        <select
          id="doorCount"
          name="doorCount"
          value={doorConfig.doorCount}
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
      
      {doorConfig.doorCount > 0 && (
        <>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="overlay"
              name="overlay"
              checked={doorConfig.overlay}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="overlay" className="ml-2 block text-sm text-gray-700">
              Overlay Doors (vs. Inset)
            </label>
          </div>
          
          {doorConfig.overlay && (
            <div>
              <label htmlFor="overlayAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Overlay Amount
              </label>
              <select
                id="overlayAmount"
                name="overlayAmount"
                value={doorConfig.overlayAmount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value={0.375}>3/8"</option>
                <option value={0.5}>1/2"</option>
                <option value={0.625}>5/8"</option>
                <option value={0.75}>3/4"</option>
              </select>
            </div>
          )}
          
          <div>
            <label htmlFor="hingeType" className="block text-sm font-medium text-gray-700 mb-1">
              Hinge Type
            </label>
            <select
              id="hingeType"
              name="hingeType"
              value={doorConfig.hingeType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Concealed">Concealed</option>
              <option value="Exposed">Exposed</option>
              <option value="Semi-Concealed">Semi-Concealed</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="doorThickness" className="block text-sm font-medium text-gray-700 mb-1">
              Door Thickness
            </label>
            <select
              id="doorThickness"
              name="doorThickness"
              value={doorConfig.doorThickness}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value={0.625}>5/8"</option>
              <option value={0.75}>3/4"</option>
              <option value={1}>1"</option>
            </select>
          </div>
          
          {doorConfig.style === DoorStyle.Shaker && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="stileWidth" className="block text-sm font-medium text-gray-700 mb-1">
                  Stile Width
                </label>
                <input
                  type="number"
                  id="stileWidth"
                  name="stileWidth"
                  min="1.5"
                  max="4"
                  step="0.125"
                  value={doorConfig.stileWidth}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="railWidth" className="block text-sm font-medium text-gray-700 mb-1">
                  Rail Width
                </label>
                <input
                  type="number"
                  id="railWidth"
                  name="railWidth"
                  min="1.5"
                  max="4"
                  step="0.125"
                  value={doorConfig.railWidth}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoorsForm;