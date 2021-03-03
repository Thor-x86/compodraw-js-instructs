require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const GradientLinear = instructs.GradientLinear;

test("Has valid type", () => {
  const gradient = new GradientLinear();
  expect(typeof gradient.draw).toBe("function");
  expect(Array.isArray(gradient.content)).toBe(true);
});

test("Default values", () => {
  const gradient = new GradientLinear();
  expect(gradient.startX).toBe(0);
  expect(gradient.startY).toBe(0);
  expect(gradient.endX).toBe(100);
  expect(gradient.endY).toBe(100);
  expect(gradient.points).toStrictEqual({
    0.0: "#000000",
    1.0: "#ffffff",
  });
  expect(gradient.content).toStrictEqual([]);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const gradient = new GradientLinear();
  expect(() => {
    gradient.draw(ctx);
  }).not.toThrow();
});
