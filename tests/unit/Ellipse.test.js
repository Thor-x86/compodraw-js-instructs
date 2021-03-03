require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Ellipse = instructs.Ellipse;

test("Has valid type", () => {
  const ellipse = new Ellipse();
  expect(typeof ellipse.draw).toBe("function");
});

test("Default values", () => {
  const ellipse = new Ellipse();
  expect(ellipse.x).toBe(0);
  expect(ellipse.y).toBe(0);
  expect(ellipse.width).toBe(100);
  expect(ellipse.height).toBe(100);
  expect(ellipse.color).toBe("#000000");
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const ellipse = new Ellipse();
  expect(() => {
    ellipse.draw(ctx);
  }).not.toThrow();
});
