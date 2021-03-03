require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const RectangleRoundStroke = instructs.RectangleRoundStroke;

test("Has valid type", () => {
  const rectRoundStroke = new RectangleRoundStroke();
  expect(typeof rectRoundStroke.draw).toBe("function");
});

test("Default values", () => {
  const rectRoundStroke = new RectangleRoundStroke();
  expect(rectRoundStroke.x).toBe(0);
  expect(rectRoundStroke.y).toBe(0);
  expect(rectRoundStroke.width).toBe(100);
  expect(rectRoundStroke.height).toBe(100);
  expect(rectRoundStroke.color).toBe("#000000");
  expect(rectRoundStroke.thickness).toBe(1);
  expect(rectRoundStroke.cornerRadius).toBe(16);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const rectRoundStroke = new RectangleRoundStroke();
  expect(() => {
    rectRoundStroke.draw(ctx);
  }).not.toThrow();
});
