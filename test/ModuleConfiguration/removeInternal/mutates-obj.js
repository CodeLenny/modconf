const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");

test("returns the same object", t => {
  const obj = {
    _set: {},
    foo: 1,
  };
  const conf = ModuleConfiguration.removeInternal(obj);
  t.is(obj, conf);
});
