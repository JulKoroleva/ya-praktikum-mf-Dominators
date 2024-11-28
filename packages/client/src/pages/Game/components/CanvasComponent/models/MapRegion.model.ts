import { MAP_SIZE } from '@/constants/game';

/** если будет карта в линейку - это временно. Сейчас там проще дебажить движения по карте */
export class MapRegionModel {
  public readonly Width = MAP_SIZE;
  public readonly Height = MAP_SIZE;
  public ImageSrc: CanvasImageSource;

  constructor(imgSrc?: string) {
    const img = new Image();
    img.src = imgSrc || 'https://i.playground.ru/p/n10cqgq93L0vI_X-2os-gQ.jpeg';
    this.ImageSrc = img;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.ImageSrc, 0, 0, MAP_SIZE, MAP_SIZE);
  }
}
