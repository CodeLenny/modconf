const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");

test("sets ID", t => {
  const id = "testing";
  const mod = new ModuleConfiguration(id);
  t.is(mod.id, id);
});
