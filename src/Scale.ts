import Group from "./Group";

/**
 * Multiple the size of drawn graphics
 */
export class Scale extends Group {
  /** Value in fraction */
  x: number = 1;

  /** Value in fraction */
  y: number = 1;

  draw(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.scale(this.x, this.y);
    super.draw(canvasCtx);
  }
}

export default Scale;
