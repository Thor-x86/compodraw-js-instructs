import { Instruct } from "compodraw";

/**
 * Draw multiline or a single line of text
 * with default fonts.
 */
export class Text implements Instruct {
  /** Text string to be drawn */
  value: string = "";

  /** Value in pixels */
  x: number = 0;

  /** Value in pixels */
  y: number = 0;

  /** Value in pixels */
  size: number = 18;

  /**
   * CSS standard color
   *
   * @example
   * color="yellow"
   * color="#7f3ad7"
   * color="rgba(128,100,128,0.5)"
   */
  color: string = "#000000";

  /**
   * Can be "bold", "italic", or combination
   * of them with pipe (|) as separator
   *
   * @example
   * style="bold|italic" // Combination of bold and italic
   */
  style: string = "";

  /**
   * Align text relatives to width, it can be
   * one of "left", "center", or "right"
   */
  align: "left" | "center" | "right" = "left";

  draw(canvasCtx: CanvasRenderingContext2D) {
    // Normalize font styles
    const splittedStyles = this.style.split("|");
    for (let i = 0; i < splittedStyles.length; i++) {
      splittedStyles[i] = splittedStyles[i].trim();
    }
    const fontStyle = splittedStyles.join(" ");

    // Apply font style and size
    canvasCtx.font = canvasCtx.font.replace(
      /^.*px/,
      `${fontStyle} ${this.size}px`
    );
    canvasCtx.textBaseline = "top";

    // Split into lines of text
    const lines = this.value.split("\n");

    // Find the longest line width, if necessary
    let linesWidth = 0;
    if (this.align != "left") {
      linesWidth = calculateLinesWidth(canvasCtx, lines);
    }

    // Apply align and calculate offsetX
    let offsetX = 0;
    switch (this.align) {
      case "left":
        canvasCtx.textAlign = this.align;
        break;
      case "center":
        canvasCtx.textAlign = this.align;
        offsetX = linesWidth / 2;
        break;
      case "right":
        canvasCtx.textAlign = this.align;
        offsetX = linesWidth;
        break;
      default:
        break;
    }

    // Draw multiline text
    canvasCtx.fillStyle = this.color;
    for (let i = 0; i < lines.length; i++) {
      const eachLine = lines[i];
      canvasCtx.fillText(eachLine, this.x + offsetX, this.y + this.size * i);
    }
  }

  /**
   * Same as value property but with CRLF,
   * just for compatibility purpose
   */
  get content(): string {
    return this.value.replace(/\r/gm, "").replace(/\n/gm, "\r\n");
  }

  /**
   * Use inner text of JSX or XML then
   * make it pretty before store as value
   */
  set content(value: string) {
    value = value.trim().replace(/\r/gm, "");

    this.value = "";

    const lines = value.split("\n");
    let isFirst = true;
    for (const eachLine of lines) {
      if (isFirst) {
        isFirst = false;
      } else {
        this.value += "\n";
      }

      this.value += eachLine.trim();
    }
  }
}

export default Text;

function calculateLinesWidth(
  canvasCtx: CanvasRenderingContext2D,
  lines: string[]
): number {
  let result = 0;
  for (const eachLine of lines) {
    const lineWidth = canvasCtx.measureText(eachLine).width;
    result = Math.max(result, lineWidth);
  }
  return result;
}
