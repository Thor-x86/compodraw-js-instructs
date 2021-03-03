const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "../../src/");

// Get source code names inside "src" folder
const sources = fs.readdirSync(sourcePath, { encoding: "utf-8" });
for (let i = 0; i < sources.length; i++) {
  const eachSource = sources[i];

  // Excludes index.ts and all.ts
  if (eachSource === "index.ts" || eachSource === "all.ts") {
    sources.splice(i, 1);
    i--;
    continue;
  }

  // Only allow .ts file
  if (!eachSource.endsWith(".ts")) {
    sources.splice(i, 1);
    i--;
    continue;
  }

  // Don't be fooled by a directory
  // with ".ts" prefix
  const absPath = sourcePath + eachSource;
  const isDirectory = fs.statSync(absPath).isDirectory();
  if (isDirectory) {
    sources.splice(i, 1);
    i--;
  }
}

test("All source codes are registered on index.ts", () => {
  const rootIndexPath = sourcePath + "/index.ts";
  const rootIndex = fs
    .readFileSync(rootIndexPath, { encoding: "utf-8" })
    .replace(/\r/gm, "")
    .replace(/\/\/.*\n/gm, "")
    .replace(/\/\*.+?\*\//gs, "");
  const rootIndexLines = rootIndex.split("\n");

  for (const eachSource of sources) {
    const sourceName = eachSource.replace(/\.ts$/, "");
    const expectedLine = `export * from "./${sourceName}";`;
    let isRegistered = false;

    for (const eachLine of rootIndexLines) {
      if (eachLine === expectedLine) {
        isRegistered = true;
        break;
      }
    }

    if (!isRegistered) {
      throw new Error(
        `TEST FAILED: No "${expectedLine}" line found at index.ts`
      );
    }
  }
});

test("All source codes have both default and named exports", () => {
  for (const eachName of sources) {
    const absPath = sourcePath + "/" + eachName;
    const eachContent = fs
      .readFileSync(absPath, { encoding: "utf-8" })
      .replace(/\r/gm, "")
      .replace(/\/\/.*\n/gm, "")
      .replace(/\/\*.+?\*\//gs, "");

    const hasDefaultExport = eachContent.includes("export default ");
    if (!hasDefaultExport) {
      throw new Error(
        `TEST FAILED: Source file "${eachName}" doesn't have default export`
      );
    }
  }
});

test('"all.ts" is registered on index.ts', () => {
  const rootIndexPath = sourcePath + "/index.ts";
  const rootIndex = fs
    .readFileSync(rootIndexPath, { encoding: "utf-8" })
    .replace(/\r/gm, "")
    .replace(/\/\/.*\n/gm, "")
    .replace(/\/\*.+?\*\//gs, "");

  const expectedLine = `export { default, default as all } from "./all";`;
  const isRegistered = rootIndex.includes(expectedLine);
  if (!isRegistered) {
    throw new Error(`TEST FAILED: No "${expectedLine}" line found at index.ts`);
  }
});
