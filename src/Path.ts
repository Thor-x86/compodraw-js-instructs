import { Instruct } from "compodraw";

/**
 * Draw custom shape based on array of vertices
 */
export class Path implements Instruct {
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
   * Array of vertices
   *
   * @example
   * [
   *     {x: 10, y: 10},
   *     {x: 10, y: 30, smooth: true},
   *     {x: 30, y: 10}
   * ]
   */
  vertices: PathVertex[] = [];

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

    canvasCtx.fillStyle = this.color;
    canvasCtx.beginPath();

    // Set starting point
    const first = this.vertices[0];
    canvasCtx.moveTo(this.x + first.x * scaleX, this.x + first.y * scaleY);

    for (let iter = 1; iter < this.vertices.length; iter++) {
      const prevVertex = this.vertices[iter - 1];
      const currentVertex = this.vertices[iter];
      if (currentVertex.smooth === true) {
        // CONDITION: Auto-smooth enabled
        let nextVertex: PathVertex;
        if (iter < this.vertices.length - 1) {
          // CONDITION: Auto-smooth enabled and not the last vertex
          nextVertex = this.vertices[iter + 1];
        } else {
          // CONDITION: Auto-smooth enabled and currently last vertex
          nextVertex = this.vertices[0];
        }
        const x0 = this.x + currentVertex.x * scaleX;
        const y0 = this.y + currentVertex.y * scaleY;
        const x1 = this.x + nextVertex.x * scaleX;
        const y1 = this.y + nextVertex.y * scaleY;
        canvasCtx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
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

    canvasCtx.closePath();
    canvasCtx.fill();
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
      let eachVertex: PathVertex = { x: 0, y: 0 };
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
        }
      }
      this.vertices.push(eachVertex);
    }
  }

  get originalWidth(): number {
    let max: number = 0;
    for (let iter = 0; iter < this.vertices.length; iter++) {
      const eachPoint = this.vertices[iter];
      max = Math.max(max, eachPoint.x);
    }
    return max;
  }

  get originalHeight(): number {
    let max: number = 0;
    for (let iter = 0; iter < this.vertices.length; iter++) {
      const eachPoint = this.vertices[iter];
      max = Math.max(max, eachPoint.y);
    }
    return max;
  }
}

export default Path;

/** Represents each path vertex */
export interface PathVertex {
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
}
