require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Rectangle = instructs.Rectangle;

test("Has valid type", () => {
  const rectangle = new Rectangle();
  expect(typeof rectangle.draw).toBe("function");
});

test("Default values", () => {
  const rectangle = new Rectangle();
  expect(rectangle.x).toBe(0);
  expect(rectangle.y).toBe(0);
  expect(rectangle.width).toBe(100);
  expect(rectangle.height).toBe(100);
  expect(rectangle.color).toBe("#000000");
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const rectangle = new Rectangle();
  expect(() => {
    rectangle.draw(ctx);
  }).not.toThrow();
});
