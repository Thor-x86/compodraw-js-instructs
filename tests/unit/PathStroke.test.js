require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const PathStroke = instructs.PathStroke;

test("Has valid type", () => {
  const pathStroke = new PathStroke();
  expect(typeof pathStroke.draw).toBe("function");
  expect(typeof pathStroke.content).toBe("string");
});

test("Default values", () => {
  const pathStroke = new PathStroke();
  expect(pathStroke.x).toBe(0);
  expect(pathStroke.y).toBe(0);
  expect(pathStroke.width).toBe(NaN);
  expect(pathStroke.height).toBe(NaN);
  expect(pathStroke.originalWidth).toBe(0);
  expect(pathStroke.originalHeight).toBe(0);
  expect(pathStroke.color).toBe("#000000");
  expect(pathStroke.thickness).toBe(1);
  expect(pathStroke.sharp).toBe(false);
  expect(pathStroke.autoConnect).toBe(false);
  expect(pathStroke.vertices).toStrictEqual([]);
});

test("Parse vertices from string", () => {
  const pathStroke = new PathStroke();
  pathStroke.content = `
    x: 20, y:  8;
    x: 30, y:  2, smooth;
    x: 40, y: 10, smooth;
    x: 20, y: 21;
    x:  0, y: 10, smooth;
    x: 10, y:  2, smooth;
    x: 20, y:  8;
  `;

  expect(pathStroke.originalWidth).toBe(40);
  expect(pathStroke.originalHeight).toBe(21);

  expect(pathStroke.vertices.length).toBe(7);

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
    const eachReceived = pathStroke.vertices[i];
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

  const pathStroke = new PathStroke();
  pathStroke.content = original;
  expect(pathStroke.content).toBe(expected);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const pathStroke = new PathStroke();
  pathStroke.content = `
    x: 20, y:  8;
    x: 30, y:  2, smooth;
    x: 40, y: 10, smooth;
    x: 20, y: 21;
    x:  0, y: 10, smooth;
    x: 10, y:  2, smooth;
    x: 20, y:  8;
  `;

  expect(() => {
    pathStroke.draw(ctx);
  }).not.toThrow();
});
