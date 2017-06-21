const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");

const option = "test";

function outObj(key, val) {
  let o = {};
  o[key] = val;
  return o;
}

test("returns an empty object by default", t => {
  const conf = new ModuleConfiguration("return-obj");
  const out = conf.use();
  t.deepEqual(out, {});
});

test("uses defaults if not given an object", t => {
  const conf = new ModuleConfiguration("use-defaults");
  const val = 10;
  conf.option(option, { default: val });
  const out = conf.use();
  t.is(out[option], val);
});

test("returns given values that don't match defined options", t => {
  const conf = new ModuleConfiguration("given-vals");
  const val = 15;
  const out = conf.use(outObj(option, val));
  t.is(out[option], val);
});

test("overrides default values with given options", t => {
  const conf = new ModuleConfiguration("override");
  const initial = 10;
  const final = 20;
  conf.option(option, { default: initial });
  const out = conf.use(outObj(option, final));
  t.is(out[option], final);
});
