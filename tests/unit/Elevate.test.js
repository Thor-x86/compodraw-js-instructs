require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Elevate = instructs.Elevate;

test("Has valid type", () => {
  const elevate = new Elevate();
  expect(typeof elevate.draw).toBe("function");
  expect(Array.isArray(elevate.content)).toBe(true);
});

test("Default values", () => {
  const elevate = new Elevate();
  expect(elevate.angle).toBe(0);
  expect(elevate.depth).toBe(4);
  expect(elevate.content).toStrictEqual([]);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const elevate = new Elevate();
  expect(() => {
    elevate.draw(ctx);
  }).not.toThrow();
});
