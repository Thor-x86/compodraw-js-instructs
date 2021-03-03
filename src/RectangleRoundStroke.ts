import { Instruct } from "compodraw";

/**
 * Draw a rounded rectangle outline
 */
export class RectangleRoundStroke implements Instruct {
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
  cornerRadius: number = 16;

  /** Value in pixels */
  thickness: number = 1;

  draw(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.strokeStyle = this.color;
    canvasCtx.lineWidth = this.thickness;

    // Prevents jank caused by oversized corner radius
    this.cornerRadius = Math.min(
      this.cornerRadius,
      this.width / 2,
      this.height / 2
    );

    canvasCtx.beginPath();
    canvasCtx.moveTo(this.x + this.cornerRadius, this.y);
    canvasCtx.lineTo(this.x + this.width - this.cornerRadius, this.y);
    canvasCtx.quadraticCurveTo(
      this.x + this.width,
      this.y,
      this.x + this.width,
      this.y + this.cornerRadius
    );
    canvasCtx.lineTo(
      this.x + this.width,
      this.y + this.height - this.cornerRadius
    );
    canvasCtx.quadraticCurveTo(
      this.x + this.width,
      this.y + this.height,
      this.x + this.width - this.cornerRadius,
      this.y + this.height
    );
    canvasCtx.lineTo(this.x + this.cornerRadius, this.y + this.height);
    canvasCtx.quadraticCurveTo(
      this.x,
      this.y + this.height,
      this.x,
      this.y + this.height - this.cornerRadius
    );
    canvasCtx.lineTo(this.x, this.y + this.cornerRadius);
    canvasCtx.quadraticCurveTo(
      this.x,
      this.y,
      this.x + this.cornerRadius,
      this.y
    );
    canvasCtx.closePath();
    canvasCtx.stroke();
  }
}

export default RectangleRoundStroke;
