import { Instruct } from "compodraw";

/**
 * Draw an ellipse outline
 */
export class EllipseStroke implements Instruct {
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

  /** Value in pixels */
  thickness: number = 1;

  draw(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.lineWidth = this.thickness;
    canvasCtx.strokeStyle = this.color;
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
    canvasCtx.stroke();
  }
}

export default EllipseStroke;
