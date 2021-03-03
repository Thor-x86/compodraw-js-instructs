import Group from "./Group";
import GradientPointsType from "./GradientPointsType";

/**
 * Fills linear gradient color to the containing shape
 */
export class GradientLinear extends Group {
  /** Value in pixels */
  startX: number = 0;

  /** Value in pixels */
  startY: number = 0;

  /** Value in pixels */
  endX: number = 100;

  /** Value in pixels */
  endY: number = 100;

  /**
   * Position of colors, indices are
   * between 0.0 and 1.0
   *
   * @example
   * {
   *     0.00 : "yellow",
   *     0.64 : "#7f3ad7",
   *     1.00 : "rgba(128,100,128,0.5)"
   * }
   */
  points: GradientPointsType = {
    0.0: "#000000",
    1.0: "#ffffff",
  };

  draw(canvasCtx: CanvasRenderingContext2D) {
    super.draw(canvasCtx);
    canvasCtx.clip("nonzero");

    const originX = canvasCtx.getTransform().e;
    const originY = canvasCtx.getTransform().f;

    const gradient = canvasCtx.createLinearGradient(
      this.startX,
      this.startY,
      this.endX,
      this.endY
    );

    for (const eachIndex in this.points) {
      const eachColor = this.points[eachIndex];
      gradient.addColorStop(Number(eachIndex), eachColor);
    }

    canvasCtx.fillStyle = gradient;
    canvasCtx.fillRect(
      -originX,
      -originY,
      canvasCtx.canvas.width,
      canvasCtx.canvas.height
    );
  }
}

export default GradientLinear;
