export enum CabinetType {
  Base = 'Base',
  Wall = 'Wall',
}

export enum DoorStyle {
  Slab = 'Slab',
  Shaker = 'Shaker',
  RaisedPanel = 'Raised Panel',
  Beadboard = 'Beadboard',
  Glass = 'Glass Panel',
}

export interface CabinetDimensions {
  width: number;      // Overall width in inches
  height: number;     // Overall height in inches
  depth: number;      // Overall depth in inches
  toeKickHeight: number;
  toeKickDepth: number;
}

export const defaultDimensions: CabinetDimensions = {
  width: 30,
  height: 34.5,
  depth: 24,
  toeKickHeight: 4,
  toeKickDepth: 3,
};

export interface Construction {
  useDado: boolean;
  dadoDepth: number;
  useStretchers: boolean;
  stretcherWidth: number;
  stretcherThickness: number;
  material: string;
  materialThickness: number;
}

export interface FaceFrame {
  enabled: boolean;
  stileWidth: number;
  railWidth: number;
  thickness: number;
  overhang: number;
  material: string;
}

export interface DoorConfig {
  style: DoorStyle;
  overlay: boolean;
  overlayAmount: number;
  doorCount: number;
  hingeType: string;
  railWidth: number;
  stileWidth: number;
  panelThickness: number;
  doorThickness: number;
  material: string;
}

export interface DrawerConfig {
  drawerCount: number;
  drawerHeight: number;
  drawerboxMaterial: string;
  drawerboxThickness: number;
  drawerSlideType: string;
  drawerFrontThickness: number;
  drawerFrontMaterial: string;
}

export interface MaterialSettings {
  sheetGoodsWidth: number;
  sheetGoodsLength: number;
  sheetGoodsThickness: number;
  edgeBandingWidth: number;
  usePremadeDrawerboxes: boolean;
}

export interface Cabinet {
  type: CabinetType;
  dimensions: CabinetDimensions;
  construction: Construction;
  faceFrame: FaceFrame;
  doorConfig: DoorConfig;
  drawerConfig: DrawerConfig;
  materialSettings: MaterialSettings;
}

export interface CutItem {
  name: string;
  quantity: number;
  width: number;
  length: number;
  thickness: number;
  material: string;
  grain?: 'length' | 'width' | 'none';
  notes?: string;
}

export interface SheetLayout {
  sheetWidth: number;
  sheetLength: number;
  items: Array<{
    item: CutItem;
    x: number;
    y: number;
    rotated: boolean;
  }>;
  efficiency: number;
}