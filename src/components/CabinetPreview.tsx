import React from 'react';
import { useCabinet } from '../contexts/CabinetContext';
import { CabinetType, DoorStyle } from '../types/cabinet';

const CabinetPreview: React.FC = () => {
  const { cabinet } = useCabinet();
  const { dimensions, type, faceFrame, doorConfig, drawerConfig } = cabinet;
  
  // Calculate cabinet proportions for visual representation
  const cabinetWidth = 240;
  const cabinetHeight = (dimensions.height / dimensions.width) * cabinetWidth;
  const cabinetDepth = (dimensions.depth / dimensions.width) * cabinetWidth;
  
  // Base cabinet with toe kick
  const toeKickHeight = type === CabinetType.Base ? (dimensions.toeKickHeight / dimensions.height) * cabinetHeight : 0;
  
  // Face frame dimensions
  const hasFaceFrame = faceFrame.enabled;
  const frameThickness = 4;
  
  // Door and drawer layout
  const doorHeight = cabinetHeight - (drawerConfig.drawerCount > 0 ? (drawerConfig.drawerHeight / dimensions.height) * cabinetHeight : 0);
  const doorWidth = doorConfig.doorCount === 1 ? cabinetWidth - (hasFaceFrame ? frameThickness * 2 : 0) : (cabinetWidth - (hasFaceFrame ? frameThickness * 3 : 0)) / 2;
  
  // Determine color based on material
  const getCabinetColor = () => {
    switch(cabinet.construction.material) {
      case 'Plywood': return '#D7BF9D';
      case 'MDF': return '#C5B7A6';
      case 'Particleboard': return '#D5C2A5';
      case 'Solid Wood': return '#BD8C61';
      default: return '#D7BF9D';
    }
  };
  
  const getDoorColor = () => {
    switch(doorConfig.material) {
      case 'Hardwood': return '#9C6644';
      case 'Same as Cabinet': return getCabinetColor();
      default: return '#9C6644';
    }
  };
  
  const getDrawerColor = () => {
    switch(drawerConfig.drawerFrontMaterial) {
      case 'Hardwood': return '#9C6644';
      case 'Same as Cabinet': return getCabinetColor();
      default: return '#9C6644';
    }
  };
  
  return (
    <div className="w-full h-80 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
      <div className="relative" style={{ width: `${cabinetWidth}px`, height: `${cabinetHeight}px` }}>
        {/* Cabinet Box */}
        <div 
          className="absolute left-0 top-0 bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300 shadow-md"
          style={{ 
            width: `${cabinetWidth}px`, 
            height: `${cabinetHeight}px`,
            backgroundColor: getCabinetColor()
          }}
        >
          {/* Toe Kick (for base cabinets) */}
          {type === CabinetType.Base && (
            <div 
              className="absolute bottom-0 left-0 bg-gray-800"
              style={{ 
                width: `${cabinetWidth}px`, 
                height: `${toeKickHeight}px`, 
                transform: `translateY(${toeKickHeight/2}px)`,
                opacity: 0.8
              }}
            ></div>
          )}
          
          {/* Face Frame (if enabled) */}
          {hasFaceFrame && (
            <div className="absolute inset-0">
              {/* Left Stile */}
              <div 
                className="absolute left-0 top-0 bottom-0"
                style={{ 
                  width: `${frameThickness}px`, 
                  backgroundColor: faceFrame.material === 'Hardwood' ? '#9C6644' : getCabinetColor(),
                  opacity: 0.9
                }}
              ></div>
              
              {/* Right Stile */}
              <div 
                className="absolute right-0 top-0 bottom-0"
                style={{ 
                  width: `${frameThickness}px`, 
                  backgroundColor: faceFrame.material === 'Hardwood' ? '#9C6644' : getCabinetColor(),
                  opacity: 0.9 
                }}
              ></div>
              
              {/* Top Rail */}
              <div 
                className="absolute left-0 right-0 top-0"
                style={{ 
                  height: `${frameThickness}px`, 
                  backgroundColor: faceFrame.material === 'Hardwood' ? '#9C6644' : getCabinetColor(),
                  opacity: 0.9 
                }}
              ></div>
              
              {/* Bottom Rail */}
              <div 
                className="absolute left-0 right-0 bottom-0"
                style={{ 
                  height: `${frameThickness}px`, 
                  backgroundColor: faceFrame.material === 'Hardwood' ? '#9C6644' : getCabinetColor(),
                  opacity: 0.9 
                }}
              ></div>
              
              {/* Center Stile (if 2 doors) */}
              {doorConfig.doorCount > 1 && (
                <div 
                  className="absolute top-0 bottom-0"
                  style={{ 
                    width: `${frameThickness}px`, 
                    left: `${cabinetWidth/2 - frameThickness/2}px`,
                    backgroundColor: faceFrame.material === 'Hardwood' ? '#9C6644' : getCabinetColor(),
                    opacity: 0.9 
                  }}
                ></div>
              )}
              
              {/* Middle Rail (if drawers) */}
              {drawerConfig.drawerCount > 0 && (
                <div 
                  className="absolute left-0 right-0"
                  style={{ 
                    height: `${frameThickness}px`, 
                    bottom: `${(drawerConfig.drawerHeight / dimensions.height) * cabinetHeight}px`,
                    backgroundColor: faceFrame.material === 'Hardwood' ? '#9C6644' : getCabinetColor(),
                    opacity: 0.9 
                  }}
                ></div>
              )}
            </div>
          )}
          
          {/* Doors */}
          {doorConfig.doorCount > 0 && (
            <div className="absolute top-0 left-0 right-0" style={{ height: `${doorHeight}px` }}>
              {doorConfig.doorCount === 1 ? (
                <div
                  className="absolute border border-amber-700 shadow-sm"
                  style={{
                    left: hasFaceFrame ? `${frameThickness}px` : '0',
                    top: hasFaceFrame ? `${frameThickness}px` : '0',
                    width: `${doorWidth}px`,
                    height: `${doorHeight - (hasFaceFrame ? frameThickness * 2 : 0)}px`,
                    backgroundColor: getDoorColor()
                  }}
                >
                  {doorConfig.style === DoorStyle.Shaker && (
                    <div className="absolute inset-4 border-2 border-amber-900 bg-amber-50 bg-opacity-20"></div>
                  )}
                </div>
              ) : (
                <>
                  {/* Left Door */}
                  <div
                    className="absolute border border-amber-700 shadow-sm"
                    style={{
                      left: hasFaceFrame ? `${frameThickness}px` : '0',
                      top: hasFaceFrame ? `${frameThickness}px` : '0',
                      width: `${doorWidth}px`,
                      height: `${doorHeight - (hasFaceFrame ? frameThickness * 2 : 0)}px`,
                      backgroundColor: getDoorColor()
                    }}
                  >
                    {doorConfig.style === DoorStyle.Shaker && (
                      <div className="absolute inset-4 border-2 border-amber-900 bg-amber-50 bg-opacity-20"></div>
                    )}
                  </div>
                  
                  {/* Right Door */}
                  <div
                    className="absolute border border-amber-700 shadow-sm"
                    style={{
                      right: hasFaceFrame ? `${frameThickness}px` : '0',
                      top: hasFaceFrame ? `${frameThickness}px` : '0',
                      width: `${doorWidth}px`,
                      height: `${doorHeight - (hasFaceFrame ? frameThickness * 2 : 0)}px`,
                      backgroundColor: getDoorColor()
                    }}
                  >
                    {doorConfig.style === DoorStyle.Shaker && (
                      <div className="absolute inset-4 border-2 border-amber-900 bg-amber-50 bg-opacity-20"></div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Drawers */}
          {drawerConfig.drawerCount > 0 && (
            <div className="absolute bottom-0 left-0 right-0" style={{ 
              height: `${(drawerConfig.drawerHeight / dimensions.height) * cabinetHeight}px`,
              marginBottom: hasFaceFrame ? `${frameThickness}px` : '0'
            }}>
              <div
                className="absolute border border-amber-700 shadow-sm"
                style={{
                  left: hasFaceFrame ? `${frameThickness}px` : '0',
                  bottom: '0',
                  width: `${cabinetWidth - (hasFaceFrame ? frameThickness * 2 : 0)}px`,
                  height: `${(drawerConfig.drawerHeight / dimensions.height) * cabinetHeight - (hasFaceFrame ? frameThickness : 0)}px`,
                  backgroundColor: getDrawerColor()
                }}
              >
                {/* Drawer handle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CabinetPreview;