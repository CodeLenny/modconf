const test = require("ava");
const jsc = require("jsverify");
const ModuleConfiguration = require("ModuleConfiguration");

test("accepts non-empty strings as the ID", t => {
  t.plan(0);
  jsc.assert(jsc.forall(jsc.nestring, (str) => {
    new ModuleConfiguration(str);
    return true;
  }));
});

test("throws TypeError if given empty ID", t => {
  const err = t.throws(() => {
    new ModuleConfiguration("");
  }, TypeError);
  t.true(err.message.indexOf("0 characters") >= 0);
});

function nonString(t, id) {
  t.plan(3);
  const err = t.throws(() => {
    new ModuleConfiguration(id);
  }, TypeError);
  t.true(err.message.indexOf("non-empty string") >= 0);
  t.true(err.message.indexOf(typeof id) >= 0);
}
nonString.title = (title, id) => `throws TypeError if given a ${typeof id} as ID`;

test(nonString, false);
test(nonString, true);
test(nonString, { obj: true });
test(nonString, 15);
