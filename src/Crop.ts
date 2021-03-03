import Group from "./Group";

/**
 * The fast way to remove excessive drawing.
 * If you want cut other than in square,
 * use Mask instead.
 */
export class Crop extends Group {
  /** X axis relative to current offset, in pixels */
  x: number = 0;

  /** Y axis relative to current offset, in pixels */
  y: number = 0;

  /** Value in pixels */
  width: number = 128;

  /** Value in pixels */
  height: number = 128;

  draw(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.beginPath();
    canvasCtx.rect(this.x, this.y, this.width, this.height);
    canvasCtx.clip();

    // Context clean-up
    canvasCtx.closePath();
    canvasCtx.fillStyle = "";

    super.draw(canvasCtx);
  }
}

export default Crop;
