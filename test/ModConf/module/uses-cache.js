const test = require("ava");
const ModConf = require("ModConf");

test("returns cache entries if they match", t => {
  const id = "cachedMod";
  const first = ModConf.module(id);
  const second = ModConf.module(id);
  t.is(first, second);
});
