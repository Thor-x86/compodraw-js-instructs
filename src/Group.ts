import { Instruct } from "compodraw";

/**
 * Stacks multiple instructions into one
 */
export class Group implements Instruct {
  /** Instruction with biggest index will be at the front of everything else */
  content: Instruct[] = [];

  draw(canvasCtx: CanvasRenderingContext2D) {
    // Making sure content is array
    if (!Array.isArray(this.content) || typeof this.content == "string") return;

    for (let i = 0; i < this.content.length; i++) {
      const each = this.content[i];
      if (!each.draw) continue;

      canvasCtx.save();
      each.draw(canvasCtx);
      canvasCtx.restore();
    }
  }
}

export default Group;
