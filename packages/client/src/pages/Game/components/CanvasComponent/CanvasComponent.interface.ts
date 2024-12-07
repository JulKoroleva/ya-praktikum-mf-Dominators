export interface ICircle extends ICoords, IDeformationCoords {
  StrokeStyle?: string;
  ColorFill?: string;
  LineWidth?: number;
  Radius: number;
}

export interface ICoords {
  X: number;
  Y: number;
}
export interface IDeformationCoords {
  DeformationX?: number;
  DeformationY?: number;
}
export enum STATUS {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
}
