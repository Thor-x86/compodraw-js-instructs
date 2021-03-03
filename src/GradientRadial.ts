import Group from "./Group";
import GradientPointsType from "./GradientPointsType";

/**
 * Fills radial gradient color to the containing shape
 */
export class GradientRadial extends Group {
  /** Value in pixels */
  x: number = 0;

  /** Value in pixels */
  y: number = 0;

  /** Value in pixels */
  radius: number = 100;

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

    const gradient = canvasCtx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
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

export default GradientRadial;
