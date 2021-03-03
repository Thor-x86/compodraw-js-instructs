require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const GradientRadial = instructs.GradientRadial;

test("Has valid type", () => {
  const gradient = new GradientRadial();
  expect(typeof gradient.draw).toBe("function");
  expect(Array.isArray(gradient.content)).toBe(true);
});

test("Default values", () => {
  const gradient = new GradientRadial();
  expect(gradient.x).toBe(0);
  expect(gradient.y).toBe(0);
  expect(gradient.radius).toBe(100);
  expect(gradient.points).toStrictEqual({
    0.0: "#000000",
    1.0: "#ffffff",
  });
  expect(gradient.content).toStrictEqual([]);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const gradient = new GradientRadial();
  expect(() => {
    gradient.draw(ctx);
  }).not.toThrow();
});
