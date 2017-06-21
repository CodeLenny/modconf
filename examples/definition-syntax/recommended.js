const modconf = require("modconf");

module.exports = modconf
  .module("modconf/definition-syntax")
  .option("luckyValue")
  .option(Number, "luckyNumber")
  .option(String, "name", {
    description: "The user's name.",
    example: "bob",
    types: [ String, Number ], // overrides "String" argument.
  });
