import React, { useState, useEffect } from 'react';
import { useCabinet } from '../contexts/CabinetContext';
import { CutItem, SheetLayout } from '../types/cabinet';
import { generateCutList, optimizeCutLayout } from '../utils/cabinetCalculations';

const SheetOptimization: React.FC = () => {
  const { cabinet } = useCabinet();
  const [cutList, setCutList] = useState<CutItem[]>([]);
  const [sheetLayouts, setSheetLayouts] = useState<SheetLayout[]>([]);
  const [selectedSheet, setSelectedSheet] = useState(0);
  
  useEffect(() => {
    // Generate cut list based on cabinet configuration
    const newCutList = generateCutList(cabinet);
    setCutList(newCutList);
    
    // Generate optimal layout
    const layouts = optimizeCutLayout(newCutList, cabinet.materialSettings);
    setSheetLayouts(layouts);
  }, [cabinet]);
  
  const renderSheetLayout = (layout: SheetLayout, index: number) => {
    const { sheetWidth, sheetLength, items, efficiency } = layout;
    
    // Scale for visualization - calculate based on container size
    const scale = Math.min(700 / sheetLength, 500 / sheetWidth);
    
    // Get unique materials for color coding
    const materials = [...new Set(items.map(i => i.item.material))];
    const materialColors = [
      'bg-blue-200 border-blue-400',
      'bg-green-200 border-green-400',
      'bg-yellow-200 border-yellow-400',
      'bg-red-200 border-red-400',
      'bg-purple-200 border-purple-400',
      'bg-pink-200 border-pink-400',
    ];
    
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-md font-semibold text-gray-900 mb-2">Sheet {index + 1}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Dimensions: {sheetWidth}" × {sheetLength}" | Efficiency: {(efficiency * 100).toFixed(1)}%
        </p>
        
        <div className="relative bg-gray-100 border border-dashed border-gray-300 overflow-hidden mb-4"
          style={{ 
            width: `${sheetLength * scale}px`, 
            height: `${sheetWidth * scale}px`,
            maxWidth: '100%'
          }}
        >
          {items.map((item, i) => {
            const materialIndex = materials.indexOf(item.item.material);
            const colorClass = materialColors[materialIndex % materialColors.length];
            
            return (
              <div 
                key={i}
                className={`absolute border ${colorClass}`}
                style={{
                  left: `${item.x * scale}px`,
                  top: `${item.y * scale}px`,
                  width: `${(item.rotated ? item.item.width : item.item.length) * scale}px`,
                  height: `${(item.rotated ? item.item.length : item.item.width) * scale}px`,
                  fontSize: '9px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '2px'
                }}
                title={`${item.item.name}: ${item.item.width}" × ${item.item.length}"`}
              >
                {item.item.name}
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {materials.map((material, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-4 h-4 ${materialColors[i % materialColors.length]} mr-1`}></div>
              <span className="text-xs">{material}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sheet Goods Optimization</h2>
        
        {sheetLayouts.length > 0 ? (
          <div>
            <div className="flex mb-4 overflow-x-auto pb-2">
              {sheetLayouts.map((layout, index) => (
                <button 
                  key={index} 
                  className={`px-4 py-2 rounded-lg mr-2 text-sm font-medium flex-shrink-0 ${
                    selectedSheet === index 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedSheet(index)}
                >
                  Sheet {index + 1} ({(layout.efficiency * 100).toFixed(0)}%)
                </button>
              ))}
            </div>
            
            <div className="mt-4 overflow-x-auto">
              {renderSheetLayout(sheetLayouts[selectedSheet], selectedSheet)}
            </div>
            
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-900 mb-2">Summary</h3>
              <p className="text-sm text-gray-600">
                Total Sheets Required: {sheetLayouts.length}
              </p>
              <p className="text-sm text-gray-600">
                Average Material Efficiency: {
                  (sheetLayouts.reduce((sum, layout) => sum + layout.efficiency, 0) / sheetLayouts.length * 100).toFixed(1)
                }%
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No sheet layout available. Please check your cabinet configuration.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SheetOptimization;