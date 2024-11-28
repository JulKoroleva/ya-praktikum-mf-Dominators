export interface ICircle extends ICoords {
  StrokeStyle?: string;
  ColorFill?: string;
  LineWidth?: number;
  Radius: number;
}

export interface ICoords {
  X: number;
  Y: number;
}

export enum STATUS {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
}
