import Text from "./Text";

/**
 * Draw outlined multiline or
 * a single line of text
 */
export class TextStroke extends Text {
  /** Value in pixels */
  thickness: number = 1;

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
    canvasCtx.strokeStyle = this.color;
    canvasCtx.lineWidth = this.thickness;
    for (let i = 0; i < lines.length; i++) {
      const eachLine = lines[i];
      canvasCtx.strokeText(eachLine, this.x + offsetX, this.y + this.size * i);
    }
  }
}

export default TextStroke;

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
