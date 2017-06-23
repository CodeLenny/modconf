const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");
const { NotImplementedError } = require("common-errors");

let i = 0;

function objType(t, val) {
  const conf = new ModuleConfiguration("" + ++i);
  const err = t.throws(() => conf.set(val), TypeError);
  t.true(err.message.indexOf("Must be given an object") >= 0);
}
objType.title = (u, val) => `rejects ${typeof val} - ${val}`;

test(objType, 0);
test(objType, 10);
test(objType, "some data");
test(objType, true);
test(objType, null);

test("rejects non-default configuration sets", t => {
  const conf = new ModuleConfiguration("non-default");
  const err = t.throws(() => conf.set("other", { foo: 1 }), NotImplementedError);
});
