const test = require("ava");
const ModConf = require("ModConf");

test("adds modules to a cache", t => {
  const id = "test";
  t.is(typeof ModConf._modules, "undefined", "Should not start with a cache");
  const conf = ModConf.module(id);
  t.is(ModConf._modules[id], conf);
});
