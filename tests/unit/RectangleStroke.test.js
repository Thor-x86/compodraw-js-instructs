require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const RectangleStroke = instructs.RectangleStroke;

test("Has valid type", () => {
  const rectStroke = new RectangleStroke();
  expect(typeof rectStroke.draw).toBe("function");
});

test("Default values", () => {
  const rectStroke = new RectangleStroke();
  expect(rectStroke.x).toBe(0);
  expect(rectStroke.y).toBe(0);
  expect(rectStroke.width).toBe(100);
  expect(rectStroke.height).toBe(100);
  expect(rectStroke.color).toBe("#000000");
  expect(rectStroke.thickness).toBe(1);
  expect(rectStroke.sharp).toBe(false);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const rectStroke = new RectangleStroke();
  expect(() => {
    rectStroke.draw(ctx);
  }).not.toThrow();
});
