import Group from "./Group";

/**
 * Like shadow, but you just have to set depth
 * value to create realistic drop shadow
 */
export class Elevate extends Group {
  /** Z axis depth perception, in pixels */
  depth: number = 4;

  /** Angle of incoming light in degrees, 0 is from above */
  angle: number = 0;

  draw(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.shadowColor = "rgba(0,0,0,0.32)";
    canvasCtx.shadowBlur = this.depth + 1;

    const radian: number = this.angle * (Math.PI / 180);
    const offset: number = (this.depth + 1) * 0.5;
    canvasCtx.shadowOffsetX = Math.sin(radian / 2) * offset;
    canvasCtx.shadowOffsetY = Math.abs(Math.cos(radian) * offset);

    super.draw(canvasCtx);
  }
}

export default Elevate;
