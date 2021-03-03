require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Text = instructs.Text;

test("Has valid type", () => {
  const text = new Text();
  expect(typeof text.draw).toBe("function");
  expect(typeof text.content).toBe("string");
});

test("Default values", () => {
  const text = new Text();
  expect(text.value).toBe("");
  expect(text.x).toBe(0);
  expect(text.y).toBe(0);
  expect(text.size).toBe(18);
  expect(text.color).toBe("#000000");
  expect(text.style).toBe("");
  expect(text.align).toBe("left");
  expect(text.content).toBe("");
});

test("Parse text from content", () => {
  const text = new Text();
  text.content = `
    Lorem Ipsum
    Dolor Amet
    Consectus
  `;
  expect(text.value).toBe("Lorem Ipsum\nDolor Amet\nConsectus");
});

test("Content set/get consistency", () => {
  const text = new Text();
  text.content = `
    Lorem Ipsum
    Dolor Amet
    Consectus
  `;
  expect(text.content).toBe("Lorem Ipsum\r\nDolor Amet\r\nConsectus");
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const text = new Text();
  expect(() => {
    text.draw(ctx);
  }).not.toThrow();
});
