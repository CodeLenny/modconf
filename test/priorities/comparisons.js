const test = require("ava");
const modconf = require("ModConf");

const priorities = [
  "option definition",
  "use object",
];

let i = 0;
function overrides(t, finalVal, earlierVal) {
  const conf = modconf
    .module("" + ++i);
  const option = `option${i}`;
  const initial = 15;
  const final = 10;
  function defineOption(priority, val) {
    if(priority !== "option definition") { return; }
    conf.option(option, { default: val });
  }
  defineOption(earlierVal, initial);
  defineOption(finalVal, final);
  const useOpts = {};
  function addUseOpt(priority, val) {
    if(priority !== "use object") { return; }
    useOpts[option] = val;
  }
  addUseOpt(earlierVal, initial);
  addUseOpt(finalVal, final);
  const opts = conf.use(useOpts);
  t.is(opts[option], final);
}
overrides.title = (title, final, earlier) => `${final} overrides ${earlier}`;

test(overrides, "option definition", "option definition");
test(overrides, "use object", "option definition");
