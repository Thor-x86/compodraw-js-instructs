require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const EllipseStroke = instructs.EllipseStroke;

test("Has valid type", () => {
  const ellipseStroke = new EllipseStroke();
  expect(typeof ellipseStroke.draw).toBe("function");
});

test("Default values", () => {
  const ellipseStroke = new EllipseStroke();
  expect(ellipseStroke.x).toBe(0);
  expect(ellipseStroke.y).toBe(0);
  expect(ellipseStroke.width).toBe(100);
  expect(ellipseStroke.height).toBe(100);
  expect(ellipseStroke.color).toBe("#000000");
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const ellipseStroke = new EllipseStroke();
  expect(() => {
    ellipseStroke.draw(ctx);
  }).not.toThrow();
});
