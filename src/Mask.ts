import Group from "./Group";
import { Instruct } from "compodraw";

/**
 * Like crop but you can use custom shape
 */
export class Mask extends Group {
  /** Custom shape, set null to deactivate masking */
  shape: Instruct | null = null;

  /** If true, transparent color exist at intersection */
  allowIntersect: boolean = false;

  draw(canvasCtx: CanvasRenderingContext2D) {
    if (this.shape && typeof this.draw == "function") {
      // @ts-ignore
      this.shape.color = "transparent";
      this.shape.draw(canvasCtx);
      const clipRule = this.allowIntersect ? "evenodd" : "nonzero";
      canvasCtx.clip(clipRule);
    }
    super.draw(canvasCtx);
  }
}

export default Mask;
