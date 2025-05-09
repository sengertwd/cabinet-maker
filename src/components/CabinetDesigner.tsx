import React from 'react';
import { useCabinet } from '../contexts/CabinetContext';
import { CabinetType, DoorStyle } from '../types/cabinet';
import DimensionsForm from './DimensionsForm';
import ConstructionForm from './ConstructionForm';
import FaceFrameForm from './FaceFrameForm';
import DoorsForm from './DoorsForm';
import DrawersForm from './DrawersForm';
import MaterialsForm from './MaterialsForm';
import CabinetPreview from './CabinetPreview';

const CabinetDesigner: React.FC = () => {
  const { cabinet, updateCabinetType, reset } = useCabinet();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Cabinet Configuration</h2>
            <div className="flex space-x-3">
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={cabinet.type}
                onChange={(e) => updateCabinetType(e.target.value as CabinetType)}
              >
                <option value={CabinetType.Base}>Base Cabinet</option>
                <option value={CabinetType.Wall}>Wall Cabinet</option>
              </select>
              
              <button 
                onClick={reset}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h3 className="font-medium text-gray-900 mb-4">Dimensions</h3>
              <DimensionsForm />
            </section>
            
            <section>
              <h3 className="font-medium text-gray-900 mb-4">Construction</h3>
              <ConstructionForm />
            </section>
            
            <section>
              <h3 className="font-medium text-gray-900 mb-4">Face Frame</h3>
              <FaceFrameForm />
            </section>
            
            <section>
              <h3 className="font-medium text-gray-900 mb-4">Doors</h3>
              <DoorsForm />
            </section>
            
            <section>
              <h3 className="font-medium text-gray-900 mb-4">Drawers</h3>
              <DrawersForm />
            </section>
            
            <section>
              <h3 className="font-medium text-gray-900 mb-4">Materials</h3>
              <MaterialsForm />
            </section>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 sticky top-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
          <CabinetPreview />
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-2">Cabinet Summary</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <span className="font-medium">Type:</span> {cabinet.type} Cabinet
              </li>
              <li>
                <span className="font-medium">Dimensions:</span> {cabinet.dimensions.width}"W × {cabinet.dimensions.height}"H × {cabinet.dimensions.depth}"D
              </li>
              <li>
                <span className="font-medium">Material:</span> {cabinet.construction.material} ({cabinet.construction.materialThickness}" thick)
              </li>
              <li>
                <span className="font-medium">Door Style:</span> {cabinet.doorConfig.style}
              </li>
              <li>
                <span className="font-medium">Face Frame:</span> {cabinet.faceFrame.enabled ? 'Yes' : 'No'}
              </li>
              <li>
                <span className="font-medium">Doors:</span> {cabinet.doorConfig.doorCount}
              </li>
              <li>
                <span className="font-medium">Drawers:</span> {cabinet.drawerConfig.drawerCount}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinetDesigner;