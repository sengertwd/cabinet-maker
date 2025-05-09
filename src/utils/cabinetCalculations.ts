import { Cabinet, CabinetType, CutItem, SheetLayout, MaterialSettings } from '../types/cabinet';

export const generateCutList = (cabinet: Cabinet): CutItem[] => {
  const cutList: CutItem[] = [];
  const { dimensions, type, construction, faceFrame, doorConfig, drawerConfig } = cabinet;
  
  // Helper function to add an item to the cut list
  const addItem = (
    name: string,
    quantity: number,
    width: number,
    length: number,
    thickness: number,
    material: string,
    grain?: 'length' | 'width' | 'none',
    notes?: string
  ) => {
    cutList.push({
      name,
      quantity,
      width,
      length,
      thickness,
      material,
      grain,
      notes
    });
  };
  
  // Cabinet box components
  // Bottom panel
  addItem(
    'Bottom Panel',
    1,
    dimensions.depth - (construction.useDado ? construction.materialThickness : 0),
    dimensions.width - (construction.useDado ? construction.materialThickness * 2 : 0),
    construction.materialThickness,
    construction.material,
    'none'
  );
  
  // Top panel (if not a base cabinet or if it has a top)
  addItem(
    'Top Panel',
    1,
    dimensions.depth - (construction.useDado ? construction.materialThickness : 0),
    dimensions.width - (construction.useDado ? construction.materialThickness * 2 : 0),
    construction.materialThickness,
    construction.material,
    'none'
  );
  
  // Side panels
  const sideHeight = dimensions.height - construction.materialThickness;
  addItem(
    'Side Panel',
    2,
    dimensions.depth,
    type === CabinetType.Base ? sideHeight - dimensions.toeKickHeight : sideHeight,
    construction.materialThickness,
    construction.material,
    'length',
    construction.useDado ? 'Includes dados for shelves' : ''
  );
  
  // Back panel
  addItem(
    'Back Panel',
    1,
    dimensions.width - (construction.useDado ? construction.materialThickness * 2 : 0),
    type === CabinetType.Base ? dimensions.height - dimensions.toeKickHeight - construction.materialThickness : dimensions.height - construction.materialThickness,
    construction.materialThickness / 2, // Often thinner
    construction.material,
    'none'
  );
  
  // Shelves (assuming one middle shelf for simplicity)
  addItem(
    'Shelf',
    1,
    dimensions.depth - 1, // Setback for easier access
    dimensions.width - (construction.useDado ? construction.materialThickness * 2 : 0),
    construction.materialThickness,
    construction.material,
    'none'
  );
  
  // Toe kick supports for base cabinets
  if (type === CabinetType.Base) {
    // Front and back toe kick supports
    addItem(
      'Toe Kick Support',
      2,
      dimensions.toeKickHeight,
      dimensions.width - construction.materialThickness * 2,
      construction.materialThickness,
      construction.material,
      'none'
    );
  }
  
  // Stretchers if enabled
  if (construction.useStretchers) {
    // Front and back stretchers
    addItem(
      'Stretcher',
      2,
      construction.stretcherWidth,
      dimensions.width - (construction.materialThickness * 2),
      construction.stretcherThickness,
      construction.material,
      'length'
    );
  }
  
  // Face frame components if enabled
  if (faceFrame.enabled) {
    // Stiles (vertical members)
    addItem(
      'Face Frame Stile',
      2,
      faceFrame.stileWidth,
      dimensions.height - (type === CabinetType.Base ? dimensions.toeKickHeight : 0),
      faceFrame.thickness,
      faceFrame.material,
      'length'
    );
    
    // Rails (horizontal members) - top and bottom
    addItem(
      'Face Frame Rail',
      2,
      faceFrame.railWidth,
      dimensions.width - (faceFrame.stileWidth * 2),
      faceFrame.thickness,
      faceFrame.material,
      'width'
    );
    
    // Center stile for double door cabinets
    if (doorConfig.doorCount > 1) {
      addItem(
        'Face Frame Center Stile',
        1,
        faceFrame.stileWidth,
        dimensions.height - (type === CabinetType.Base ? dimensions.toeKickHeight : 0) - (faceFrame.railWidth * 2),
        faceFrame.thickness,
        faceFrame.material,
        'length'
      );
    }
    
    // Middle rail for drawer section
    if (drawerConfig.drawerCount > 0) {
      addItem(
        'Face Frame Middle Rail',
        1,
        faceFrame.railWidth,
        dimensions.width - (faceFrame.stileWidth * 2),
        faceFrame.thickness,
        faceFrame.material,
        'width'
      );
    }
  }
  
  // Door components
  if (doorConfig.doorCount > 0) {
    const doorWidth = doorConfig.doorCount === 1 
      ? dimensions.width - (faceFrame.enabled ? faceFrame.stileWidth * 2 + (doorConfig.overlay ? -doorConfig.overlayAmount * 2 : 0) : 0)
      : (dimensions.width - (faceFrame.enabled ? faceFrame.stileWidth * 3 + (doorConfig.overlay ? -doorConfig.overlayAmount * 2 : 0) : 0)) / 2;
    
    const doorHeight = dimensions.height - (type === CabinetType.Base ? dimensions.toeKickHeight : 0) - 
      (faceFrame.enabled ? faceFrame.railWidth * 2 + (doorConfig.overlay ? -doorConfig.overlayAmount * 2 : 0) : 0) -
      (drawerConfig.drawerCount > 0 ? drawerConfig.drawerHeight + (faceFrame.enabled ? faceFrame.railWidth : 0) : 0);
    
    switch (doorConfig.style) {
      case 'Shaker':
        // Stiles (vertical members)
        addItem(
          'Door Stile',
          doorConfig.doorCount * 2,
          doorConfig.stileWidth,
          doorHeight,
          doorConfig.doorThickness,
          doorConfig.material,
          'length'
        );
        
        // Rails (horizontal members)
        addItem(
          'Door Rail',
          doorConfig.doorCount * 2,
          doorConfig.railWidth,
          doorWidth - (doorConfig.stileWidth * 2),
          doorConfig.doorThickness,
          doorConfig.material,
          'width'
        );
        
        // Center panel
        addItem(
          'Door Panel',
          doorConfig.doorCount,
          doorHeight - (doorConfig.railWidth * 2),
          doorWidth - (doorConfig.stileWidth * 2),
          doorConfig.panelThickness,
          doorConfig.material === 'Hardwood' ? 'Plywood' : doorConfig.material,
          'none'
        );
        break;
        
      case 'Slab':
        // Simple slab door
        addItem(
          'Door Slab',
          doorConfig.doorCount,
          doorHeight,
          doorWidth,
          doorConfig.doorThickness,
          doorConfig.material,
          'length'
        );
        break;
        
      // Add other door styles as needed
      default:
        // Default to slab
        addItem(
          'Door',
          doorConfig.doorCount,
          doorHeight,
          doorWidth,
          doorConfig.doorThickness,
          doorConfig.material,
          'length'
        );
    }
  }
  
  // Drawer components
  if (drawerConfig.drawerCount > 0) {
    const drawerWidth = dimensions.width - (faceFrame.enabled ? faceFrame.stileWidth * 2 + (doorConfig.overlay ? -doorConfig.overlayAmount * 2 : 0) : 0);
    
    // Drawer fronts
    addItem(
      'Drawer Front',
      drawerConfig.drawerCount,
      drawerConfig.drawerHeight,
      drawerWidth,
      drawerConfig.drawerFrontThickness,
      drawerConfig.drawerFrontMaterial,
      'width'
    );
    
    if (!drawerConfig.usePremadeDrawerboxes) {
      // Drawer sides
      addItem(
        'Drawer Side',
        drawerConfig.drawerCount * 2,
        drawerConfig.drawerHeight - drawerConfig.drawerboxThickness,
        dimensions.depth - 1, // Slight setback
        drawerConfig.drawerboxThickness,
        drawerConfig.drawerboxMaterial,
        'length'
      );
      
      // Drawer front/back pieces
      addItem(
        'Drawer Front/Back',
        drawerConfig.drawerCount * 2,
        drawerConfig.drawerHeight - drawerConfig.drawerboxThickness,
        drawerWidth - (drawerConfig.drawerboxThickness * 2) - (drawerConfig.drawerSlideType === 'Side-Mount' ? 1 : 0),
        drawerConfig.drawerboxThickness,
        drawerConfig.drawerboxMaterial,
        'width'
      );
      
      // Drawer bottom
      addItem(
        'Drawer Bottom',
        drawerConfig.drawerCount,
        dimensions.depth - 1.5,
        drawerWidth - (drawerConfig.drawerboxThickness * 2) - (drawerConfig.drawerSlideType === 'Side-Mount' ? 1 : 0),
        0.25, // Standard 1/4" bottom
        drawerConfig.drawerboxMaterial === 'Solid Wood' ? 'Plywood' : drawerConfig.drawerboxMaterial,
        'none'
      );
    }
  }
  
  return cutList;
};

// Simple implementation of sheet layout optimization
// In a real application, this would use a more sophisticated bin packing algorithm
export const optimizeCutLayout = (cutList: CutItem[], materialSettings: MaterialSettings): SheetLayout[] => {
  const { sheetGoodsWidth, sheetGoodsLength } = materialSettings;
  const layouts: SheetLayout[] = [];
  
  // Group items by material and thickness
  const materialGroups: Record<string, CutItem[]> = {};
  
  cutList.forEach(item => {
    const key = `${item.material}-${item.thickness}`;
    if (!materialGroups[key]) {
      materialGroups[key] = [];
    }
    
    // Duplicate items based on quantity
    for (let i = 0; i < item.quantity; i++) {
      materialGroups[key].push({...item, quantity: 1});
    }
  });
  
  // For each material group, create sheet layouts
  Object.entries(materialGroups).forEach(([key, items]) => {
    // Sort items by area (largest first)
    items.sort((a, b) => (b.width * b.length) - (a.width * a.length));
    
    let currentSheet: SheetLayout = {
      sheetWidth: sheetGoodsWidth,
      sheetLength: sheetGoodsLength,
      items: [],
      efficiency: 0
    };
    
    let currentX = 0;
    let currentY = 0;
    let rowHeight = 0;
    
    // Simple next-fit decreasing height algorithm
    items.forEach(item => {
      // Check if item will fit in the current row
      const rotated = item.width > item.length;
      const itemWidth = rotated ? item.length : item.width;
      const itemLength = rotated ? item.width : item.length;
      
      // If it doesn't fit in the current position, move to next row or sheet
      if (currentX + itemLength > sheetGoodsLength) {
        currentX = 0;
        currentY += rowHeight;
        rowHeight = 0;
      }
      
      // If it doesn't fit in the current sheet, create a new sheet
      if (currentY + itemWidth > sheetGoodsWidth) {
        // Calculate efficiency of current sheet
        const usedArea = currentSheet.items.reduce((sum, i) => {
          return sum + (i.rotated ? i.item.width * i.item.length : i.item.length * i.item.width);
        }, 0);
        currentSheet.efficiency = usedArea / (sheetGoodsWidth * sheetGoodsLength);
        
        layouts.push(currentSheet);
        
        // Start a new sheet
        currentSheet = {
          sheetWidth: sheetGoodsWidth,
          sheetLength: sheetGoodsLength,
          items: [],
          efficiency: 0
        };
        
        currentX = 0;
        currentY = 0;
        rowHeight = 0;
      }
      
      // Add item to current position
      currentSheet.items.push({
        item,
        x: currentX,
        y: currentY,
        rotated
      });
      
      // Update position
      currentX += itemLength;
      rowHeight = Math.max(rowHeight, itemWidth);
    });
    
    // Add the last sheet if it has items
    if (currentSheet.items.length > 0) {
      const usedArea = currentSheet.items.reduce((sum, i) => {
        return sum + (i.rotated ? i.item.width * i.item.length : i.item.length * i.item.width);
      }, 0);
      currentSheet.efficiency = usedArea / (sheetGoodsWidth * sheetGoodsLength);
      
      layouts.push(currentSheet);
    }
  });
  
  return layouts;
};