const test = require("ava");
const ModConf = require("ModConf");

test("creates a cache object", t => {
  t.plan(2);
  t.is(typeof ModConf._modules, "undefined");
  ModConf.module("test");
  t.is(typeof ModConf._modules, "object");
});
