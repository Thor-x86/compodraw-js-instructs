require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const RectangleRound = instructs.RectangleRound;

test("Has valid type", () => {
  const rectRound = new RectangleRound();
  expect(typeof rectRound.draw).toBe("function");
});

test("Default values", () => {
  const rectRound = new RectangleRound();
  expect(rectRound.x).toBe(0);
  expect(rectRound.y).toBe(0);
  expect(rectRound.width).toBe(100);
  expect(rectRound.height).toBe(100);
  expect(rectRound.color).toBe("#000000");
  expect(rectRound.cornerRadius).toBe(16);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const rectRound = new RectangleRound();
  expect(() => {
    rectRound.draw(ctx);
  }).not.toThrow();
});
