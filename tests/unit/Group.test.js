require("jest-canvas-mock");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");
const Group = instructs.Group;

test("Has valid type", () => {
  const group = new Group();
  expect(typeof group.draw).toBe("function");
  expect(Array.isArray(group.content)).toBe(true);
});

test("Default values", () => {
  const group = new Group();
  expect(group.content).toStrictEqual([]);
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const group = new Group();
  const rectangle = new instructs.Rectangle();
  group.content.push(rectangle);
  expect(() => {
    group.draw(ctx);
  }).not.toThrow();
});
