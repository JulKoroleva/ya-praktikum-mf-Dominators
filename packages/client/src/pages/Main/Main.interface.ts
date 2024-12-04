export interface IButtonConfig {
  href: string;
  text: string;
  className?: string;
}

export interface IParticle {
  position: { x: number; y: number };
  size: { value: number };
  getRadius: () => number;
  destroy: () => void;
}
