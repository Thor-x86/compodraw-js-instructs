import { Instruct } from "compodraw";

/**
 * Draw a rectangle outline
 */
export class RectangleStroke implements Instruct {
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

  /** Set to true for sharp edges */
  sharp: boolean = false;

  draw(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.lineWidth = this.thickness;
    canvasCtx.lineCap = this.sharp ? "square" : "round";
    canvasCtx.lineJoin = this.sharp ? "miter" : "round";
    canvasCtx.strokeStyle = this.color;

    canvasCtx.beginPath();
    canvasCtx.rect(this.x, this.y, this.width, this.height);
    canvasCtx.closePath();
    canvasCtx.stroke();
  }
}

export default RectangleStroke;
