import Group from "./Group";

/**
 * Add offset as big as (x, y) point
 */
export class Move extends Group {
  /** X axis relative to current offset (not absolute), in pixels */
  x: number = 0;

  /** Y axis relative to current offset (not absolute), in pixels */
  y: number = 0;

  draw(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.translate(this.x, this.y);
    super.draw(canvasCtx);
  }
}

export default Move;
