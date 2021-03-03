/** @type {import('../../types/index')} */
const instructs = require("../../build/compodraw-instructs");

test('All instructs are registered on "all.ts"', () => {
  for (const eachName in instructs) {
    // Ignore "all" and "default" props
    if (eachName === "all" || eachName === "default") continue;

    let isRegistered = false;
    for (const eachKey in instructs.all) {
      const eachInstruct = instructs[eachName];
      const eachValue = instructs.all[eachKey];
      if (eachInstruct === eachValue) {
        isRegistered = true;
        break;
      }
    }

    if (!isRegistered) {
      throw new Error(`TEST FAILED: "${eachName}" is not registered on all.ts`);
    }
  }
});
