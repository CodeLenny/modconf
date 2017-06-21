const test = require("ava");
const ModuleConfiguration = require("ModuleConfiguration");
require("test/examples/helpers/modconf-require");

test("file loads", t => {
  const RecommendedSyntax = require("examples/definition-syntax/recommended");
  t.true(RecommendedSyntax instanceof ModuleConfiguration);
});
