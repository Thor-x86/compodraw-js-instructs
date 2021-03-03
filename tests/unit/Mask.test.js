require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Mask = instructs.Mask;

test("Has valid type", () => {
  const mask = new Mask();
  expect(typeof mask.draw).toBe("function");
  expect(Array.isArray(mask.content)).toBe(true);
});

test("Default values", () => {
  const mask = new Mask();
  expect(mask.shape).toBe(null);
  expect(mask.allowIntersect).toBe(false);
  expect(mask.content).toStrictEqual([]);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const mask = new Mask();
  const rectangle = new instructs.Rectangle();
  const ellipse = new instructs.Ellipse();
  mask.shape = ellipse;
  mask.content.push(rectangle);
  expect(() => {
    mask.draw(ctx);
  }).not.toThrow();
});
