require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Transparent = instructs.Transparent;

test("Has valid type", () => {
  const transparent = new Transparent();
  expect(typeof transparent.draw).toBe("function");
  expect(Array.isArray(transparent.content)).toBe(true);
});

test("Default values", () => {
  const transparent = new Transparent();
  expect(transparent.value).toBe(1);
  expect(transparent.content).toStrictEqual([]);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const transparent = new Transparent();
  expect(() => {
    transparent.draw(ctx);
  }).not.toThrow();
});
