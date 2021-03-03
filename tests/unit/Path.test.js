require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Path = instructs.Path;

test("Has valid type", () => {
  const path = new Path();
  expect(typeof path.draw).toBe("function");
  expect(typeof path.content).toBe("string");
});

test("Default values", () => {
  const path = new Path();
  expect(path.x).toBe(0);
  expect(path.y).toBe(0);
  expect(path.width).toBe(NaN);
  expect(path.height).toBe(NaN);
  expect(path.originalWidth).toBe(0);
  expect(path.originalHeight).toBe(0);
  expect(path.color).toBe("#000000");
  expect(path.vertices).toStrictEqual([]);
});

test("Parse vertices from string", () => {
  const path = new Path();
  path.content = `
    x: 20, y:  8;
    x: 30, y:  2, smooth;
    x: 40, y: 10, smooth;
    x: 20, y: 21;
    x:  0, y: 10, smooth;
    x: 10, y:  2, smooth;
    x: 20, y:  8;
  `;

  expect(path.originalWidth).toBe(40);
  expect(path.originalHeight).toBe(21);

  expect(path.vertices.length).toBe(7);

  const expectedVertices = [
    { x: 20, y: 8, smooth: undefined },
    { x: 30, y: 2, smooth: true },
    { x: 40, y: 10, smooth: true },
    { x: 20, y: 21, smooth: undefined },
    { x: 0, y: 10, smooth: true },
    { x: 10, y: 2, smooth: true },
    { x: 20, y: 8, smooth: undefined },
  ];
  for (let i = 0; i < 7; i++) {
    const eachExpected = expectedVertices[i];
    const eachReceived = path.vertices[i];
    expect(eachExpected.x).toBe(eachReceived.x);
    expect(eachExpected.y).toBe(eachReceived.y);
    expect(eachExpected.smooth).toBe(eachReceived.smooth);
  }
});

test("Content set/get consistency", () => {
  const original = `
    x: 20, y:  8;
    x: 30, y:  2, smooth;
    x: 20, y:  8;
  `;
  const expected = "x: 20, y: 8;\r\nx: 30, y: 2, smooth;\r\nx: 20, y: 8;";

  const path = new Path();
  path.content = original;
  expect(path.content).toBe(expected);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const path = new Path();
  path.content = `
    x: 20, y:  8;
    x: 30, y:  2, smooth;
    x: 40, y: 10, smooth;
    x: 20, y: 21;
    x:  0, y: 10, smooth;
    x: 10, y:  2, smooth;
    x: 20, y:  8;
  `;

  expect(() => {
    path.draw(ctx);
  }).not.toThrow();
});
