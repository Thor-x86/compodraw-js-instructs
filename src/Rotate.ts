import Group from "./Group";

/**
 * Add angle of rotation with specified center point
 **/
export class Rotate extends Group {
  /** Value in degrees (0 - 359) */
  angle: number = 0;

  /** X axis center point, in pixels */
  x: number = 0;

  /** Y axis center point, in pixels */
  y: number = 0;

  draw(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.translate(this.x, this.y);

    const radian = (this.angle * Math.PI) / 180;
    canvasCtx.rotate(radian);

    canvasCtx.translate(-this.x, -this.y);

    super.draw(canvasCtx);
  }
}

export default Rotate;
