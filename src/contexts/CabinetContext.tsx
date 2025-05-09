import React, { createContext, useContext, useState } from 'react';
import { 
  Cabinet, 
  CabinetType, 
  DoorStyle, 
  CabinetDimensions, 
  Construction, 
  FaceFrame, 
  DoorConfig, 
  DrawerConfig,
  MaterialSettings,
  defaultDimensions
} from '../types/cabinet';

interface CabinetContextType {
  cabinet: Cabinet;
  updateCabinetType: (type: CabinetType) => void;
  updateDimensions: (dimensions: Partial<CabinetDimensions>) => void;
  updateConstruction: (construction: Partial<Construction>) => void;
  updateFaceFrame: (faceFrame: Partial<FaceFrame>) => void;
  updateDoorConfig: (doorConfig: Partial<DoorConfig>) => void;
  updateDrawerConfig: (drawerConfig: Partial<DrawerConfig>) => void;
  updateMaterialSettings: (materialSettings: Partial<MaterialSettings>) => void;
  reset: () => void;
}

const defaultCabinet: Cabinet = {
  type: CabinetType.Base,
  dimensions: defaultDimensions,
  construction: {
    useDado: true,
    dadoDepth: 0.375, // 3/8"
    useStretchers: true,
    stretcherWidth: 2.5,
    stretcherThickness: 0.75,
    material: 'Plywood',
    materialThickness: 0.75,
  },
  faceFrame: {
    enabled: true,
    stileWidth: 1.5,
    railWidth: 1.5,
    thickness: 0.75,
    overhang: 0.25,
    material: 'Hardwood',
  },
  doorConfig: {
    style: DoorStyle.Shaker,
    overlay: true,
    overlayAmount: 0.5,
    doorCount: 2,
    hingeType: 'Concealed',
    railWidth: 2.25,
    stileWidth: 2.25,
    panelThickness: 0.25,
    doorThickness: 0.75,
    material: 'Hardwood',
  },
  drawerConfig: {
    drawerCount: 1,
    drawerHeight: 6,
    drawerboxMaterial: 'Plywood',
    drawerboxThickness: 0.5,
    drawerSlideType: 'Side-Mount',
    drawerFrontThickness: 0.75,
    drawerFrontMaterial: 'Hardwood',
  },
  materialSettings: {
    sheetGoodsWidth: 48,
    sheetGoodsLength: 96,
    sheetGoodsThickness: 0.75,
    edgeBandingWidth: 0.75,
    usePremadeDrawerboxes: false,
  }
};

const CabinetContext = createContext<CabinetContextType | undefined>(undefined);

export const CabinetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cabinet, setCabinet] = useState<Cabinet>(defaultCabinet);

  const updateCabinetType = (type: CabinetType) => {
    setCabinet(prev => ({
      ...prev,
      type,
      // If changing from base to wall, reset some dimensions
      dimensions: type === CabinetType.Wall ? {
        ...prev.dimensions,
        height: 30,
        toeKickHeight: 0,
      } : prev.dimensions
    }));
  };

  const updateDimensions = (dimensions: Partial<CabinetDimensions>) => {
    setCabinet(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        ...dimensions
      }
    }));
  };

  const updateConstruction = (construction: Partial<Construction>) => {
    setCabinet(prev => ({
      ...prev,
      construction: {
        ...prev.construction,
        ...construction
      }
    }));
  };

  const updateFaceFrame = (faceFrame: Partial<FaceFrame>) => {
    setCabinet(prev => ({
      ...prev,
      faceFrame: {
        ...prev.faceFrame,
        ...faceFrame
      }
    }));
  };

  const updateDoorConfig = (doorConfig: Partial<DoorConfig>) => {
    setCabinet(prev => ({
      ...prev,
      doorConfig: {
        ...prev.doorConfig,
        ...doorConfig
      }
    }));
  };

  const updateDrawerConfig = (drawerConfig: Partial<DrawerConfig>) => {
    setCabinet(prev => ({
      ...prev,
      drawerConfig: {
        ...prev.drawerConfig,
        ...drawerConfig
      }
    }));
  };

  const updateMaterialSettings = (materialSettings: Partial<MaterialSettings>) => {
    setCabinet(prev => ({
      ...prev,
      materialSettings: {
        ...prev.materialSettings,
        ...materialSettings
      }
    }));
  };

  const reset = () => {
    setCabinet(defaultCabinet);
  };

  return (
    <CabinetContext.Provider 
      value={{
        cabinet,
        updateCabinetType,
        updateDimensions,
        updateConstruction,
        updateFaceFrame,
        updateDoorConfig,
        updateDrawerConfig,
        updateMaterialSettings,
        reset,
      }}
    >
      {children}
    </CabinetContext.Provider>
  );
};

export const useCabinet = (): CabinetContextType => {
  const context = useContext(CabinetContext);
  if (context === undefined) {
    throw new Error('useCabinet must be used within a CabinetProvider');
  }
  return context;
};