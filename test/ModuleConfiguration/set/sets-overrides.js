const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");

test("sets values", t => {
  t.plan(2);
  const conf = new ModuleConfiguration("sets-vals");
  const obj = { foo: 1 };
  t.deepEqual(conf._defaults._set, {});
  conf.set(obj);
  t.deepEqual(conf._defaults._set, obj);
});
