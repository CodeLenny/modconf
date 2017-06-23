const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");

test("sets new properties", t => {
  const conf = new ModuleConfiguration("new-props");
  conf.defaults({
    test: "default-value",
  });
  t.is(conf._defaults.test, "default-value");
});

test("updates previous properties", t => {
  const conf = new ModuleConfiguration("update-props");
  conf.option("test", {
    default: "initial-value",
  });
  conf.defaults({
    test: "other-value",
  });
  t.is(conf._defaults.test, "other-value");
});
