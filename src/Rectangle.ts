import { Instruct } from "compodraw";

/**
 * Draw a rectangle shape
 */
export class Rectangle implements Instruct {
  /** Value in pixels */
  x: number = 0;

  /** Value in pixels */
  y: number = 0;

  /** Value in pixels */
  width: number = 100;

  /** Value in pixels */
  height: number = 100;

  /**
   * CSS standard color
   *
   * @example
   * color="yellow"
   * color="#7f3ad7"
   * color="rgba(128,100,128,0.5)"
   */
  color: string = "#000000";

  draw(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.fillStyle = this.color;
    canvasCtx.beginPath();
    canvasCtx.rect(this.x, this.y, this.width, this.height);
    canvasCtx.closePath();
    canvasCtx.fill();
  }
}

export default Rectangle;
