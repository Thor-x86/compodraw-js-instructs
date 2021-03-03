require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Crop = instructs.Crop;

test("Has valid type", () => {
  const crop = new Crop();
  expect(typeof crop.draw).toBe("function");
  expect(Array.isArray(crop.content)).toBe(true);
});

test("Default values", () => {
  const crop = new Crop();
  expect(crop.x).toBe(0);
  expect(crop.y).toBe(0);
  expect(crop.width).toBe(128);
  expect(crop.height).toBe(128);
  expect(crop.content).toStrictEqual([]);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const crop = new Crop();
  expect(() => crop.draw(ctx)).not.toThrow();
});
