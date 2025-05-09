import React, { useState, useEffect } from 'react';
import { useCabinet } from '../contexts/CabinetContext';
import { CutItem } from '../types/cabinet';
import { generateCutList } from '../utils/cabinetCalculations';
import CabinetPreview from './CabinetPreview';

const BuildSheet: React.FC = () => {
  const { cabinet } = useCabinet();
  const [cutList, setCutList] = useState<CutItem[]>([]);
  
  useEffect(() => {
    // Generate cut list based on cabinet configuration
    const newCutList = generateCutList(cabinet);
    setCutList(newCutList);
  }, [cabinet]);
  
  const groupedItems = cutList.reduce((groups: Record<string, CutItem[]>, item) => {
    const key = item.material;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Build Sheet</h2>
          
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Print Build Sheet
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Cabinet Specifications</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-gray-600">Cabinet Type:</div>
                <div className="font-medium text-gray-900">{cabinet.type} Cabinet</div>
                
                <div className="text-gray-600">Width:</div>
                <div className="font-medium text-gray-900">{cabinet.dimensions.width}"</div>
                
                <div className="text-gray-600">Height:</div>
                <div className="font-medium text-gray-900">{cabinet.dimensions.height}"</div>
                
                <div className="text-gray-600">Depth:</div>
                <div className="font-medium text-gray-900">{cabinet.dimensions.depth}"</div>
                
                <div className="text-gray-600">Construction Material:</div>
                <div className="font-medium text-gray-900">{cabinet.construction.material} ({cabinet.construction.materialThickness}")</div>
                
                <div className="text-gray-600">Face Frame:</div>
                <div className="font-medium text-gray-900">
                  {cabinet.faceFrame.enabled ? 
                    `${cabinet.faceFrame.material} (${cabinet.faceFrame.thickness}")` : 
                    'None'}
                </div>
                
                <div className="text-gray-600">Door Style:</div>
                <div className="font-medium text-gray-900">{cabinet.doorConfig.style}</div>
                
                <div className="text-gray-600">Door Count:</div>
                <div className="font-medium text-gray-900">{cabinet.doorConfig.doorCount}</div>
                
                <div className="text-gray-600">Drawer Count:</div>
                <div className="font-medium text-gray-900">{cabinet.drawerConfig.drawerCount}</div>
                
                <div className="text-gray-600">Joinery:</div>
                <div className="font-medium text-gray-900">
                  {cabinet.construction.useDado ? 
                    `Dado (${cabinet.construction.dadoDepth}" depth)` : 
                    'Butt Joints'}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Cabinet Preview</h3>
            <CabinetPreview />
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Construction Notes</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-800">
              <li>Cut all pieces according to the cut list provided.</li>
              <li>Assemble cabinet box using {cabinet.construction.useDado ? 'dado joinery' : 'butt joints'} and glue.</li>
              {cabinet.construction.useDado && (
                <li>Create {cabinet.construction.dadoDepth}" deep dados for shelves and dividers.</li>
              )}
              {cabinet.faceFrame.enabled && (
                <li>Assemble face frame with pocket hole screws or mortise and tenon joints.</li>
              )}
              {cabinet.faceFrame.enabled && (
                <li>Attach face frame to cabinet box with glue and brad nails or pocket screws.</li>
              )}
              {cabinet.doorConfig.doorCount > 0 && (
                <li>Construct doors according to the {cabinet.doorConfig.style} style specifications.</li>
              )}
              {cabinet.drawerConfig.drawerCount > 0 && (
                <li>Assemble drawer boxes using {cabinet.drawerConfig.drawerboxMaterial}.</li>
              )}
              {cabinet.drawerConfig.drawerCount > 0 && (
                <li>Install {cabinet.drawerConfig.drawerSlideType} drawer slides.</li>
              )}
              <li>Sand all surfaces thoroughly before finishing.</li>
              <li>Apply desired finish (paint, stain, or clear coat).</li>
              <li>Install hardware (hinges, pulls, knobs) after finishing is complete.</li>
            </ol>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Materials List by Type</h3>
          
          {Object.entries(groupedItems).map(([material, items]) => (
            <div key={material} className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">{material}</h4>
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dimensions
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.quantity}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        {item.width}" × {item.length}" × {item.thickness}"
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        {item.grain ? `Grain: ${item.grain}` : ''} {item.notes ? item.notes : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuildSheet;