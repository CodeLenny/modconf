const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");

const prop = "test";
const initial = 4;
let initialObj = {};
initialObj[prop] = initial;
const final = 8;
let finalObj = {};
finalObj[prop] = final;

test("overrides _set properties", t => {
  const conf = new ModuleConfiguration("_set");
  conf._defaults._set[prop] = initial;
  conf.set(finalObj);
  const opts = conf.use();
  t.is(opts[prop], final);
});

test("overrides previous 'set()'", t => {
  const conf = new ModuleConfiguration("set");
  conf.set(initialObj);
  conf.set(finalObj);
  const opts = conf.use();
  t.is(opts[prop], final);
});

test("overrides given options", t => {
  const conf = new ModuleConfiguration("opts");
  conf.set(finalObj);
  const opts = conf.use(initialObj);
  t.is(opts[prop], final);
});
