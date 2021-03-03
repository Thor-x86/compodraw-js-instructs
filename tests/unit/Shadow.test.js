require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Shadow = instructs.Shadow;

test("Has valid type", () => {
  const shadow = new Shadow();
  expect(typeof shadow.draw).toBe("function");
  expect(Array.isArray(shadow.content)).toBe(true);
});

test("Default values", () => {
  const shadow = new Shadow();
  expect(shadow.blur).toBe(8);
  expect(shadow.color).toBe("rgba(0,0,0,0.32)");
  expect(shadow.x).toBe(4);
  expect(shadow.y).toBe(4);
  expect(shadow.content).toStrictEqual([]);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const shadow = new Shadow();
  shadow.content.push(new instructs.Rectangle());
  expect(() => {
    shadow.draw(ctx);
  }).not.toThrow();
});
