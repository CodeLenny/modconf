const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");

const name = "test";

test("adds options to class variable", t => {
  t.plan(2);
  const conf = new ModuleConfiguration("add-options");
  const opts = { name, foo: 1 };
  t.is(Object.keys(conf._options).length, 0);
  conf.option(name, opts);
  t.deepEqual(conf._options[name], opts);
});

test("creates minimal options object if not provided", t => {
  const conf = new ModuleConfiguration("creates-opts");
  conf.option(name);
  t.deepEqual(conf._options[name], { name });
});

test("adds types to options", t => {
  const conf = new ModuleConfiguration("adds-types");
  const type = Number;
  conf.option(type, name);
  t.is(conf._options[name].types, type);
});

test("merges new options into previously created option", t => {
  t.plan(3);
  const conf = new ModuleConfiguration("merge-opts");
  const type = Number;
  const opts = { foo: 1, types: type };
  const newOpts = { bar: 2 };
  conf.option(name, opts);
  conf.option(name, newOpts);
  const final = conf._options[name];
  t.is(final.foo, 1);
  t.is(final.bar, 2);
  t.is(final.types, type);
});
