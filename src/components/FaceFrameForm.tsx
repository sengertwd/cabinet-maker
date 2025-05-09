import React from 'react';
import { useCabinet } from '../contexts/CabinetContext';

const FaceFrameForm: React.FC = () => {
  const { cabinet, updateFaceFrame } = useCabinet();
  const { faceFrame } = cabinet;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      updateFaceFrame({ [name]: checkbox.checked });
    } else if (type === 'number') {
      updateFaceFrame({ [name]: parseFloat(value) });
    } else {
      updateFaceFrame({ [name]: value });
    }
  };
  
  return (
    <div className="space-y-3">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="enabled"
          name="enabled"
          checked={faceFrame.enabled}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="enabled" className="ml-2 block text-sm text-gray-700">
          Use Face Frame
        </label>
      </div>
      
      {faceFrame.enabled && (
        <>
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">
              Face Frame Material
            </label>
            <select
              id="material"
              name="material"
              value={faceFrame.material}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Hardwood">Hardwood</option>
              <option value="Softwood">Softwood</option>
              <option value="Same as Cabinet">Same as Cabinet</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="stileWidth" className="block text-sm font-medium text-gray-700 mb-1">
                Stile Width
              </label>
              <input
                type="number"
                id="stileWidth"
                name="stileWidth"
                min="1"
                max="4"
                step="0.125"
                value={faceFrame.stileWidth}
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
                min="1"
                max="4"
                step="0.125"
                value={faceFrame.railWidth}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="thickness" className="block text-sm font-medium text-gray-700 mb-1">
                Thickness
              </label>
              <select
                id="thickness"
                name="thickness"
                value={faceFrame.thickness}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value={0.5}>1/2"</option>
                <option value={0.75}>3/4"</option>
                <option value={1}>1"</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="overhang" className="block text-sm font-medium text-gray-700 mb-1">
                Overhang
              </label>
              <input
                type="number"
                id="overhang"
                name="overhang"
                min="0"
                max="1"
                step="0.0625"
                value={faceFrame.overhang}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FaceFrameForm;