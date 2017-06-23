const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");

test("overrides options", t => {
  const conf = new ModuleConfiguration("override");
  conf
    .option("test", {
      default: "initial-value",
    })
    .defaults({
      test: "other-value",
    });
  const opts = conf.use();
  t.is(opts.test, "other-value");
});
