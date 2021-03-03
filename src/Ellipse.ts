import { Instruct } from "compodraw";

/**
 * Draw an ellipse shape
 */
export class Ellipse implements Instruct {
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
    canvasCtx.ellipse(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.width / 2,
      this.height / 2,
      0,
      0,
      Math.PI * 2
    );
    canvasCtx.closePath();
    canvasCtx.fill();
  }
}

export default Ellipse;
