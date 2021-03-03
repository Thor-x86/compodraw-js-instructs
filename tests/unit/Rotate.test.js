require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Rotate = instructs.Rotate;

test("Has valid type", () => {
  const rotate = new Rotate();
  expect(typeof rotate.draw).toBe("function");
  expect(Array.isArray(rotate.content)).toBe(true);
});

test("Default values", () => {
  const rotate = new Rotate();
  expect(rotate.angle).toBe(0);
  expect(rotate.x).toBe(0);
  expect(rotate.y).toBe(0);
  expect(rotate.content).toStrictEqual([]);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const rotate = new Rotate();
  expect(() => {
    rotate.draw(ctx);
  }).not.toThrow();
});
