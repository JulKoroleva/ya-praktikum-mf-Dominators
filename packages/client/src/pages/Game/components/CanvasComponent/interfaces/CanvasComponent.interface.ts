export interface ICircle extends ICoords, IDeformationCoords {
  id: string;
  StrokeStyle?: string;
  ColorFill?: string;
  ImageFill?: HTMLImageElement;
  LineWidth?: number;
  Radius: number;
  Speed: number;
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
