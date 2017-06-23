const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");
const merge = require("lodash.merge");

test("leaves a number", t => {
  const conf = ModuleConfiguration.removeInternal({
    _set: {},
    foo: 1,
  });
  t.is(conf.foo, 1);
});

test("leaves deep properties", t => {
  const conf = ModuleConfiguration.removeInternal({
    foo: {
      _set: {
        bar: 1,
      },
    },
  });
  t.is(conf.foo._set.bar, 1);
});

test("leaves random properties that start with '_'", t => {
  const conf = ModuleConfiguration.removeInternal({
    _notInternal: 1,
  });
  t.is(conf._notInternal, 1);
});

test("leaves all other properties", t => {
  const obj = {
    _set: {},
    foo: 1,
    bar: "asdf",
  };
  const conf = ModuleConfiguration.removeInternal(merge({}, obj));
  delete obj._set;
  t.deepEqual(conf, obj);
});
