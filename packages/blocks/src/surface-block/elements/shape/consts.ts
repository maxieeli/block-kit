import { createZodUnion } from '../../../_common/utils/index.js';
import type { StrokeStyle } from '../../consts.js';

export enum ShapeType {
  Rect = 'rect',
  Triangle = 'triangle',
  Ellipse = 'ellipse',
  Diamond = 'diamond',
}

export enum SHAPE_TEXT_FONT_SIZE {
  SMALL = 12,
  MEDIUM = 20,
  LARGE = 28,
  XLARGE = 36,
}

export interface GeneralShapeOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth: number;
  strokeColor: string;
  fillColor: string;
  strokeStyle: StrokeStyle;
  radius?: number;
}

export const FILL_COLORS = [
  '--workbench-palette-transparent',
  '--workbench-palette-shape-yellow',
  '--workbench-palette-shape-orange',
  '--workbench-palette-shape-red',
  '--workbench-palette-shape-magenta',
  '--workbench-palette-shape-purple',
  '--workbench-palette-shape-blue',
  '--workbench-palette-shape-teal',
  '--workbench-palette-shape-green',
  '--workbench-palette-shape-black',
  '--workbench-palette-shape-grey',
  '--workbench-palette-shape-white',
] as const;

export const DEFAULT_SHAPE_FILL_COLOR = FILL_COLORS[1];

export const FillColorsSchema = createZodUnion(FILL_COLORS);

export const STROKE_COLORS = [
  '--workbench-palette-transparent',
  '--workbench-palette-line-yellow',
  '--workbench-palette-line-orange',
  '--workbench-palette-line-red',
  '--workbench-palette-line-magenta',
  '--workbench-palette-line-purple',
  '--workbench-palette-line-blue',
  '--workbench-palette-line-teal',
  '--workbench-palette-line-green',
  '--workbench-palette-line-black',
  '--workbench-palette-line-grey',
  '--workbench-palette-line-white',
] as const;

export const DEFAULT_SHAPE_STROKE_COLOR = STROKE_COLORS[1];

export const DEFAULT_SHAPE_TEXT_COLOR = STROKE_COLORS[9];

export const StrokeColorsSchema = createZodUnion(STROKE_COLORS);
