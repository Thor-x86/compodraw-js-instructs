require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const TextStroke = instructs.TextStroke;

test("Has valid type", () => {
  const textStroke = new TextStroke();
  expect(typeof textStroke.draw).toBe("function");
  expect(typeof textStroke.content).toBe("string");
});

test("Default values", () => {
  const textStroke = new TextStroke();
  expect(textStroke.value).toBe("");
  expect(textStroke.x).toBe(0);
  expect(textStroke.y).toBe(0);
  expect(textStroke.size).toBe(18);
  expect(textStroke.color).toBe("#000000");
  expect(textStroke.style).toBe("");
  expect(textStroke.align).toBe("left");
  expect(textStroke.content).toBe("");
});

test("Parse text from content", () => {
  const textStroke = new TextStroke();
  textStroke.content = `
    Lorem Ipsum
    Dolor Amet
    Consectus
  `;
  expect(textStroke.value).toBe("Lorem Ipsum\nDolor Amet\nConsectus");
});

test("Content set/get consistency", () => {
  const textStroke = new TextStroke();
  textStroke.content = `
    Lorem Ipsum
    Dolor Amet
    Consectus
  `;
  expect(textStroke.content).toBe("Lorem Ipsum\r\nDolor Amet\r\nConsectus");
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const textStroke = new TextStroke();
  expect(() => {
    textStroke.draw(ctx);
  }).not.toThrow();
});
