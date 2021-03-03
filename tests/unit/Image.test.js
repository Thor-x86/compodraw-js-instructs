require("jest-canvas-mock");

const fs = require("fs");
const path = require("path");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Image = instructs.Image;

test("Has valid type", () => {
  const image = new Image();
  expect(typeof image.draw).toBe("function");
});

test("Default values", () => {
  const image = new Image();
  expect(image.x).toBe(0);
  expect(image.y).toBe(0);
  expect(image.width).toBe(NaN);
  expect(image.height).toBe(NaN);
  expect(image.originalWidth).toBe(NaN);
  expect(image.originalHeight).toBe(NaN);
  expect(image.source).toBe(undefined);
});

// Prepare image source
const base64Path = path.join(__dirname, "./example-image.txt");
const base64 = fs.readFileSync(base64Path, { encoding: "utf-8" });
const svg = new global.Image(128, 128);
svg.src = base64;

test("Set image source", () => {
  const image = new Image();
  image.source = svg;
  expect(image.source).toBe(svg);
  expect(image.originalWidth).toBe(128);
  expect(image.originalHeight).toBe(128);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.source = svg;
  expect(() => {
    image.draw(ctx);
  }).not.toThrow();
});
