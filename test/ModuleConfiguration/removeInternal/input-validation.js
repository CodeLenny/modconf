const test = require("ava");
const jsc = require("jsverify");
const ModuleConfiguration = require("ModuleConfiguration");

const nonObject = jsc.oneof(jsc.number, jsc.string, jsc.bool, jsc.array(jsc.json));

test("throws 'TypeError' if not given an object", t => {
  t.plan(0);
  jsc.assert(jsc.forall(nonObject, (val) => {
    return jsc.throws(() => ModuleConfiguration.removeInternal(val), TypeError);
  }));
});
