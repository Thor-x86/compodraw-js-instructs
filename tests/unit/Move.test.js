require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Move = instructs.Move;

test("Has valid type", () => {
  const move = new Move();
  expect(typeof move.draw).toBe("function");
  expect(Array.isArray(move.content)).toBe(true);
});

test("Default values", () => {
  const move = new Move();
  expect(move.x).toBe(0);
  expect(move.y).toBe(0);
  expect(move.content).toStrictEqual([]);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const move = new Move();
  expect(() => {
    move.draw(ctx);
  }).not.toThrow();
});
