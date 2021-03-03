const fs = require("fs");
const path = require("path");

/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");

const sourcePath = path.join(__dirname, "../../src/");
const testPath = path.join(__dirname, "./");

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
    continue;
  }

  // Only allow source codes that export
  // JavaScript things, not Typescript
  const isNotTS = instructs[eachSource] == true;
  if (!isNotTS) {
    sources.splice(i, 1);
    i--;
    continue;
  }
}

// Get unit test scripts
const tests = fs.readdirSync(testPath, { encoding: "utf-8" });
for (let i = 0; i < tests.length; i++) {
  const eachTest = tests[i];

  // Only allow .test.js file
  if (!eachTest.endsWith(".test.js")) {
    tests.splice(i, 1);
    i--;
    continue;
  }

  // Don't be fooled by a directory
  // with ".test.js" prefix
  const absPath = testPath + eachTest;
  const isDirectory = fs.statSync(absPath).isDirectory();
  if (isDirectory) {
    tests.splice(i, 1);
    i--;
  }
}

test("All source codes have their own unit test", () => {
  for (const eachSource of sources) {
    let hasTest = false;
    for (const eachTest of tests) {
      const sourceName = eachSource.replace(/\.ts$/, "");
      const testName = eachTest.replace(/\.test.js$/, "");
      if (sourceName === testName) {
        hasTest = true;
        break;
      }
    }
    if (!hasTest) {
      throw new Error(`TEST FAILED: File "${eachSource}" has no unit test yet`);
    }
  }
});
