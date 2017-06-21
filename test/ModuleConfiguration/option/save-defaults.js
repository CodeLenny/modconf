const test = require("ava");
const jsc = require("jsverify");
const ModuleConfiguration = require("ModuleConfiguration");

let i = 1;
const name = "test";

test("copies 'default' into '_defaults'", t => {
  t.plan(0);
  jsc.assert(jsc.forall(jsc.json, (val) => {
    const conf = new ModuleConfiguration("" + ++i);
    conf.option(name, { default: val });
    return conf._defaults[name] === val;
  }));
});

test("doesn't change '_defaults' unless default given", t => {
  const conf = new ModuleConfiguration("no-change");
  conf.option(name);
  t.is(typeof conf._defaults[name], "undefined");
});
