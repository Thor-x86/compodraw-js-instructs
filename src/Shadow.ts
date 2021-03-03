import Group from "./Group";

/**
 * Give customizable shadow effects to drawn graphics
 */
export class Shadow extends Group {
  /** Value in pixels */
  blur: number = 8;

  /**
   * CSS standard color
   *
   * @example
   * color="yellow"
   * color="#7f3ad7"
   * color="rgba(128,100,128,0.5)"
   */
  color: string = "rgba(0,0,0,0.32)";

  /** Value in pixels */
  x: number = 4;

  /** Value in pixels */
  y: number = 4;

  draw(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.shadowBlur = this.blur;
    canvasCtx.shadowColor = this.color;
    canvasCtx.shadowOffsetX = this.x;
    canvasCtx.shadowOffsetY = this.y;

    super.draw(canvasCtx);
  }
}

export default Shadow;
