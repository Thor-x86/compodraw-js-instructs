import Group from "./Group";

/**
 * Set transparency of specific drawing
 */
export class Transparent extends Group {
  /** in fraction between 0.0 and 1.0 */
  value: number = 1;

  draw(canvasCtx: CanvasRenderingContext2D) {
    this.value = Math.max(0, Math.min(this.value, 1));
    canvasCtx.globalAlpha = this.value;
    super.draw(canvasCtx);
  }
}

export default Transparent;
