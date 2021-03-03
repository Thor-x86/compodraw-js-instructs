import Path from "./Path";

/**
 * Draw custom line path based on array of vertices
 *
 * @todo Dynamic color and thickness are not yet working
 */
export class PathStroke extends Path {
  /**
   * Array of vertices
   *
   * @example
   * [
   *     {x: 10, y: 10},
   *     {x: 10, y: 30, smooth: true},
   *     {x: 30, y: 10, color: "#ff0000"}
   * ]
   */
  vertices: PathStrokeVertex[] = [];

  /** Value in pixels */
  thickness: number = 1;

  /** Set to true for sharp edges */
  sharp: boolean = false;

  /** Set true to prevent unconnected path ends */
  autoConnect: boolean = false;

  draw(canvasCtx: CanvasRenderingContext2D) {
    // Making sure vertices valid
    if (!Array.isArray(this.vertices)) return;

    // Skip excessive calculation if array empty
    if (this.vertices.length == 0) return;

    let scaleX = 1;
    if (!isNaN(this.width)) {
      scaleX = this.width / this.originalWidth;
    }

    let scaleY = 1;
    if (!isNaN(this.height)) {
      scaleY = this.height / this.originalHeight;
    }

    canvasCtx.strokeStyle = this.color;
    canvasCtx.lineWidth = this.thickness;
    canvasCtx.lineCap = this.sharp ? "square" : "round";
    canvasCtx.lineJoin = this.sharp ? "miter" : "round";
    canvasCtx.beginPath();

    // Set starting point
    const first = this.vertices[0];
    canvasCtx.moveTo(this.x + first.x * scaleX, this.x + first.y * scaleY);

    for (let iter = 1; iter < this.vertices.length; iter++) {
      const prevVertex = this.vertices[iter - 1];
      const currentVertex = this.vertices[iter];
      if (currentVertex.smooth === true) {
        // CONDITION: Auto-smooth enabled
        if (iter < this.vertices.length - 1) {
          // CONDITION: Auto-smooth enabled and not the last vertex
          const nextVertex = this.vertices[iter + 1];
          const x0 = this.x + currentVertex.x * scaleX;
          const y0 = this.y + currentVertex.y * scaleY;
          const x1 = this.x + nextVertex.x * scaleX;
          const y1 = this.y + nextVertex.y * scaleY;
          canvasCtx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        }
      } else {
        // CONDITION: No auto-smooth, check if bezier exist or not
        const isBezier =
          !isNaN(Number(prevVertex.nextBezierX)) ||
          !isNaN(Number(prevVertex.nextBezierY)) ||
          !isNaN(Number(currentVertex.prevBezierX)) ||
          !isNaN(Number(currentVertex.prevBezierY));
        if (isBezier) {
          // CONDITION: Bezier is exist, draw a custom curve
          let cp1x = isNaN(Number(prevVertex.nextBezierX))
            ? prevVertex.x
            : (prevVertex.nextBezierX as number);
          let cp1y = isNaN(Number(prevVertex.nextBezierY))
            ? prevVertex.y
            : (prevVertex.nextBezierY as number);
          let cp2x = isNaN(Number(currentVertex.prevBezierX))
            ? currentVertex.x
            : (currentVertex.prevBezierX as number);
          let cp2y = isNaN(Number(currentVertex.prevBezierY))
            ? currentVertex.y
            : (currentVertex.prevBezierY as number);
          cp1x = this.x + cp1x * scaleX;
          cp1y = this.y + cp1y * scaleY;
          cp2x = this.x + cp2x * scaleX;
          cp2y = this.y + cp2y * scaleY;
          const endX = this.x + currentVertex.x * scaleX;
          const endY = this.y + currentVertex.y * scaleY;
          canvasCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        } else {
          // CONDITION: Bezier is not exist, draw a straight line
          canvasCtx.lineTo(
            this.x + currentVertex.x * scaleX,
            this.y + currentVertex.y * scaleY
          );
        }
      }
    }

    if (this.autoConnect) {
      canvasCtx.closePath();
      canvasCtx.stroke();
    } else {
      canvasCtx.stroke();
      canvasCtx.closePath();
    }
  }

  /** Stringify back to unparsed vertices */
  get content(): string {
    let result: string = "";

    let isFirst: boolean = true;
    for (const eachVertex of this.vertices) {
      if (isFirst) isFirst = false;
      else result += "\r\n";

      result += "x: " + eachVertex.x;
      result += ", y: " + eachVertex.y;
      if (eachVertex.smooth === true) result += ", smooth";
      if (typeof eachVertex.prevBezierX === "number")
        result += ", prevBezierX: " + eachVertex.prevBezierX;
      if (typeof eachVertex.prevBezierY === "number")
        result += ", prevBezierY: " + eachVertex.prevBezierY;
      if (typeof eachVertex.nextBezierX === "number")
        result += ", nextBezierX: " + eachVertex.nextBezierX;
      if (typeof eachVertex.nextBezierY === "number")
        result += ", nextBezierY: " + eachVertex.nextBezierY;
      if (typeof eachVertex.color === "number")
        result += ", color: " + eachVertex.color;
      if (typeof eachVertex.thickness === "number")
        result += ", thickness: " + eachVertex.thickness;
      result += ";";
    }

    return result;
  }

  /** Parse vertices from JSX or XML inner text */
  set content(value: string) {
    this.vertices = [];

    value = value.trim().replace(/\r/gm, "");
    value = value.replace(/\n/gm, ";");
    let lines = value.split(";");

    for (const eachLine of lines) {
      const trimmedLine = eachLine.trim();
      if (trimmedLine.length == 0) continue;
      let eachVertex: PathStrokeVertex = { x: 0, y: 0 };
      const props = trimmedLine.split(",");
      for (const eachProp of props) {
        const keyValuePair = eachProp.trim().split(":", 2);
        const key = keyValuePair[0].trim();
        switch (key) {
          case "x":
          case "y":
          case "prevBezierX":
          case "prevBezierY":
          case "nextBezierX":
          case "nextBezierY":
          case "thickness":
            if (keyValuePair.length < 2) continue;
            const value = keyValuePair[1].trim();
            const numValue = Number(value);
            if (!isNaN(numValue)) {
              eachVertex[key] = numValue;
            }
            break;
          case "smooth":
            if (keyValuePair.length < 2) {
              eachVertex.smooth = true;
            } else {
              const value = keyValuePair[1].trim();
              eachVertex.smooth = value == "true";
            }
            break;
          case "color":
            if (keyValuePair.length < 2) continue;
            const strValue = keyValuePair[1].trim();
            eachVertex[key] = strValue;
            break;
        }
      }
      this.vertices.push(eachVertex);
    }
  }
}

export default PathStroke;

/** Represents each path vertex */
export interface PathStrokeVertex {
  x: number;
  y: number;

  /**
   * Automatic edge smoothing,
   * bezier will be ignored if true
   */
  smooth?: boolean;

  prevBezierX?: number;
  prevBezierY?: number;
  nextBezierX?: number;
  nextBezierY?: number;

  color?: string;
  thickness?: number;
}
