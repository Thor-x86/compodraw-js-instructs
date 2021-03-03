require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Scale = instructs.Scale;

test("Has valid type", () => {
  const scale = new Scale();
  expect(typeof scale.draw).toBe("function");
  expect(Array.isArray(scale.content)).toBe(true);
});

test("Default values", () => {
  const scale = new Scale();
  expect(scale.x).toBe(1);
  expect(scale.y).toBe(1);
  expect(scale.content).toStrictEqual([]);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const scale = new Scale();
  expect(() => {
    scale.draw(ctx);
  }).not.toThrow();
});
