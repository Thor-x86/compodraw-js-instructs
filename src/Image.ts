import { Instruct } from "compodraw";

/**
 * Draw a fully loaded image,
 * you have to make sure the source is
 * completely downloaded before draw
 */
export class Image implements Instruct {
  /** Fully loaded SVG, image DOM, or bitmap */
  source?: CanvasImageSource;

  /** Value in pixels */
  x: number = 0;

  /** Value in pixels */
  y: number = 0;

  /**
   * Value in pixels,
   * set NaN to use original width
   */
  width: number = NaN;

  /**
   * Value in pixels,
   * set NaN to use original height
   */
  height: number = NaN;

  draw(canvasCtx: CanvasRenderingContext2D) {
    // Don't draw if there is no bitmap
    if (this.source == undefined) return;

    const width = isNaN(this.width) ? this.originalWidth : this.width;

    const height = isNaN(this.height) ? this.originalHeight : this.height;

    canvasCtx.drawImage(this.source, this.x, this.y, width, height);
  }

  get originalWidth(): number {
    if (this.source == undefined) return NaN;

    const orig = this.source.width;
    if (typeof orig === "number") {
      return orig;
    } else {
      return orig.animVal.SVG_LENGTHTYPE_PX;
    }
  }

  get originalHeight(): number {
    if (this.source == undefined) return NaN;

    const orig = this.source.height;
    if (typeof orig === "number") {
      return orig;
    } else {
      return orig.animVal.SVG_LENGTHTYPE_PX;
    }
  }
}

export default Image;
